import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as user from '../actions/user';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private auth: AuthService) { }

  @Effect()
  loadUser$ = this.actions$
    .ofType(user.LOAD)
    .switchMap(() => this.auth.getFirebaseAuth())
    .switchMap(firebaseUser => firebaseUser
        ? this.auth.getUserProfile(firebaseUser.uid)
            .map(userProfile => new user.LoadCompleteAction({ user: userProfile }))
        : Observable.of(new user.LoadCompleteAction({ user: null })));
}
