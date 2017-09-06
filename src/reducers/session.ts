import { Session } from '../models/session';
import { Exercise } from '../models/exercise';
import * as session from '../actions/session';
import * as _ from 'lodash';

export interface State {
  current: Session;

  serieIndex: number;
  serieResult: number;
  isFirstSide: boolean;

  exercise: Exercise;
  exerciseIndex: number;

  isRest: boolean;
  isFinished: boolean;

  restTime: number;
};

export const initialState: State = {
  current: null,
  serieIndex: null,
  serieResult: null,
  isFirstSide: null,
  exercise: null,
  exerciseIndex: null,
  isRest: false,
  isFinished: false,
  restTime: null
};

export function reducer(state = initialState, action: session.Actions): State {
  switch (action.type) {
    case session.START: {
      return state;
    }

    case session.STARTED: {
      const selectedExercises = _.flatten(action.payload.level.exercises.map(x => x.filter(e => e.isSelected))) as Exercise[];
      return Object.assign({}, state, <State>{
        current: {
          startDate: new Date().toJSON(),
          code: action.payload.level.code,
          title: action.payload.level.title,
          exercises: selectedExercises,
          userID: action.payload.userID,
          inverseStartDate: Number.MAX_SAFE_INTEGER - Date.now()
        },
        exercise: selectedExercises[0],
        isRest: false,
        isFinished: false,
        restTime: null,
        exerciseIndex: 0,
        serieIndex: 0,
        serieResult: 0,
        isFirstSide: true
      });
    }

    case session.COMPLETE: {
      return Object.assign({}, state, <State>{
        current: Object.assign({}, state.current, <Session>{
          endDate: new Date().toJSON()
        }),
        isFinished: true,
        restTime: null,
        isRest: false
      });
    }

    case session.SAVE: {
      return state;
    }

    case session.CLEAR: {
      return initialState;
    }

    case session.SAVE_RESULT: {
      const newState = Object.assign({}, state.current);
      if (state.exercise.isLeftRight) {
        if(state.isFirstSide) {
          newState.exercises[state.exerciseIndex].leftRightResult = [...newState.exercises[state.exerciseIndex].leftRightResult, ...[{ right: state.serieResult, left: 0 }]];
        } else {
          newState.exercises[state.exerciseIndex].leftRightResult[state.serieIndex].left = state.serieResult;
        }
      } else {
        newState.exercises[state.exerciseIndex].result = [...newState.exercises[state.exerciseIndex].result, ...[state.serieResult]];
      }

      return Object.assign({}, state, <State>{
        current: newState,
        serieResult: 0
      });
    }

    case session.INCREMENT_RESULT: {
      return Object.assign({}, state, {
        serieResult: state.serieResult + 1
      });
    }

    case session.DECREMENT_RESULT: {
      return Object.assign({}, state, {
        serieResult: state.serieResult - 1
      });
    }

    case session.START_REST: {
      return Object.assign({}, state, {
        restTime: action.payload.restTime,
        isRest: true
      });
    }

    case session.DECREMENT_REST: {
      return Object.assign({}, state, {
        restTime: state.restTime - 1,
        isRest: true
      });
    }

    case session.COMPLETE_REST: {
      return Object.assign({}, state, {
        restTime: null,
        isRest: false
      });
    }

    case session.NEXT_SERIE: {
      return Object.assign({}, state, <State>{
        serieIndex: state.serieIndex + 1
      });
    }

    case session.NEXT_SIDE: {
      return Object.assign({}, state, <State>{
        serieIndex: 0,
        isFirstSide: false
      });
    }

    case session.NEXT_EXERCISE: {
      return Object.assign({}, state, <State>{
        serieIndex: 0,
        exerciseIndex: state.exerciseIndex + 1,
        exercise: state.current.exercises[state.exerciseIndex + 1],
        isFirstSide: true
      });
    }

    case session.VALIDATE_SERIE: {
      return state;
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

export const getSessionCurrent = (state: State) => state.current;
export const getExercise = (state: State) => state.exercise;
export const getRestTime = (state: State) => state.restTime;
export const getIsLastSerie = (state: State) => state.serieIndex >= 0 && state.exercise && state.serieIndex + 1 >= state.exercise.series;
export const getIsFirstSideSerie = (state: State) => state.exercise && state.exercise.isLeftRight && state.isFirstSide;
export const getIsLastExercise = (state: State) => state.exerciseIndex >= 0 && state.current && state.current.exercises && state.exerciseIndex + 1 >= state.current.exercises.length;
