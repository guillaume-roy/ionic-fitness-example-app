import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { State, getSessionState, getAppError } from '../../reducers';
import { LevelsPage } from '../levels/levels';
import * as sessionActions from '../../actions/session';
import * as appActions from '../../actions/app';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import { Insomnia } from '@ionic-native/insomnia';

@Component({
  selector: 'page-session',
  templateUrl: 'session.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionPage {
  session: Observable<any>;

  constructor(
    private navCtrl: NavController,
    private store: Store<State>,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private insomnia: Insomnia) {
    this.session = this.store.select(getSessionState);
    this.store.select(getAppError)
      .subscribe(error => {
        if (error.message) {
          this.store.dispatch(new appActions.IsBusyAction({ isBusy: false }));
          let alert = this.alertCtrl.create({
            title: 'Erreur',
            subTitle: error.message,
            buttons: ['OK']
          });
          alert.present();
          this.store.dispatch(new appActions.ClearErrorAction());
        }
      });
  }

  updateResult(action: string) {
    switch (action) {
      case "INCREMENT":
        this.store.dispatch(new sessionActions.IncrementResultAction());
        break;
      case 'DECREMENT':
        this.store.dispatch(new sessionActions.DecrementResultAction());
        break;
    }
  }

  validateSerie() {
    this.store.dispatch(new sessionActions.ValidateSerieAction());
  }

  saveSession() {
    this.store.dispatch(new appActions.IsBusyAction({ isBusy: true }));
    this.store.dispatch(new sessionActions.SaveAction());
    this.navCtrl.setRoot(LevelsPage);
  }

  showMoreActions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Que voulez-vous faire ?',
      buttons: [
        {
          text: 'Abandonner la session',
          icon: 'close',
          role: 'destructive',
          handler: () => {
            this.navCtrl.setRoot(LevelsPage);
          }
        },
        {
          text: 'Série suivante',
          icon: 'fastforward',
          handler: () => {
            this.store.dispatch(new sessionActions.CompleteRestAction());
          }
        },
        {
          text: 'Exercice suivant',
          icon: 'skip-forward',
          handler: () => {
            this.store.dispatch(new sessionActions.NextExerciseAction());
          }
        },
        {
          text: 'Terminer la session',
          icon: 'checkmark',
          handler: () => {
            this.store.dispatch(new sessionActions.CompleteAction());
          }
        },
        {
          text: 'Ne rien faire',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  ionViewDidLeave() {
    this.insomnia.allowSleepAgain();
    this.store.dispatch(new sessionActions.ClearAction());
  }
}
