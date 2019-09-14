import React, { Component } from "react";
import constants from "./constants";
import "../stylesheets/Articles.css";
import { Redirect, withRouter } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import arrow from '../assets/left-arrow.png';
import CircularProgress from "@material-ui/core/CircularProgress";

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      showComponent: false,
      redirectHome: false,
      redirectDashboard: false
    }
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleRedirectDashboard = this.handleRedirectDashboard.bind(this);
  }

  componentDidMount() {
    fetch(constants.BASE_URL + constants.ID_PATH + this.props.data)
      .then(response => response.json())
      .then(data => this.setState({ result: data }))
      .then(data => this.setState({ showComponent: true }));
  }

  handleRedirect(){
    this.setState({redirectHome: true});
  }

  handleRedirectDashboard(){
    this.setState({redirectDashboard: true});
  }  

  render() {
    if(this.state.redirectHome === true){
      return (
            <Redirect to ={"/"} />
      );
    }

    if(this.state.redirectDashboard === true){
      return (
            <Redirect to ={"/dashboard"} />
      );
    }
    let style = {
      width: "90%"
    }
    if(this.state.showComponent === true){
    return (
      <div className="list bk">
        <div className="button">
        <Button  color="secondary" onClick = {this.handleRedirect}>
                <img src={arrow} alt="" width="15px" height="10px"/> <p>Home</p>
        </Button>
        <Button  color="secondary" onClick = {this.handleRedirectDashboard}>
                <img src={arrow} alt="" width="15px" height="10px"/> <p>Dashboard</p>
        </Button>
        </div>
        
        <h1 className="hd">Articles</h1>
        {this.state.result.map(article => (
            <a href={article.article_url} className="card">
            <Card className="card">
      <CardActionArea>
        <CardMedia
          className="card-media"
          title={article.title}
        ></CardMedia>
        <img src={"" + (article.image_url==="" ||  article.image_url===" " ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1280px-No_image_3x4.svg.png" : article.image_url)} alt="No image" width="300" height="140"/>
        <CardContent>
          <div className="title">
          <Typography gutterBottom variant="h5" component="h3" >
          {article.title.substring(0,18)+"..."}
          </Typography>
          </div>
          <Typography variant="body2" color="textSecondary" component="p">
            published on {article.pub_date.split("T")[0]}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            authored by {article.authors.substring(0,20)+"..."}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <a href={article.article_url}>
        <Button size="small" color="primary">
        Learn More
        </Button>
        </a>
      </CardActions>
    </Card>
            </a>          
        ))}
      </div>
    );
  }else{
    return (
      <div className="Loader">
        <h1>Loading...</h1>
        <CircularProgress disableShrink />
      </div>
    );
  }
  }
}

export default withRouter(Articles);
