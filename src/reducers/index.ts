import { createSelector } from 'reselect';
import * as fromApp from './app';
import * as fromHistory from './history';
import * as fromLevel from './level';
import * as fromLevels from './levels';
import * as fromSession from './session';
import * as fromUser from './user';

export interface State {
  app: fromApp.State;
  history: fromHistory.State;
  level: fromLevel.State;
  levels: fromLevels.State;
  session: fromSession.State;
  user: fromUser.State;
}

export const reducers = {
  app: fromApp.reducer,
  history: fromHistory.reducer,
  level: fromLevel.reducer,
  levels: fromLevels.reducer,
  session: fromSession.reducer,
  user: fromUser.reducer
};

export const getUserState = (state: State) => state.user;
export const getUser = createSelector(getUserState, fromUser.getUser);
export const getUserIsAuthenticated = createSelector(getUserState, fromUser.getIsAuthenticated);
export const getUserIsTest = createSelector(getUserState, fromUser.getIsTest);

export const getHistoryState = (state: State) => state.history;
export const getHistorySessions = createSelector(getHistoryState, fromHistory.getAll);

export const getLevelState = (state: State) => state.level;
export const getLevel = createSelector(getLevelState, fromLevel.getLevel);

export const getLevelsState = (state: State) => state.levels;
export const getLevels = createSelector(getLevelsState, fromLevels.getAll);

export const getAppState = (state: State) => state.app;
export const getAppIsBusy = createSelector(getAppState, fromApp.getIsBusy);
export const getAppError = createSelector(getAppState, fromApp.getError);

export const getSessionState = (state: State) => state.session;
export const getSessionCurrent = createSelector(getSessionState, fromSession.getSessionCurrent);
export const getSessionIsLastSerie = createSelector(getSessionState, fromSession.getIsLastSerie);
export const getSessionIsFirstSideSerie = createSelector(getSessionState, fromSession.getIsFirstSideSerie);
export const getSessionIsLastExercise = createSelector(getSessionState, fromSession.getIsLastExercise);
export const getSessionRestTime = createSelector(getSessionState, fromSession.getRestTime);
export const getSessionExercise = createSelector(getSessionState, fromSession.getExercise);
