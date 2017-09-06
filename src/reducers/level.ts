import { Level } from '../models/level';
import * as level from '../actions/level';

export interface State {
  current: Level;
};

export const initialState: State = {
  current: null
};

export function reducer(state = initialState, action: level.Actions): State {
  switch (action.type) {

    case level.LOAD: {
      return Object.assign({}, state, {
        current: action.payload.level
      });
    }

    case level.CLEAR: {
      return initialState;
    }

    case level.SELECT_EXERCISE_VARIATION: {
      const levelExercises = state.current.exercises.splice(0);
      const levelExercise = levelExercises[action.payload.exercisesIndex];
      for (let i = 0; i < levelExercise.length; i++) {
        let exercise = levelExercise[i];
        exercise.isSelected = i === action.payload.selectedExerciseIndex;
      }
      return Object.assign({}, state, {
        current: Object.assign({}, state.current, {
          exercises: levelExercises
        })
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

export const getLevel = (state: State) => state.current;
