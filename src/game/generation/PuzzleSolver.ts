import type { Puzzle } from '../Puzzle';

export type EdgeKey = `h-${number}-${number}` | `v-${number}-${number}`;

type CellConstraint = {
  index: number;
  clue: number;
  edges: number[];
};

type VertexConstraint = {
  index: number;
  edges: number[];
};

type SolverModel = {
  size: number;
  edges: EdgeKey[];
  cellsByEdge: CellConstraint[][];
  verticesByEdge: VertexConstraint[][];
  cellLineCounts: number[];
  cellUnknownCounts: number[];
  vertexLineCounts: number[];
  vertexUnknownCounts: number[];
  edgeStates: Array<boolean | null>;
  cellConstraints: CellConstraint[];
  vertexConstraints: VertexConstraint[];
};

export type SolutionCounter = {
  countSolutions(puzzle: Puzzle, limit: number): number;
};

export class PuzzleSolver implements SolutionCounter {
  constructor(private readonly maxSearchNodes = 250_000) {}

  countSolutions(puzzle: Puzzle, limit: number) {
    if (limit <= 0) {
      return 0;
    }

    const model = createSolverModel(puzzle);
    let solutionCount = 0;
    let searchedNodes = 0;

    const search = (): boolean => {
      searchedNodes += 1;

      if (searchedNodes > this.maxSearchNodes) {
        solutionCount = limit;
        return true;
      }

      if (!isPartialStateValid(model)) {
        return false;
      }

      const edgeIndex = selectNextEdge(model);

      if (edgeIndex === -1) {
        if (isSolvedState(model)) {
          solutionCount += 1;
        }

        return solutionCount >= limit;
      }

      for (const state of [true, false]) {
        assignEdge(model, edgeIndex, state);

        if (search()) {
          return true;
        }

        unassignEdge(model, edgeIndex, state);
      }

      return false;
    };

    search();

    return solutionCount;
  }
}

export function isSingleLoop(size: number, edges: Set<EdgeKey>) {
  if (edges.size === 0) {
    return false;
  }

  const adjacency = createLoopAdjacency(size, edges);

  if (adjacency === null) {
    return false;
  }

  const startVertex = adjacency.keys().next().value as string | undefined;

  if (!startVertex) {
    return false;
  }

  const visited = new Set<string>();
  const stack = [startVertex];

  while (stack.length > 0) {
    const vertexId = stack.pop();

    if (!vertexId || visited.has(vertexId)) {
      continue;
    }

    visited.add(vertexId);
    adjacency.get(vertexId)?.forEach((connectedVertexId) => {
      if (!visited.has(connectedVertexId)) {
        stack.push(connectedVertexId);
      }
    });
  }

  return visited.size === adjacency.size;
}

function createSolverModel(puzzle: Puzzle): SolverModel {
  const edges = createAllEdges(puzzle.size);
  const edgeIndexByKey = new Map(edges.map((edge, index) => [edge, index]));
  const cellConstraints = createCellConstraints(puzzle, edgeIndexByKey);
  const vertexConstraints = createVertexConstraints(puzzle.size, edgeIndexByKey);
  const cellsByEdge = edges.map(() => [] as CellConstraint[]);
  const verticesByEdge = edges.map(() => [] as VertexConstraint[]);

  cellConstraints.forEach((cell) => {
    cell.edges.forEach((edgeIndex) => cellsByEdge[edgeIndex].push(cell));
  });

  vertexConstraints.forEach((vertex) => {
    vertex.edges.forEach((edgeIndex) => verticesByEdge[edgeIndex].push(vertex));
  });

  return {
    size: puzzle.size,
    edges,
    cellsByEdge,
    verticesByEdge,
    cellLineCounts: Array(cellConstraints.length).fill(0),
    cellUnknownCounts: cellConstraints.map((cell) => cell.edges.length),
    vertexLineCounts: Array(vertexConstraints.length).fill(0),
    vertexUnknownCounts: vertexConstraints.map((vertex) => vertex.edges.length),
    edgeStates: Array(edges.length).fill(null),
    cellConstraints,
    vertexConstraints,
  };
}

function createAllEdges(size: number): EdgeKey[] {
  const edges: EdgeKey[] = [];

  for (let row = 0; row <= size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      edges.push(`h-${row}-${column}`);
    }
  }

  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column <= size; column += 1) {
      edges.push(`v-${row}-${column}`);
    }
  }

  return edges;
}

function createCellConstraints(puzzle: Puzzle, edgeIndexByKey: Map<EdgeKey, number>): CellConstraint[] {
  const constraints: CellConstraint[] = [];

  for (let row = 0; row < puzzle.size; row += 1) {
    for (let column = 0; column < puzzle.size; column += 1) {
      const clue = puzzle.clues[row]?.[column] ?? null;

      if (clue === null) {
        continue;
      }

      constraints.push({
        index: constraints.length,
        clue,
        edges: [
          getEdgeIndex(edgeIndexByKey, `h-${row}-${column}`),
          getEdgeIndex(edgeIndexByKey, `v-${row}-${column + 1}`),
          getEdgeIndex(edgeIndexByKey, `h-${row + 1}-${column}`),
          getEdgeIndex(edgeIndexByKey, `v-${row}-${column}`),
        ],
      });
    }
  }

  return constraints;
}

function createVertexConstraints(size: number, edgeIndexByKey: Map<EdgeKey, number>): VertexConstraint[] {
  const constraints: VertexConstraint[] = [];

  for (let row = 0; row <= size; row += 1) {
    for (let column = 0; column <= size; column += 1) {
      const edgeKeys: EdgeKey[] = [];

      if (column > 0) {
        edgeKeys.push(`h-${row}-${column - 1}`);
      }

      if (column < size) {
        edgeKeys.push(`h-${row}-${column}`);
      }

      if (row > 0) {
        edgeKeys.push(`v-${row - 1}-${column}`);
      }

      if (row < size) {
        edgeKeys.push(`v-${row}-${column}`);
      }

      constraints.push({
        index: constraints.length,
        edges: edgeKeys.map((edgeKey) => getEdgeIndex(edgeIndexByKey, edgeKey)),
      });
    }
  }

  return constraints;
}

function getEdgeIndex(edgeIndexByKey: Map<EdgeKey, number>, edgeKey: EdgeKey) {
  const edgeIndex = edgeIndexByKey.get(edgeKey);

  if (edgeIndex === undefined) {
    throw new Error(`Unknown edge key: ${edgeKey}`);
  }

  return edgeIndex;
}

function selectNextEdge(model: SolverModel) {
  let bestEdgeIndex = -1;
  let bestScore = Number.NEGATIVE_INFINITY;

  for (let edgeIndex = 0; edgeIndex < model.edgeStates.length; edgeIndex += 1) {
    if (model.edgeStates[edgeIndex] !== null) {
      continue;
    }

    const score = model.cellsByEdge[edgeIndex].length * 3 + model.verticesByEdge[edgeIndex].length;

    if (score > bestScore) {
      bestEdgeIndex = edgeIndex;
      bestScore = score;
    }
  }

  return bestEdgeIndex;
}

function assignEdge(model: SolverModel, edgeIndex: number, isLine: boolean) {
  model.edgeStates[edgeIndex] = isLine;

  model.cellsByEdge[edgeIndex].forEach((cell) => {
    model.cellUnknownCounts[cell.index] -= 1;

    if (isLine) {
      model.cellLineCounts[cell.index] += 1;
    }
  });

  model.verticesByEdge[edgeIndex].forEach((vertex) => {
    model.vertexUnknownCounts[vertex.index] -= 1;

    if (isLine) {
      model.vertexLineCounts[vertex.index] += 1;
    }
  });
}

function unassignEdge(model: SolverModel, edgeIndex: number, wasLine: boolean) {
  model.edgeStates[edgeIndex] = null;

  model.cellsByEdge[edgeIndex].forEach((cell) => {
    model.cellUnknownCounts[cell.index] += 1;

    if (wasLine) {
      model.cellLineCounts[cell.index] -= 1;
    }
  });

  model.verticesByEdge[edgeIndex].forEach((vertex) => {
    model.vertexUnknownCounts[vertex.index] += 1;

    if (wasLine) {
      model.vertexLineCounts[vertex.index] -= 1;
    }
  });
}

function isPartialStateValid(model: SolverModel) {
  for (let cellIndex = 0; cellIndex < model.cellConstraints.length; cellIndex += 1) {
    const clue = model.cellConstraints[cellIndex].clue;
    const lines = model.cellLineCounts[cellIndex];
    const unknown = model.cellUnknownCounts[cellIndex];

    if (lines > clue || lines + unknown < clue) {
      return false;
    }
  }

  for (let vertexIndex = 0; vertexIndex < model.vertexConstraints.length; vertexIndex += 1) {
    const lines = model.vertexLineCounts[vertexIndex];
    const unknown = model.vertexUnknownCounts[vertexIndex];

    if (lines > 2 || (lines === 1 && unknown === 0)) {
      return false;
    }
  }

  return true;
}

function isSolvedState(model: SolverModel) {
  for (let cellIndex = 0; cellIndex < model.cellConstraints.length; cellIndex += 1) {
    if (model.cellLineCounts[cellIndex] !== model.cellConstraints[cellIndex].clue) {
      return false;
    }
  }

  for (let vertexIndex = 0; vertexIndex < model.vertexConstraints.length; vertexIndex += 1) {
    const lines = model.vertexLineCounts[vertexIndex];

    if (lines !== 0 && lines !== 2) {
      return false;
    }
  }

  const lineEdges = new Set<EdgeKey>();

  model.edgeStates.forEach((edgeState, edgeIndex) => {
    if (edgeState === true) {
      lineEdges.add(model.edges[edgeIndex]);
    }
  });

  return isSingleLoop(model.size, lineEdges);
}

function createLoopAdjacency(size: number, edges: Set<EdgeKey>) {
  const adjacency = new Map<string, string[]>();

  for (const edge of edges) {
    const endpoints = getEdgeEndpoints(edge, size);

    if (endpoints === null) {
      return null;
    }

    const [startVertex, endVertex] = endpoints;
    adjacency.set(startVertex, [...(adjacency.get(startVertex) ?? []), endVertex]);
    adjacency.set(endVertex, [...(adjacency.get(endVertex) ?? []), startVertex]);
  }

  const invalidVertex = Array.from(adjacency.values()).find((connectedVertices) => connectedVertices.length !== 2);

  if (invalidVertex) {
    return null;
  }

  return adjacency;
}

function getEdgeEndpoints(edge: EdgeKey, size: number): [string, string] | null {
  const [orientation, rowValue, columnValue] = edge.split('-');
  const row = Number(rowValue);
  const column = Number(columnValue);

  if (!Number.isInteger(row) || !Number.isInteger(column)) {
    return null;
  }

  if (orientation === 'h' && row >= 0 && row <= size && column >= 0 && column < size) {
    return [`vertex-${row}-${column}`, `vertex-${row}-${column + 1}`];
  }

  if (orientation === 'v' && row >= 0 && row < size && column >= 0 && column <= size) {
    return [`vertex-${row}-${column}`, `vertex-${row + 1}-${column}`];
  }

  return null;
}
