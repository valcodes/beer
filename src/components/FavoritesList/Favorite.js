import React, { Component } from "react";
import axios from "axios";
import "./FavoritesList.css";

export default class Favorite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beer: [],
      beerId: 0,
      favorites: [],
      userid: [],
      beerimg: [],
      beerdesc: [],
      foodpairing: [],
      brewerstips: [],
      beername: []
    };
    this.addToFavs = this.addToFavs.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://api.punkapi.com/v2/beers")
      .then(results => {
        console.log(results);
        this.setState({
          beer: results.data,
          beerId: results.data.id,
          beerimg: results.data.image_url,
          beerdesc: results.data.description,
          foodpairing: results.data.food_pairing,
          brewerstips: results.data.brewers_tips,
          beername: results.data.name
        });
      })
      .catch(console.log);

    axios.get("/api/me").then(response => {
      if (!response.data) this.setState({ userid: null });
      else this.setState({ userid: response.data.id });
    });
  }

  addToFavs() {
    axios
      .post("http://localhost:3001/api/favorites", {
        userid: this.state.userid,
        id: this.state.beerId,
        image_url: this.state.beerimg,
        description: this.state.beerdesc,
        food_pairing: this.state.foodpairing,
        brewers_tips: this.state.brewerstips,
        name: this.state.beername
      })
      .then(response => {
        this.setState({ favorites: response.data });
      })
      .catch(console.log);
  }

  render() {
    console.log(this.state.favorites);
    const beer = this.state.beer.map((beer, index) => (
      <ul key={index}>
        <button className="button is-primary " onClick={this.addToFavs}>
          LIKE ❤
        </button>
        <li>{beer.name}</li>
        <li>
          <img src={beer.image_url} alt="beer" />
        </li>
      </ul>
    ));

    return (
      <div className="tile  ">
        {/* <div className="tile is-parent ">
          {/* <button class="button is-primary " onClick={this.addToFavs}>
            LIKE ❤
          </button> */}

        {/* <figure class="image is-1by2 " id="bubbles"> */}
        {beer}
        {/* </figure> */}
        {/* </div> */}
      </div>
    );
  }
}
