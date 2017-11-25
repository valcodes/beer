import React, { Component } from "react";
import router from "./router";
import "./App.css";
import Navbar from "./components/Navbar";

export default class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     favorites: []
  //   };
  //   this.addtoFavs = this.addToFavs.bind(this);
  // }

  // addToFavs() {
  //   axios
  //     .post("http://localhost:3001/api/favorites", {
  //       userid: this.state.userid,
  //       id: this.state.beerId,
  //       image_url: this.state.beerimg,
  //       description: this.state.beerdesc,
  //       food_pairing: this.state.foodpairing,
  //       brewers_tips: this.state.brewerstips,
  //       name: this.state.beername
  //     })
  //     .then(response => {
  //       this.setState({ favorites: response.data });
  //     })
  //     .catch(console.log);
  // }
  render() {
    return (
      <div className="App">
        <Navbar />
        {router}
      </div>
    );
  }
}
