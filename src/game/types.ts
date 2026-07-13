export type VertexId = string;
export type EdgeId = string;
export type CellId = string;

export type Position = {
  row: number;
  column: number;
};

export type EdgeOrientation = 'horizontal' | 'vertical';

export enum EdgeState {
  Empty = 'EMPTY',
  Line = 'LINE',
  Cross = 'CROSS',
}

export type CellValidationStatus = 'Satisfied' | 'Incomplete' | 'Exceeded';

export type CellValidation = {
  cellId: CellId;
  clue: number | null;
  lineCount: number;
  status: CellValidationStatus;
};

export type VertexValidationStatus = 'Valid' | 'Dead End' | 'Branch' | 'Invalid';

export type VertexValidation = {
  vertexId: VertexId;
  degree: number;
  status: VertexValidationStatus;
};

export type LoopValidation = {
  isSingleLoop: boolean;
  message: string;
};

export type CompletionValidation = {
  isComplete: boolean;
  areCluesSatisfied: boolean;
  isLoopComplete: boolean;
};

export type ValidationResult = {
  cells: Record<CellId, CellValidation>;
  vertices: Record<VertexId, VertexValidation>;
  loop: LoopValidation;
  completion: CompletionValidation;
  warnings: string[];
};

export type GameState = {
  board: import('./Board').Board;
  validationResult: ValidationResult;
};
