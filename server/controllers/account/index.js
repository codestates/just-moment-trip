const { account } = require("../../models");
const tokenHandler = require("../tokenHandler");

module.exports = {
  get: async (req, res) => {
    try {
      const validity = tokenHandler.accessTokenVerify(req);
      if (validity) {
        const data = await account.findAll({ where: { trip_id: req.params.trip_id } });
        res.status(200).json(data);
      }
    } catch (err) {
      res.status(500).send("Server Error Code 500");
    }
  },

  post: async (req, res) => {
    try {
      const validity = tokenHandler.accessTokenVerify(req);
      if (validity) {
        const { category, item_name, price, spent_person, target_currency, gps, memo, write_date } =
          req.body;
        const payload = {
          trip_id: req.params.trip_id,
          category: category,
          item_name: item_name,
          price: price,
          spent_person: spent_person,
          target_currency: target_currency,
          gps: gps,
          memo: memo,
          write_date: write_date,
        };
        const result = await account.create(payload);
        res.status(201).send({ id: result.id, message: "Successfully Account Post" });
      }
    } catch (err) {
      res.status(500).send("Server Error Code 500");
    }
  },
  delete: async (req, res) => {
    try {
      const validity = tokenHandler.accessTokenVerify(req);
      if (validity) {
        await account.destroy({
          where: { id: req.params.account_id },
        });
        res.status(200).json("Successfully Account Deleted");
      }
    } catch (err) {
      res.status(500).send("Server Error Code 500");
    }
  },
  patch: async (req, res) => {
    //patch 하나만 바꾸는거고 put은 모든거 지정(지정안한거 null됨)
    try {
      const validity = tokenHandler.accessTokenVerify(req);
      if (validity) {
        await account.update(
          { price: req.body.newPrice },
          { where: { id: req.params.account_id } }
        );
        res.status(200).json("Successfully Account Patch");
      }
    } catch (err) {
      res.status(500).send("Server Error Code 500");
    }
  },
};
