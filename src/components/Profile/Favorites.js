import React, { Component } from "react";
import axios from "axios";
import "../FavoritesList/FavoritesList.css";

export default class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beer: []
    };
  }

  componentDidMount() {
    axios.get("/api/me").then(response => {
      if (!response.data) this.setState({ userid: null });
      else this.setState({ userid: response.data.id });
    });

    axios.get("/api/favorites").then(response => {
      console.log(response);
      this.setState({ beer: response.data });
    });
  }

  render() {
    const beer = this.state.beer.map(beer => (
      <ul key="ugh">
        <li key="nokey">{beer.beername}</li>
        <li key="goaway">
          <img src={beer.beerimg} alt="beer" />
        </li>
      </ul>
    ));

    return (
      <div className="tile is-ancestor">
        <div className="tile is-6 box">{beer}</div>
      </div>
    );
  }
}
