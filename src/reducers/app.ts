import * as app from '../actions/app';

export interface State {
  isBusy: boolean;
  error: {
    message: string;
  }
};

export const initialState: State = {
  isBusy: false,
  error: {
    message: null
  }
};

export function reducer(state = initialState, action: app.Actions): State {
  switch (action.type) {

    case app.IS_BUSY: {
      return Object.assign({}, state, {
        isBusy: action.payload.isBusy
      });
    }

    case app.HAS_ERROR: {
      return Object.assign({}, state, {
        error: {
          message: action.payload.message
        }
      });
    }

    case app.CLEAR_ERROR: {
      return Object.assign({}, state, {
        error: {
          message: null
        }
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

export const getIsBusy = (state: State) => state.isBusy;
export const getError = (state: State) => state.error;
