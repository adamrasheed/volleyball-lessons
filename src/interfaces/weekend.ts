import { ILesson } from "./lesson";

export interface IWeekend {
  id: string;
  startTime: string;
  lessons: ILesson[];
}
