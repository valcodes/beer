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
    // let shoppingCartDisplay = this.state.beer.map((element, index) => {
    //   return (
    //     <div className="shopping-cart-product-container" key={index}>
    //       <img src={element.beerimg} alt="" />
    //       <div className="shopping-cart-info">
    //         <h2>{element.beername}</h2>
    //         <h2>{"$" + Math.floor(Math.random() * 13 + 3) + ".00"}</h2>
    //         <div className="shopping-cart-button-container">
    //           <button
    //             className="shopping-cart-button"
    //             onClick={() => this.removeFromShoppingCart(element)}
    //           >
    //             Remove From Shopping Cart
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // });
    let shoppingCartDisplay = this.state.beer.map((element, index) => {
      return (
        <div className="columns is-multiline" key={index}>
          <div className="column is-one-fifth">
            <h3>{element.beername}</h3>
          </div>
          <div className="column is-one-fifth">{element.beerdesc}</div>

          <div className="column is-one-fifth">
            <h3>{"$" + Math.floor(Math.random() * 13 + 3) + ".00"}</h3>
          </div>

          <div className="column is-one-fifth">
            <img src={element.beerimg} alt="" className="product-tile__logo" />
          </div>
          <div className="column is-one-fifth">
            <button
              className="button is-warning"
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
        {/* <div className="shopping-cart-container"> */}
        <div className="column">
          {shoppingCartDisplay[0] ? (
            shoppingCartDisplay
          ) : (
            <div className="go-buy-something">
              <h1>Your shopping cart is empty! Go get some beer!</h1>
            </div>
          )}
          <Checkout
            name={"Secure Payment"}
            description={"Thank you for shopping with us"}
            amount={1}
          />
        </div>

        {/* <Checkout
          name={"Secure Payment"}
          description={"Thank you for shopping with us"}
          amount={1}
        /> */}
      </div>
    );
  }
}
