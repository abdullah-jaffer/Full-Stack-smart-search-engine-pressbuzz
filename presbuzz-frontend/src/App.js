import React, { Component } from "react";
import "./App.css";
import SearchAppBar from "./components/Bar";
import Search from "./components/Search";
import Analytics from "./components/Analytics";
import "./index.css";

class App extends Component {
  
  render() {
    return (
      <div className="App bc">
        <SearchAppBar />
        <Search />
      </div>
    );
  }
}

export default App;
