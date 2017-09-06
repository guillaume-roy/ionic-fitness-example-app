import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getHistorySessions } from '../../reducers';
import * as history from '../../actions/history';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryPage {
  sessions: any;

  constructor(private store: Store<State>) {
    this.sessions = this.store.select(getHistorySessions);
    this.store.dispatch(new history.LoadAction());
  }
}
