import { IStudent } from "./student";

export interface ILesson {
  id: string;
  startTime: string;
  type: "beginner" | "intermediate";
  notes: string | null;
  students: IStudent[];
}
