const { user, signup } = require("../../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const slack = require("../slack");
const bcrypt = require("bcrypt");
const RSA = require("./RSA");
const caesar_monoAlphabet = require("./caesar_monoAlphabet");
const nodemailer = require("./nodemaile");
module.exports = {
  up: {
    post: async (req, res) => {
      try {
        const { email, nickname, createKey } = req.body;
        let password = req.body.password;
        if (!email || !nickname) {
          await slack.slack("Signup Post 422");
          return res.status(422).send({ message: "insufficient parameters supplied" });
        }
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
            password: "temp",
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

          let d = BigInt(userInfo.dataValues.d);
          let N = BigInt(userInfo.dataValues.N);
          const passwordDecryptedArr = passwordBigIntArr.map((ele) => {
            return String.fromCharCode(caesar_monoAlphabet.caesarDecrypt(Number(power(ele, d, N))));
          });
          password = passwordDecryptedArr.join("");
          console.timeEnd("복호화");
          password = caesar_monoAlphabet.monoAlphabeticDecrypt(password);
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
        const { email, checkKey } = req.body;
        let password = req.body.password;
        if (!email) {
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
        }
        let e = 0;
        let N = 0;
        if (checkKey === true) {
          e = userInfo.dataValues.e;
          N = userInfo.dataValues.N;
          return res.status(200).send({ data: { e: e, N: N } });
        } else {
          let passwordBigIntArr = [];
          for (let i = 0; i < password.length; i++) {
            passwordBigIntArr[i] = BigInt(Number(JSON.parse(password[i])));
          }
          let d = BigInt(userInfo.dataValues.d);
          let N = BigInt(userInfo.dataValues.N);
          const passwordDecryptedArr = passwordBigIntArr.map((ele) => {
            return String.fromCharCode(caesar_monoAlphabet.caesarDecrypt(Number(power(ele, d, N))));
          });
          password = passwordDecryptedArr.join("");
          password = caesar_monoAlphabet.monoAlphabeticDecrypt(password);
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
  find: {
    post: async (req, res) => {
      try {
        const email = req.body.email;
        const userInfo = await user.findOne({
          where: { email },
        });
        if (!userInfo) {
          return res.status(400).send({ message: "no email" });
        } else {
          const newPassword = createRandomPassword();
          nodemailer.sendEmail(email, newPassword, "임시 비밀번호");
          bcrypt.genSalt(13, async function (err, salt) {
            bcrypt.hash(newPassword, salt, async function (err, hash) {
              await user.update({ password: hash }, { where: { id: userInfo.id } });
              await slack.slack("sign/find Post 200", `id : ${userInfo.id}`);
              return res.status(200).send({ data: { id: userInfo.id } });
            });
          });
        }
      } catch (err) {
        await slack.slack("sign/find Post 501");
        res.status(501).send("sign/find Post");
      }
    },
  },
  emailVerification: {
    post: async (req, res) => {
      try {
        const email = req.body.email;
        const userInfo = await user.findOne({
          where: { email },
        });
        if (userInfo) {
          return res.status(400).send({ message: "aleady exist email" });
        } else {
          const code = createRandomPassword();
          nodemailer.sendEmail(email, code, "인증 코드");
          await signup.create({ email, code });
          return res.status(200).send({ message: "Code sent to Email" });
        }
      } catch (err) {
        await slack.slack("sign/emailVerification Post 501");
        res.status(501).send("sign/emailVerification Post");
      }
    },
  },
  codeVerification: {
    post: async (req, res) => {
      const { email, code } = req.body;
      try {
        const verify = await signup.findOne({ where: { email, code } });
        console.log(verify);
        if (verify) {
          await slack.slack("sign/codeVerification Verified");
          await signup.destroy({ where: { email, code } });
          return res.status(200).send({ message: "Verified" });
        } else {
          await slack.slack("sign/codeVerification WrongCode");
          return res.status(400).send({ message: "WrongCode" });
        }
      } catch {
        await slack.slack("sign/codeVerification Post 501");
        return res.status(501).send("sign/codeVerification Post");
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
function createRandomPassword() {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const number = "0123456789";
  const special = "!@#$%^&*()_-+={}[]`~:;<>,.?";
  const random = "abc";
  let newPassword = "";
  let a = Math.ceil(Math.random() * 3) + 3,
    b = Math.ceil(Math.random() * 3) + 3;
  c = Math.ceil(Math.random() * 3) + 3;
  while (a + b + c >= 1) {
    const select = random[Math.floor(Math.random() * random.length)];
    if (select === "a" && a !== 0) {
      newPassword += alphabet[Math.floor(Math.random() * alphabet.length)];
      a--;
    } else if (select === "b" && b !== 0) {
      newPassword += number[Math.floor(Math.random() * number.length)];
      b--;
    } else if (select === "c" && c !== 0) {
      newPassword += special[Math.floor(Math.random() * special.length)];
      c--;
    }
  }
  return newPassword;
}
