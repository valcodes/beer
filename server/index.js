const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const axios = require("axios");
require("dotenv").config();
const Auth0Strategy = require("passport-auth0");
// const connectionString = require("./config").massive;
// const { domain, clientID, clientSecret } = require("./config.js").auth0;
// const { secret } = require("./config").session;
const controller = require("./controller");
const SERVER_CONFIGS = require("./constants/server");
const configureServer = require("./server");
// const configureRoutes = require("./routes/index");
const configureRoutes = require("./routes");
// const dotenv = require("./dotenv");

const configureStripe = require("stripe");
// const stripe = configureStripe(process.env.STRIPE_SECRET_KEY);
const port = 3001;

const app = express();
configureServer(app);

configureRoutes(app);

app.use(json());
app.use(cors());

massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(console.log);

app.use(
  session({
    secret: process.env.SECRET,
    resave: process.env.RESAVE,
    saveUninitialized: process.env.SAVEUNINITIALIZED
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(`${__dirname}/../build`));

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,

      callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      app
        .get("db")
        .getUserByAuthId(profile.id)
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .createUserByAuth([profile.id, profile.displayName])
              .then(created => {
                // console.log(created);
                return done(null, created[0]);
              });
          } else {
            return done(null, response[0]);
          }
        });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT,
    failureFlash: true
  })
);

app.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
///original setting was redirecting to localhost 3001, workaround^^ , also in navbar

app.get("/api/me", function(req, res) {
  if (!req.user) return res.status(404);
  res.status(200).json(req.user);
});

app.get("/api/favorites", controller.getFavs);
app.post("/api/favorites", controller.create);
app.delete("/api/favorites", controller.deleteFavs);
app.post("/api/shoppingcart", controller.createCart);
app.delete("/api/shoppingcart", controller.deleteCart);
app.get("/api/shoppingcart", controller.getCart);
app.get("/api/popular", controller.getPopular);

app.get("/api/getbeer", (req, res, next) => {
  console.log("server");
  axios
    .get(
      `http://api.brewerydb.com/v2/beers/?key=${
        process.env.API_KEY
      }&hasLabels=Y&withBreweries=Y`
    )
    .then(response => {
      return res.send(response.data);
    })
    .catch(console.log);
});
app.get("/api/searchbeer", (req, res, next) => {
  console.log("server");
  axios
    .get(
      `http://api.brewerydb.com/v2/beers/?key=${
        process.env.API_KEY
      }&hasLabels=Y&withBreweries=Y&q=${params}`
    )
    .then(response => {
      return res.send(response.data);
    })
    .catch(console.log);
});

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(SERVER_CONFIGS.PORT, () => {
  console.log(`Oh geeze Rick, Summer is listening on ${SERVER_CONFIGS.PORT}`);
});
