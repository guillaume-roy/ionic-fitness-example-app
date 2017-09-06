import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Level } from '../models/level';

@Injectable()
export class LevelsService {
  constructor(private http: Http) { }

  getLevels() {
    return this.http.get("assets/data/levels.json")
      .map((res: Response) => (res.json() || []) as Level[])
      .map(levels => JSON.parse(JSON.stringify(levels)));
  }
}
