const axios = require("axios");
const { user } = require("../../models");
const caesar_monoAlphabet = require("./caesar_monoAlphabet");

module.exports = {
  get: async (req, res) => {
    try {
      const baseUrl = "https://kauth.kakao.com/oauth/token";

      let code = req.query.code;

      const requestKakaoToken = await axios.post(
        `${baseUrl}?grant_type=authorization_code&client_secret=${process.env.KAKAO_SECRET}&client_id=${process.env.KAKAO_CLIENT}&redirect_uri=https://www.just-moment-trip.ml/oauth/callback/kakao&code=${code}`,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const token = requestKakaoToken.data.access_token;

      const kakaoUserInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      let email = kakaoUserInfo.data.kakao_account.email;
      let nickname = kakaoUserInfo.data.kakao_account.profile.nickname;
      let password = process.env.KAKAO_PASSWORD;

      const keyPayload = {
        email,
        nickname,
        createKey: true,
      };

      const kakaoInfo = await user.findOne({
        where: { email },
      });

      if (!kakaoInfo) {
        const result = await axios.post("https://www.just-moment-trip.tk/sign/up", keyPayload);
        let encrypted = [];
        const e = BigInt(Number(JSON.parse(result.data.data.e)));
        const N = BigInt(Number(JSON.parse(result.data.data.N)));
        BigInt.prototype.toJSON = function () {
          return this.toString();
        };
        console.time("암호화");
        password = caesar_monoAlphabet.monoAlphabeticEncrypt(password);
        for (let i = 0; i < password.length; i++) {
          let a = BigInt(caesar_monoAlphabet.caesarEncrypt(password[i].charCodeAt(0)));
          encrypted[i] = JSON.stringify(power(a, e, N));
        }
        password = encrypted;
        console.timeEnd("암호화");
        await axios.post("https://www.just-moment-trip.tk/sign/up", {
          email,
          nickname,
          password,
        });
        const result2 = await axios.post("https://www.just-moment-trip.tk/sign/in", {
          email,
          password,
        });
        return res.status(200).json(result2.data);
      } else {
        const result = await axios.post("https://www.just-moment-trip.tk/sign/in", {
          checkKey: true,
          email,
        });
        let encrypted = [];
        const e = BigInt(Number(JSON.parse(result.data.data.e)));
        const N = BigInt(Number(JSON.parse(result.data.data.N)));
        BigInt.prototype.toJSON = function () {
          return this.toString();
        };
        password = caesar_monoAlphabet.monoAlphabeticEncrypt(password);
        for (let i = 0; i < password.length; i++) {
          let a = BigInt(caesar_monoAlphabet.caesarEncrypt(password[i].charCodeAt(0)));
          encrypted[i] = JSON.stringify(power(a, e, N));
        }
        const result2 = await axios.post("https://www.just-moment-trip.tk/sign/in", {
          email,
          password: encrypted,
        });
        return res.status(200).json(result2.data);
      }
    } catch (err) {
      console.log(err);
    }
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
