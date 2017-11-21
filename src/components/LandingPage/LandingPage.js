import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class LandingPage extends Component {
  render() {
    return (
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-6 is-offset-3">
              <h1 className="title">Your Favorite Beer</h1>
              <h2 className="subtitle">
                This is a placeholder for some random beer related bullshit i am
                going to find online
              </h2>
              <div className="box">
                <div className="field is-grouped">
                  <p className="control is-expanded">
                    <input
                      className="input"
                      type="text"
                      placeholder="What are you looking for?"
                    />
                  </p>
                  <p className="control">
                    <Link to="/random">
                      <a className="button is-black">Lets go!</a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
