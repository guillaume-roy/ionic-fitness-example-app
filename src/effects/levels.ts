import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as levels from '../actions/levels';
import { LevelsService } from '../services/levels.service';

@Injectable()
export class LevelsEffects {
  constructor(private actions$: Actions, private levelsService: LevelsService) { }

  @Effect()
  loadLevels$ = this.actions$
    .ofType(levels.LOAD)
    .switchMap(() => this.levelsService.getLevels())
    .map(entities => new levels.LoadCompleteAction({ levels: entities }));
}
