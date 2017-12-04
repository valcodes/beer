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
      name: [],
      selectbeer: {}
    };
    this.removeFavorite = this.removeFavorite.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    axios.get("/api/me").then(response => {
      if (!response.data) this.setState({ userid: null });
      else this.setState({ userid: response.data.id });
    });

    axios.get("/api/favorites").then(response => {
      // console.log(response);
      this.setState({ beer: response.data });
    });
  }

  addToCart(beer) {
    // console.log(beer);
    axios
      .post("/api/shoppingcart", {
        beerid: beer.beerid,
        userid: beer.userid,
        beerimg: beer.beerimg,
        beerdesc: beer.beerdesc,
        foodpairing: beer.foodpairing,
        brewerstips: beer.brewerstips,
        beername: beer.beername,
        beerprice: Math.floor(Math.random() * 13 + 3)
      })
      .then(response => {
        // console.log(response);
      })
      .then(alert("Added to Cart"))
      .catch(console.log);
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
        selectbeer: beer,
        image_url: beer.beerimg,
        description: beer.beerdesc,
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
          <li>
            <h2>{beer.beername}</h2>
          </li>
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
        {this.state.userid.length === 0 ? (
          <div className="checkout-user">
            <h1>You must be logged in in order to use this feature</h1>
          </div>
        ) : (
          <div className="background">
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
                    alt="beer"
                    src="http://www.derekphillipsphotography.co.uk/images/cinemagraph/BeerPour.gif"
                  />
                  <p className="popups">
                    <strong>Description:</strong> {this.state.description}
                  </p>
                  <br />

                  <p className="popups">
                    <strong>Food pairing:</strong> {this.state.food_pairing}
                  </p>
                  <br />

                  <p className="popups">
                    <strong>Brewers tips: </strong>
                    {this.state.brewers_tips}
                  </p>
                </section>
                <footer className="modal-card-foot">
                  <button
                    className="button is-info"
                    key={this.state.beer.beerid}
                    onClick={() => this.addToCart(this.state.selectbeer)}
                  >
                    Add to Cart
                  </button>
                </footer>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
