import { useLocation, useRouteMatch } from "react-router-dom";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { ILesson } from "../interfaces";
import LessonCard from "./LessonCard";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { isExact } = match;
  const lessons: ILesson[] = useSelector(
    (state: RootStateOrAny) => state.lessons
  );

  const { pathname } = useLocation();
  const id = pathname.replace("/lesson/", "");

  const currentLesson: ILesson | undefined = lessons.find(
    (lesson) => lesson.id === id
  );
  console.log({ currentLesson });

  function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    console.log({ name, email });
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
            <Typography variant="body2">{student.realName}</Typography>
          ))}
        </LessonCard>
        <Container
          onSubmit={handleSubmitForm}
          className={classes.form}
          component="form"
        >
          <Typography variant="h5">Book this game</Typography>
          <TextField
            required
            variant="outlined"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            variant="outlined"
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Container>
      </div>
    );
  }
};

export default LessonView;
