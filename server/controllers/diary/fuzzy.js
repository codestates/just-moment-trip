//!
const sequelize = require("sequelize");
const Op = sequelize.Op;
const slack = require("../slack");
const _ = require("lodash");

const { diary, hashtag, diary_hashtag } = require("../../models");
const tokenHandler = require("../tokenHandler");
module.exports = {
  get: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req);

      if (validity) {
        const { trip_id, str } = req.query;
        const data = await diary.findAll({
          where: {
            trip_id,
            title: { [Op.regexp]: createFuzzyMatcher(str) },
          },
        });
        data.forEach((ele) => console.log(ele.title));
        //!
        const hashtagsInfo = await diary.findAll({
          include: [
            {
              model: hashtag,
              attributes: ["hashtag"], //select 뒤에 오는거 뭐 찾을지 없으면 all
            },
          ],
          where: {
            trip_id,
            title: { [Op.regexp]: createFuzzyMatcher(str) },
          },
        });
        hashtagsInfo.forEach((ele, index) => {
          let hashtags = [];
          ele.hashtags.forEach((ele) => {
            hashtags.push(ele.hashtag);
          });
          data[index].dataValues.hashtags = hashtags;
        });

        //!
        let data_slack_id = "";
        data.forEach((ele) => {
          data_slack_id += `${ele.dataValues.id}, `;
        });
        await slack.slack("Diary Get 200", `id : ${data_slack_id}`);
        res.status(200).send({ data: data, accessToken: validity.accessToken });
      }
    } catch (err) {
      await slack.slack("Diary Get 501");
      res.status(501).send("Diary Get");
    }
  },
};
//!
function ch2pattern(ch) {
  const offset = 44032; /* '가'의 코드 */
  // 한국어 음절
  if (/[가-힣]/.test(ch)) {
    const chCode = ch.charCodeAt(0) - offset;
    // 종성이 있으면 문자 그대로를 찾는다.
    if (chCode % 28 > 0) {
      return ch;
    }
    const begin = Math.floor(chCode / 28) * 28 + offset;
    const end = begin + 27;
    return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  }
  // 한글 자음
  if (/[ㄱ-ㅎ]/.test(ch)) {
    const con2syl = {
      ㄱ: "가".charCodeAt(0),
      ㄲ: "까".charCodeAt(0),
      ㄴ: "나".charCodeAt(0),
      ㄷ: "다".charCodeAt(0),
      ㄸ: "따".charCodeAt(0),
      ㄹ: "라".charCodeAt(0),
      ㅁ: "마".charCodeAt(0),
      ㅂ: "바".charCodeAt(0),
      ㅃ: "빠".charCodeAt(0),
      ㅅ: "사".charCodeAt(0),
    };
    const begin = con2syl[ch] || (ch.charCodeAt(0) - 12613) /* 'ㅅ'의 코드 */ * 588 + con2syl["ㅅ"];
    const end = begin + 587;
    return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  }
  // 그 외엔 그대로 내보냄
  // escapeRegExp는 lodash에서 가져옴
  return _.escapeRegExp(ch); // 정규식에서 의미있는 와일드카드들을 문자열로 바꿔주는거
}
function createFuzzyMatcher(input) {
  const pattern = input.split("").map(ch2pattern).join(".*?");
  console.log(pattern);
  return pattern;
  // let data = new RegExp(pattern);
  // return data;
}
