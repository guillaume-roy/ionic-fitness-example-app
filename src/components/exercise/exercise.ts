import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Exercise } from '../../models/exercise';

@Component({
  selector: 'exercise',
  templateUrl: 'exercise.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseComponent {
  @Input() exercise: Exercise;

  constructor() { }
}
