import {
  CardActionArea,
  GridList,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { setState, useState, useEffect } from "react";
import "./Tabs.css";

function Tabs({ word, i, wordDatabase }) {
  return (
    <div className="tabs">
      <CardActionArea className="tab__card">
        <Card variant="outlined">
          <CardContent className="tab__content">
            <div>
              <h1>{word}</h1>
            </div>

            <img src={wordDatabase[i]?.results[0].urls.thumb}></img>
            <img src={wordDatabase[i]?.results[1].urls.thumb}></img>
            <img src={wordDatabase[i]?.results[2].urls.thumb}></img>
            <img src={wordDatabase[i]?.results[3].urls.thumb}></img>
          </CardContent>
        </Card>
      </CardActionArea>
    </div>
  );
}

export default Tabs;
