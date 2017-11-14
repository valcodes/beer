import React from "react";
import { Switch, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import FavoritesList from './components/FavoritesList/FavoritesList';
import Profile from './components/Profile/Profile';
import RandomBeer from './components/RandomBeer/RandomBeer';
import Login from './components/Login';


export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path ='/favorites'component ={FavoritesList} />
    <Route path ='/profile/:id' component ={Profile} />
    <Route path ='/random' component ={RandomBeer} />
<Route path ='/login' component= {Login} />
   
  </Switch>
);