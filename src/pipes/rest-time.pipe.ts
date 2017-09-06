import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'restTime' })
export class RestTimePipe implements PipeTransform {
  transform(value: number): string {
    return this.mmss(value);
  }

  pad(num) {
    return ("0" + num).slice(-2);
  }

  mmss(secs) {
    var minutes = Math.floor(secs / 60);
    secs = secs % 60;
    minutes = minutes % 60;
    return this.pad(minutes) + ":" + this.pad(secs);
  }
}
