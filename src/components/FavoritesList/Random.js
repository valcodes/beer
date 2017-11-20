import React, { Component } from "react";
import axios from "axios";
import "./FavoritesList.css";
import Favorite from "./Favorite";

export default class Random extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="tile is-ancestor">
        <Favorite />

        <Favorite />

        <Favorite />

        <Favorite />

        <Favorite />

        <Favorite />
      </div>
    );
  }
}
