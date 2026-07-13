import type { CellId, EdgeId } from './types';

export class Cell {
  readonly id: CellId;
  readonly clue: number | null;
  readonly topEdge: EdgeId;
  readonly rightEdge: EdgeId;
  readonly bottomEdge: EdgeId;
  readonly leftEdge: EdgeId;

  constructor(
    id: CellId,
    clue: number | null,
    topEdge: EdgeId,
    rightEdge: EdgeId,
    bottomEdge: EdgeId,
    leftEdge: EdgeId,
  ) {
    this.id = id;
    this.clue = clue;
    this.topEdge = topEdge;
    this.rightEdge = rightEdge;
    this.bottomEdge = bottomEdge;
    this.leftEdge = leftEdge;
  }
}
