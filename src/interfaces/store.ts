import { IWeekend } from "./weekend";
import { IUser } from "./user";
import { ILesson } from "./lesson";
import { IStudent } from "./student";

export interface IState {
  weekend: Omit<IWeekend, "lessons"> | null;
  lessons: ILesson[];
  user: IUser | null;
}

export type IAddStudentPayload = {
  lessonId: string;
  student: IStudent;
};

export type ActionType =
  | "ADD_STUDENT"
  | "ADD_LESSON"
  | "LOG_IN_USER"
  | "LOG_OUT_USER"
  | "TOGGLE_LOADING";

export type IAction =
  | {
      type: ActionType;
      payload?: any;
    }
  | {
      type: "ADD_LESSON";
      payload: ILesson;
    }
  | {
      type: "ADD_STUDENT";
      payload: IAddStudentPayload;
    }
  | {
      type: "LOG_IN_USER";
      payload: IUser;
    }
  | {
      type: "LOG_OUT_USER";
      payload: never;
    };
