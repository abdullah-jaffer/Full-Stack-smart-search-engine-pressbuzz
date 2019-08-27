import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/styles";
import constants from "./constants";
import CompareChart from "./CompareChart";
import "../stylesheets/Compare.css";
import { withRouter } from "react-router-dom";

class Compare extends Component {
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
    this.setState({ showComponent: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    let term = this.state.term;
    fetch(constants.BASE_URL + constants.TERM_PATH + term)
      .then(response => response.json())
      .then(data => this.setState({ result: data }))
      .then(data => this.setState({ showComponent: true }));
  }

  render() {
    if(this.state.result === "{'result': error, 'message': No article with this term found}"){
      alert("No such keyword found :(");
      return ( 
         <Compare data = {this.props.data}/>
        );
    }
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <div className="wrapper">
                <input
                  className=""
                  placeholder="Enter a Person, Place or Event"
                  type="text"
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
                  Compare
                </Button>
              </ThemeProvider>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 bbox">
            {this.state.showComponent ? (
              <CompareChart
                input1={this.props.data}
                input2={this.state.result.articles}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Compare;
