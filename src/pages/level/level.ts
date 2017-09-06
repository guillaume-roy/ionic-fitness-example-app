import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { State, getLevel } from '../../reducers';
import { SessionPage } from '../session/session';
import * as levelActions from '../../actions/level';
import * as sessionActions from '../../actions/session';
import { Insomnia } from '@ionic-native/insomnia';

@Component({
  selector: 'page-level',
  templateUrl: 'level.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LevelPage {
  level: any;

  constructor(
    private navCtrl: NavController,
    private store: Store<State>,
    private insomnia: Insomnia) {
    this.level = this.store.select(getLevel);
  }

  launchSession() {
    this.insomnia.keepAwake();
    this.store.dispatch(new sessionActions.StartAction());
    this.navCtrl.setRoot(SessionPage);
  }

  ionViewDidLeave() {
    this.store.dispatch(new levelActions.ClearAction());
  }

  slideChanged(slides: any, exercisesIndex: number) {
    this.store.dispatch(new levelActions.SelectExerciseVariationAction({
      exercisesIndex: exercisesIndex,
      selectedExerciseIndex: slides.getActiveIndex()
    }));
  }
}
