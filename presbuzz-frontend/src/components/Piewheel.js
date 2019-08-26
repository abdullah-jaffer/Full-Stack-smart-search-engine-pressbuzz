import React, { Component } from "react";
import Chart from "chart.js";

class Piewheel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      showComponent: false
    };
  }
  chartRef = React.createRef();
  componentWillMount() {
    let counts = {};
    counts["positive"] = 0;
    counts["negative"] = 0;
    counts["neutral"] = 0;
    let i = 0;
    for (i = 0; i < Object.keys(this.props.data).length; i++) {
      console.log(this.props.data[i].polarity);
      let sentiments = this.props.data[i].polarity;
      if (sentiments < 0) {
        counts["negative"] = counts["negative"] ? counts["negative"] + 1 : 1;
      } else if (sentiments > 0) {
        counts["positive"] = counts["positive"] ? counts["positive"] + 1 : 1;
      } else {
        counts["neutral"] = counts["neutral"] ? counts["neutral"] + 1 : 1;
      }
    }
    console.log("These are the years" + Object.keys(counts));
    this.setState({ result: counts });
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
              "rgb(127,255,0)",
              "rgb(251, 0, 0)",
              "rgba(54, 162, 235)"
            ]
          }
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: Object.keys(this.state.result)
      },
      type: "doughnut"
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

export default Piewheel;
