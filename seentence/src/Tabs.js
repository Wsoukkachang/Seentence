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

const Tabs = ({ word, imageDatabase, id }) => {
  // console.log("This is TABS word", word);
  // console.log("This is TABS id ", id);
  // console.log("This is TABS imageDB ", imageDatabase);
  let [startingIndex, setStartingIndex] = useState(0);
  let [wordImages, setWordImages] = useState([]);
  let wordArray = [];
  let [tabsWord, setTabsWord] = useState("");
  let [imagesDB, setImagesDB] = useState([]);
  let length = 110;

  // this function goes through database and returns an array with just urls thumbs for word
  const checkWord = (word, imageDatabase) => {
    let images = [];

    if (imageDatabase.length === undefined || word === undefined) {
      // console.log("This is CHECKWORD IF ", imageDatabase);
    } else {
      for (let i = 0; i <= imageDatabase.length - 1; i++) {
        if (word === imageDatabase[i].words) {
          images.push({ word: word, thumb: imageDatabase[i].thumb });
        }
      }
      wordArray = images;
      // console.log("This is CHECKWORD wordImages ", wordArray);
      // checkNoImages(wordArray);
    }
  };

  // NEED TO FIX - this function is not running at right time
  const getIndex = (word, imageDatabase) => {
    let importantIndex = new Array([0, 4, 8, 12]);
    let wordDB = imageDatabase;

    for (let i = 0; i <= importantIndex.length - 1; i++) {
      if (word === imageDatabase[importantIndex[i]]?.words) {
        setStartingIndex(importantIndex[i]);
        // console.log("This is TABS startingIndex ", startingIndex);
      }
    }

    // console.log("This is TABS startingIndex ", startingIndex);
  };

  // check array and if no urls present, then will append no image to it
  // const checkNoImages = (array) => {
  //   if (array[0] === undefined) {
  //     for (let i = 0; i <= 3; i++) {
  //       array.push({ word: word, thumb: noImageUrl });
  //     }
  //   }
  //   console.log("This is CHECKNOIMAGE array ", array);
  // };

  useEffect((word, wordDatabase, startingIndex) => {
    // code to run on component mount
    setTabsWord(word);
    setImagesDB(wordDatabase);
    // checkNoImages(images);

    // console.log("This is TABS useEffect word", word);
    // console.log("This is TABS useEffect tabsWord)", tabsWord);
    // console.log("This is TABS useEffect imageDatabase", imageDatabase);
    // console.log("This is TABS useEffect imagesDB", imagesDB);
    // checkWord(word, imageDatabase);
    // getIndex(word, wordDatabase);
    // console.log("This is TABS useEffect getIndex ", startingIndex);
  });

  checkWord(word, imageDatabase);

  return (
    <div className="tabs">
      {imageDatabase === undefined ? (
        <div></div>
      ) : (
        <CardActionArea className="tab__card" id={id}>
          <Card variant="outlined">
            <CardContent className="tab__content">
              <div>
                <h1>{word}</h1>
              </div>

              <div>
                <img
                  className="tab__img"
                  src={wordArray[0]?.thumb}
                  alt="Image1"
                  width={length}
                  height={length}
                ></img>
              </div>
              <div>
                <img
                  className="tab__img"
                  src={wordArray[1]?.thumb}
                  alt="Image2"
                  width={length}
                  height={length}
                ></img>
              </div>
              <div>
                <img
                  className="tab__img"
                  src={wordArray[2]?.thumb}
                  alt="Image3"
                  width={length}
                  height={length}
                ></img>
              </div>
              <div>
                <img
                  className="tab__img"
                  src={wordArray[3]?.thumb}
                  alt="Image4"
                  width={length}
                  height={length}
                ></img>
              </div>
            </CardContent>
          </Card>
        </CardActionArea>
      )}
    </div>
  );
};

export default Tabs;
