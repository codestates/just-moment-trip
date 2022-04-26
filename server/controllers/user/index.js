const { user } = require("../../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenHandler = require("../tokenHandler");

module.exports = {
  get: async (req, res) => {
    try {
      const validity = tokenHandler.accessTokenVerify(req);
      if (validity) {
        const data = await user.findAll();
        res.status(200).send(data);
      }
    } catch (err) {
      res.status(501).send("User Get");
    }
  },
  patch: async (req, res) => {
    //patch 하나만 바꾸는거고 put은 모든거 지정(지정안한거 null됨)
    try {
      // const validity = tokenHandler.accessTokenVerify(req);
      // if (validity) {
      const userInfo = await user.findOne({
        where: {
          email: req.body.email,
          password: req.body.password,
        },
      });

      await user.update({ password: req.body.newPassword }, { where: { id: userInfo.id } });
      res.status(200).send();
      // }
    } catch (err) {
      res.status(501).send("Use Patch");
    }
  },
  delete: async (req, res) => {
    try {
      const validity = tokenHandler.accessTokenVerify(req);
      if (validity) {
        await user.destroy({
          where: { id: validity.id },
        });
        res.status(200).send();
      }
    } catch (err) {
      res.status(501).send("User delete");
    }
  },
};
