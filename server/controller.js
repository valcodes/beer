module.exports = {
  create: (req, res, next) => {
    const db = req.app.get("db");
    const {
      id,
      userid,
      image_url,
      description,
      breweryname,
      brewerydesc,
      beername
    } = req.body;

    db
      .createFavorites([
        id,
        userid,
        image_url,
        description,
        breweryname,
        brewerydesc,
        beername
      ])
      .then(favorites => res.status(200).send(favorites))
      .catch(err => res.status(500).send(err));
  },

  getFavs: (req, res, next) => {
    const db = req.app.get("db");
    db
      .getFavorites([req.user.id])
      .then(favorites => res.status(200).send(favorites))
      .catch(() => res.status(500).send());
  },

  deleteFavs: (req, res, next) => {
    const db = req.app.get("db");
    const { query } = req;

    db
      .deleteFromFavs([query.beerid, query.userid])
      .then(favorites => res.status(200).send(favorites))
      .catch(() => res.status(500).send());
  },

  createCart: (req, res, next) => {
    const db = req.app.get("db");
    const {
      beerid,
      userid,
      beerimg,
      beerdesc,
      foodpairing,
      brewerstips,
      beername,
      beerprice
    } = req.body;

    db
      .addToCart([
        beerid,
        userid,
        beerimg,
        beerdesc,
        foodpairing,
        brewerstips,
        beername,
        beerprice
      ])
      .then(shoppingcart => res.status(200).send(shoppingcart))
      .catch(err => res.status(500).send(err));
  },

  deleteCart: (req, res, next) => {
    const db = req.app.get("db");
    const { query } = req;

    db
      .deleteFromCart([query.beerid, query.userid])
      .then(shoppingcart => res.status(200).send(shoppingcart))
      .catch(() => res.status(500).send());
  },

  getCart: (req, res, next) => {
    const db = req.app.get("db");
    db
      .getShoppingCart([req.user.id])
      .then(shoppingcart => res.status(200).send(shoppingcart))
      .catch(() => res.status(500).send());
  },

  getPopular: (req, res, next) => {
    const db = req.app.get("db");
    db
      .getMostPopular(req)
      .then(favorites => res.status(200).send(favorites))
      .catch(() => res.status(500).send());
  }
};
