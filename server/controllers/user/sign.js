const { user } = require("../../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const tokenHandler = require("../tokenHandler");

module.exports = {
  up: {
    post: async (req, res) => {
      try {
        // 정보 불충분
        const { user_id, password } = req.body;
        if (!user_id || !password) {
          res.status(422).send("insufficient parameters supplied");
        }
        const userInfo = await user.findOne({
          where: {
            user_id: req.body.user_id,
            password: req.body.password,
          },
        });

        //이미 가입되었을 경우

        if (userInfo) {
          res.status(400).send({ data: null, message: "email already exists" });
        }

        //가입이 되지 않았을 경우
        else {
          const payload = {
            userInfo: {
              user_id: req.body.user_id,
              password: req.body.password,
            },
            message: "Successfully Sign Up",
          };

          await user.create(payload.userInfo);
          res.status(201).send(payload);
        }
      } catch (err) {
        res.status(500).send("Server Error Code 500/ in singup");
      }
    },
  },

  in: {
    post: async (req, res) => {
      try {
        console.log("dkpkfdpmwefpmfwmpwfpmfewpmkwef");
        const userInfo = await user.findOne({
          where: {
            user_id: req.body.user_id,
            password: req.body.password,
          },
        });

        //데이터베이스에 회원정보가 없을 경우
        if (!userInfo) {
          res.status(400).send({ data: null, message: "Wrong email or password" });
        }
        //데이터 베이스에 회원정보가 있을 경우
        else {
          const payload = {
            id: userInfo.id,
            user_id: userInfo.user_id,
            password: userInfo.password,
          };
          const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1d" });
          const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: "7d" });
          res.cookie("refreshToken", refreshToken, {
            sameSite: "none",
            httpOnly: true,
            secure: true,
          });

          res.status(200).send({
            data: { accessToken: accessToken },
            message: `${req.body.user_id}님 로그인을 환영합니다.`,
          });
        }
      } catch (err) {
        res.status(500).send("Server Error Code 500");
      }
    },
  },
  out: {
    post: async (req, res) => {
      try {
        const validity = tokenHandler.accessTokenVerify(req);
        if (validity) {
          res.status(200).send("Successfully Sign Out");
        }
      } catch (err) {
        res.status(500).send("Server Error Code 500");
      }
    },
  },
};
