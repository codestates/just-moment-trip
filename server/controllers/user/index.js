const { user, trip } = require("../../models");
require("dotenv").config();
const tokenHandler = require("../tokenHandler");
const slack = require("../slack");
const bcrypt = require("bcrypt");
const RSA = require("./RSA");

module.exports = {
  get: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        const { id, email, accessToken } = validity;
        const userInfo = await user.findOne({
          include: { model: trip, attributes: ["user_id"] },
          where: { id, email },
        });
        const num_trips = userInfo.trips.length;
        const data = {
          email,
          picture: userInfo.picture,
          nickname: userInfo.nickname,
          num_trips,
        };
        await slack.slack("User Get 200", `id : ${id}`);
        res.status(200).send({ data, accessToken });
      }
    } catch (err) {
      await slack.slack("User Get 501");
      res.status(501).send("User Get");
    }
  },
  patch: async (req, res) => {
    //patch 하나만 바꾸는거고 put은 모든거 지정(지정안한거 null됨)
    function power(base, exponent, mod) {
      base %= mod;
      let result = 1n;

      while (exponent > 0n) {
        // 1의 자리 비트가 1이면 트루 즉, 홀수면 트루
        if (exponent & 1n) {
          result = result * base;
          result = result % mod;
        }
        exponent >>= 1n; //나누기2 비트 오른쪽꺼 삭제
        base = base * base;
        base = base % mod;
      }

      return result;
    }
    try {
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        if (req.body.picture && !req.body.email) {
          const userInfo = await user.findOne({
            where: { id: validity.id, email: validity.email },
          });
          userInfo.picture = req.body.picture;
          await userInfo.save();
          return res
            .status(200)
            .send({ data: { id: userInfo.id }, accessToken: validity.accessToken });
        }

        const userInfo = await user.findOne({
          where: {
            email: req.body.email,
          },
        });

        if (!userInfo) {
          await slack.slack("User Patch 404", `id : ${validity.id}`);
          return res.status(404).send({
            data: { id: validity.id },
            message: "No User",
          });
        }

        if (req.body.getKey) {
          return res
            .status(200)
            .send({ data: { e: userInfo.dataValues.e, N: userInfo.dataValues.N } });
        }

        let passwordBigIntArr = [];
        for (let i = 0; i < req.body.password.length; i++) {
          passwordBigIntArr[i] = BigInt(Number(JSON.parse(req.body.password[i])));
        }

        let newPasswordBigIntArr = [];
        for (let i = 0; i < req.body.new_password.length; i++) {
          newPasswordBigIntArr[i] = BigInt(Number(JSON.parse(req.body.new_password[i])));
        }

        let d = BigInt(userInfo.dataValues.d);
        let N = BigInt(userInfo.dataValues.N);

        const passwordDecryptedArr = passwordBigIntArr.map((ele) => {
          return String.fromCharCode(Number(power(ele, d, N)));
        });
        const newPasswordDecryptedArr = newPasswordBigIntArr.map((ele) => {
          return String.fromCharCode(Number(power(ele, d, N)));
        });

        const password = passwordDecryptedArr.join("");
        const new_password = newPasswordDecryptedArr.join("");

        bcrypt.compare(password, userInfo.password, async function (err, result) {
          if (result === false) {
            return res.status(400).send({ message: "Wrong password" });
          }
          bcrypt.genSalt(10, async function (err, salt) {
            bcrypt.hash(String(new_password), salt, async function (err, hash) {
              await user.update({ password: hash }, { where: { id: userInfo.id } });
              await slack.slack("User Patch 200", `id : ${userInfo.id}`);
              return res
                .status(200)
                .send({ data: { id: userInfo.id }, accessToken: validity.accessToken });
            });
          });
        });
      }
    } catch (err) {
      await slack.slack("User Patch 501");
      return res.status(501).send("User Patch");
    }
  },
  delete: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        await user.destroy({
          where: { id: validity.id },
        });
        await slack.slack("User Delete 200", `id : ${validity.id}`);
        res.status(200).send({ data: validity.id });
      }
    } catch (err) {
      await slack.slack("User Delete 501");
      res.status(501).send("User Delete");
    }
  },
};
