import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beername: [],
      beerdesc: []
    };
  }
  componentDidMount() {
    axios.get("/api/popular").then(response => {
      this.setState({
        beername: response.data[0].beername,
        beerdesc: response.data[0].beerdesc
      });
    });
  }

  render() {
    return (
      <div className="main-page">
        <section className="hero is-info is-medium is-bold">
          <div className="hero-head" />

          <div className="hero-body">
            <div className="container has-text-centered" id="shadow">
              <h1 className="title">Find your new favorite beer here</h1>
              <h2 className="subtitle">
                Explore various styles and find your new favorite!
              </h2>
            </div>
          </div>
        </section>

        <div className="box cta">
          <p className="has-text-centered">
            <span className="tag is-primary">New</span>
            <nbsp /> <nbsp /> <nbsp />You now have the ability to purchase your
            favorite beers directly from our website
          </p>
        </div>

        <section className="container">
          <div className="columns features">
            <div className="column is-4">
              <div className="card">
                <div className="card-image has-text-centered">
                  <i className="fa fa-paw" />
                </div>
                <div className="card-content">
                  <div className="content">
                    <h4>Featured beer of the day: Electric India </h4>
                    <p>
                      Re-brewed as a spring seasonal, this beer – which appeared
                      originally as an Equity Punk shareholder creation –
                      retains its trademark spicy, fruity edge. A perfect blend
                      of Belgian Saison and US IPA, crushed peppercorns and
                      heather honey are also added to produce a genuinely unique
                      beer.
                    </p>
                    <p>
                      <a href="/random">Discover more like this</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-4">
              <div className="card">
                <div className="card-image has-text-centered">
                  <i className="fa fa-id-card-o" />
                </div>
                <div className="card-content">
                  <div className="content">
                    <h4>Our most favorited beer: {this.state.beername}</h4>
                    <p>{this.state.beerdesc}</p>
                    <p>
                      <a href="/random">Explore our selection</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-4">
              <div className="card">
                <div className="card-image has-text-centered">
                  <i className="fa fa-rocket" />
                </div>
                <div className="card-content">
                  <div className="content">
                    <h4> Chosing the perfect craft beer: </h4>
                    <p>
                      Buying beer used to involve as much choice as shopping in
                      a Soviet supermarket, and Budweiser and Miller loved it
                      that way. But these days, with the explosion in craft
                      beer, the selection is overwhelming. Choosing a beer can
                      be stressful enough to drive you to drink! Here are
                      suggestions to help you find the right beer.
                    </p>
                    <p>
                      <a href="https://www.thebigjewel.com/choosing-the-perfect-craft-beer-a-guide-for-the-perplexed">
                        Learn more
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-main">
            <div className="intro column is-8 is-offset-2">
              {/* <h2 className="title">Food pairing</h2> */}
              <br />
              <p className="subtitle" id="no-shadow">
                <em>
                  “You can't be a real country unless you have a beer and an
                  airline - it helps if you have some kind of football team, or
                  some nuclear weapons, but in the very least you need a beer.”{" "}
                </em>
                <br />
                <br />
                -Frank Zappa
              </p>
            </div>
          </div>
        </section>
        <footer className="footer">
          <div className="content has-text-centered">
            <p className="title" id="shadow">
              Bottoms up!
            </p>
          </div>
        </footer>
      </div>
    );
  }
}
