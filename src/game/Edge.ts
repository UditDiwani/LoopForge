import { EdgeState, type EdgeId, type EdgeOrientation, type VertexId } from './types';

export class Edge {
  readonly id: EdgeId;
  readonly startVertex: VertexId;
  readonly endVertex: VertexId;
  readonly orientation: EdgeOrientation;
  state: EdgeState;

  constructor(id: EdgeId, startVertex: VertexId, endVertex: VertexId, orientation: EdgeOrientation) {
    this.id = id;
    this.startVertex = startVertex;
    this.endVertex = endVertex;
    this.orientation = orientation;
    this.state = EdgeState.Empty;
  }
}
