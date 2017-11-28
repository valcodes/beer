const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const connectionString = require("./config").massive;
const { domain, clientID, clientSecret } = require("./config.js").auth0;
const { secret } = require("./config").session;
const controller = require("./controller");

const port = 3001;

const app = express();

app.use(json());
app.use(cors());

massive(connectionString)
  .then(db => app.set("db", db))
  .catch(console.log);

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain,
      clientID,
      clientSecret,
      callbackURL: "/login"
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
    successRedirect: "http://localhost:3000/favorites",
    failureRedirect: "/",
    failureFlash: true
  })
);

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

app.listen(port, () => {
  console.log(`Oh geeze Rick, Summer is listening on ${port}`);
});
