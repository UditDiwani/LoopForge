import type { CellValidation, CompletionValidation, LoopValidation } from '../types';

export class CompletionValidator {
  validate(cells: Record<string, CellValidation>, loop: LoopValidation): CompletionValidation {
    const areCluesSatisfied = Object.values(cells).every((cell) => cell.status === 'Satisfied');

    return {
      isComplete: areCluesSatisfied && loop.isSingleLoop,
      areCluesSatisfied,
      isLoopComplete: loop.isSingleLoop,
    };
  }
}
