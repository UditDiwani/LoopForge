import { Cell } from './Cell';
import { Edge } from './Edge';
import type { Puzzle } from './Puzzle';
import { Vertex } from './Vertex';
import { EdgeState, type CellId, type EdgeId, type VertexId } from './types';

export class Board {
  readonly puzzle: Puzzle;
  readonly size: number;
  private readonly vertices: Map<VertexId, Vertex>;
  private readonly edges: Map<EdgeId, Edge>;
  private readonly cells: Map<CellId, Cell>;

  constructor(puzzle: Puzzle) {
    this.puzzle = puzzle;
    this.size = puzzle.size;
    this.vertices = new Map();
    this.edges = new Map();
    this.cells = new Map();

    this.buildVertices();
    this.buildEdges();
    this.buildCells();
  }

  getVertices() {
    return Array.from(this.vertices.values());
  }

  getEdges() {
    return Array.from(this.edges.values());
  }

  getCells() {
    return Array.from(this.cells.values());
  }

  getVertex(vertexId: VertexId) {
    return this.vertices.get(vertexId);
  }

  getEdge(edgeId: EdgeId) {
    return this.edges.get(edgeId);
  }

  getCell(cellId: CellId) {
    return this.cells.get(cellId);
  }

  getCellEdges(cell: Cell) {
    return [cell.topEdge, cell.rightEdge, cell.bottomEdge, cell.leftEdge]
      .map((edgeId) => this.getEdge(edgeId))
      .filter((edge): edge is Edge => edge !== undefined);
  }

  toggleEdgeState(edgeId: EdgeId) {
    const edge = this.edges.get(edgeId);

    if (!edge) {
      return;
    }

    edge.state = this.getNextEdgeState(edge.state);
  }

  private buildVertices() {
    for (let row = 0; row <= this.size; row += 1) {
      for (let column = 0; column <= this.size; column += 1) {
        const vertexId = this.createVertexId(row, column);
        this.vertices.set(vertexId, new Vertex(vertexId, { row, column }));
      }
    }
  }

  private buildEdges() {
    for (let row = 0; row <= this.size; row += 1) {
      for (let column = 0; column < this.size; column += 1) {
        this.addEdge(
          this.createHorizontalEdgeId(row, column),
          this.createVertexId(row, column),
          this.createVertexId(row, column + 1),
          'horizontal',
        );
      }
    }

    for (let row = 0; row < this.size; row += 1) {
      for (let column = 0; column <= this.size; column += 1) {
        this.addEdge(
          this.createVerticalEdgeId(row, column),
          this.createVertexId(row, column),
          this.createVertexId(row + 1, column),
          'vertical',
        );
      }
    }
  }

  private buildCells() {
    for (let row = 0; row < this.size; row += 1) {
      for (let column = 0; column < this.size; column += 1) {
        const cellId = this.createCellId(row, column);
        const clue = this.puzzle.clues[row]?.[column] ?? null;

        this.cells.set(
          cellId,
          new Cell(
            cellId,
            clue,
            this.createHorizontalEdgeId(row, column),
            this.createVerticalEdgeId(row, column + 1),
            this.createHorizontalEdgeId(row + 1, column),
            this.createVerticalEdgeId(row, column),
          ),
        );
      }
    }
  }

  private addEdge(edgeId: EdgeId, startVertex: VertexId, endVertex: VertexId, orientation: 'horizontal' | 'vertical') {
    this.edges.set(edgeId, new Edge(edgeId, startVertex, endVertex, orientation));
    this.vertices.get(startVertex)?.addConnectedEdge(edgeId);
    this.vertices.get(endVertex)?.addConnectedEdge(edgeId);
  }

  private getNextEdgeState(state: EdgeState) {
    if (state === EdgeState.Empty) {
      return EdgeState.Line;
    }

    if (state === EdgeState.Line) {
      return EdgeState.Cross;
    }

    return EdgeState.Empty;
  }

  private createVertexId(row: number, column: number) {
    return `vertex-${row}-${column}`;
  }

  private createHorizontalEdgeId(row: number, column: number) {
    return `h-${row}-${column}`;
  }

  private createVerticalEdgeId(row: number, column: number) {
    return `v-${row}-${column}`;
  }

  private createCellId(row: number, column: number) {
    return `cell-${row}-${column}`;
  }
}
