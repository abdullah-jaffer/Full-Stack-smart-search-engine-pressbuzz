import { ThemeProvider } from "@material-ui/styles";
import "../stylesheets/Search.css";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import constants from "./constants";
import Analytics from "./Analytics";
import { Redirect, withRouter, Route } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      result: [],
      showComponent: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ term: event.target.value });
  }

  handleSubmit(event) {
    alert("A term was submitted: " + this.state.term);
    event.preventDefault();
    this.setState({ showComponent: true });
  }

  render() {
    if (this.state.showComponent === true) {
      return (
        <div>
          <Route exact path="/" />
          <Route
            path="/dashboard"
            render={() => <Analytics term={this.state.term} />}
          />
          <Redirect to={"/dashboard"} />
        </div>
      );
    }

    return (
      <div className="bc">
        <div className="searchPanel">
          <h1 className="logo">PressBuzz</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="textFieldWrapper">
              <input
                className="textField"
                placeholder="Enter a Person, Place or Event"
                type="text"
                size="120"
                height="48"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
            <ThemeProvider theme={constants.theme}>
              <Button
                variant="contained"
                color="primary"
                className="button"
                onClick={this.handleSubmit}
              >
                Get the Buzz
              </Button>
            </ThemeProvider>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
