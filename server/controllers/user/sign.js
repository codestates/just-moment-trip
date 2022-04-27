const { user } = require("../../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenHandler = require("../tokenHandler");

module.exports = {
  up: {
    post: async (req, res) => {
      try {
        // 정보 불충분
        const { email, nickname, password } = req.body;
        if (!email || !nickname || !password) {
          return res.status(422).send({ message: "insufficient parameters supplied" });
        }
        const userInfo = await user.findOne({
          where: {
            email,
            nickname,
            password,
          },
        });

        //이미 가입되었을 경우

        if (userInfo) {
          return res.status(409).send({ message: "email already exists" });
        }

        //가입이 되지 않았을 경우
        else {
          const payload = {
            email,
            nickname,
            password,
          };

          const result = await user.create(payload);
          res.status(201).send({ id: result.id });
        }
      } catch (err) {
        res.status(501).send("Signup Post");
      }
    },
  },

  in: {
    post: async (req, res) => {
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(422).send({ message: "insufficient parameters supplied" });
        }
        //데이터베이스에 email이 없을때
        const emailExists = await user.findOne({
          where: {
            email,
          },
        });

        if (!emailExists) {
          return res.status(400).send({ message: "Wrong email" });
        }

        //데이터베이스에 email 있지만 비밀번호가 틀릴때
        const userInfo = await user.findOne({
          where: {
            email,
            password,
          },
        });

        if (!userInfo) {
          return res.status(400).send({ message: "Wrong password" });
        }

        //데이터 베이스에 회원정보가 있을 경우
        else {
          const payload = {
            id: userInfo.id,
            email,
            nickname: userInfo.nickname,
            password,
          };
          const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "30h" });
          const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: "7d" });
          res.cookie("refreshToken", refreshToken, {
            sameSite: "Strict",
            httpOnly: true,
            secure: false, // https로 바꾼후에 true로 바꿔야함
          });

          res.status(200).send({
            accessToken: accessToken,
          });
        }
      } catch (err) {
        res.status(501).send("Signin Post");
      }
    },
  },
  out: {
    post: async (req, res) => {
      try {
        res.clearCookie("refreshToken");
        return res.status(200).send();
      } catch (err) {
        res.status(501).send("Signout Post");
      }
    },
  },
};
