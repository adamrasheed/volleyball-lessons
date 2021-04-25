import { ILesson } from "../interfaces";
import { IAction, IState } from "../interfaces/store";
import { initialState } from "../store/initialState";

export function lessonReducer(
  state: IState = initialState,
  { type, payload }: IAction
) {
  switch (type) {
    case "ADD_LESSON":
      return { ...state, lessons: [...state.lessons, payload] };

    case "ADD_STUDENT":
      return {
        ...state,
        lessons: [
          state.lessons.map((lesson: ILesson) =>
            lesson.id === payload.lessonId
              ? { ...lesson, students: [...lesson.students, payload.student] }
              : lesson
          ),
        ],
      };

    default:
      return state;
  }
}
