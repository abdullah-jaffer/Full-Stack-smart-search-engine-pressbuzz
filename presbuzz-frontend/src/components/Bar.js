import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({

  root: {
    flexGrow: 1,

  },
  bar: {
    backgroundColor: "#FB8C00"
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    },
    textAlign: "left"
  },
  search: {
    position: "relative",
    marginRight: "20px",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
}));

export default function SearchAppBar() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>

      <AppBar className={classes.bar} position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            PressBuzz
          </Typography>
          <a href="https://github.com/abdullah-jaffer/PressBuzz"> <img src="https://image.flaticon.com/icons/svg/25/25231.svg" alt="" width="32" height="32" /></a>
        </Toolbar>
      </AppBar>
    </div>
  );
}
