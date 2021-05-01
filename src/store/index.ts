import { configureStore } from "@reduxjs/toolkit";
import {
  getFirebase,
  actionTypes as rrfActionTypes,
} from "react-redux-firebase";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import rootReducer from "../reducers";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// const composeEnhancers =
//   (typeof window !== "undefined" &&
//     // @ts-ignore redux devtools
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // just ignore every redux-firebase and react-redux-firebase action type
          // ...Object.keys(rfConstants.actionTypes).map(
          //   (type) => `${rfConstants.actionsPrefix}/${type}`
          // ),
          ...Object.keys(rrfActionTypes).map(
            (type) => `@@reactReduxFirebase/${type}`
          ),
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
        ignoredPaths: ["firebase", "firestore"],
      },
      thunk: {
        extraArgument: {
          getFirebase,
        },
      },
    }).concat(logger),
});

export default store;
