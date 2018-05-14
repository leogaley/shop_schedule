import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Button } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Cutting Schedule</h2>
        </div>
        <p className="App-intro">
          Test Content.
        </p>
        <Button color="danger">Danger!</Button>      
      </div>
    );
  }
}

export default Home;