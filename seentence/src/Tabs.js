import { GridList, Card, CardContent, Typography } from "@material-ui/core";
import axios from "axios";
import React, { setState, useState, useEffect } from "react";
import "./Tabs.css";

function Tabs({ value, wordDatabase }) {
  const [searchInfo, setSearchInfo] = useState({});
  const [wordLinks, setWordLinks] = useState({});
  // console.log({ value });
  // console.log("THIS IS TABS wordDatabase", { wordDatabase });

  return (
    <div className="tabs">
      {value.map((word, i) => (
        <Card variant="outlined">
          <CardContent>
            <h1 key={i}>{word}</h1>
            <img src={wordDatabase[i]?.results[0].urls.thumb}></img>
            <img src={wordDatabase[i]?.results[1].urls.thumb}></img>
            <img src={wordDatabase[i]?.results[2].urls.thumb}></img>
            <img src={wordDatabase[i]?.results[3].urls.thumb}></img>
            <img src={wordDatabase[i]?.results[4].urls.thumb}></img>

            {/* {wordDatabase[0]?.results.length > 0 ? (
              wordDatabase[0]?.results.map((num, i) => (
                <img key={i} src={wordDatabase[0]?.results[num].urls.thumb} />
              ))
            ) : (
              <h1>Please enter something.</h1>
            )} */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Tabs;
