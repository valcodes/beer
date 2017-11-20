import React from "react";
import { Switch, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import Favorite from "./components/FavoritesList/Favorite";
import Random from "./components/FavoritesList/Random";
import Favorites from "./components/Profile/Favorites";
import RandomBeer from "./components/RandomBeer/RandomBeer";

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/random" component={Random} />
    <Route path="/Favorites/:id" component={Favorites} />
    <Route path="/random" component={RandomBeer} />
  </Switch>
);
