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
        res.status(200).json(data);
      }
    } catch (err) {
      res.status(500).send("Server Error Code 500");
    }
  },
  patch: async (req, res) => {
    //patch 하나만 바꾸는거고 put은 모든거 지정(지정안한거 null됨)
    try {
      // const validity = tokenHandler.accessTokenVerify(req);
      // if (validity) {
      const userInfo = await user.findOne({
        where: {
          user_id: req.body.user_id,
          password: req.body.password,
        },
      });

      await user.update({ password: req.body.newPassword }, { where: { id: userInfo.id } });
      res.status(200).json("Successfully Password Patch");
      // }
    } catch (err) {
      res.status(500).send("Server Error Code 500");
    }
  },
  delete: async (req, res) => {
    try {
      const validity = tokenHandler.accessTokenVerify(req);
      if (validity) {
        await user.destroy({
          where: { id: validity.id },
        });
        res.status(200).json("Successfully User Deleted");
      }
    } catch (err) {
      res.status(500).send("Server Error Code 500");
    }
  },
};
