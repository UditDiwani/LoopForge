import type { Puzzle, PuzzleClue } from '../Puzzle';
import { isSingleLoop, PuzzleSolver, type EdgeKey, type SolutionCounter } from './PuzzleSolver';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type GeneratorOptions = {
  size: number;
  difficulty: Difficulty;
  seed?: number;
};

export type GeneratedSolution = {
  lineEdges: Set<EdgeKey>;
};

export class PuzzleGenerator {
  constructor(private readonly solver: SolutionCounter = new PuzzleSolver()) {}

  generate(options: GeneratorOptions): Puzzle {
    validateOptions(options);

    const generatedAt = Date.now();
    const seed = options.seed ?? generatedAt;
    const rng = createRng(seed);
    const solution = this.generateSingleLoop(options.size, rng);
    const fullClues = this.deriveClues(options.size, solution.lineEdges);
    const playableClues = this.removeCluesWhileUnique(fullClues, options, rng);

    return {
      id: `generated-${options.size}x${options.size}-${options.difficulty}-${seed}`,
      name: `Generated ${options.size} x ${options.size}`,
      size: options.size,
      clues: playableClues,
    };
  }

  generateSingleLoop(size: number, rng: () => number = Math.random): GeneratedSolution {
    if (size < 2) {
      throw new Error('Generated Slitherlink puzzles require a size of at least 2.');
    }

    const lineEdges = new Set<EdgeKey>();
    const top = randomInteger(0, size - 2, rng);
    const left = randomInteger(0, size - 2, rng);
    const bottom = randomInteger(top + 2, size, rng);
    const right = randomInteger(left + 2, size, rng);

    for (let column = left; column < right; column += 1) {
      lineEdges.add(`h-${top}-${column}`);
      lineEdges.add(`h-${bottom}-${column}`);
    }

    for (let row = top; row < bottom; row += 1) {
      lineEdges.add(`v-${row}-${left}`);
      lineEdges.add(`v-${row}-${right}`);
    }

    if (!isSingleLoop(size, lineEdges)) {
      throw new Error('Generated loop failed the single-loop invariant.');
    }

    return { lineEdges };
  }

  deriveClues(size: number, lineEdges: Set<EdgeKey>): PuzzleClue[][] {
    return Array.from({ length: size }, (_, row) =>
      Array.from({ length: size }, (_, column) => {
        const count = [
          `h-${row}-${column}`,
          `v-${row}-${column + 1}`,
          `h-${row + 1}-${column}`,
          `v-${row}-${column}`,
        ].filter((edge) => lineEdges.has(edge as EdgeKey)).length;

        return count;
      }),
    );
  }

  removeCluesWhileUnique(clues: PuzzleClue[][], options: GeneratorOptions, rng: () => number = Math.random) {
    const targetKeepRatio = {
      easy: 0.58,
      medium: 0.43,
      hard: 0.32,
    }[options.difficulty];

    const result = clues.map((row) => [...row]);
    const positions = shuffle(
      clues.flatMap((row, rowIndex) => row.map((_, columnIndex) => [rowIndex, columnIndex] as const)),
      rng,
    );
    const minimumClues = Math.ceil(options.size * options.size * targetKeepRatio);

    for (const [row, column] of positions) {
      if (countVisibleClues(result) <= minimumClues) {
        break;
      }

      const previous = result[row][column];
      result[row][column] = null;

      const candidate: Puzzle = {
        id: 'candidate',
        name: 'Candidate',
        size: options.size,
        clues: result,
      };

      if (this.solver.countSolutions(candidate, 2) !== 1) {
        result[row][column] = previous;
      }
    }

    return result;
  }
}

export function countVisibleClues(clues: PuzzleClue[][]) {
  return clues.flat().filter((clue) => clue !== null).length;
}

export function createRng(seed: number) {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function validateOptions(options: GeneratorOptions) {
  if (!Number.isInteger(options.size) || options.size < 2) {
    throw new Error('Puzzle size must be an integer greater than or equal to 2.');
  }
}

function randomInteger(minimum: number, maximum: number, rng: () => number) {
  return minimum + Math.floor(rng() * (maximum - minimum + 1));
}

function shuffle<T>(items: T[], rng: () => number) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(rng() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}
