import axios from "axios";
import youtube from "./apis/youtube";
import React, { useState, useEffect } from "react";
import { Card, FormControlLabel, Switch, Typography } from "@material-ui/core";
import Tabs from "./Tabs";
// import SearchBar from "material-ui-search-bar";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import "./App.css";

const App = () => {
  // search variables
  let allWords = [];
  let termCount = 0; //
  let imageDatabase = [];
  // let wordSize = 0; //allWords.length * 4
  // let dataLength = -1; //length of imageDatabase

  let spliceValue = [];
  let wordDatabase = [];
  const [search, setInput] = useState("");
  const [wordSize, setWordSize] = useState(0);
  const [dataLength, setDataLength] = useState(-1);
  const [tabsRender, setTabsRender] = useState(false);
  const [dB, setDB] = useState([]);
  const [wordsArray, setWordsArray] = useState([]);

  // speech variables
  const synthRef = React.useRef(window.speechSynthesis);
  const [langVoices, setLangAVoices] = useState([]);
  const [langAVoice, setLangAVoice] = useState(null);

  //switches variables
  const [switchState, setSwitchState] = useState({
    images: true,
    videos: false,
  });

  const [voiceState, setVoiceState] = useState({
    female: true,
    male: false,
  });

  const [videoReady, setVideoReady] = useState(false);

  //video variables
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // onMount, set voice to female
  useEffect(() => {
    const voices = synthRef.current
      .getVoices()
      .filter((voice) => !voice.name.includes("Google"));
    // console.log(voices);

    const filteredA = voices.filter(
      (voice) => voice.lang.substr(0, 2) === "en"
    );
    setLangAVoices(filteredA);
    // console.log(voiceState);

    if (voiceState.female === true && voiceState.male === false) {
      setLangAVoice(filteredA[1]);
    } else {
      setLangAVoice(filteredA[0]);
    }
  }, []);

  // function to make computer speak word
  const say = (word) => {
    // console.log("This is speech", word);
    const utter = new SpeechSynthesisUtterance(word);
    utter.voice = langAVoice;
    synthRef.current.speak(utter);
  };

  //on submit of search, show video results
  const handleVideoSubmit = async (termWord) => {
    try {
      const response = await youtube.get("/search", {
        params: {
          q: termWord,
        },
      });

      console.log("CONFIRM VIDEO TERM", termWord);
      setVideos(response.data.items);
      console.log("CONFIRM VIDEO SET SEARCH", response.data.items);
    } catch (err) {
      console.error(err);
    }

    // setVideoReady(true);
  };

  // handles submit from search bar
  const handleSubmit = (e) => {
    e.preventDefault();
    termCount = 0;
    allWords = [];
    // setWordCounter(0); // resets counter for each new search
    wordDatabase = []; // resets database for each new search

    const searchSplice = search.split(" ");
    allWords = search.split(" "); // splices search result to individual elements (word)
    spliceValue = searchSplice;

    console.log("THIS IS searchValue", search);
    handleVideoSubmit(search);
    spliceSentence(searchSplice);

    // alert(`Submitting search: ${search}`);
  };

  // splice sentence from search
  const spliceSentence = async (searchSplice) => {
    console.log("THIS IS spliceValue in spliceSentence", searchSplice);
    searchSplice.map((word) => onSearchSubmit(word));
    // setTimeout(alert("Creating your sentence!"), 20000);
    // setTimeout(alert("Words are ready!"), 20000);
  };

  // gets photos from Unsplash API for term/word
  const onSearchSubmit = async (term) => {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query: term },
      headers: {
        Authorization: "Client-ID s_cKK607sSYUL4uKDvlhw6wmMdyZh6M6bJ8gRMB0rI4",
      },
    });

    console.log("THIS IS TERM", term);
    let data = response.data;

    //push new word data into database
    wordDatabase.push({ term, ...data });

    termCount += 1; // add 1 to counter for each term that runs through this function
    console.log("THIS IS termCount ", termCount);
    // setWordCounter(termCount * 4);
    checkCounter(termCount, tabsRender, wordDatabase);

    console.log("THIS IS imageDatabase ", imageDatabase);
    console.log("This IS tabsRender condition ", tabsRender);

    console.log("THIS IS wordDB length ", wordDatabase.length);
    console.log("THIS IS spliceValue length ", spliceValue.length);
  };

  // if (isLoading) {
  //   return <div className="App">Loading...</div>;
  // }

  // switch click from Female to Male
  const switchClickedVoice = (event) => {
    setVoiceState({
      ...voiceState,
      [event.target.name]: event.target.checked,
    });

    const voices = synthRef.current
      .getVoices()
      .filter((voice) => !voice.name.includes("Google"));

    const filteredA = voices.filter(
      (voice) => voice.lang.substr(0, 2) === "en"
    );
    setLangAVoices(filteredA);

    // switch to Male if clicked
    if (voiceState.female === true && voiceState.male === false) {
      setLangAVoice(filteredA[0]);
    } else {
      setLangAVoice(filteredA[1]);
    }
  };

  // switch click from Images to Video
  const switchClicked = (event) => {
    setSwitchState({
      ...switchState,
      [event.target.name]: event.target.checked,
    });

    if (switchState.images === true && switchState.videos === false) {
      setVideoReady(true);
    } else {
      setVideoReady(false);
    }
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const checkCounter = (termCount, tabsRender, wordDatabase) => {
    console.log("This is in checkCounter", search);
    let checkCounterWords = search.split(" ").length * 4;
    // console.log("This is in checkCounter wc", wordCounter);
    console.log("This is in checkCounter ccw", checkCounterWords);

    if (termCount > 0 && termCount * 4 === checkCounterWords) {
      getImageUrls(wordDatabase, spliceValue);

      console.log("This is in checkCounter = allWords length", allWords.length);
      console.log("This is in checkCounter if = imageDatatbase", imageDatabase);
      console.log(
        "This is in checkCounter if = imageDatatbase length",
        imageDatabase.length
      );
      console.log("This is in checkCounter if = allWords", allWords);

      console.log("This is in checkCounter if RAN TABS RENDER ", tabsRender);

      checkAll(imageDatabase, allWords);
      // console.log("This is sV after", spliceValue);
      // setTimeout(4000);
    } else {
      console.log("This is in checkCounter use effect else", wordsArray);
    }
  };

  const checkAll = (imageDatabase, allWords) => {
    let iDBLength = imageDatabase.length;
    let tC4 = termCount * 4;
    let tru = true;

    setDataLength(iDBLength);
    setWordSize(tC4);

    setTimeout(4000);

    setTabsRender(tru);

    setTimeout(4000);

    console.log("This is in checkCounter if = dataLength", dataLength);
    console.log("This is in checkCounter if = wordSize", wordSize);
    console.log("This is in checkCounter if = tabsRender ", tabsRender);
  };

  // get urls of each word from data received from Unsplash
  const getImageUrls = (wordDatabase, spliceValue) => {
    let images = [];
    let sortedImages = [];
    let wordsSplice = search.split(" ");
    setWordsArray(wordsSplice);

    console.log("This is in getImageUrls if = wordsSplice", wordsSplice);

    console.log("This is in getImageUrls if = wordDatabase ", wordDatabase);

    for (let i = 0; i <= wordDatabase.length - 1; i++) {
      for (let j = 0; j <= 3; j++) {
        images.push({
          word: wordDatabase[i].term,
          thumb: wordDatabase[i].results[j].urls.thumb,
        });
      }
    }

    console.log("This is in getImageUrls if = images", images);

    // this for loop sorts thumb links to words so pictures are always correlated to words -- was getting delays from Unsplash API
    for (let i = 0; i <= images.length - 1; i++) {
      for (let j = 0; j <= wordsSplice.length - 1; j++) {
        if (images[i].word === wordsSplice[j]) {
          sortedImages.push({
            words: wordsSplice[j],
            thumb: images[i].thumb,
          });
        }
      }
    }

    // console.log("This is imageDB", images);
    // console.log("This is search", search);
    // console.log("This is wordsSplice", wordsSplice);
    console.log("This is SORTED imageDB", sortedImages);
    imageDatabase = sortedImages;
    setDB(sortedImages);

    console.log("This is SORTED imageDB = imageDatabase", imageDatabase);
    console.log("This is SORTED imageDB = dB", dB);
    // setTimeout(1000);
    // console.log("This is sV after", spliceValue);
  };

  const isReady = (wordSize, dataLength, tabsRender) => {
    return wordSize === dataLength && tabsRender === true;
  };

  return (
    <div className="App">
      <div className="marginContainer">
        <div className="header">
          <div>
            <img
              className="logoImg"
              src="https://i.imgur.com/RpnCtls.png"
            ></img>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <label>
                <div>Enter sentence:</div>

                <input
                  className="search-bar"
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <div>
          <Typography className="yourSentence">
            Your sentence: {search}
            <div>
              <div>
                <FormControlLabel
                  className="imagesLabel"
                  value="start"
                  control={<div />}
                  label="Female"
                  labelPlacement="start"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={voiceState.male}
                      onChange={switchClickedVoice}
                      name="male"
                    />
                  }
                  label="Male"
                />
              </div>

              <FormControlLabel
                className="imagesLabel"
                value="start"
                control={<div />}
                label="Images"
                labelPlacement="start"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={switchState.videos}
                    onChange={switchClicked}
                    name="videos"
                  />
                }
                label="Videos"
              />
            </div>
          </Typography>
        </div>

        {videoReady === true &&
        isReady(wordSize, dataLength, tabsRender) === true ? (
          <div className="video__container" style={{ marginTop: "1em" }}>
            <div className="video__grid">
              <div className="video__row">
                <div className="eleven wide column">
                  <VideoDetail video={selectedVideo} />
                </div>

                <Card variant="outlined">
                  <div className="five wide column">
                    <VideoList
                      handleVideoSelect={handleVideoSelect}
                      videos={videos}
                    />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <div className="tabsContainer">
            {wordsArray.map((word, i) => (
              <div key={i} onClick={() => say(word)}>
                <Tabs key={i} word={word} imageDatabase={dB} />
              </div>
            ))}
          </div>
        )}

        {/* {videoReady === true ? (
        <div className="video__container" style={{ marginTop: "1em" }}>
          <div className="video__grid">
            <div className="video__row">
              <div className="eleven wide column">
                <VideoDetail video={selectedVideo} />
              </div>

              <Card variant="outlined">
                <div className="five wide column">
                  <VideoList
                    handleVideoSelect={handleVideoSelect}
                    videos={videos}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )} */}

        {/* <h1>This is image result container.</h1>
      <h1>This is video result container.</h1> */}
      </div>
    </div>
  );
};

export default App;
