import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./Tabs.css";

function Tabs({ value, active, ...props }) {
  console.log({ value });
  return (
    <div className="tabs">
      {value.map((word, i) => (
        <h1 key={i}>{word}</h1>
      ))}
    </div>
  );
}

export default Tabs;
