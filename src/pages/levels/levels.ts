import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LevelPage } from '../level/level';
import { Level } from '../../models/level';
import { Store } from '@ngrx/store';
import { State, getLevels } from '../../reducers';
import * as level from '../../actions/level';
import * as levels from '../../actions/levels';
import { OnBoardingService } from '../../services/onboarding.service';

@Component({
  selector: 'page-levels',
  templateUrl: 'levels.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LevelsPage {
  levels: any;

  constructor(
    private navCtrl: NavController,
    private store: Store<State>,
    private onboarding: OnBoardingService) {
    this.levels = this.store.select(getLevels);
    this.store.dispatch(new levels.LoadAction());
  }

  viewLevel(levelToDisplay: Level) {
    this.store.dispatch(new level.LoadAction({ level: levelToDisplay }));
    this.navCtrl.push(LevelPage);
  }

  ionViewDidLoad() {
    this.onboarding.handleBetaDisclamer();
  }
}
