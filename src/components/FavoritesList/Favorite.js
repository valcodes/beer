import React, { Component } from "react";
import axios from "axios";

export default class Favorite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nobeer: [],
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
      .get("/api/getbeer")
      .then(results => {
        this.setState({
          beer: results.data.data
        });
      })
      .catch(console.log);

    axios.get("/api/me").then(response => {
      if (!response.data) this.setState({ userid: null });
      else this.setState({ userid: response.data.id });
    });
  }
  handleSearch(val) {
    this.setState({
      search: val
    });
  }
  searchSubmit(search) {
    axios
      .get(`/api/searchbeer/${search}`)
      .then(response => {
        if (response.data.data === undefined) {
          alert("Beer not found, please try again");
          window.location.href = "/random";
        } else this.setState({ beer: response.data.data });
      })
      .catch(console.log);
  }

  addToFavs(beer) {
    axios
      .post("/api/favorites", {
        userid: this.state.userid,
        id: beer.id,
        image_url: !beer.labels
          ? "http://wfarm4.dataknet.com/static/resources/icons/set140/3c69124d.png"
          : beer.labels.medium,
        description: beer.description || beer.style.description,
        breweryname: beer.breweries[0].name,
        brewerydesc: beer.breweries[0].description,
        beername: beer.nameDisplay
      })
      .then(response => {
        this.setState({ favId: response.data[0].beerid });
      })
      .catch(console.log);
  }

  toggleModal = beer => {
    if (this.state.active) {
      this.setState({
        active: false,
        modal: "is-active",
        beerimg: !beer.labels
          ? "http://wfarm4.dataknet.com/static/resources/icons/set140/3c69124d.png"
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
    const beers = this.state.beer.map((beer, index) => {
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
                  src="http://wfarm4.dataknet.com/static/resources/icons/set140/3c69124d.png"
                  className="responsive-image"
                  alt="beer"
                />
              </li>
            ) : (
              <li>
                <img
                  onClick={() => this.toggleModal(beer)}
                  src={beer.labels.large}
                  className="responsive-image"
                  alt="beer"
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
            <div
              className="field has-addons"
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              <div className="control is-expanded">
                <input
                  className="input"
                  type="text"
                  placeholder="search"
                  onChange={e => this.handleSearch(e.target.value)}
                />
              </div>
              <div className="control">
                <a
                  className="button is-warning"
                  onClick={val => this.searchSubmit(this.state.search)}
                >
                  Search
                </a>
              </div>
            </div>

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
