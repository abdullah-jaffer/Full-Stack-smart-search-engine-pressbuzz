import React, { Component } from "react";
import "../stylesheets/Mentions.css";

class Mentions extends Component {
  render() {
    let style = {
      "font-size": this.props.size
    };
    return (
      <div>
        <h1 className="label">Mentions</h1>
        <h1 className="value" style={style}>
          {this.props.mentions}
        </h1>
      </div>
    );
  }
}

export default Mentions;
