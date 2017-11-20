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
      .get("https://api.punkapi.com/v2/beers/random")
      .then(results => {
        console.log(results);
        this.setState({
          beer: results.data,
          beerId: results.data[0].id,
          beerimg: results.data[0].image_url,
          beerdesc: results.data[0].description,
          foodpairing: results.data[0].food_pairing,
          brewerstips: results.data[0].brewers_tips,
          beername: results.data[0].name
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
    const beer = this.state.beer.map(beer => (
      <ul key="ugh">
        <li key="nokey">{beer.name}</li>
        <li key="goaway">
          <img src={beer.image_url} alt="beer" />
        </li>
      </ul>
    ));

    return (
      <div className="tile is-ancestor box">
        {/* <div className="tile ">
         
        </div> */}
        <div className="tile is-parent box">
          <button class="button is-primary " onClick={this.addToFavs}>
            LIKE ❤
          </button>
          <div class="tile is-child">
            <figure class="image is-1by2 " id="bubbles">
              {beer}
            </figure>
          </div>
        </div>
      </div>
    );
  }
}
