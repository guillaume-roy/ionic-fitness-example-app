import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { LevelsPage } from '../levels/levels';
import { Store } from '@ngrx/store';
import { State, getAppIsBusy, getAppError, getUserIsAuthenticated } from '../../reducers';
import * as app from '../../actions/app';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email: string;
  password: string;
  isBusy: any;

  constructor(private auth: AuthService, private navCtrl: NavController, private store: Store<State>, private alertCtrl: AlertController) {
    this.isBusy = this.store.select(getAppIsBusy);
    this.store.select(getAppError)
      .subscribe(error => {
        if (error.message) {
          this.store.dispatch(new app.IsBusyAction({ isBusy: false }));
          let alert = this.alertCtrl.create({
            title: 'Erreur',
            subTitle: error.message,
            buttons: ['OK']
          });
          alert.present();
          this.store.dispatch(new app.ClearErrorAction());
        }
      });
    this.store.select(getUserIsAuthenticated)
      .subscribe(isAuthenticated => {
        this.store.dispatch(new app.IsBusyAction({ isBusy: false }));
        if (isAuthenticated) {
          this.navCtrl.setRoot(LevelsPage);
        }
      });
  }
  login() {
    this.store.dispatch(new app.IsBusyAction({ isBusy: true }));
    this.auth.signInWithEmailAndPassword(this.email, this.password);
  }

  createAccount() {
    this.store.dispatch(new app.IsBusyAction({ isBusy: true }));
    this.auth.createUserWithEmailAndPassword(this.email, this.password);
  }
}
