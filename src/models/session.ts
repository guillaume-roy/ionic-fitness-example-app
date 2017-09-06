import { Exercise } from './exercise';

export interface Session {
  inverseStartDate: number;
  startDate: string;
  endDate?: string;
  title: string;
  code: string;
  exercises: Exercise[]
  userID: string;
}
