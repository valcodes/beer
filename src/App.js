import React, { Component } from "react";
import router from "./router";
import "./App.css";
import Navbar from "./components/Navbar";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        {router}
      </div>
    );
  }
}
