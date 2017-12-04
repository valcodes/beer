import React, { Component } from "react";
import axios from "axios";
import Checkout from "./Checkout";
import "../App.css";

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beer: [],
      userid: [],
      image_url: [],
      description: [],
      food_pairing: [],
      brewers_tips: [],
      name: []
    };
    this.removeFromShoppingCart = this.removeFromShoppingCart.bind(this);
  }

  componentDidMount() {
    axios.get("/api/me").then(response => {
      if (!response.data) this.setState({ userid: null });
      else this.setState({ userid: response.data.id });
    });
    axios.get("/api/shoppingcart").then(response => {
      // console.log(response);
      this.setState({
        beer: response.data
      });
    });
  }

  removeFromShoppingCart(beer) {
    axios
      .delete(
        `/api/shoppingcart?beerid=${beer.beerid}&userid=${this.state.userid}`
      )
      .then(response => {
        const newShoppingCart = this.state.beer;
        newShoppingCart.splice(newShoppingCart.indexOf(beer), 1);
        this.setState({
          beer: newShoppingCart
        });
      });
  }

  render() {
    let shoppingCartDisplay = this.state.beer.map((element, index) => {
      return (
        <div className="columns is-multiline" key={index} id="remove">
          <div className="column is-one-fifth" id="two">
            <div>
              <ul>
                <li>
                  <strong>{element.beername}</strong>
                </li>
                <li>{"$" + element.beerprice + ".00"}</li>
              </ul>
            </div>
            <div>
              <img
                src={element.beerimg}
                alt=""
                className="product-tile__logo"
              />
            </div>
          </div>
          <div className="column is-auto">{element.brewerstips}</div>

          <div className="column is-one-fifth" id="checkout-remove">
            <button
              className="button is-danger"
              onClick={() => this.removeFromShoppingCart(element)}
            >
              Remove
            </button>
          </div>
        </div>
      );
    });

    return (
      <div>
        {this.state.userid.length === 0 ? (
          <div className="checkout-user">
            <h1>You must be logged in in order to use this feature</h1>
          </div>
        ) : (
          <div className="columns is-multiline" id="cart-content">
            <div className="column is-auto">
              {shoppingCartDisplay[0] ? (
                shoppingCartDisplay
              ) : (
                <div className="go-buy-something">
                  <h1>Your shopping cart is empty! Go get some beer!</h1>
                </div>
              )}
            </div>
            <div className="column is-one-fifth" id="checkout">
              <div>
                Total: $
                {this.state.beer.reduce(
                  (total, el) => (total += +el.beerprice),
                  0
                )}.00
              </div>
              <div>
                <Checkout
                  name={"Secure Payment"}
                  description={"Thank you for shopping with us"}
                  amount={this.state.beer.reduce(
                    (total, el) => (total += +el.beerprice),
                    0
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
