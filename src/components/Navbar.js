import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin() {
    window.location.href = "http://localhost:3001/login";
  }

  render() {
    return (
      <div class="hero-head">
        <nav class="navbar is-black">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item" href="../">
                {/* <img
                src="http://bulma.io/images/bulma-type-white.png"
                alt="Logo"
              /> */}
                Logo Here
              </a>
              <nav class="navbar-burger" data-target="navbarMenu">
                <span />
                <span />
                <span />
                <span />
              </nav>
            </div>

            <div id="navbarMenu" class="navbar-menu">
              <div class="navbar-end">
                <Link class="navbar-item" to="/">
                  Home
                </Link>

                <Link class="navbar-item" to="/random">
                  Random
                </Link>
                <Link class="navbar-item" to="/Favorites/:id">
                  Favorites
                </Link>
                <a className="navbar-item " onClick={this.handleLogin}>
                  Login
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
