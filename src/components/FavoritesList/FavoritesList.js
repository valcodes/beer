import React, { Component } from "react";
import axios from "axios";
import "./FavoritesList.css";
import Favorite from "./Favorite";

export default class FavoritesList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="tile is-ancestor">
        {/* <div class="tile is-middle image"> */}
        <Favorite />
        {/* </div>  */}
        {/* <div class="tile is-middle"> */}
        <Favorite />
        {/* </div> */}
        {/* <div class="tile is-middle"> */}
        <Favorite />
        {/* </div> */}
        {/* <div class="tile is-middle"> */}
        <Favorite /> {/* </div> */}
        {/* <div class="tile is-middle"> */}
        <Favorite />
        {/* </div> */}
        {/* <div class="tile is-middle"> */}
        <Favorite />
        {/* </div> */}
      </div>
    );
  }
}
