import React, { Component } from "react";
import axios from "axios";
import "../FavoritesList/FavoritesList.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beer: [],
      beerId: 0,
      favorites: [],
      user: []
    };
    // this.addToFavs = this.addToFavs.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://api.punkapi.com/v2/beers/random")
      .then(results => {
        this.setState({
          beer: results.data,
          beerId: results.data[0].id
        });
      })
      .catch(console.log);

    axios.get("/api/me").then(response => {
      console.log("req.user", response);
      if (!response.data) this.setState({ user: null });
      else this.setState({ user: response.data.id });
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
        <li key="nokey">{beer.name}</li>
        <li key="goaway">
          <img src={beer.image_url} alt="beer" />
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
