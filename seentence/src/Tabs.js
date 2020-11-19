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

function Tabs({ word, i, wordDatabase, voice }) {
  //speech
  const synthRef = React.useRef(window.speechSynthesis);
  const [langVoices, setLangAVoices] = useState([]);
  const [langAVoice, setLangAVoice] = useState(null);
  const [searchInfo, setSearchInfo] = useState({});
  const [wordLinks, setWordLinks] = useState({});
  // console.log({ value });
  // console.log("THIS IS TABS wordDatabase", { wordDatabase });

  // useEffect(() => {
  //   setTimeout(() => {
  //     const voices = synthRef.current
  //       .getVoices()
  //       .filter((voice) => !voice.name.includes("Google"));
  //     console.log(voices);

  //     const filteredA = voices.filter(
  //       (voice) => voice.lang.substr(0, 2) === "en"
  //     );
  //     setLangAVoices(filteredA);
  //     console.log(voice);

  //     if (voice.female === true && voice.male === false) {
  //       setLangAVoice(filteredA[1]);
  //     } else {
  //       setLangAVoice(filteredA[0]);
  //     }

  //     // console.log(synthRef.current);
  //   }, 100);
  // }, []);

  // useEffect(() => {
  //   const tabData = wordDatabase.unshift(wordDatabase[wordDatabase.length - 1]);
  // });

  // function to make computer speak word
  // const say = (word) => {
  //   console.log("This is speech", word);
  //   const utter = new SpeechSynthesisUtterance(word);
  //   utter.voice = langAVoice;
  //   synthRef.current.speak(utter);
  // };

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
