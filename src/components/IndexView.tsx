import formatISO from "date-fns/formatISO";
import { nanoid } from "nanoid/non-secure";
import { makeStyles } from "@material-ui/core/styles";
import { ILesson, IStudent } from "../interfaces";
import LessonCard from "./LessonCard";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(({ palette: { secondary } }) => {
  return {
    root: {
      padding: "2rem",
    },
    sectionTitle: {
      margin: "2rem 0",
      paddingBottom: "0.5rem",
      borderBottom: `2px solid ${secondary.main}`,
    },
    lessons: {
      display: "grid",
      gridGap: "2rem",
    },
  };
});

export interface IndexViewProps {}

const students: IStudent[] = [
  {
    id: nanoid(),
    realName: "Adam Rasheed",
    email: "adam.email@gmail.com",
    phone: "1235551234",
  },
];
const lessons: ILesson[] = [
  {
    id: nanoid(),
    startTime: formatISO(new Date("04/24/2021").setHours(9, 0, 0)),
    type: "intermediate",
    notes: null,
    students,
  },
  {
    id: nanoid(),
    startTime: formatISO(new Date("04/24/2021").setHours(10, 30, 0)),
    type: "beginner",
    notes: null,
    students: [],
  },
  {
    id: nanoid(),
    startTime: formatISO(new Date("04/25/2021").setHours(9, 0, 0)),
    type: "intermediate",
    notes: null,
    students: [],
  },
  {
    id: nanoid(),
    startTime: formatISO(new Date("04/25/2021").setHours(10, 30, 0)),
    type: "beginner",
    notes: null,
    students,
  },
];

console.log(lessons);

const IndexView: React.FunctionComponent<IndexViewProps> = () => {
  const classes = useStyles();
  const saturdayLessons = lessons.filter(
    (lesson) => new Date(lesson.startTime).getDay() === 6
  );
  const sundayLessons = lessons.filter(
    (lesson) => new Date(lesson.startTime).getDay() === 6
  );

  return (
    <div className={classes.root}>
      <h1>Find Lessons</h1>
      <Typography className={classes.sectionTitle} variant="h3" component="h2">
        Saturday
      </Typography>
      <div className={classes.lessons}>
        {saturdayLessons.map((lesson) => (
          <LessonCard
            id={lesson.id}
            key={lesson.id}
            startTime={lesson.startTime}
            studentCount={lesson.students.length}
            type={lesson.type}
          />
        ))}
      </div>
      <Typography className={classes.sectionTitle} variant="h3" component="h2">
        Sunday
      </Typography>
      <div className={classes.lessons}>
        {sundayLessons.map((lesson) => (
          <LessonCard
            id={lesson.id}
            key={lesson.id}
            startTime={lesson.startTime}
            studentCount={lesson.students.length}
            type={lesson.type}
          />
        ))}
      </div>

      <Button>Coach Login</Button>
    </div>
  );
};

export default IndexView;
