import React from "react";
import { Switch, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import ShoppingCart from "./components/ShoppingCart";
import Random from "./components/FavoritesList/Random";
import Favorites from "./components/Profile/Favorites";

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/random" component={Random} />
    <Route path="/Favorites" component={Favorites} />
    <Route path="/cart" component={ShoppingCart} />
  </Switch>
);
