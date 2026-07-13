import type { Board } from '../Board';
import { EdgeState } from '../types';
import type { LoopValidation } from '../types';

export class LoopValidator {
  validate(board: Board): LoopValidation {
    const lineEdges = board.getEdges().filter((edge) => edge.state === EdgeState.Line);

    if (lineEdges.length === 0) {
      return {
        isSingleLoop: false,
        message: 'No loop has been drawn yet.',
      };
    }

    const adjacency = new Map<string, string[]>();

    lineEdges.forEach((edge) => {
      adjacency.set(edge.startVertex, [...(adjacency.get(edge.startVertex) ?? []), edge.endVertex]);
      adjacency.set(edge.endVertex, [...(adjacency.get(edge.endVertex) ?? []), edge.startVertex]);
    });

    const invalidVertex = Array.from(adjacency.entries()).find(([, connectedVertices]) => connectedVertices.length !== 2);

    if (invalidVertex) {
      return {
        isSingleLoop: false,
        message: 'Line path is not a closed loop.',
      };
    }

    const startVertex = adjacency.keys().next().value as string | undefined;

    if (!startVertex) {
      return {
        isSingleLoop: false,
        message: 'No loop has been drawn yet.',
      };
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

    const isSingleLoop = visited.size === adjacency.size;

    return {
      isSingleLoop,
      message: isSingleLoop ? 'Single loop complete.' : 'Multiple disconnected loops detected.',
    };
  }
}
