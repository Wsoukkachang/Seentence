import React from "react";
import "./Footer.css";
import {
  Card,
  FormControlLabel,
  Switch,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

export default function Footer() {
  return (
    <div className="FooterContainer">
      <Typography className="H3">
        © Copyright 2020. All Rights Reserved.
      </Typography>

      <Typography className="H3">
        * Photos from Unsplash and Videos from Youtube
      </Typography>

      {/* <Button>About</Button> */}
    </div>
  );
}
