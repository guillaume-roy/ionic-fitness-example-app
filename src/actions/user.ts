import { Action } from '@ngrx/store';
import { User } from '../models/user';

export const LOAD = '[User] LOAD';
export const LOAD_COMPLETE = '[User] LOAD_COMPLETE';
export const LOGOUT = '[User] LOGOUT';

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

  constructor(public payload: { user: User }) { }
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;

  constructor() { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoadAction
  | LoadCompleteAction
  | LogoutAction;
