import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = { userid: [] };

    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin() {
    window.location.href = "/login";
    // window.location.href = "http://localhost:3001/login";
  }
  componentDidMount() {
    axios.get("/api/me").then(response => {
      if (!response.data) this.setState({ userid: null });
      else this.setState({ userid: response.data.id });
    });
  }

  render() {
    return (
      <nav className="navbar is-white">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="../">
              <img
                src="http://res.freestockphotos.biz/pictures/11/11921-illustration-of-a-foamy-mug-of-beer-pv.png"
                width="auto"
                height="110px"
                alt="Logo"
              />
            </a>
            <nav
              className="navbar-burger"
              data-target="navbarMenu"
              onClick={() => {
                let toggle = document.querySelector(".nav-toggle");
                let menu = document.querySelector(".navbar-menu");
                toggle.classList.toggle("is-active");
                menu.classList.toggle("is-active");
              }}
            >
              <span className="nav-toggle" />
              <span className="nav-toggle" />
              <span className="nav-toggle" />
              <span className="nav-toggle" />
              <span className="nav-toggle" />
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
              <Link className="navbar-item" to="/cart">
                Cart
              </Link>
              <a className="navbar-item " onClick={this.handleLogin}>
                {this.state.userid.length !== 0 ? (
                  <a href="/api/logout"> Logout </a>
                ) : (
                  "Login"
                )}
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
