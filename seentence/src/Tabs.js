import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./Tabs.css";


function Tabs(word, active, ...props) {
    return (
        <Card className={`tabs ${active && "tabs--selected"}`} onClick={props.onClick}>
        <CardContent>
      <Typography className="tabs__title" color="textSecondary">
          {word}
        </Typography>
      </CardContent>
    </Card>
    )
}

export default Tabs
