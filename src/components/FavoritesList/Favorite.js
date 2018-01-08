import React, { Component } from "react";
import axios from "axios";

export default class Favorite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beertest: [],
      beer: [],
      beerId: 0,
      favorites: [],
      favId: null,
      userid: [],
      beerimg: [],
      beerdesc: [],
      brewery_name: [],
      brewery_desc: [],
      beername: [],
      disabled: false,
      active: true,
      modal: "modal",
      search: []
    };
    this.addToFavs = this.addToFavs.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  componentDidMount() {
    axios
<<<<<<< HEAD
      .get("https://api.punkapi.com/v2/beers")
=======
      .get("http://localhost:3001/api/getbeer")
>>>>>>> be730a87fe1069c3c3f5c94034ff4f22535efb39
      .then(results => {
        console.log(results.data);
        this.setState({
          beer: results.data.data
        });
      })
      .catch(console.log);

    axios.get("http://localhost:3001/api/me").then(response => {
      if (!response.data) this.setState({ userid: null });
      else this.setState({ userid: response.data.id });
    });
  }
  handleSearch(val) {
    console.log(this.state.search);
    this.setState({
      search: val
    });
  }
  searchSubmit(search) {
    axios
      .get(`http://localhost:3001/api/searchbeer/${search}`)
      .then(response => {
        this.setState({ beer: response.data.data });
      })
      .catch(console.log);
  }

  addToFavs(beer) {
    axios
      .post("/api/favorites", {
        userid: this.state.userid,
        id: beer.id,
        image_url: !beer.labels
          ? "http://www.derekphillipsphotography.co.uk/images/cinemagraph/BeerPour.gif"
          : beer.labels.medium,
        description: beer.description || beer.style.description,
        breweryname: beer.breweries[0].name,
        brewerydesc: beer.breweries[0].description,
        beername: beer.nameDisplay
      })
      .then(response => {
        console.log(response);
        this.setState({ favId: response.data[0].beerid });
      })
      .catch(console.log);
  }

  toggleModal = beer => {
    console.log(beer);
    if (this.state.active) {
      this.setState({
        active: false,
        modal: "is-active",
        beerimg: !beer.labels
          ? "http://www.derekphillipsphotography.co.uk/images/cinemagraph/BeerPour.gif"
          : beer.labels.medium,
        description: beer.description || beer.style.description,
        brewery_name: beer.breweries[0].name,
        brewery_desc: beer.breweries[0].description,
        beername: beer.nameDisplay
      });
    } else {
      this.setState({ active: true, modal: "modal" });
    }
  };

  render() {
    console.log(this.state.beertest);

    const beers = this.state.beer.map((beer, index) => {
      //   console.log(beer);
      return (
        <div className="beer-container" key={index}>
          <ul>
            {this.state.favId !== beer.id ? (
              <button
                className="button is-primary"
                key={index}
                onClick={() => this.addToFavs(beer)}
              >
                LIKE ❤
              </button>
            ) : (
              <button
                className="button is-danger"
                key={index}
                onClick={() => this.addToFavs(beer)}
              >
                ❤
              </button>
            )}

            <li>
              <h2>{beer.nameDisplay}</h2>
            </li>

            {!beer.labels ? (
              <li>
                <img
                  onClick={() => this.toggleModal(beer)}
                  src="http://www.derekphillipsphotography.co.uk/images/cinemagraph/BeerPour.gif"
                  className="responsive-image"
                  alt="http://lorempixel.com/300/300/food/"
                />
              </li>
            ) : (
              <li>
                <img
                  onClick={() => this.toggleModal(beer)}
                  src={beer.labels.large}
                  className="responsive-image"
                  alt="http://lorempixel.com/300/300/food/"
                />
              </li>
            )}
          </ul>
        </div>
      );
    });

    return (
      <div className="background">
        {this.state.modal === "is-active" ? (
          <div className="beer-display-fixed">{beers}</div>
        ) : (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                // e.stopPropagation();
              }}
            >
              <input
                className="input is-large is-primary is-rounded"
                placeholder="Search"
                onChange={e => this.handleSearch(e.target.value)}
                id="searchbar"
                onSubmit={val => this.searchSubmit(this.state.search)}
              />
              <button
                type="button"
                className="button is-warning"
                onClick={val => this.searchSubmit(this.state.search)}
              >
                Search
              </button>
            </form>

            <div className="beer-display">{beers}</div>
          </div>
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
              <img className="beer-img" alt="beer" src={this.state.beerimg} />
              <p className="popups">
                <strong> Details:</strong> {this.state.description}
              </p>
              <br />

              <p className="popups">
                <strong>Brewery Name:</strong> {this.state.brewery_name}
              </p>
              <br />

              <p className="popups">
                <strong>Brewery Details:</strong> {this.state.brewery_desc}
              </p>
            </section>
            <footer className="modal-card-foot" />
          </div>
        </div>
      </div>
    );
  }
}
