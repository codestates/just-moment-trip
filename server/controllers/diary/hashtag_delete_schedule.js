const { diary, hashtag, diary_hashtag } = require("../../models");
const cron = require("node-cron");

schedule = cron.schedule(
  "* * * *", //1시간마다
  async function () {
    try {
      const hashtagAllDBInfo = await hashtag.findAll();
      const diary_hashtagALLDBInfo = await diary_hashtag.findAll();
      let diary_hashtagAllDBHashtag = [];
      diary_hashtagALLDBInfo.forEach((ele) => {
        diary_hashtagAllDBHashtag.push(ele.dataValues.hashtag_id);
      });
      hashtagAllDBInfo.forEach(async (ele) => {
        if (!diary_hashtagAllDBHashtag.includes(ele.dataValues.id)) {
          await hashtag.destroy({
            where: { id: ele.dataValues.id },
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
  { scheduled: false }
);
exports.cron = () => {
  schedule.start();
};
