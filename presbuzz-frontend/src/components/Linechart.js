import React, { Component } from "react";
import Chart from "chart.js";

class Linechart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      showComponent: false
    };
  }

  chartRef = React.createRef();

  componentWillMount() {
    let sentiments = {};
    let i;
    for (i = 0; i < Object.keys(this.props.data).length; i++) {
      if (sentiments[this.props.data[i].pub_date.split("T")[0]]) {
        sentiments[this.props.data[i].pub_date.split("T")[0]] = {
          sum:
            sentiments[this.props.data[i].pub_date.split("T")[0]].polarity +
            this.props.data[i].polarity,
          occurence:
            sentiments[this.props.data[i].pub_date.split("T")[0]].occurence + 1
        };
      } else {
        sentiments[this.props.data[i].pub_date.split("T")[0]] = {
          sum: this.props.data[i].polarity,
          occurence: 1
        };
      }
    }
    console.log(sentiments);
    let averageSentiments = [];

    for (let key in sentiments) {
      if (sentiments.hasOwnProperty(key)) {
        console.log(key + " -> " + sentiments[key]);
        averageSentiments[key] =
          sentiments[key].sum / sentiments[key].occurence;
      }
    }

    console.log(averageSentiments);
    this.setState({ result: averageSentiments });
    this.setState({ showComponent: true });
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "line",
      data: {
        datasets: [
          {
            data: Object.values(this.state.result),
            borderColor: ["rgb(0, 255, 255)"],
            fill: false,
            label: ["Average Sentiments"]
          }
        ],

        labels: Object.keys(this.state.result)
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

export default Linechart;
