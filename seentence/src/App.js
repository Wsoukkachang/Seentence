import React, { setState, useState, useEffect } from "react";
import { GridList, Card, CardContent, Typography } from "@material-ui/core";
import Tabs from "./Tabs";
import SearchBar from "material-ui-search-bar";
import axios from "axios";
import {} from "@material-ui/core";
import "./App.css";

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [spliceValue, setSpliceValue] = useState([]);
  const [search, setInput] = useState("");
  const [searchWordInfo, setSearchWordInfo] = useState({});
  const [wordDatabase, setWordDatabase] = useState([]);

  // handles submit from search bar
  const handleSubmit = (e) => {
    e.preventDefault();
    let wordDatabase = [""];
    setSpliceValue(search.split(" "));

    console.log("THIS IS searchValue", search);

    spliceSentence();
    // alert(`Submitting search: ${search}`);
  };

  // splice sentence from search
  const spliceSentence = async () => {
    console.log("THIS IS spliceValue", spliceValue);
    spliceValue.map((word) => onSearchSubmit(word));
  };

  // gets photos from Unsplash API for term/word
  const onSearchSubmit = async (term) => {
    const data = await axios
      .get("https://api.unsplash.com/search/photos", {
        params: { query: term },
        headers: {
          Authorization:
            "Client-ID s_cKK607sSYUL4uKDvlhw6wmMdyZh6M6bJ8gRMB0rI4",
        },
      })
      .then((res) => {
        const results = res.data;
        // setSearchWordInfo({ results });
        wordDatabase.push({ term, ...results });

        //set loading to true so can render Tabs component correctly
        setLoading(false);
      });
    // return data;
    console.log("THIS IS TERM", term);
    // console.log("THIS IS SERACHWORLDINFO", searchWordInfo);
    console.log("THIS IS wordDatabase", wordDatabase);
  };

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

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

      <Typography className="yourSentence">Your sentence: {search}</Typography>

      <div className="tabsContainer">
        <Tabs value={spliceValue} wordDatabase={wordDatabase} />
      </div>

      {/* <h1>This is image result container.</h1>
      <h1>This is video result container.</h1> */}
    </div>
  );
};

export default App;
