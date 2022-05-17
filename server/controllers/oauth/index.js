const axios = require("axios");
const { user } = require("../../models");

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

      const payload = {
        email: kakaoUserInfo.data.kakao_account.email,
        nickname: kakaoUserInfo.data.kakao_account.profile.nickname,
        password: process.env.KAKAO_PASSWORD,
      };

      const kakaoInfo = await user.findOne({
        where: { email: payload.email },
      });

      if (!kakaoInfo) {
        await axios.post("https://www.just-moment-trip.tk/sign/up", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      const result = await axios.post(
        "https://www.just-moment-trip.tk/sign/in",
        {
          email: payload.email,
          password: payload.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      res.status(200).json(result.data);
    } catch (err) {
      console.log(err);
    }
  },
};
