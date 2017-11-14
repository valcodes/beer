import React, { Component } from 'react';
import router from './router';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
       {router}
      </div>
    );
  }
}


