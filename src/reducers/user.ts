import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "firebase";
import { ExtendedAuthInstance } from "react-redux-firebase";

import { IUser, FulfilledAction } from "../interfaces";

export const loginUser = createAsyncThunk(
  "user/login",
  async (login: ExtendedAuthInstance["login"]) => {
    const response = await login({
      provider: "google",
      type: "popup",
    });

    const { user, credential } = response;
    console.log({ first: "yes", user, credential });
    return { user, credential };
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    logout: (state: IUser | null | "yo") => {
      state = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending.type, (state) => {
        state = null;
      })
      .addCase(
        loginUser.fulfilled.type,
        (
          state: IUser | null,
          {
            payload,
          }: FulfilledAction<
            ExtendedAuthInstance["login"],
            Pick<firebase.auth.UserCredential, "user" | "credential">
          >
        ) => {
          // @ts-ignore
          state = payload;
          // state = {
          //   id: user?.uid || "yes",
          //   email: user?.email || "nope",
          //   displayName: user?.displayName || null,
          //   token: user?.refreshToken || "yes",
          //   credential: credential,
          //   photoUrl: user?.photoURL,
          // };
        }
      )
      .addCase(loginUser.rejected.type, (state) => (state = null))
      .addDefaultCase((state, action) => {});

    // {
    //   [loginUser.pending.type]: (state) => {
    //     state = null;
    //   },
    //   [loginUser.fulfilled.type]: (
    //     state: IUser | null,
    //     {
    //       payload: { credential, user },
    // }: FulfilledAction<
    //   ExtendedAuthInstance["login"],
    //   Pick<firebase.auth.UserCredential, "user" | "credential">
    // >
    //   ) => {

    // }
  },
});

// export const { loginUser } = userSlice.actions;

export default userSlice.reducer;
