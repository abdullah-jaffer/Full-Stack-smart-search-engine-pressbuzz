import { ThemeProvider } from '@material-ui/styles';
import '../stylesheets/Search.css';
import React, { Component }from 'react';
import Button from '@material-ui/core/Button';
import constants from './constants';

class Search extends Component {
    constructor(props) {
      super(props);
      this.state = {term: '',
                    result: []};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({term: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A term was submitted: ' + this.state.term);
      event.preventDefault();
      let term = this.state.term;
      fetch(constants.BASE_URL+constants.TERM_PATH+term).then(response => response.json())
      .then(data => console.log(data[0]))
    }
  
    render() {
      return (
          <div>
              <h1 className="logo">PressBuzz</h1>
        <form onSubmit={this.handleSubmit}>
             <div className="textFieldWrapper">
            <input  className="textField" placeholder="Enter a Person, Place or Event" type="text" size="120" height="48" value={this.state.value} onChange={this.handleChange} />
            </div>
            <ThemeProvider theme={constants.theme } > 
            <Button variant="contained" color="primary" className="button" onClick={this.handleSubmit}>
              Get the Buzz
            </Button>
            </ThemeProvider>
         
        </form>
        </div>
      );
    }
  }

  export default Search;