import React, { setState, useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import "./NavBar.css";
import HelpIcon from "@material-ui/icons/Help";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import {
  AppBar,
  CardActionArea,
  Card,
  FormControlLabel,
  Switch,
  Typography,
  TextField,
  Button,
  Toolbar,
  IconButton,
  Collapse,
} from "@material-ui/core";
import HelpModal from "./HelpModal";
import SimpleModal from "./Modal";
import HideOnScroll from "./HideOnScroll";

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
  const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div className={classes.root}>
      {/* <HideOnScroll> */}
      <Collapse in={checked} collapsedHeight={0}>
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
      </Collapse>

      <div className="navShrinkButton">
        {checked === true ? (
          <CardActionArea
            className="iconShrink"
            variant="outlined"
            onClick={handleChange}
            checked={checked}
            label="Show"
          >
            <IconButton className="iconShrink">
              <KeyboardArrowUpIcon className="iconShrinkIcon" color="primary" />
            </IconButton>
          </CardActionArea>
        ) : (
          // <IconButton>
          //   <KeyboardArrowDownIcon
          //     className="iconShrink"
          //     variant="contained"
          //     onClick={handleChange}
          //     checked={checked}
          //     label="Show"
          //   />
          // </IconButton>
          <CardActionArea
            className="iconShrink"
            variant="outlined"
            onClick={handleChange}
            checked={checked}
            label="Show"
          >
            <IconButton className="iconShrink">
              <KeyboardArrowDownIcon
                className="iconShrinkIcon"
                color="primary"
              />
            </IconButton>
          </CardActionArea>

          // <IconButton>
          //   <KeyboardArrowUpIcon
          //     className="iconShrink"
          //     variant="contained"
          //     onClick={handleChange}
          //     checked={checked}
          //     label="Show"
          //   />
          // </IconButton>
        )}
      </div>

      {/* </HideOnScroll> */}
    </div>
  );
}
