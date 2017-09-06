import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as history from '../actions/history';
import { SessionsService } from '../services/sessions.service';
import { Store } from '@ngrx/store';
import { State, getUser } from '../reducers';

@Injectable()
export class HistoryEffects {
  constructor(
    private actions$: Actions,
    private sessionsService: SessionsService,
    private store: Store<State>) { }

  @Effect()
  loadHistory$ = this.actions$
    .ofType(history.LOAD)
    .switchMap(() => this.store.select(getUser))
    .switchMap(user => this.sessionsService.getSessions(user.uid))
    .map(sessions => new history.LoadCompleteAction({ sessions: sessions }));
}
