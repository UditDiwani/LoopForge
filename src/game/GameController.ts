import type { Board } from './Board';
import { EdgeState, type EdgeId, type GameState } from './types';
import { ValidationEngine } from './validation/ValidationEngine';

export class GameController {
  private readonly board: Board;
  private readonly validationEngine: ValidationEngine;
  private gameState: GameState;

  constructor(board: Board, validationEngine = new ValidationEngine()) {
    this.board = board;
    this.validationEngine = validationEngine;
    this.gameState = this.createGameState();
  }

  getGameState() {
    return this.gameState;
  }

  toggleEdge(edgeId: EdgeId) {
    this.board.toggleEdgeState(edgeId);
    this.gameState = this.createGameState();

    return this.gameState;
  }

  setEdge(edgeId: EdgeId, state: EdgeState) {
    this.board.setEdgeState(edgeId, state);
    this.gameState = this.createGameState();

    return this.gameState;
  }

  private createGameState(): GameState {
    return {
      board: this.board,
      validationResult: this.validationEngine.validate(this.board),
    };
  }
}
