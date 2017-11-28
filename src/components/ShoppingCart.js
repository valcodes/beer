import React, { Component } from "react";
import axios from "axios";

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
      console.log(response);
      this.setState({ beer: response.data });
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
        <div className="shopping-cart-product-container" key={index}>
          <img src={element.image_url} alt="" />
          <div className="shopping-cart-info">
            <h2>{element.name}</h2>
            <h2>{"$" + element.price + ".00"}</h2>
            <div className="shopping-cart-button-container">
              <button
                className="shopping-cart-button"
                onClick={() => this.removeFromShoppingCart(element)}
              >
                Remove From Shopping Cart
              </button>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="shopping-cart-container">
        {shoppingCartDisplay[0] ? (
          shoppingCartDisplay
        ) : (
          <div className="go-buy-something">
            <h1>Your shopping cart is empty! Go get some beer!</h1>
          </div>
        )}
      </div>
    );
  }
}
