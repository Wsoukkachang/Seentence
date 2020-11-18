import { GridList, Card, CardContent, Typography } from "@material-ui/core";
import axios from "axios";
import React, { setState, useState, useEffect } from "react";
import "./Tabs.css";

function Tabs({ value, wordDatabase, active, ...props }) {
  const [searchInfo, setSearchInfo] = useState({});
  const [wordLinks, setWordLinks] = useState({});
  console.log({ value });
  console.log({ wordDatabase });

  return (
    <div className="tabs">
      {value.map((word, i) => (
        <Card variant="outlined">
          <CardContent>
            <h1 key={i}>{word}</h1>

            {wordDatabase.length > 0 ? (
              wordDatabase.map((url, i) => (
                <img key={i} src={wordDatabase[0].results[i].urls.thumb} />
              ))
            ) : (
              <h1>Please enter something.</h1>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Tabs;
