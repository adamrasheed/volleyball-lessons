import { ILesson } from "../interfaces";
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
    // @ts-ignore
    addLessons: (
      state: IState["lessons"],
      action: { type: string; payload: ILesson[] }
    ) => {
      return state.concat(action.payload);
    },
  },
});

export const { addLesson, addLessons } = lessonSlice.actions;

export default lessonSlice.reducer;
