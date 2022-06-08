const { signup } = require("../../models");
const cron = require("node-cron");

schedule = cron.schedule(
  "0 0 * * *", //자정 마다
  async function () {
    try {
      await signup.destroy({ where: {} });
    } catch (err) {
      console.log(err);
    }
  },
  { scheduled: false }
);
exports.cron = () => {
  schedule.start();
};
