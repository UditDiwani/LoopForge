import type { Board } from '../Board';
import { EdgeState, type CellValidation } from '../types';

export class CellValidator {
  validate(board: Board) {
    return board.getCells().reduce<Record<string, CellValidation>>((result, cell) => {
      const lineCount = board.getCellEdges(cell).filter((edge) => edge.state === EdgeState.Line).length;
      let status: CellValidation['status'] = 'Satisfied';

      if (cell.clue !== null) {
        if (lineCount > cell.clue) {
          status = 'Exceeded';
        } else if (lineCount < cell.clue) {
          status = 'Incomplete';
        }
      }

      result[cell.id] = {
        cellId: cell.id,
        clue: cell.clue,
        lineCount,
        status,
      };

      return result;
    }, {});
  }
}
