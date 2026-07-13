import type { Board } from '../Board';
import { EdgeState, type VertexValidation } from '../types';

export class VertexValidator {
  validate(board: Board) {
    return board.getVertices().reduce<Record<string, VertexValidation>>((result, vertex) => {
      const degree = vertex.connectedEdges.reduce((count, edgeId) => {
        const edge = board.getEdge(edgeId);
        return edge?.state === EdgeState.Line ? count + 1 : count;
      }, 0);

      result[vertex.id] = {
        vertexId: vertex.id,
        degree,
        status: this.getStatusForDegree(degree),
      };

      return result;
    }, {});
  }

  private getStatusForDegree(degree: number): VertexValidation['status'] {
    if (degree === 1) {
      return 'Dead End';
    }

    if (degree === 3) {
      return 'Branch';
    }

    if (degree >= 4) {
      return 'Invalid';
    }

    return 'Valid';
  }
}
