import React, { setState, useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import "./NavBar.css";
import HelpIcon from "@material-ui/icons/Help";
import {
  AppBar,
  Card,
  FormControlLabel,
  Switch,
  Typography,
  TextField,
  Button,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import HelpModal from "./HelpModal";
import SimpleModal from "./Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 40,
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-end",
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className="navBar">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h7" Wrap>
            A visual and auditory learning tool that helps people understand
            what they are reading faster.{" "}
            <p>A place where you can actually hear and see your sentence!"</p>
          </Typography>
          <SimpleModal />
          <div>
            <HelpModal />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
