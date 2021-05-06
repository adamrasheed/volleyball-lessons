import { ILesson, IStudent } from "../interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { IState } from "../interfaces/store";

export const lessonSlice = createSlice({
  name: "lesson",
  initialState: [],
  reducers: {
    addLesson: (
      state: IState["lessons"],
      action: { type: string; payload: ILesson }
    ) => {
      state.push(action.payload);
    },
    addStudent: (
      state: IState["lessons"],
      {
        payload: { lessonId, student },
      }: { type: string; payload: { lessonId: string; student: IStudent } }
    ) => {
      const lessonToUpdate = state.find((lesson) => lesson.id === lessonId);
      lessonToUpdate?.students.push(student);
    },
    // @ts-ignore
    addLessons: (
      state: IState["lessons"],
      action: { type: string; payload: ILesson[] }
    ) => {
      return state.concat(action.payload);
    },
  },
});

export const { addLesson, addLessons, addStudent } = lessonSlice.actions;

export default lessonSlice.reducer;
