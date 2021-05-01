import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

import firebase from "firebase/app";
import "firebase/auth";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PersistGate } from "redux-persist/integration/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { persistStore } from "redux-persist";

import store from "./store";

import Header from "./components/Header";
import { PATH } from "./constant/path";
import IndexView from "./components/IndexView";
import { theme } from "./theme";
import LessonView from "./components/LessonView";

const useStyles = makeStyles(({ palette: { background } }) => ({
  root: {
    background: background.paper,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  main: {
    flex: 1,
  },
}));

const fbConfig = {
  apiKey: process.env.REACT_APP_API_KEY, // Auth / General Use
  appId: process.env.REACT_APP_APP_ID, // General Use
  projectId: process.env.REACT_APP_PROJECT_ID, // General Use
  authDomain: process.env.REACT_APP_AUTH_DOMAIN, // Auth with popup/redirect
  databaseURL: process.env.REACT_APP_DATABASE_URL, // Realtime Database
};

const rrfConfig = {
  lessonProfile: "lessons",
};

const persistor = persistStore(store);

firebase.initializeApp(fbConfig);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Router>
              <div className={classes.root}>
                <Header />
                <main className={classes.main}>
                  <Switch>
                    <Route path={PATH.LESSON} component={LessonView} />
                    <Route path={PATH.ROOT} exact component={IndexView} />
                  </Switch>
                </main>
              </div>
            </Router>
          </ThemeProvider>
        </PersistGate>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
