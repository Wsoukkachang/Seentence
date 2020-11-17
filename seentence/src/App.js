import React, { setState, useState, useEffect } from "react";
import Tabs from "./Tabs";
import SearchBar from "material-ui-search-bar";
import {} from "@material-ui/core";
import "./App.css";

const App = () => {
  const [value, setValue] = useState("");
  const [spliceValue, setSpliceValue] = useState([]);
  const [search, setInput] = useState("");

  // handles search bar and split words
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setSpliceValue(search.split(" "));
    console.log(evt);

    console.log("THIS IS searchValue", search);
    console.log("THIS IS spliceValue", spliceValue);
    alert(`Submitting search ${search}`);
  };

  return (
    <div className="App">
      {/* <SearchBar
        value={value}
        onRequestSearch={() => setSearchValue({value})}
      /> */}
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
      <div>
        {/* <Tabs/> */}
        {spliceValue.map((word) => (
          <h1>{spliceValue.word}</h1>
        ))}
      </div>

      <h1 className="tabs">This is sentence word tabs.</h1>
      <h1>This is image result container.</h1>
      <h1>This is video result container.</h1>
    </div>
  );
};

export default App;
