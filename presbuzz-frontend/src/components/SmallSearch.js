import React, { Component } from "react";
import "../stylesheets/Compare.css";

class SmallSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ term: event.target.value });
    window.sessionStorage.setItem("term", this.state.term.trim());
  }

  render() {
  
    return (
      <div>
         <form onSubmit={this.handleSubmit}>
              <div className="wrapper">
                <input
                  className=""
                  placeholder="Search Another Term"
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </div>
            </form>
      </div>
    );
  }
}

export default SmallSearch;