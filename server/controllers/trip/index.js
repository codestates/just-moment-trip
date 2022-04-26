const { trip } = require("../../models");
const tokenHandler = require("../tokenHandler");
module.exports = {
  get: async (req, res) => {
    try {
      const validity = tokenHandler.accessTokenVerify(req);
      if (validity) {
        const data = await trip.findAll();
        res.status(200).send(data);
      }
    } catch (err) {
      res.status(501).send("Trip Get");
    }
  },

  post: async (req, res) => {
    try {
      const validity = tokenHandler.accessTokenVerify(req);
      if (validity) {
        const { title, country, total_price, base_currency, start_date, end_date } = req.body;
        const payload = {
          user_id: validity.id,
          title: title,
          country: country,
          total_price: total_price,
          base_currency: base_currency,
          start_date: start_date,
          end_date: end_date,
        };

        const result = await trip.create(payload);
        res.status(201).send({ id: result.id });
      }
    } catch (err) {
      res.status(501).send("Trip Post");
    }
  },
  delete: async (req, res) => {
    try {
      const validity = tokenHandler.accessTokenVerify(req);
      if (validity) {
        res.status(200).send();
        await trip.destroy({
          where: { id: req.params.trip_id },
        });
      }
    } catch (err) {
      res.status(501).send("Trip Delete");
    }
  },
};
//트립 삭제
