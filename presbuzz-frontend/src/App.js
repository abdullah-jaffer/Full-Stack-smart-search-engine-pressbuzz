import React, { Component } from "react";
import "./App.css";
import SearchAppBar from "./components/Bar";
import Search from "./components/Search";
class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchAppBar />
        <Search />
      </div>
    );
  }
}

export default App;
