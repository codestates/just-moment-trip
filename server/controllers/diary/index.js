const { diary, hashtag, diary_hashtag } = require("../../models");
const tokenHandler = require("../tokenHandler");
const slack = require("../slack");
const fuzzy = require("./fuzzy");
const levenshteinDistance = require("./levenshtein-distance");
const nGram = require("./nGram");

module.exports = {
  get: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        const { trip_id, search, searchType } = req.query;
        const data = await diary.findAll({
          where: {
            trip_id,
          },
        });
        const hashtagsInfo = await diary.findAll({
          include: [
            {
              model: hashtag,
              attributes: ["hashtag"], //select 뒤에 오는거 뭐 찾을지 없으면 all
            },
          ],
          where: {
            trip_id,
          },
        });
        hashtagsInfo.forEach((ele, index) => {
          let hashtags = [];
          ele.hashtags.forEach((ele) => {
            hashtags.push(ele.hashtag);
          });
          data[index].dataValues.hashtags = hashtags;
        });

        if (!search || !searchType) {
          return res.status(200).send({ data, accessToken: validity.accessToken });
        }

        let fuzzyData = [];
        let levenshteinData = [];
        let nGramData = [];
        if (searchType === "title" || searchType === undefined) {
          fuzzyData = data.filter((ele) => {
            return fuzzy.createFuzzyMatcher(search).test(ele.dataValues.title);
          });
          fuzzy.sort(fuzzyData, search);
          levenshteinData = data.filter((ele) => {
            return (
              levenshteinDistance.levenshteinDistance_upgrade(ele.dataValues.title, search, 1) <= 1
            );
          });
          nGramData = data.filter((ele) => {
            if (
              nGram.diff_ngram(ele.dataValues.title, search, 3) >= 0.27 ||
              nGram.diff_ngram(ele.dataValues.title, search, 1) === 1
            )
              return true;
          });
        } else if (searchType === "content") {
          fuzzyData = data.filter((ele) => {
            return fuzzy.createFuzzyMatcher(search).test(ele.dataValues.content);
          });
          fuzzy.sort(fuzzyData, search);
          levenshteinData = data.filter((ele) => {
            return (
              levenshteinDistance.levenshteinDistance_upgrade(ele.dataValues.content, search, 1) <=
              1
            );
          });
          nGramData = data.filter((ele) => {
            if (
              nGram.diff_ngram(ele.dataValues.content, search, 3) >= 0.27 ||
              nGram.diff_ngram(ele.dataValues.content, search, 1) === 1
            )
              return true;
          });
        }
        let resultData = fuzzyData.slice();
        for (let i = 0; i < levenshteinData.length; i++) {
          if (
            !resultData.map((ele) => ele.dataValues.id).includes(levenshteinData[i].dataValues.id)
          ) {
            resultData.push(levenshteinData[i]);
          }
        }
        for (let i = 0; i < nGramData.length; i++) {
          if (!resultData.map((ele) => ele.dataValues.id).includes(nGramData[i].dataValues.id)) {
            resultData.push(nGramData[i]);
          }
        }
        let data_slack_id = "";
        data.forEach((ele) => {
          data_slack_id += `${ele.dataValues.id}, `;
        });
        await slack.slack("Diary Get 200", `id : ${data_slack_id}`);
        res.status(200).send({ data: resultData, accessToken: validity.accessToken });
      }
    } catch (err) {
      await slack.slack("Diary Get 501");
      res.status(501).send("Diary Get");
    }
  },

  post: async (req, res) => {
    try {
      const { trip_id, title, picture, gps, content, write_date, hashtags } = req.body;
      if (!title || !content || !write_date) {
        await slack.slack("Diary Post 422");
        return res.status(422).send({ message: "insufficient parameters supplied" });
      }
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        //해쉬태그 제외한 다이어리 추가
        const diaryPayload = {
          trip_id,
          title,
          picture,
          gps,
          content,
          write_date,
        };
        const diaryInfo = await diary.create(diaryPayload);

        for (const ele of hashtags) {
          const data = await hashtag.findOne({
            where: {
              hashtag: ele,
            },
          });
          let hashtagInfo = data;
          //해쉬태그가 이미 있는게 아닐경우 (없을 경우)
          if (!data) {
            const hashtagPayload = {
              hashtag: ele,
            };
            hashtagInfo = await hashtag.create(hashtagPayload);
          }
          //조인테이블 추가
          const diary_hashtagPayload = {
            diary_id: diaryInfo.dataValues.id,
            hashtag_id: hashtagInfo.dataValues.id,
          };
          await diary_hashtag.create(diary_hashtagPayload);
        }
        await slack.slack("Diary Post 201", `id : ${diaryInfo.id}`);
        return res
          .status(201)
          .send({ data: { id: diaryInfo.id }, accessToken: validity.accessToken });
      }
    } catch (err) {
      await slack.slack("Diary Post 501");
      res.status(501).send("Diary Post");
    }
  },
  delete: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        const id = req.params.diary_id;
        const diaryInfo = await diary.findOne({
          where: { id: id },
        });
        if (diaryInfo) {
          await diary.destroy({
            where: { id: id },
          });
          await slack.slack("Diary Delete 200", `id : ${id}`);
          res.status(200).send({ data: { id: id }, accessToken: validity.accessToken });
        } else {
          await slack.slack("Diary Delete 404", `id : ${id}`);
          res.status(404).send({
            data: { id: id },
            accessToken: validity.accessToken,
            message: "Diary already delete",
          });
        }
      }
    } catch (err) {
      await slack.slack("Diary Delete 501");
      res.status(501).send("Diary Delete");
    }
  },
  patch: async (req, res) => {
    //patch 하나만 바꾸는거고 put은 모든거 지정(지정안한거 null됨)
    try {
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        const id = req.params.diary_id;
        const { new_title, new_content, new_hashtags } = req.body;
        const diaryInfo = await diary.findOne({
          where: { id: id },
        });
        const hashtagsInfo = await diary.findAll({
          include: [
            {
              model: hashtag,
              attributes: ["id", "hashtag"], //select 뒤에 오는거 뭐 찾을지 없으면 all
            },
          ],
          where: { id: id },
        });
        const { title, content } = diaryInfo;
        let hashtags = [];
        for (const ele of hashtagsInfo[0].hashtags) {
          hashtags.push(ele.hashtag);
        }

        if (diaryInfo) {
          const hashtagsCopy = hashtags.slice();
          const new_hashtagsCopy = new_hashtags.slice();
          if (
            title === new_title &&
            content === new_content &&
            JSON.stringify(hashtagsCopy.sort()) === JSON.stringify(new_hashtagsCopy.sort())
          ) {
            // 바뀐게 없음
            await slack.slack("Diary Patch 412", `id : ${id}`);
            return res.status(412).send({
              data: { id: id },
              accessToken: validity.accessToken,
              message: "No Change",
            });
          } else {
            await diary.update(
              {
                title: new_title,
                content: new_content,
              },
              { where: { id: id } }
            );
            //? 해쉬태그 부분
            //만약 new값의 요소가 현재 다이어리의 원래 db상에 없다면 조인테이블과 해쉬태그 테이블에 추가
            for (const ele of new_hashtags) {
              if (!hashtags.includes(ele)) {
                //?
                //데이터베이스상 모든 헤시태그
                const hashtagAllDBInfo = await hashtag.findAll();
                let hashtagAllDBHashtag = [];
                hashtagAllDBInfo.forEach((ele) => {
                  hashtagAllDBHashtag.push(ele.hashtag);
                });

                //new_hashtag의 요소가 모든db상에 없다면 hashtag테이블에 추가
                if (!hashtagAllDBHashtag.includes(ele)) {
                  await hashtag.create({ hashtag: ele });
                }
                const hashtag_id = await hashtag.findOne({
                  where: { hashtag: ele },
                });

                //조인 테이블추가
                const diary_hashtagPayload = {
                  diary_id: diaryInfo.dataValues.id,
                  hashtag_id: hashtag_id.dataValues.id,
                };
                await diary_hashtag.create(diary_hashtagPayload);
              }
            }
            //만약 해당 다이어리의 hashtag db상에 있는 요소가 new값에 없다면 해당 요소 조인테이블상에서 삭제
            for (const ele of hashtags) {
              const hashtag_id = await hashtag.findOne({
                where: { hashtag: ele },
              });
              if (!new_hashtags.includes(ele)) {
                await diary_hashtag.destroy({
                  where: { hashtag_id: hashtag_id.dataValues.id, diary_id: id },
                });
              }
            }
            //?

            await slack.slack("Diary Patch 200", `id : ${id}`);
            res.status(200).send({ data: { id: id }, accessToken: validity.accessToken });
          }
        } else {
          //다이어리 정보 없음
          await slack.slack("Diary Patch 404", `id : ${id}`);
          res.status(404).send({
            data: { id: id },
            accessToken: validity.accessToken,
            message: "Deleted Diary",
          });
        }
      }
    } catch (err) {
      await slack.slack("Diary Patch 501");
      res.status(501).send("Diary Patch");
    }
  },
};
