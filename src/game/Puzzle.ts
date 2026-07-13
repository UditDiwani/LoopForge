export type PuzzleClue = number | null;

export type Puzzle = {
  id: string;
  name: string;
  size: number;
  clues: PuzzleClue[][];
};
