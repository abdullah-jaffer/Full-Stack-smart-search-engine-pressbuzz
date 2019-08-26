import React, { Component } from "react";
import Piewheel from "./Piewheel";
import Linechart from "./Linechart";
import Barchart from "./Barchart";
import Calendar from "./Calendar";
import Mentions from "./Mentions";
import Compare from "./Compare";
import constants from "./constants";
import "../stylesheets/Analytics.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonBases from "./ButtonBases";
import "../index.css";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Redirect, withRouter, Route } from "react-router-dom";
import Articles from "./Articles";

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      showComponent: false,
      checked: false,
      redirect: false
    };

    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    let term = this.props.term;
    fetch(constants.BASE_URL + constants.TERM_PATH + term)
      .then(response => response.json())
      .then(data => this.setState({ result: data.articles }))
      .then(data => this.setState({ showComponent: true }));
  }
  handleChange = name => event => {
    this.setState({ checked: event.target.checked });
  };

  handleClick(event) {
    this.setState({ redirect: true });
  }
  render() {
    let style = {
      height: "500px"
    };
    let style1 = {
      height: "420vh"
    };

    let style2 = {
      height: "320vh"
    };
    if (this.state.redirect === true) {
      return (
        <div>
          <Route path="/articles" render={() => <Articles ids="1,2,3" />} />
          <Redirect to={"/articles"} />
        </div>
      );
    }

    if (this.state.checked === true) {
      if (this.state.showComponent === true) {
        return (
          <div className="bg" style={style2}>
            <div className="row">
              <div className="col-md-12" onClick={this.handleClick}>
                <ButtonBases className="button" />
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-4 box">
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.checked}
                          onChange={this.handleChange("checked")}
                          value="checked"
                        />
                      }
                      label="Compress"
                    />
                  </FormGroup>
                  <Mentions
                    mentions={Object.keys(this.state.result).length}
                    size="50px"
                  />
                </div>
                <div className="col-md-4 box">
                  <h1 className="heading">Year Wise Mentions</h1>
                  <Barchart data={this.state.result} />
                </div>
                <div className="col-md-4 box">
                  <h1 className="heading">Overall Sentiments</h1>
                  <Piewheel data={this.state.result} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 box">
                  <h1 className="heading">Date Wise Trend</h1>
                  <Linechart data={this.state.result} />
                </div>
                <div className="col-md-8 box" style={style}>
                  <h1 className="heading">In depth view</h1>
                  <Calendar data={this.state.result} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12" style={style}>
                  <h1 className="heading">Compare Keywords</h1>
                  <Compare data={this.state.result} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12" onClick={this.handleClick}>
                <ButtonBases />
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            ><h1>Loading...</h1>
            <CircularProgress disableShrink />
          </div>
        );
      }
    } else {
      if (this.state.showComponent === true) {
        return (
          <div className="bg" style={style1}>
            <div className="row">
              <div className="col-md-12" onClick={this.handleClick}>
                <ButtonBases className="button" />
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12 box">
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.checked}
                          onChange={this.handleChange("checked")}
                          value="checked"
                        />
                      }
                      label="Compress"
                    />
                  </FormGroup>
                  <Mentions
                    mentions={Object.keys(this.state.result).length}
                    size="200px"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 box">
                  <h1 className="heading">Year Wise Mentions</h1>
                  <Barchart data={this.state.result} />
                </div>

                <div className="col-md-6 box">
                  <h1 className="heading">Overall Sentiments</h1>
                  <Piewheel data={this.state.result} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 box">
                  <h1 className="heading">Date Wise Trend</h1>
                  <Linechart data={this.state.result} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 box" style={style}>
                  <h1 className="heading">In depth view</h1>
                  <Calendar data={this.state.result} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12" style={style}>
                  <h1 className="heading">Compare Keywords</h1>
                  <Compare data={this.state.result} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12" onClick={this.handleClick}>
                <ButtonBases />
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            ><h1>Loading...</h1>
            <CircularProgress disableShrink />
          </div>
        );
      }
    }
  }
}

export default withRouter(Analytics);
