// const { WebClient, LogLevel } = require("@slack/web-api");
// const client = new WebClient(process.env.SLACK_BOT_API, {
//   logLevel: LogLevel.DEBUG,
// });
// const channelId = process.env.SLACK_CHANNEL;
// exports.slack = async (title, message) => {
//   try {
//     const result = await client.chat.postMessage({
//       channel: channelId,
//       text: `${title}
// ${message}`,
//     });
//     // console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// };

//!
const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(process.env.SLACK_BOT_API, {
  logLevel: LogLevel.DEBUG,
});
const channelId = process.env.SLACK_CHANNEL;
exports.slack = async (title, message) => {
  try {
    if (message !== undefined) {
      const result = await client.chat.postMessage({
        channel: channelId,
        text: `${title}
${message}`,
      });
    } else {
      const result = await client.chat.postMessage({
        channel: channelId,
        text: `${title}`,
      });
    }

    // console.log(result);
  } catch (error) {
    console.error(error);
  }
};
