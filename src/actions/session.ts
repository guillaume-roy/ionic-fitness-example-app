import { Action } from '@ngrx/store';
import { Level } from '../models/level';

export const START = '[Session] START';
export const STARTED = '[Session] STARTED';
export const COMPLETE = '[Session] COMPLETE';
export const SAVE = '[Session] SAVE';
export const SAVED = '[Session] SAVED';
export const CLEAR = '[Session] CLEAR';

export const SAVE_RESULT = '[Session] SAVE_RESULT';
export const INCREMENT_RESULT = '[Session] INCREMENT_RESULT';
export const DECREMENT_RESULT = '[Session] DECREMENT_RESULT';

export const START_REST = '[Session] START_REST';
export const DECREMENT_REST = '[Session] DECREMENT_REST';
export const COMPLETE_REST = '[Session] COMPLETE_REST';

export const NEXT_SERIE = '[Session] NEXT_SERIE';
export const VALIDATE_SERIE = '[Session] VALIDATE_SERIE';

export const NEXT_SIDE = '[Session] NEXT_SIDE';

export const NEXT_EXERCISE = '[Session] NEXT_EXERCISE';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class StartAction implements Action {
  readonly type = START;

  constructor() { }
}

export class StartedAction implements Action {
  readonly type = STARTED;

  constructor(public payload: { level: Level, userID: string }) { }
}

export class CompleteAction implements Action {
  readonly type = COMPLETE;

  constructor() { }
}

export class SaveAction implements Action {
  readonly type = SAVE;

  constructor() { }
}

export class SavedAction implements Action {
  readonly type = SAVED;

  constructor() { }
}

export class ClearAction implements Action {
  readonly type = CLEAR;

  constructor() { }
}

export class SaveResultAction implements Action {
  readonly type = SAVE_RESULT;

  constructor() { }
}

export class IncrementResultAction implements Action {
  readonly type = INCREMENT_RESULT;

  constructor() { }
}

export class DecrementResultAction implements Action {
  readonly type = DECREMENT_RESULT;

  constructor() { }
}

export class StartRestAction implements Action {
  readonly type = START_REST;

  constructor(public payload: { restTime: number }) { }
}

export class DecrementRestAction implements Action {
  readonly type = DECREMENT_REST;

  constructor() { }
}

export class CompleteRestAction implements Action {
  readonly type = COMPLETE_REST;

  constructor() { }
}

export class NextSerieAction implements Action {
  readonly type = NEXT_SERIE;

  constructor() { }
}

export class ValidateSerieAction implements Action {
  readonly type = VALIDATE_SERIE;

  constructor() { }
}

export class NextExerciseAction implements Action {
  readonly type = NEXT_EXERCISE;

  constructor() { }
}

export class NextSideAction implements Action {
  readonly type = NEXT_SIDE;

  constructor() { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = StartAction
  | StartedAction
  | SaveAction
  | SavedAction
  | CompleteAction
  | ClearAction
  | SaveResultAction
  | IncrementResultAction
  | DecrementResultAction
  | StartRestAction
  | DecrementRestAction
  | CompleteRestAction
  | NextSerieAction
  | ValidateSerieAction
  | NextExerciseAction
  | NextSideAction;
