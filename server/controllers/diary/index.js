const { diary, hashtag, diary_hashtag } = require("../../models");
const tokenHandler = require("../tokenHandler");
const slack = require("../slack");

module.exports = {
  get: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req);
      if (validity) {
        const data = await diary.findAll({
          where: { trip_id: req.params.trip_id },
        });
        await slack.slack("Diary Get 200", `id : ${data[0].id} ~ ${data[data.length - 1].id}`);
        res.status(200).send({ data: data, accessToken: validity.accessToken });
      }
    } catch (err) {
      await slack.slack("Diary Get 501");
      res.status(501).send("Diary Get");
    }
  },

  post: async (req, res) => {
    try {
      const { title, picture, gps, content, write_date, hashtags } = req.body;
      if (!title || !picture || !content || !write_date) {
        await slack.slack("Diary Post 422");
        return res.status(422).send({ message: "insufficient parameters supplied" });
      }
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        //해쉬태그 제외한 다이어리 추가
        const diaryPayload = {
          trip_id: req.params.trip_id,
          title,
          picture,
          gps,
          content,
          write_date,
          hashtags,
        };

        const diaryInfo = await diary.create(diaryPayload);

        // 해쉬태그 추가 // map같은거 배열로 오는 해쉬태그를 하나하나추가 / 해쉬태그 중복여부
        hashtags.map(async (ele) => {
          const data = await hashtag.findOne({
            where: {
              hashtags: ele,
            },
          });
          let hashtagInfo = data;

          //해쉬태그가 이미 있는게 아닐경우 (없을 경우)
          if (!data) {
            const hashtagPayload = {
              hashtags: ele,
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
      const validity = await tokenHandler.accessTokenVerify(req);
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
      const validity = await tokenHandler.accessTokenVerify(req);
      if (validity) {
        const id = req.params.diary_id;
        const { new_title, new_content, new_hashtags } = req.body;
        const diaryInfo = await diary.findOne({
          where: { id: id },
        });
        console.log(diaryInfo);
        const { title, content } = diaryInfo;
        // const {hashtags} =
        if (diaryInfo) {
          if (title === new_title && content === new_content) {
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
                // hashtag: new_hashtags,
              },
              { where: { id: id } }
            );
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
//타이틀 컨탠트 해쉬태그
