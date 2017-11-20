import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      //   <nav className="navbar is-black">
      //     <div className="navbar-brand">
      //       <span className="navbar-burger burger">
      //         <span>
      //           {" "}
      //           <Link to="/"> Home </Link>
      //         </span>

      //         <span>
      //           {" "}
      //           <Link to="/profile/:id"> Profile </Link>
      //         </span>

      //         <span>
      //           {" "}
      //           <Link to="/favorites">Favorites</Link>
      //         </span>

      //         <span>
      //           {" "}
      //           <Link to="/login">Login</Link>
      //         </span>
      //       </span>
      //       <div className="navbar-menu">
      //         <Link to="/"> Home </Link>

      //         <Link to="/profile/:id"> Profile </Link>
      //         <Link to="/favorites">Favorites</Link>
      //         <Link to="/login">Login</Link>
      //       </div>
      //     </div>
      //   </nav>

      <nav class="navbar is-black">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item" href="../">
              <img
                src="http://bulma.io/images/bulma-type-white.png"
                alt="Logo"
              />
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
              <Link class="navbar-item is-active" to="/">
                Home
              </Link>

              <Link class="navbar-item" to="/favorites">
                Favorites
              </Link>
              <Link class="navbar-item" to="/profile/:id">
                Profile
              </Link>
              <Link class="navbar-item" to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
