const cron = require("node-cron");
let str =
  "몸따숩게하고일찍주무세요도륵도르륵죄송한데한번만더외쳐볼게요아푸지마도토도토잠보오오오오우어우어";

let b = "";
let n = 0;
for (let i = 0; i < str.length; i++) {
  b = cron.schedule(
    "* * * * * *", //1초
    function () {
      console.log(str[n]);
      n++;
      if (n === str.length - 1) n = 0;
    },
    { scheduled: false }
  );
}
const a = cron.schedule(
  "1 * * * * *",
  function () {
    console.log("매 분 마다 작업 실행");
  },
  {
    scheduled: false,
  }
);
// a.start();
b.start();
