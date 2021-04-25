import { combineReducers } from "redux";
import { lessonReducer } from "./lesson";
import userReducer from "./user";

export default combineReducers({ lessons: lessonReducer, user: userReducer });
