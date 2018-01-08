import React from "react";
import { Switch, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import ShoppingCart from "./components/ShoppingCart";
import Random from "./components/FavoritesList/Random";
import Favorites from "./components/Profile/Favorites";
import Random2 from "./components/FavoritesList/Favs2";
import Random3 from "./components/FavoritesList/Favs3";

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/random" component={Random} />
    <Route path="/Favorites" component={Favorites} />
    <Route path="/cart" component={ShoppingCart} />

    <Route path="/random2" component={Random2} />
    <Route path="/random3" component={Random3} />
  </Switch>
);
