import type { Either } from 'fp-ts/lib/Either';

export type OperationResult = Either<Error, null>;
