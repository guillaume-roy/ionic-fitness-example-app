import { RythmMode } from './rythm-modes';

export interface Exercise {
  title: string;
  code: string;
  isAmrap?: boolean;
  seriesRest?: number;
  finalRest?: number;
  series: number;
  isSelected?: boolean;
  rythm?: RythmMode;
  isLeftRight?: boolean;
  result?: number[];
  leftRightResult?: { left: number; right: number }[];
}
