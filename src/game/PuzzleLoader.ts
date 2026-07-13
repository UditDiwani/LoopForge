import { Board } from './Board';
import type { Puzzle } from './Puzzle';

export class PuzzleLoader {
  static loadPuzzle(puzzle: Puzzle) {
    return new Board(puzzle);
  }

  static loadPracticePuzzle() {
    return this.loadPuzzle(this.createPracticePuzzle());
  }

  static loadEngineSamplePuzzle() {
    return this.loadPuzzle(this.createEngineSamplePuzzle());
  }

  static createEngineSamplePuzzle(): Puzzle {
    return {
      id: 'engine-sample-outer-loop-4x4',
      name: 'Engine Sample 4 x 4',
      size: 4,
      clues: [
        [2, 1, 1, 2],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [2, 1, 1, 2],
      ],
    };
  }

  static createPracticePuzzle(): Puzzle {
    const size = 7;

    return {
      id: 'practice-7x7',
      name: 'Moonlit 7 x 7 practice grid',
      size,
      clues: Array.from({ length: size }, (_, row) =>
        Array.from({ length: size }, (_, column) => {
          const cellIndex = row * size + column;
          return cellIndex % 3 === 0 ? (cellIndex % 4) + 1 : null;
        }),
      ),
    };
  }
}
