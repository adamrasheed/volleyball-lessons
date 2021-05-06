import { useLocation, useRouteMatch } from "react-router-dom";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { ILesson, IStudent } from "../interfaces";
import LessonCard from "./LessonCard";
import { Button, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useFirebase } from "react-redux-firebase";
import { loginUser } from "../reducers/user";
import { addStudent } from "../reducers/lesson";
import { IAuth } from "../interfaces/auth";

const useStyles = makeStyles(() => ({
  form: {
    margin: "2rem auto",
    maxWidth: "32rem",
    padding: "1rem",
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr",
    gridGap: "1rem",
  },
}));

export interface LessonViewProps {}

const LessonView: React.FunctionComponent<LessonViewProps> = () => {
  const match = useRouteMatch();
  const classes = useStyles();
  const fb = useFirebase();

  const dispatch = useDispatch();

  const { isExact } = match;
  const lessons: ILesson[] = useSelector(
    (state: RootStateOrAny) => state.lessons
  );
  const auth: IAuth = useSelector(
    (state: RootStateOrAny) => state.firebase.auth
  );

  const { pathname } = useLocation();
  const id = pathname.replace("/lesson/", "");

  const currentLesson: ILesson = lessons.find(
    (lesson) => lesson.id === id
  ) as ILesson;

  const isLoggedIn = !!auth.stsTokenManager.accessToken;
  console.log({ currentLesson, isLoggedIn });

  function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    dispatch(loginUser(fb.login));
  }

  function handleAddStudent() {
    if (isLoggedIn) {
      const { email, displayName, uid } = auth;
      const student: IStudent = {
        id: uid,
        email,
        realName: displayName,
        phone: null,
        timesPlayed: 0,
      };

      dispatch(addStudent({ lessonId: currentLesson.id, student }));
    }
  }

  if (isExact || !currentLesson) {
    return <div>nothing to see here.</div>;
  } else {
    return (
      <div>
        <LessonCard
          type={currentLesson.type}
          startTime={currentLesson.startTime}
          id={currentLesson.id}
          studentCount={currentLesson.students.length}
          hideButton={true}
        >
          <Typography variant="h5">Students</Typography>
          {currentLesson.students.map((student) => (
            <Typography key={student.id} variant="body2">
              {student.realName}
            </Typography>
          ))}
        </LessonCard>
        {isLoggedIn && (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddStudent}
            >
              Add my name
            </Button>
          </div>
        )}
        {!isLoggedIn && (
          <Container
            onSubmit={handleSubmitForm}
            className={classes.form}
            component="form"
          >
            <Typography variant="h5">Book this game</Typography>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up with Google
            </Button>
          </Container>
        )}
      </div>
    );
  }
};

export default LessonView;
