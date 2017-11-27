import React, { Component } from "react";
import axios from "axios";
import Modal from "../Modal";
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
      beername: [],
      disabled: false,
      active: true,
      modal: "modal"
    };
    this.addToFavs = this.addToFavs.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://api.punkapi.com/v2/beers")
      .then(results => {
        results.data.map((element, index) => {
          this.setState({
            beer: results.data,
            beerId: results.data[index].id,
            beerimg: results.data[index].image_url,
            beerdesc: results.data[index].description,
            foodpairing: results.data[index].food_pairing,
            brewerstips: results.data[index].brewers_tips,
            beername: results.data[index].name
          });
        });
      })
      .catch(console.log);

    axios.get("/api/me").then(response => {
      if (!response.data) this.setState({ userid: null });
      else this.setState({ userid: response.data.id });
    });
  }

  addToFavs(beer) {
    axios
      .post("http://localhost:3001/api/favorites", {
        userid: this.state.userid,
        id: beer.id,
        image_url: beer.image_url,
        description: beer.description,
        food_pairing: beer.food_pairing,
        brewers_tips: beer.brewers_tips,
        name: beer.name
      })
      .then(response => {
        console.log(response);
        this.setState({
          favorites: response.data
        });

        // disabled: true -cant get it to work with just one item
      })
      .catch(console.log);
  }
  toggleModal = () => {
    if (this.state.active) {
      this.setState({ active: false, modal: "is-active" });
    } else {
      this.setState({ active: true, modal: "modal" });
    }
  };

  render() {
    const beers = this.state.beer.map((beer, index) => (
      <div className="beer-container" key={index}>
        <div className={this.state.modal}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{beer.name}</p>
              <button
                className="delete"
                aria-label="close"
                onClick={this.toggleModal}
              />
            </header>
            <section className="modal-card-body">
              <img src={beer.image_url} height="200px" width="auto" />
              <p>{beer.description}</p>
              <p>{beer.food_pairing}</p>
              <p>{beer.brewers_tips}</p>
            </section>
            <footer className="modal-card-foot" />
          </div>
        </div>
        <ul>
          <button
            className="button is-primary"
            key={index}
            onClick={() => this.addToFavs(beer)}
            // disabled={this.state.disabled}
          >
            LIKE ❤
          </button>

          <li>
            <h2>{beer.name}</h2>
          </li>

          <li>
            <img
              onClick={this.toggleModal}
              src={beer.image_url}
              className="responsive-image"
              alt="beer"
            />
          </li>
        </ul>
      </div>
    ));

    return <div className="beer-display">{beers}</div>;
  }
}
