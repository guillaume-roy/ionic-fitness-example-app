import { User } from '../models/user';
import * as user from '../actions/user';
import * as _ from 'lodash';

export interface State {
  current: User;
  isAuthenticated: boolean;
};

export const initialState: State = {
  current: null,
  isAuthenticated: false
};

export function reducer(state = initialState, action: user.Actions): State {
  switch (action.type) {

    case user.LOAD: {
      return state;
    }

    case user.LOAD_COMPLETE: {
      return Object.assign({}, state, {
        current: action.payload.user,
        isAuthenticated: !_.isEmpty(action.payload.user)
      });
    }

    case user.LOGOUT: {
      return initialState;
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

export const getUser = (state: State) => state.current;
export const getIsAuthenticated = (state: State) => state.isAuthenticated;
export const getIsTest = (state: State) => state.current && state.current.role === 'test';
