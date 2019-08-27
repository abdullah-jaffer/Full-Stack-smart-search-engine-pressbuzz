import React, { Component } from "react";
import Chart from "chart.js";

class Barchart extends Component {
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
      data: {
        datasets: [
          {
            data: Object.values(this.state.result),
            backgroundColor: [
              "rgba(255, 99, 132)",
              "rgba(54, 162, 235)",
              "rgba(255, 206, 86)"
            ]
          }
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: Object.keys(this.state.result)
      },
      type: "bar",
      options: {
        legend: {
          display: false
        }
      }
    });
  }
  render() {
    return (
      <div>
        {this.state.showComponent ? (
          <canvas id="myChart" ref={this.chartRef} width="70" height="50" />
        ) : null}
      </div>
    );
  }
}

export default Barchart;
