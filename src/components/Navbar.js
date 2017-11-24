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
      <div className="hero-head">
        <nav className="navbar is-black">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="../">
                {/* <img
                src="http://bulma.io/images/bulma-type-white.png"
                alt="Logo"
              /> */}
                Logo Here
              </a>
              <nav className="navbar-burger" data-target="navbarMenu">
                <span />
                <span />
                <span />
                <span />
              </nav>
            </div>

            <div id="navbarMenu" className="navbar-menu">
              <div className="navbar-end">
                <Link className="navbar-item" to="/">
                  Home
                </Link>

                <Link className="navbar-item" to="/random">
                  Random
                </Link>
                <Link className="navbar-item" to="/Favorites">
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
