import React, { Component } from "react";
import constants from "./constants";
import "../stylesheets/Articles.css";

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      showComponent: false
    };
  }

  componentDidMount() {
    fetch(constants.BASE_URL + constants.ID_PATH + this.props.data)
      .then(response => response.json())
      .then(data => this.setState({ result: data }))
      .then(data => this.setState({ showComponent: true }));
  }

  render() {
    let style = {
      width: "90%"
    };
    return (
      <div className="list bk">
        <h1 className="hd">Articles</h1>
        {this.state.result.map(article => (
          <div className="container">
            <div class="card text-white mb-3" style={style}>
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img src={article.image_url} class="card-img" alt="..." />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">{article.title}</h5>
                    <p class="card-text">
                      <a href={article.article_url}>Go to source</a>
                    </p>
                    <p class="card-text">{article.authors}</p>
                    <p class="card-text">{article.pub_date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Articles;
