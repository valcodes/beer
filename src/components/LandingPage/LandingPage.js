import React, { Component } from "react";
import axios from "axios";
import "./LandingPage.css";
import { Link } from "react-router-dom";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beer: []
    };
  }

  componentWillMount() {
    axios
      .get("https://api.punkapi.com/v2/beers")
      .then(results => {
        this.setState({
          beer: results.data
        });
      })
      .catch(console.log);
  }
  render() {
    const beer = this.state.beer.map(beer => (
      <ul key="no">
        <li key={beer.id}>{beer.name}</li>
        <li key="eh">
          <img src={beer.image_url} alt="beers here" />
        </li>
      </ul>
    ));

    return (
      <div className="tile is-ancestor box">
        <div class="tile is-child box">
          <figure class="image is-1by2 " id="bubbles">
            {beer}
          </figure>
        </div>
      </div>
    );
  }
}
