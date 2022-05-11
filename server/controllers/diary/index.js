const { diary, hashtag, diary_hashtag, Sequelize } = require("../../models");
const tokenHandler = require("../tokenHandler");
const slack = require("../slack");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const fuzzy = require("./fuzzy");
const levenshteinDistance = require("./levenshtein-distance");

module.exports = {
  get: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        const { trip_id, search } = req.query;
        const data = await diary.findAll({
          // where: {
          //   trip_id,
          //   [Op.or]: [
          //     { title: { [Op.regexp]: fuzzy.createFuzzyMatcher(search) } },
          //     {
          //       title:
          //         levenshteinDistance.levenshteinDistance(search, Sequelize.col("diary.title")) <= 1
          //           ? false
          //           : true,
          //     },
          //   ],
          // },
          //!
          // where: {
          //   trip_id,
          //   [Op.or]: [
          //     sequelize.where(sequelize.fn("char_length", sequelize.col("title")), 2),
          //     (a = sequelize.where(sequelize.col("title"))),
          //     sequelize.where(
          //       sequelize.fn(
          //         levenshteinDistance.levenshteinDistance(
          //           a,
          //           await diary.findAll({
          //             where: {
          //               title: a,
          //             },
          //           })
          //         )
          //       )
          //     ),
          //     sequelize.where(levenshteinDistance.levenshteinDistance("a", sequelize.col("title"))),
          //   ],
          // },
          //!
          // where: {
          //   title: sequelize.fn(aa(1, this.diary.sequelize.col("title"))),
          // },
          // "b"
          //!원래
          where: {
            trip_id,
            // title: { [Op.regexp]: fuzzy.createFuzzyMatcher(search) },
          },
          //!
        });

        // data.forEach((ele) => console.log(ele.title));
        const hashtagsInfo = await diary.findAll({
          include: [
            {
              model: hashtag,
              attributes: ["hashtag"], //select 뒤에 오는거 뭐 찾을지 없으면 all
            },
          ],
          // where: sequelize.where(sequelize.fn("char_length", sequelize.col("title")), 2),
          //!원래
          where: {
            trip_id,
            // title: { [Op.regexp]: fuzzy.createFuzzyMatcher(search) },
          },
          //!
        });
        hashtagsInfo.forEach((ele, index) => {
          let hashtags = [];
          ele.hashtags.forEach((ele) => {
            hashtags.push(ele.hashtag);
          });
          data[index].dataValues.hashtags = hashtags;
        });
        //!시작
        const fuzzyData = data.filter((ele) => {
          return fuzzy.createFuzzyMatcher(search).test(ele.dataValues.title);
        });
        console.log(fuzzyData);
        const levenshteinData = data.filter((ele) => {
          return levenshteinDistance.levenshteinDistance(ele.dataValues.title, search) <= 1;
        });

        //sort  과일먹자  과자   새우깡은과자다
        fuzzy.sort(fuzzyData, search);
        console.log(
          "-------------@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-----------"
        );
        console.log(fuzzyData);
        let resultData = fuzzyData.slice();

        for (let i = 0; i < levenshteinData.length; i++) {
          if (
            !resultData.map((ele) => ele.dataValues.id).includes(levenshteinData[i].dataValues.id)
          ) {
            resultData.push(levenshteinData[i]);
          }
        }
        // 과일먹자   새우깡은과자 마자          퍼지 과자      과일먹자  새우깡은과자     거리  과자   마자 새우깡은과자

        //!

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
        // 해쉬태그 추가 // map같은거 배열로 오는 해쉬태그를 하나하나추가 / 해쉬태그 중복여부
        hashtags.map(async (ele) => {
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
            await slack.slack("Hashtag Post 201", `id : ${hashtagInfo.id}`);
          }
          //조인테이블 추가
          const diary_hashtagPayload = {
            diary_id: diaryInfo.dataValues.id,
            hashtag_id: hashtagInfo.dataValues.id,
          };
          await diary_hashtag.create(diary_hashtagPayload);
        });
        await slack.slack("Diary Post 201", `id : ${diaryInfo.id}`);
        res.status(201).send({ data: { id: diaryInfo.id }, accessToken: validity.accessToken });
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
        hashtagsInfo[0].hashtags.forEach((ele) => hashtags.push(ele.hashtag));

        if (diaryInfo) {
          if (
            title === new_title &&
            content === new_content &&
            JSON.stringify(hashtags.sort()) === JSON.stringify(new_hashtags.sort())
          ) {
            // 바뀐게 없음
            await slack.slack("Diary Patch 412", `id : ${id}`);
            res.status(412).send({
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
            new_hashtags.forEach(async (ele) => {
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
            });
            //만약 해당 다이어리의 hashtag db상에 있는 요소가 new값에 없다면 해당 요소 조인테이블상에서 삭제
            hashtags.forEach(async (ele) => {
              const hashtag_id = await hashtag.findOne({
                where: { hashtag: ele },
              });
              if (!new_hashtags.includes(ele)) {
                await diary_hashtag.destroy({
                  where: { hashtag_id: hashtag_id.dataValues.id, diary_id: id },
                });
              }
            });
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
