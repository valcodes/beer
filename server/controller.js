module.exports = {
  create: (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.body;
    // console.log(req.user);
    db
      .createFavorites([id, req.user.id])
      .then(favorites => res.status(200).send())
      .catch(() => res.status(500).send());
  },

  getFavs: (req, res, next) => {
    const db = req.app.get("db");
    db
      .getFavorites([req.user.id])
      .then(favorites => res.status(200).send(favorites))
      .catch(() => res.status(500).send());
  }
};
