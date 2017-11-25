module.exports = {
  create: (req, res, next) => {
    const db = req.app.get("db");
    const {
      id,
      userid,
      image_url,
      description,
      food_pairing,
      brewers_tips,
      name
    } = req.body;
    console.log(req.body);
    db
      .createFavorites([
        id,
        userid,
        image_url,
        description,
        food_pairing,
        brewers_tips,
        name
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
  }
};
