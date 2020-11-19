import React, { setState, useState, useEffect } from "react";
import {
  FormControlLabel,
  Switch,
  GridList,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import Tabs from "./Tabs";
// import SearchBar from "material-ui-search-bar";
import axios from "axios";
import SearchBar from "./SearchBar";
import youtube from "./apis/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import "./App.css";

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [spliceValue, setSpliceValue] = useState([]);
  const [search, setInput] = useState("");
  const [wordDatabase, setWordDatabase] = useState([]);

  const synthRef = React.useRef(window.speechSynthesis);
  const [langVoices, setLangAVoices] = useState([]);
  const [langAVoice, setLangAVoice] = useState(null);

  const [switchState, setSwitchState] = useState({
    checkedA: true,
    checkedB: false,
  });

  const [voiceState, setVoiceState] = useState({
    female: true,
    male: false,
  });

  const [tabsRender, setTabsRender] = useState(false);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  //onMount
  // useEffect(() => {
  //   console.log(voiceState);
  // });

  useEffect(() => {
    setTimeout(() => {
      const voices = synthRef.current
        .getVoices()
        .filter((voice) => !voice.name.includes("Google"));
      console.log(voices);

      const filteredA = voices.filter(
        (voice) => voice.lang.substr(0, 2) === "en"
      );
      setLangAVoices(filteredA);
      console.log(voiceState);

      if (voiceState.female === true && voiceState.male === false) {
        setLangAVoice(filteredA[1]);
      } else {
        setLangAVoice(filteredA[0]);
      }

      // console.log(synthRef.current);
    }, 10);
  }, []);

  // function to make computer speak word
  const say = (word) => {
    console.log("This is speech", word);
    const utter = new SpeechSynthesisUtterance(word);
    utter.voice = langAVoice;
    synthRef.current.speak(utter);
  };

  // handles submit from search bar
  const handleSubmit = (e) => {
    e.preventDefault();
    setSpliceValue(search.split(" "));

    console.log("THIS IS searchValue", search);

    spliceSentence();
    console.log("CONFIRM VIDEO SEARCH", search);
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

    let data = response.data;
    wordDatabase.push({ term, ...data });

    // return data;
    console.log("THIS IS TERM", term);
    console.log("THIS IS wordDatabase", wordDatabase);
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
    console.log(voices);

    const filteredA = voices.filter(
      (voice) => voice.lang.substr(0, 2) === "en"
    );
    setLangAVoices(filteredA);
    console.log(voiceState);

    if (voiceState.female === true && voiceState.male === false) {
      setLangAVoice(filteredA[0]);
    } else {
      setLangAVoice(filteredA[1]);
    }

    console.log(synthRef.current);

    // console.log("VoiceState", voiceState);
  };

  // switch click from Images to Video
  const switchClicked = (event) => {
    setSwitchState({
      ...switchState,
      [event.target.name]: event.target.checked,
    });
  };

  //on submit of search, show video results
  const handleVideoSubmit = async (termFromSearchBar) => {
    const response = await youtube.get("/search", {
      params: {
        q: termFromSearchBar,
      },
    });
    setVideos(response.data.items);
    console.log("CONFIRM VIDEO SEARCH", response.data.items);
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
          <form
            handleFormSubmit={handleVideoSubmit({ search })}
            onSubmit={handleSubmit}
          >
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
                    checked={switchState.male}
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
                  checked={switchState.checkedB}
                  onChange={switchClicked}
                  name="checkedB"
                />
              }
              label="Videos"
            />
          </div>
        </Typography>
      </div>

      {/* <div className="ui container" style={{ marginTop: "1em" }}>
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
      </div> */}

      {tabsRender === true ? (
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
      ) : (
        <div></div>
      )}

      {/* <h1>This is image result container.</h1>
      <h1>This is video result container.</h1> */}
    </div>
  );
};

export default App;
