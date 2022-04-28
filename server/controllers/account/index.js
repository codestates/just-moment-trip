const { account } = require("../../models");
const tokenHandler = require("../tokenHandler");
const slack = require("../slack");

module.exports = {
  get: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req);
      if (validity) {
        const data = await account.findAll({ where: { trip_id: req.params.trip_id } });
        await slack.slack("Account Get 200", `id : ${data[0].id} ~ ${data[data.length - 1].id}`);
        res.status(200).send({ data: data, accessToken: validity.accessToken });
      }
    } catch (err) {
      await slack.slack("Account Get 501");
      res.status(501).send("Acoount Get");
    }
  },

  post: async (req, res) => {
    try {
      const { category, item_name, price, spent_person, target_currency, gps, memo, write_date } =
        req.body;
      if (!category || !item_name || !price || !spent_person || !target_currency || !write_date) {
        await slack.slack("Account Post 422");
        return res.status(422).send({ message: "insufficient parameters supplied" });
      }
      const validity = await tokenHandler.accessTokenVerify(req);
      if (validity) {
        const payload = {
          trip_id: req.params.trip_id,
          category,
          item_name,
          price,
          spent_person,
          target_currency,
          gps,
          memo,
          write_date,
        };
        const result = await account.create(payload);
        await slack.slack("Account Post 201", `id : ${result.id}`);
        res.status(201).send({ id: result.id, accessToken: validity.accessToken });
      }
    } catch (err) {
      await slack.slack("Account Post 501");
      res.status(501).send("Account Post");
    }
  },
  delete: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req);
      if (validity) {
        const id = req.params.account_id;
        await account.destroy({
          where: { id: id },
        });
        await slack.slack("Account Delete 200", `id : ${id}`);
        res.status(200).send({ accessToken: validity.accessToken });
      }
    } catch (err) {
      await slack.slack("Account Delete 501");
      res.status(501).send("Account Delete");
    }
  },
  patch: async (req, res) => {
    //patch 하나만 바꾸는거고 put은 모든거 지정(지정안한거 null됨)
    try {
      const validity = await tokenHandler.accessTokenVerify(req);
      if (validity) {
        const id = req.params.account_id;
        await account.update({ price: req.body.newPrice }, { where: { id: id } });
        await slack.slack("Account Patch 200", `id : ${id}`);
        res.status(200).sned({ accessToken: validity.accessToken });
      }
    } catch (err) {
      await slack.slack("Account Patch 501");
      res.status(501).send("Account Patch");
    }
  },
};
