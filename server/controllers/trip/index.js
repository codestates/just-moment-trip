const { trip } = require("../../models");
const tokenHandler = require("../tokenHandler");
const slack = require("../slack");
module.exports = {
  get: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req);
      if (validity) {
        const data = await trip.findAll();
        await slack.slack("Trip Get 200", `id : ${data[0].id} ~ ${data[data.length - 1].id}`);
        res.status(200).send({ data: data, accessToken: validity.accessToken });
      }
    } catch (err) {
      await slack.slack("Trip Get 501");
      res.status(501).send("Trip Get");
    }
  },

  post: async (req, res) => {
    try {
      const { title, country, total_price, base_currency, start_date, end_date } = req.body;
      if (!title || !country || !total_price || !base_currency || !start_date || !end_date) {
        await slack.slack("Trip Post 422");
        return res.status(422).send({ message: "insufficient parameters supplied" });
      }

      const validity = await tokenHandler.accessTokenVerify(req);
      if (validity) {
        const payload = {
          user_id: validity.id,
          title,
          country,
          total_price,
          base_currency,
          start_date,
          end_date,
        };
        const result = await trip.create(payload);
        await slack.slack("Trip Post 201", `id : ${result.id}`);
        res.status(201).send({ id: result.id, accessToken: validity.accessToken });
      }
    } catch (err) {
      await slack.slack("Trip Post 501");
      res.status(501).send("Trip Post");
    }
  },
  delete: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req);
      if (validity) {
        const id = req.params.trip_id;
        await trip.destroy({
          where: { id: id },
        });
        await slack.slack("Trip Delete 200", `id : ${id}`);
        res.status(200).send({ accessToken: validity.accessToken });
      }
    } catch (err) {
      await slack.slack("Trip Delete 501");
      res.status(501).send("Trip Delete");
    }
  },
};
//트립 삭제
