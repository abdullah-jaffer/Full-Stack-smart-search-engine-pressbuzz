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
import { Redirect, withRouter } from "react-router-dom";
import { preProcess } from "../helpers/DataPreprocessor";
import SmallSearch from "./SmallSearch";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/styles";
import arrow from '../assets/left-arrow.png';

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      showComponent: false,
      reShowComponent: false,
      isCompressed: true,
      redirect: false,
      redirectHome: false,
      term: ""
    };
    
    
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }
  componentWillMount() {
    let term = window.sessionStorage.getItem("term");
    fetch(constants.BASE_URL + constants.TERM_PATH + term)
      .then(response => response.json())
      .then(data => this.setState({ result: preProcess(data) }))
      .then(data => this.setState({ showComponent: true })).then(data => window.sessionStorage.setItem("term", ""));
  }
  handleChange = name => event => {
    this.setState({ isCompressed: event.target.checked });
  };

  handleRedirect(){
    this.setState({redirectHome: true});
  }
  handleSubmit(event){
    console.log("here " + window.sessionStorage.getItem("term"));
    if (window.sessionStorage.getItem("term").trim() === "") {
      alert("Please don't leave the search bar empty");
    } else {
      const current = this.props.location.pathname;
      this.props.history.replace(`/reload`);
       setTimeout(() => {
      this.props.history.replace(current);
    });
    }
  }

  handleClick(event) {
    window.sessionStorage.setItem("keys", this.state.result["idList"]);
    this.setState({ redirect: true });
  }

  

  render() {
    let style = {
      height: "500px"
    };
    let largeScreenHeight = {
      height: "400vh"
    };

    let smallScreenHeight = {
      height: "280vh"
    };
 
    if(this.state.redirectHome === true){
      return (
            <Redirect to ={"/"} />
      );
    }

    if (this.state.redirect === true) {
      return (
        <div>
          <Redirect to={"/articles"} />
        </div>
      );
    }

    if (this.state.result === 'no data') {
      alert("No such keyword found :(");
      return ( <Redirect to={"/"} />
        );
    }
    
    if (this.state.isCompressed === true) {
      if (this.state.showComponent === true) {
        return (
          <div className="bg" style={smallScreenHeight}>
            <div className="row">
              <div className="col-md-12" onClick={this.handleClick}>
                <ButtonBases className="button" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-1">
              <Button  color="secondary" onClick = {this.handleRedirect}>
                <img src={arrow} alt="" width="15px" height="10px"/> <p>Home</p>
              </Button>
                <div className="miniform">
                <SmallSearch />
                <form>
                  <ThemeProvider theme={constants.theme}>
                    <Button
                      variant="contained"
                      color="primary"
                      className="button"
                      onClick={this.handleSubmit}
                    >
                      Search
                    </Button>
                  </ThemeProvider>
                </form>
                </div>
              </div>
              <div className="col-md-11">
                <div className="container">
                  <div className="row">
                    <div className="col-md-4 box">
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.isCompressed}
                              onChange={this.handleChange("checked")}
                              value="checked"
                            />
                          }
                          label="Compress"
                        />
                      </FormGroup>
                      <Mentions
                        mentions={this.state.result["Mentions"]}
                        size="50px"
                      />
                    </div>
                    <div className="col-md-4 box">
                      <h1 className="heading">Year Wise Mentions</h1>
                      <Barchart data={this.state.result["Barchart"]} />
                    </div>
                    <div className="col-md-4 box">
                      <h1 className="heading">Overall Sentiments</h1>
                      <Piewheel data={this.state.result["Piewheel"]} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 box">
                      <h1 className="heading">Date Wise Trend</h1>
                      <Linechart data={this.state.result["Linechart"]} />
                    </div>
                    <div className="col-md-6 box" style={style}>
                      <h1 className="heading">In depth view</h1>
                      <Calendar data={this.state.result["Calendar"]} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12" style={style}>
                      <h1 className="heading">Compare Keywords</h1>
                      <Compare data={this.state.result["Linechart"]} />
                    </div>
                  </div>
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
          <div className="bg" style={largeScreenHeight}>
            <div className="row">
              <div className="col-md-12" onClick={this.handleClick}>
                <ButtonBases className="button" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-1">
              <Button  color="secondary" onClick = {this.handleRedirect}>
                <img src={arrow} alt="" width="15px" height="10px"/> <p>Home</p>
              </Button>
                <div className="miniform">
                <SmallSearch />
                <ThemeProvider theme={constants.theme}>
                  <Button
                    variant="contained"
                    color="primary"
                    className="button"
                    onClick={this.handleSubmit}
                  >
                    Search
                  </Button>
                </ThemeProvider>
              </div>
              </div>
              <div className="col-md-11">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 box">
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.isCompressed}
                              onChange={this.handleChange("checked")}
                              value="checked"
                            />
                          }
                          label="Compress"
                        />
                      </FormGroup>
                      <Mentions
                        mentions={this.state.result["Mentions"]}
                        size="200px"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 box">
                      <h1 className="heading">Year Wise Mentions</h1>
                      <Barchart data={this.state.result["Barchart"]} />
                    </div>

                    <div className="col-md-6 box">
                      <h1 className="heading">Overall Sentiments</h1>
                      <Piewheel data={this.state.result["Piewheel"]} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 box">
                      <h1 className="heading">Date Wise Trend</h1>
                      <Linechart data={this.state.result["Linechart"]} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 box" style={style}>
                      <h1 className="heading">In depth view</h1>
                      <Calendar data={this.state.result["Calendar"]} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12" style={style}>
                      <h1 className="heading">Compare Keywords</h1>
                      <Compare data={this.state.result["Linechart"]} />
                    </div>
                  </div>
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
          <div className="Loader">
            <h1>Loading...</h1>
            <CircularProgress disableShrink />
          </div>
        );
      }
    }
  }
}

export default withRouter(Analytics);
