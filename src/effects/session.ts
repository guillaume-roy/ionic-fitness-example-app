import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as sessions from '../actions/session';
import * as app from '../actions/app';
import {
  State,
  getUser,
  getUserIsTest,
  getLevel,
  getSessionExercise,
  getSessionIsLastSerie,
  getSessionRestTime,
  getSessionIsLastExercise,
  getSessionCurrent,
  getSessionIsFirstSideSerie
} from '../reducers';
import { Store } from '@ngrx/store';
import { SessionsService } from '../services/sessions.service';
import { Observable } from 'rxjs/Observable';
import { Vibration } from '@ionic-native/vibration';

@Injectable()
export class SessionEffects {
  leftRightRestTime = 120;
  testRestTime = 3;

  constructor(private actions$: Actions, private store: Store<State>, private sessionsService: SessionsService, private vibration: Vibration) { }

  @Effect()
  startSession$ = this.actions$
    .ofType(sessions.START)
    .withLatestFrom(this.store.select(getUser), this.store.select(getLevel))
    .map(infos => new sessions.StartedAction({ level: infos[2], userID: infos[1].uid }));

  @Effect()
  validateSerie$ = this.actions$
    .ofType(sessions.VALIDATE_SERIE)
    .mapTo(new sessions.SaveResultAction());

  @Effect()
  saveResult$ = this.actions$
    .ofType(sessions.SAVE_RESULT)
    .withLatestFrom(
    this.store.select(getSessionExercise),
    this.store.select(getSessionIsLastSerie),
    this.store.select(getSessionIsLastExercise),
    this.store.select(getSessionIsFirstSideSerie),
    this.store.select(getUserIsTest))
    .map(session => session[3] && session[2]
      ? new sessions.CompleteAction()
      : new sessions.StartRestAction({
        restTime:
        session[5]
          ? this.testRestTime
          : (session[2]
            ? (session[4]
              ? this.leftRightRestTime
              : session[1].finalRest)
            : session[1].seriesRest)
      }));

  @Effect()
  startRest$ = this.actions$
    .ofType(sessions.START_REST)
    .switchMap(() => Observable.timer(1000))
    .mapTo(new sessions.DecrementRestAction());

  @Effect()
  decrementRest$ = this.actions$
    .ofType(sessions.DECREMENT_REST)
    .switchMap(() => Observable.timer(1000))
    .withLatestFrom(this.store.select(getSessionRestTime))
    .map(restTime => restTime[1] > 0 ? new sessions.DecrementRestAction() : new sessions.CompleteRestAction());

  @Effect()
  completeRest$ = this.actions$
    .ofType(sessions.COMPLETE_REST)
    .withLatestFrom(this.store.select(getSessionIsLastSerie), this.store.select(getSessionIsFirstSideSerie))
    .do(() => this.vibration.vibrate([500, 300, 500]))
    .map(lastSerie => lastSerie[1]
      ? lastSerie[2] ? new sessions.NextSideAction() : new sessions.NextExerciseAction()
      : new sessions.NextSerieAction());

  @Effect()
  saveSession$ = this.actions$
    .ofType(sessions.SAVE)
    .withLatestFrom(this.store.select(getSessionCurrent))
    .do(session => this.sessionsService.storeSession(session[1]))
    .switchMap(session => this.sessionsService.pushSession(session[1]).catch(err => new app.HasErrorAction({ message: err.message })))
    .mapTo(new sessions.SavedAction());
}
