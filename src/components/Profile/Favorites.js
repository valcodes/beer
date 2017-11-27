import React, { Component } from "react";
import axios from "axios";

export default class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beer: [],
      userid: [],
      active: true,
      modal: "modal",
      image_url: [],
      description: [],
      food_pairing: [],
      brewers_tips: [],
      name: []
    };
    this.removeFavorite = this.removeFavorite.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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
      });
  }
  toggleModal = beer => {
    // console.log(beer);
    if (this.state.active) {
      this.setState({
        active: false,
        modal: "is-active",
        image_url: beer.beerimg,
        description: beer.desc,
        food_pairing: beer.foodpairing,
        brewers_tips: beer.brewerstips,
        name: beer.beername
      });
    } else {
      this.setState({ active: true, modal: "modal" });
    }
  };

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
            <img
              onClick={() => this.toggleModal(beer)}
              src={beer.beerimg}
              className="responsive-image"
              alt="beer"
            />
          </li>
        </ul>
      </div>
    ));

    return (
      <div>
        {this.state.modal === "is-active" ? (
          <div className="beer-display-fixed">{beer}</div>
        ) : (
          <div className="beer-display">{beer}</div>
        )}
        <div className={this.state.modal}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{this.state.name}</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => this.toggleModal(this.state.beer)}
              />
            </header>
            <section className="modal-card-body">
              <img
                className="beer-img"
                src="http://www.coralbayspirits.com/images/Beer-&-Keg-Spout-Pouring.gif"
              />
              <p className="popups">Description: {this.state.description}</p>

              <p className="popups">Food pairing: {this.state.food_pairing}</p>

              <p className="popups">Brewers tips: {this.state.brewers_tips}</p>
            </section>
            <footer className="modal-card-foot">
              <button className="warning">Add to Cart</button>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
