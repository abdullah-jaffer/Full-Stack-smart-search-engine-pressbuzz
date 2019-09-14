import React, { Component } from "react";
import "../stylesheets/SmallSearch.css";

class SmallSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    console.log("state " + this.state.term);
    await this.setState({ term: event.target.value });
    window.sessionStorage.setItem("term", this.state.term);
    console.log("session " + window.sessionStorage.getItem("item"));
  }

  render() {
  
    return (
      <div>
              <div className="bar">
                <input
                  className="input"
                  placeholder="Search Another Term"
                  type="text"
                  
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </div>
      </div>
    );
  }
}

export default SmallSearch;