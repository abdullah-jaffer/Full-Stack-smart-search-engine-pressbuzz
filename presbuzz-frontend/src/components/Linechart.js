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
    this.setState({ result: this.props.data });
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
