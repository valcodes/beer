import React, { Component } from "react";
import Favorite from "./FavoritesList/Favorite";
import { Link } from "react-router-dom";

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: true,
      modal: "is-active"
    };

    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal = () => {
    if (this.state.active) {
      this.setState({ active: false, modal: "is-active" });
    } else {
      this.setState({ active: true, modal: "modal" });
    }
  };

  render() {
    const modal = (
      <div className={this.state.modal}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.toggleModal}
            />
          </header>
          <section className="modal-card-body">
            <img src="http://www.coralbayspirits.com/images/Beer-&-Keg-Spout-Pouring.gif" />
          </section>
          <footer className="modal-card-foot" />
        </div>
      </div>
    );

    return (
      <div>
        <button onClick={this.toggleModal}>test</button>
        {modal}
      </div>
    );
  }
}
