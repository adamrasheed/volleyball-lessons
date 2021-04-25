import { useRouteMatch } from "react-router-dom";

export interface LessonViewProps {}

const LessonView: React.FunctionComponent<LessonViewProps> = () => {
  const match = useRouteMatch();
  const { isExact } = match;

  if (isExact) {
    return <div>nothing to see here.</div>;
  }

  return <div>Yo</div>;
};

export default LessonView;
