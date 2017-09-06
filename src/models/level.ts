import { Exercise } from './exercise';

export interface Level {
  title: string;
  code: string;
  exercises?: Exercise[][];
}
