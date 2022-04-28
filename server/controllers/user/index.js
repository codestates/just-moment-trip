const { user } = require("../../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenHandler = require("../tokenHandler");
const slack = require("../slack");

module.exports = {
  get: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req);
      if (validity) {
        const data = await user.findAll();
        await slack.slack("User Get 200", `id : ${data[0].id} ~ ${data[data.length - 1].id}`);
        res.status(200).send({ data: data, accessToken: validity.accessToken });
      }
    } catch (err) {
      await slack.slack("User Get 501");
      res.status(501).send("User Get");
    }
  },
  patch: async (req, res) => {
    //patch 하나만 바꾸는거고 put은 모든거 지정(지정안한거 null됨)
    try {
      const validity = await tokenHandler.accessTokenVerify(req);
      if (validity) {
        const userInfo = await user.findOne({
          where: {
            email: req.body.email,
            password: req.body.password,
          },
        });

        await user.update({ password: req.body.newPassword }, { where: { id: userInfo.id } });
        await slack.slack("User Patch 200", `id : ${userInfo.id}`);
        res.status(200).send({ accessToken: validity.accessToken });
      }
    } catch (err) {
      await slack.slack("User Patch 501");
      res.status(501).send("User Patch");
    }
  },
  delete: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req);
      if (validity) {
        await user.destroy({
          where: { id: validity.id },
        });
        await slack.slack("User Delete 200", `id : ${userInfo.id}`);
        res.status(200).send();
      }
    } catch (err) {
      await slack.slack("User Delete 501");
      res.status(501).send("User Delete");
    }
  },
};
