const jwt = require("jsonwebtoken");
const { user } = require("../../models");

(exports.accessTokenVerify = (req, res) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).send({ message: "No Access Token" });
  else {
    const token = authorization.split(" ")[1]; //앞에 붙은 bearer(jwt와 oauth를 나타내는 인증타입)을 없애주고 뒤에 토큰 정보만 추출하기위해서
    try {
      const data = jwt.verify(token, process.env.ACCESS_SECRET); // 토큰 verify(해독, 검증)
      return data;
    } catch {
      return this.refreshTokenVerify(req, res);
    }
  }
}),
  (exports.refreshTokenVerify = async (req, res) => {
    let refrshToken = req.cookies["refreshToken"];
    if (!refrshToken) {
      res.status(401).send({ message: "No Refresh Token" });
    } else {
      try {
        const data = jwt.verify(refrshToken, process.env.REFRESH_SECRET); // 토큰 verify(해독, 검증)
        const userInfo = await user.findOne({
          where: {
            email: data.email,
            password: data.password,
          },
        });
        if (!userInfo) {
          return undefined;
        }
        const payload = {
          id: userInfo.id,
          email: userInfo.email,
          nickname: userInfo.nickname,
          password: userInfo.password,
        };
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1d" });
        data["accessToken"] = accessToken;
        return data;
      } catch {
        res.status(401).send({ message: "Both Token Expired" });
      }
    }
  });

//클라이언트에서 서버로 요청할때  원래 데이터를 원하고 요청함.
//엑세스 토큰이 유효하면 데이터가 들어오는데
//유요하지 않으면 여기서 엑세스토큰을 만들어서 클라이언트로 보낸다
//클라이언트에서는
