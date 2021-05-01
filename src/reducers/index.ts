import { combineReducers } from "redux";
import { firebaseReducer as firebase } from "react-redux-firebase";
import { persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

import lessonReducer from "./lesson";
import userReducer from "./user";

export default combineReducers({
  lessons: lessonReducer,
  user: userReducer,
  firebase: persistReducer(
    { key: "firebaseState", storage: localStorage, stateReconciler: hardSet },
    firebase
  ),
});
