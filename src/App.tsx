import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import firebase from "firebase/app";
import "firebase/auth";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";
import { ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import rootReducer from "./reducers";

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

const composeEnhancers =
  (typeof window !== "undefined" &&
    // @ts-ignore redux devtools
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger))
);

function App() {
  const classes = useStyles();
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
