import React, { Component } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      showComponent: false
    };
  }

  componentWillMount() {
    this.setState({ showComponent: true });
    this.setState({ result: this.props.data });
  }

  render() {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    if (this.state.showComponent === true) {
      return (
        <ResponsiveCalendar
          data={this.state.result}
          from="2016-08-04"
          to={date}
          emptyColor="#eeeeee"
          colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left"
            }
          ]}
        />
      );
    } else {
      return <h1>A problem occured</h1>;
    }
  }
}

export default Calendar;
