import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { PATH } from "../constant/path";

export interface HeaderProps {}

const useStyles = makeStyles(({ palette }) => ({
  root: {
    padding: "1rem",
    textAlign: "center",
    background: palette.background.default,
    fontSize: "2rem",
    borderBottom: `2px solid ${palette.secondary.main}`,
    boxShadow:
      "0px 2px 2px rgb(3 10 238 / 14%), 0px 5px 7px rgb(3 10 238 / 05%)",

    "& a": {
      textDecoration: "none",
    },
  },
}));

const Header: React.FunctionComponent<HeaderProps> = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link to={PATH.ROOT}>🏐</Link>
    </div>
  );
};

export default Header;
