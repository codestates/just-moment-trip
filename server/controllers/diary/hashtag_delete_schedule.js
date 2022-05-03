const { diary, hashtag, diary_hashtag } = require("../../models");
const cron = require("node-cron");
const tokenHandler = require("../tokenHandler");

//만약 hashtag db상에 있는 요소가 diary_hashtag 상에 없다면 해당 요소 제거

const a = async (req, res) => {
  try {
    const validity = await tokenHandler.accessTokenVerify(req);
    if (validity) {
      const hashtagInfo = await hashtag.findAll();
      console.log(hashtagInfo);
    }
  } catch (err) {
    console.log(err);
  }
};
a();
// for (let i = 0; i < str.length; i++) {
//   b = cron.schedule(
//     "* * * * * *", //1초
//     function () {
//       console.log(str[n]);
//       n++;
//       if (n === str.length - 1) n = 0;
//     },
//     { scheduled: false }
//   );
// }

// b.start();
