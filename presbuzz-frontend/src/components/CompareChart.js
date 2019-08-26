import React, { Component } from "react";
import Chart from "chart.js";

class CompareChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result1: {},
      result2: {},
      fillArray: [""],
      showComponent: false
    };
  }

  chartRef = React.createRef();

  componentWillMount() {
    this.setState({ result1: this.preprocessDataSet(this.props.input1) });
    this.setState({ result2: this.preprocessDataSet(this.props.input2) });
    this.setState({ showComponent: true });
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

    if (averageSentiments.length > this.state.fillArray.length) {
      this.setState({ fillArray: Array(averageSentiments.length).fill(" ") });
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
            data: Object.values(this.state.result1),
            borderColor: ["rgb(255,0,0)"],
            fill: true,
            label: ["Average Sentiments"]
          },
          {
            data: Object.values(this.state.result2),
            borderColor: ["rgb(0, 255, 255)"],
            fill: false,
            label: ["Average Sentiments"]
          }
        ],
        labels: this.state.fillArray
      }
    });
  }
  render() {
    return (
      <div>
        {this.state.showComponent ? (
          <canvas id="myChart" ref={this.chartRef} width="150" height="40" />
        ) : null}
      </div>
    );
  }
}

export default CompareChart;
