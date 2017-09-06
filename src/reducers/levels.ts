import { Level } from '../models/level';
import * as levels from '../actions/levels';

export interface State {
  levels: Level[];
};

export const initialState: State = {
  levels: []
};

export function reducer(state = initialState, action: levels.Actions): State {
  switch (action.type) {

    case levels.LOAD: {
      return state;
    }

    case levels.LOAD_COMPLETE: {
      return Object.assign({}, state, {
        levels: action.payload.levels
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

export const getAll = (state: State) => state.levels;
