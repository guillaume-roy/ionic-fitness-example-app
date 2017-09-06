import { Action } from '@ngrx/store';
import { Level } from '../models/level';

export const LOAD = '[Level] LOAD';
export const CLEAR = '[Level] CLEAR';
export const SELECT_EXERCISE_VARIATION = '[Level] SELECT_EXERCISE_VARIATION';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: { level: Level }) { }
}

export class ClearAction implements Action {
  readonly type = CLEAR;

  constructor() { }
}

export class SelectExerciseVariationAction implements Action {
  readonly type = SELECT_EXERCISE_VARIATION;

  constructor(public payload: { exercisesIndex: number, selectedExerciseIndex: number }) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoadAction
  | ClearAction
  | SelectExerciseVariationAction;
