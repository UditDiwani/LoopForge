import type { Board } from '../Board';
import type { ValidationResult } from '../types';
import { CellValidator } from './CellValidator';
import { CompletionValidator } from './CompletionValidator';
import { LoopValidator } from './LoopValidator';
import { VertexValidator } from './VertexValidator';

export class ValidationEngine {
  private readonly cellValidator: CellValidator;
  private readonly vertexValidator: VertexValidator;
  private readonly loopValidator: LoopValidator;
  private readonly completionValidator: CompletionValidator;

  constructor(
    cellValidator = new CellValidator(),
    vertexValidator = new VertexValidator(),
    loopValidator = new LoopValidator(),
    completionValidator = new CompletionValidator(),
  ) {
    this.cellValidator = cellValidator;
    this.vertexValidator = vertexValidator;
    this.loopValidator = loopValidator;
    this.completionValidator = completionValidator;
  }

  validate(board: Board): ValidationResult {
    const cells = this.cellValidator.validate(board);
    const vertices = this.vertexValidator.validate(board);
    const loop = this.loopValidator.validate(board);
    const completion = this.completionValidator.validate(cells, loop);

    return {
      cells,
      vertices,
      loop,
      completion,
      warnings: this.createWarnings(vertices),
    };
  }

  private createWarnings(vertices: ValidationResult['vertices']) {
    return Object.values(vertices)
      .filter((vertex) => vertex.status !== 'Valid')
      .map((vertex) => `${vertex.vertexId}: ${vertex.status}`);
  }
}
