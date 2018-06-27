import React, { Component } from 'react';
import logo from '../css/logo.svg';
import '../css/App.css';

class HeaderComponent extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/><br/>
          <h1 className="App-title">Welcome to MedSmith</h1>
        </header>
      </div>
    );
  }
}

export default HeaderComponent;
