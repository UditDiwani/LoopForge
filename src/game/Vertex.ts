import type { EdgeId, Position, VertexId } from './types';

export class Vertex {
  readonly id: VertexId;
  readonly position: Position;
  readonly connectedEdges: EdgeId[];

  constructor(id: VertexId, position: Position, connectedEdges: EdgeId[] = []) {
    this.id = id;
    this.position = position;
    this.connectedEdges = connectedEdges;
  }

  addConnectedEdge(edgeId: EdgeId) {
    this.connectedEdges.push(edgeId);
  }
}
