const axios = require("axios");

module.exports = {
  get: async (req, res) => {
    try {
      const baseUrl = "https://kauth.kakao.com/oauth/token";

      let code = req.query.code;

      // const config = {
      //   client_id: process.env.KAKAO_CLIENT,
      //   client_secret: process.env.KAKAO_SECRET,
      //   grant_type: "authorization_code",
      //   redirect_uri: "http://localhost:8080/oauth/callback/kakao",
      //   code: req.query.code,
      // };

      // console.log(config.code);

      // const data = JSON.stringify(config);

      // console.log(data);

      const requestKakaoToken = await axios.post(
        `${baseUrl}?grant_type=authorization_code&client_secret=${process.env.KAKAO_SECRET}&client_id=${process.env.KAKAO_CLIENT}&redirect_uri=http://localhost:8080/oauth/callback/kakao&code=${code}`,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.log(requestKakaoToken.data);

      res.status(200).json(requestKakaoToken.data);
    } catch (err) {
      console.log(err);
    }
  },
};
