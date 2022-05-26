const { user } = require("../../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const slack = require("../slack");
const bcrypt = require("bcrypt");

module.exports = {
  up: {
    post: async (req, res) => {
      try {
        // 정보 불충분
        const { email, nickname, password } = req.body;
        if (!email || !nickname || !password) {
          await slack.slack("Signup Post 422");
          return res.status(422).send({ message: "insufficient parameters supplied" });
        }
        const userInfo = await user.findOne({
          where: {
            email,
          },
        });
        //이미 가입되었을 경우
        if (userInfo) {
          await slack.slack("Signup Post 409");
          return res.status(409).send({ message: "email already exists" });
        }

        //가입이 되지 않았을 경우
        else {
          //? 방법 1 salt 생성 후 소금 치기
          bcrypt.genSalt(10, async function (err, salt) {
            bcrypt.hash(String(password), salt, async function (err, hash) {
              const payload = {
                email,
                nickname,
                password: hash,
              };
              const result = await user.create(payload);
              res.status(201).send({ data: { id: result.id } });
            });
          });
          //? 방법 2 salt 자동 생성
          // bcrypt.hash(String(password), 10, async function (err, hash) {
          //   const payload = {
          //     email,
          //     nickname,
          //     password: hash,
          //   };
          //   const result = await user.create(payload);
          //   res.status(201).send({ data: { id: result.id } });
          // });
          //? ---
        }
      } catch (err) {
        await slack.slack("Signup Post 501");
        res.status(501).send("Signup Post");
      }
    },
  },

  in: {
    post: async (req, res) => {
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          await slack.slack("Signin Post 422");
          return res.status(422).send({ message: "insufficient parameters supplied" });
        }
        const userInfo = await user.findOne({
          where: {
            email,
          },
        });
        //데이터베이스에 email이 없을때
        if (!userInfo) {
          await slack.slack("Signin Post 400");
          return res.status(400).send({ message: "Wrong email" });
        } else {
          bcrypt.compare(password, userInfo.password, async function (err, result) {
            //데이터베이스에 email 있지만 비밀번호가 틀릴때
            if (result === false) {
              await slack.slack("Signin Post 400");
              return res.status(400).send({ message: "Wrong password" });
            }

            //데이터 베이스에 회원정보가 있을 경우
            else {
              const payload = {
                id: userInfo.id,
                email,
              };
              const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
                expiresIn: "1s",
              });
              const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
                expiresIn: "6h",
              });
              res.cookie("refreshToken", refreshToken, {
                sameSite: "Strict",
                httpOnly: true,
                secure: false, // https로 바꾼후에 true로 바꿔야함
              });
              await slack.slack("Signin Post 200", `id : ${userInfo.id}`);
              res.status(200).send({
                data: { id: userInfo.id },
                accessToken: accessToken,
              });
            }
          });
        }
      } catch (err) {
        await slack.slack("Signin Post 501");
        res.status(501).send("Signin Post");
      }
    },
  },
  out: {
    post: async (req, res) => {
      try {
        res.clearCookie("refreshToken");
        await slack.slack("Signout Post 200");
        return res.status(200).send();
      } catch (err) {
        await slack.slack("Signout Post 501");
        res.status(501).send("Signout Post");
      }
    },
  },
};
