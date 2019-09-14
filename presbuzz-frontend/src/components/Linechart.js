import React, { Component } from "react";
import Chart from "chart.js";
import moment from 'moment';

class Linechart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      showComponent: false,
      labels: [],
      graphData: []
    };
  }

  chartRef = React.createRef();

  componentWillMount() {
    let labels = Object.keys(this.props.data).slice(0,20).reverse();
    let graphData = Object.values(this.props.data).slice(0,20).reverse();
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
    this.setState({graphData: graphData});
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
            data: this.state.graphData,
            borderColor: ["rgb(0, 255, 255)"],
            fill: false,
            label: ["Average Sentiments"]
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
        ) : null}
      </div>
    );
  }
}

export default Linechart;
