import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Session } from '../models/session';

@Injectable()
export class SessionsService {
  constructor(private db: AngularFireDatabase) { }

  pushSession(session: Session) {
    return this.db.list(`/sessions/${session.userID}/`)
      .push(session);
  }

  storeSession(session: Session) {
    localStorage.setItem(session.code, JSON.stringify(session));
  }

  getLastSession(sessionCode: string): Session {
    return JSON.parse(localStorage.getItem(sessionCode) || null) || {};
  }

  getSessions(uid: string) {
    return this.db.list(`/sessions/${uid}/`, { query: { orderByChild: 'inverseStartDate' } });
  }
}
