import { Session } from '../models/session';
import * as history from '../actions/history';

export interface State {
  sessions: Session[];
};

export const initialState: State = {
  sessions: []
};

export function reducer(state = initialState, action: history.Actions): State {
  switch (action.type) {

    case history.LOAD: {
      return state;
    }

    case history.LOAD_COMPLETE: {
      return Object.assign({}, state, {
        sessions: action.payload.sessions
      });
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getAll = (state: State) => state.sessions;
