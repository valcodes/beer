import React, { Component } from "react";
import axios from "axios";

export default class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beer: [],
      userid: []
    };
    this.removeFavorite = this.removeFavorite.bind(this);
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

    axios.get("/api/me").then(response => {
      if (!response.data) this.setState({ userid: null });
      else this.setState({ userid: response.data.id });
    });
  }
  removeFavorite(beer) {
    axios
      .delete(
        `/api/favorites?beerid=${beer.beerid}&userid=${this.state.userid}`
      )
      .then(response => {
        const newFavorites = this.state.beer;
        newFavorites.splice(newFavorites.indexOf(beer), 1);
        this.setState({
          beer: newFavorites
        });
        console.log(beer.beerid);
      });
  }

  render() {
    const beer = this.state.beer.map((beer, index) => (
      <div className="beer-container" key={index}>
        <ul>
          <button
            className="button is-danger"
            key={index}
            onClick={() => this.removeFavorite(beer)}
          >
            Remove
          </button>
          <li>{beer.beername}</li>
          <li>
            <img src={beer.beerimg} className="responsive-image" alt="beer" />
          </li>
        </ul>
      </div>
    ));

    return <div className="beer-display">{beer}</div>;
  }
}
