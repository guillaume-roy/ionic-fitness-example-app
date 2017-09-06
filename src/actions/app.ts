import { Action } from '@ngrx/store';

export const IS_BUSY = '[App] IS_BUSY';
export const HAS_ERROR = '[App] HAS_ERROR';
export const CLEAR_ERROR = '[App] CLEAR_ERROR';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class IsBusyAction implements Action {
  readonly type = IS_BUSY;

  constructor(public payload: { isBusy: boolean }) { }
}

export class HasErrorAction implements Action {
  readonly type = HAS_ERROR;

  constructor(public payload: { message: string }) { }
}

export class ClearErrorAction implements Action {
  readonly type = CLEAR_ERROR;

  constructor() { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = IsBusyAction
  | HasErrorAction
  | ClearErrorAction;
