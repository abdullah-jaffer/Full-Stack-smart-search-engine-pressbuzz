import React, { Component } from "react";

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      queryString: "here"
    };
  }

  // componentWillMount(){
  //   let queryString = "";
  //   for(let i = 0; i < Object.keys(this.props.data).length; i++){
  //       if(i ===  Object.keys(this.props.data).lengths-1){
  //         queryString += this.props.data[i].id;
  //       }else{
  //         queryString += this.props.data[i].id + ",";
  //       }
  //   }
  //    console.log(queryString);
  //    this.setState({queryString: queryString});

  // }

  render() {
    console.log(this.state.queryString);
    return (
      <div>
        <h1>TBD</h1>
      </div>
    );
  }
}

export default Articles;
