import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getUserIsAuthenticated } from '../../reducers';
import * as user from '../../actions/user';
import { LevelsPage } from '../levels/levels';
import { LoginPage } from '../login/login';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html'
})
export class LoadingPage {
  constructor(private store: Store<State>, private nav: NavController) {
    this.store.dispatch(new user.LoadAction());
    this.store.select(getUserIsAuthenticated)
      .debounceTime(1500)
      .subscribe(isAuthenticated => this.nav.setRoot(isAuthenticated ? LevelsPage : LoginPage));
  }
}
