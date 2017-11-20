import React, { Component } from "react";
import axios from "axios";
import "./LandingPage.css";
import { Link } from "react-router-dom";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section class="hero is-info is-fullheight">
        <div class="hero-body">
          <div class="container has-text-centered">
            <div class="column is-6 is-offset-3">
              <h1 class="title">Your Favorite Beer</h1>
              <h2 class="subtitle">
                This is a placeholder for some random beer related bullshit i am
                going to find online
              </h2>
              <div class="box">
                <div class="field is-grouped">
                  <p class="control is-expanded">
                    <input
                      class="input"
                      type="text"
                      placeholder="What are you looking for?"
                    />
                  </p>
                  <p class="control">
                    <Link to="/random">
                      <a class="button is-black">Lets go!</a>
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
