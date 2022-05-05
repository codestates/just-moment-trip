const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(process.env.SLACK_BOT_API, {
  logLevel: LogLevel.DEBUG,
});
const channelId = process.env.SLACK_CHANNEL;
exports.slack = async (title, message) => {
  let text = "";
  message !== undefined
    ? (text = `${title}
${message}`)
    : (text = title);
  try {
    const result = await client.chat.postMessage({
      channel: channelId,
      text: text,
    });
    // console.log(result);
  } catch (error) {
    console.error(error);
  }
};
