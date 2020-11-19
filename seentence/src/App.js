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
  // const [isLoading, setLoading] = useState(false);
  const [spliceValue, setSpliceValue] = useState([]);
  const [search, setInput] = useState("");
  const [wordDatabase, setWordDatabase] = useState([]);

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

  const [tabsRender, setTabsRender] = useState(false);
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
    setSpliceValue(search.split(" "));

    console.log("THIS IS searchValue", search);
    handleVideoSubmit(search);
    spliceSentence();

    // alert(`Submitting search: ${search}`);
  };

  // splice sentence from search
  const spliceSentence = async () => {
    console.log("THIS IS spliceValue", spliceValue);
    spliceValue.map((word) => onSearchSubmit(word));
    // setTimeout(alert("Creating your sentence!"), 20000);
    // setTimeout(alert("Words are ready!"), 20000);
    setTabsRender(true);
  };

  // gets photos from Unsplash API for term/word
  const onSearchSubmit = async (term) => {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query: term },
      headers: {
        Authorization: "Client-ID s_cKK607sSYUL4uKDvlhw6wmMdyZh6M6bJ8gRMB0rI4",
      },
    });

    // console.log("THIS IS TERM", term);
    let data = response.data;

    //push new word data into database
    wordDatabase.push({ term, ...data });

    // console.log("THIS IS wordDatabase", wordDatabase);
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

  return (
    <div className="App">
      <div className="header">
        <div>
          <img className="logoImg" src="https://i.imgur.com/RpnCtls.png"></img>
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

      {/* {videoReady === true ? (
        <div className="ui container" style={{ marginTop: "1em" }}>
          <div className="ui grid">
            <div className="ui row">
              <div className="eleven wide column">
                <VideoDetail video={selectedVideo} />
              </div>
              <div className="five wide column">
                <VideoList
                  handleVideoSelect={handleVideoSelect}
                  videos={videos}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )} */}

      {videoReady === true ? (
        <div className="video__container" style={{ marginTop: "1em" }}>
          <div className="video__grid">
            <Card variant="outlined">
              <div className="video__row">
                <div className="eleven wide column">
                  <VideoDetail video={selectedVideo} />
                </div>
                <div className="five wide column">
                  <VideoList
                    handleVideoSelect={handleVideoSelect}
                    videos={videos}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <div className="tabsContainer">
          {spliceValue.map((word, i) => (
            <div onClick={() => say(word)}>
              <Tabs
                key={i}
                i={i}
                className={word}
                word={word}
                wordDatabase={wordDatabase}
              />
            </div>
          ))}
        </div>
      )}

      {/* <h1>This is image result container.</h1>
      <h1>This is video result container.</h1> */}
    </div>
  );
};

export default App;
