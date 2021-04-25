import React from "react";
import format from "date-fns/format";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

import { ILesson } from "../interfaces";
import { PATH } from "../constant/path";

const useStyles = makeStyles(() => ({
  root: {
    background: "white",
    padding: "1rem",
  },
  header: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
  },
  type: {
    textTransform: "capitalize",
  },
  count: {
    justifySelf: "end",
  },
  time: {
    fontVariantCaps: "all-small-caps",
    letterSpacing: "0.05em",
  },
  card_actions: {
    padding: "1rem 0 0",
  },
}));

export type LessonCardProps = {
  isCoach?: boolean;
  studentCount: number;
} & Omit<ILesson, "students" | "notes">;

const LessonCard: React.FunctionComponent<LessonCardProps> = ({
  id,
  isCoach = false,
  startTime,
  studentCount,
  type,
}) => {
  const ReserveLink = React.forwardRef<any, Omit<RouterLinkProps, "to">>(
    (props, ref) => (
      <RouterLink ref={ref} to={`${PATH.LESSON}/${id}`} {...props} />
    )
  );

  const classes = useStyles();
  const isFull = studentCount === 6;
  return (
    <Card className={classes.root}>
      <div className={classes.header}>
        <Typography className={classes.type}>{type}</Typography>
        <Typography className={classes.count}>
          {studentCount}/6 Students
        </Typography>
      </div>
      <Typography className={classes.time} variant="subtitle1">
        {format(new Date(startTime), "p")}
      </Typography>
      <CardActions className={classes.card_actions}>
        {!isCoach && (
          <Button
            variant="contained"
            color="primary"
            disabled={isFull}
            component={ReserveLink}
          >
            {isFull ? "Booked Full" : "Reserve Spot"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default LessonCard;
