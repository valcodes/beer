import React, { Component } from "react";
import axios from "axios";

export default class RandomBeer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beer: [],
      favorites: [0],

      downs: 0
      //add upvote prop to beer
    };
    this.upvote = this.upvote.bind(this);
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

  upvote = e => {
    console.log(e.target.value);
  };

  render() {
    const beer = this.state.beer.map(beer => (
      <ul>
        <li key={beer.name}>{beer.name}</li>
        <li key={beer.name}>
          <img src={beer.image_url} alt="beers here" />
        </li>
      </ul>
    ));

    return (
      <div className="favs">
        <div className="vote">
          <button className="up" onClick={this.upvote}>
            Upvotes – {this.state.ups}
          </button>

          <button
            className="down"
            onClick={() => {
              this.setState({ downs: this.state.downs + 1 });
            }}
          >
            Downvotes – {this.state.downs}
          </button>
        </div>
        <div className="beer">{beer}</div>
      </div>
    );
  }
}
