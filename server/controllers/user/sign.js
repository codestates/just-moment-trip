const { user } = require("../../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const slack = require("../slack");
const bcrypt = require("bcrypt");
const RSA = require("./RSA");
module.exports = {
  up: {
    post: async (req, res) => {
      try {
        const { email, nickname, createKey } = req.body;
        let password = req.body.password;
        const userInfo = await user.findOne({
          where: {
            email,
          },
        });
        // 가입 안되어 있을 경우 키 생성
        if (createKey === true) {
          // 이미 가입되었을 경우
          if (userInfo) {
            await slack.slack("Signup Post 409");
            return res.status(409).send({ message: "email already exists" });
          }
          let [e, N, d] = RSA.createKey();
          const payload = {
            email,
            nickname,
            password: 193n ** 7n,
            d,
            e,
            N,
          };
          await user.create(payload);
          BigInt.prototype.toJSON = function () {
            return this.toString();
          };
          e = JSON.stringify(e);
          N = JSON.stringify(N);
          return res.status(201).send({ data: { e: e, N: N } });
        } else {
          if (!email || !password || !nickname) {
            await slack.slack("Signup Post 422");
            return res.status(422).send({ message: "insufficient parameters supplied" });
          }
          let passwordBigIntArr = [];
          console.time("복호화");
          for (let i = 0; i < password.length; i++) {
            passwordBigIntArr[i] = BigInt(Number(JSON.parse(password[i])));
          }
          console.timeEnd("복호화");
          let d = BigInt(userInfo.dataValues.d);
          let N = BigInt(userInfo.dataValues.N);
          const passwordDecryptedArr = passwordBigIntArr.map((ele) => {
            return String.fromCharCode(Number(power(ele, d, N)));
          });
          password = passwordDecryptedArr.join("");
          //     //? 방법 1 salt 생성 후 소금 치기
          bcrypt.genSalt(13, async function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
              userInfo.password = hash;
              const result = await userInfo.save();
              await slack.slack("User Post 201", `id : ${result.dataValues.id}`);
              return res.status(201).send({ data: { id: result.dataValues.id } });
            });
          });
          //     //? 방법 2 salt 자동 생성
          // bcrypt.hash(password, 13, async function (err, hash) {
          // userInfo.password = hash;
          // const result = await userInfo.save();
          // await slack.slack("User Post 201", `id : ${result.dataValues.id}`);
          // return res.status(201).send({ data: { id: result.dataValues.id } });
          // });
          //     //? ---
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
                expiresIn: "30m",
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
