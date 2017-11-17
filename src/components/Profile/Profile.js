import React, { Component } from "react";
import axios from "axios";
import "../FavoritesList/FavoritesList.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beer: []
    };
    // this.addToFavs = this.addToFavs.bind(this);
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

  // addToFavs = e => {
  //   console.log(e.target.value);
  // };

  // addToFavs() {

  //   this.setState({
  //     favorites: true
  //   });
  // }
  // addToFavs() {
  //  axios.post("/api/favorites", { id: this.state.beerId }).then(response => {
  //     this.setState({ favorites: response.data });
  //   });
  // }

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
      <div className="favs">
        <div className="vote">
          {/* <button className="up" onClick={this.addToFavs}>
            LIKE ❤
          </button> */}
        </div>
        <div className="beer">{beer}</div>
      </div>
    );
  }
}
