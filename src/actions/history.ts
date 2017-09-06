import { Action } from '@ngrx/store';
import { Session } from '../models/session';

export const LOAD = '[History] LOAD';
export const LOAD_COMPLETE = '[History] LOAD_COMPLETE';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LoadAction implements Action {
  readonly type = LOAD;

  constructor() { }
}

export class LoadCompleteAction implements Action {
  readonly type = LOAD_COMPLETE;

  constructor(public payload: { sessions: Session[] }) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoadAction
  | LoadCompleteAction;
