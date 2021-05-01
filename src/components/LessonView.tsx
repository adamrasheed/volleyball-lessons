import { useLocation, useRouteMatch } from "react-router-dom";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { ILesson } from "../interfaces";
import LessonCard from "./LessonCard";
import { Typography } from "@material-ui/core";

export interface LessonViewProps {}

const LessonView: React.FunctionComponent<LessonViewProps> = () => {
  const match = useRouteMatch();

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

  if (isExact || !currentLesson) {
    return <div>nothing to see here.</div>;
  } else {
    return (
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
    );
  }
};

export default LessonView;
