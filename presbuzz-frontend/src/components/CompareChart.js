import React, { Component } from "react";
import Chart from "chart.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from 'moment';

class CompareChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result1: {},
      result2: {},
      graphData1: [],
      graphData2: [],
      labels: [],
      showComponent: false
    };
  }

  chartRef = React.createRef();

  componentWillMount() {
    this.setState({ graphData1: this.dateFiller(this.props.input1) });
    this.setState({ graphData2: this.dateFiller(this.preprocessDataSet(this.props.input2)) });
    this.setState({ showComponent: true });
  }

  dateFiller(data) {
    let labels = Object.keys(data).slice(0,20).reverse();
    let graphData = Object.values(data).slice(0,20).reverse();
    for (let i = 0; i < labels.length; i++) {
      //make sure we are not checking the last date in the labels array
      if (i + 1 < labels.length) {
        let date1 = moment(labels[i], "YYYY-MM-DD");
        let date2 = moment(labels[i + 1], "YYYY-MM-DD");
    
        
        //if the current date +1 is not the same as it's next neighbor we have to add in a new one
        if (!date1.add(1, "days").isSame(date2)) {
          
          //add the label
          labels.splice(i + 1, 0, date1.format("YYYY-MM-DD"));
          //add the data
          graphData.splice(i + 1, 0, 0);
        }
      }
    
    
    }
    for(let i = 0; i < graphData.length; i++){
      graphData[i] = graphData[i] || 0;
    }
    console.log(labels[10] +"="+graphData[10]);
    this.setState({labels: labels});

    return graphData;
  }
  preprocessDataSet(data) {
    let sentiments = {};
    let i;
    for (i = 0; i < Object.keys(data).length; i++) {
      if (sentiments[data[i].pub_date.split("T")[0]]) {
        sentiments[data[i].pub_date.split("T")[0]] = {
          sum:
            sentiments[data[i].pub_date.split("T")[0]].polarity +
            data[i].polarity,
          occurence: sentiments[data[i].pub_date.split("T")[0]].occurence + 1
        };
      } else {
        sentiments[data[i].pub_date.split("T")[0]] = {
          sum: data[i].polarity,
          occurence: 1
        };
      }
    }
    console.log(sentiments);
    let averageSentiments = [];

    for (let key in sentiments) {
      if (sentiments.hasOwnProperty(key)) {
        averageSentiments[key] =
          sentiments[key].sum / sentiments[key].occurence;
      }
    }

    return averageSentiments;
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "line",
      data: {
        datasets: [
          {
            data: this.state.graphData1,
            borderColor: ["rgb(0,255,255)"],
            fill: true,
            label: this.props.term1
          },
          {
            data: this.state.graphData2,
            borderColor: ["rgb(255,0,0)"],
            fill: false,
            label: this.props.term2
          }
        ],
        labels: this.state.labels
      }
    });
  }
  render() {
    return (
      <div>
        {this.state.showComponent ? (
          <canvas id="myChart" ref={this.chartRef} width="150" height="40" />
        ) : <CircularProgress disableShrink />}
      </div>
    );
  }
}

export default CompareChart;
