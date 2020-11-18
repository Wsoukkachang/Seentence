import React, { setState, useState, useEffect } from "react";
import Tabs from "./Tabs";
import SearchBar from "material-ui-search-bar";
import axios from "axios";
import {} from "@material-ui/core";
import "./App.css";

const App = () => {
  const [value, setValue] = useState("");
  const [spliceValue, setSpliceValue] = useState([]);
  const [search, setInput] = useState("");
  const [searchWordInfo, setSearchWordInfo] = useState({});
  const [wordDatabase, setWordDatabase] = useState([]);

  // handles search bar and split words
  const handleSubmit = (e) => {
    e.preventDefault();
    setSpliceValue(search.split(" "));
    console.log(e);

    console.log("THIS IS searchValue", search);
    console.log("THIS IS spliceValue", spliceValue);
    alert(`Submitting search: ${search}`);
    spliceValue.map((word) => onSearchSubmit(word));
  };

  const onSearchSubmit = (term) => {
    axios
      .get("https://api.unsplash.com/search/photos", {
        params: { query: term },
        headers: {
          Authorization:
            "Client-ID s_cKK607sSYUL4uKDvlhw6wmMdyZh6M6bJ8gRMB0rI4",
        },
      })
      .then((res) => {
        const results = res.data;
        setSearchWordInfo({ results });
        wordDatabase.push({ term, ...results });
      });
    console.log("THIS IS TERM", term);
    console.log("THIS IS SERACHWORLDINFO", searchWordInfo);
    console.log("THIS IS wordDatabase", wordDatabase);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>SEENTENCE</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Enter sentence:
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

      <div>
        <Tabs value={spliceValue} wordDatabase={wordDatabase} />
      </div>

      <h1>This is image result container.</h1>
      <h1>This is video result container.</h1>
    </div>
  );
};

export default App;
