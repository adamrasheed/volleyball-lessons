import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login: (
      state: IUser | null,
      action: { type: string; payload: { id: string; email: string } }
    ) => {
      state = action.payload;
    },
    logout: (state: IUser | null) => {
      state = null;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
