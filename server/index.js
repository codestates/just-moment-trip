const hashtag_delete_schedule = require("./controllers/diary/hashtag_delete_schedule");
const signup_delete_schedule = require("./controllers/user/signup_delete_schedule");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = 8080;
const user = require("./routes/user");
const sign = require("./routes/sign");
const trip = require("./routes/trip");
const ouath = require("./routes/oauth");
const account = require("./routes/account");
const diary = require("./routes/diary");
const post = require("./routes/post");
const comment = require("./routes/comment");

hashtag_delete_schedule.cron();
signup_delete_schedule.cron();
//!
var server = require("http").createServer(app);
var io = require("socket.io")(server);
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
// connection event handler
// connection이 수립되면 event handler function의 인자로 socket인 들어온다
io.on("connection", function (socket) {
  // 접속한 클라이언트의 정보가 수신되면
  socket.on("login", function (data) {
    console.log("Client logged-in:\n name:" + data.name + "\n userid: " + data.userid);

    // socket에 클라이언트 정보를 저장한다
    socket.name = data.name;
    socket.userid = data.userid;

    // 접속된 모든 클라이언트에게 메시지를 전송한다
    io.emit("login", data.name);
  });

  // 클라이언트로부터의 메시지가 수신되면
  socket.on("chat", function (data) {
    console.log("Message from %s: %s", socket.name, data.msg);

    var msg = {
      from: {
        name: socket.name,
        userid: socket.userid,
      },
      msg: data.msg,
    };

    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    // socket.broadcast.emit("chat", msg);

    // 메시지를 전송한 클라이언트에게만 메시지를 전송한다
    // socket.emit("s2c chat", msg);

    // 접속된 모든 클라이언트에게 메시지를 전송한다
    io.emit("s2c chat", msg);

    // 특정 클라이언트에게만 메시지를 전송한다
    // io.to(id).emit('s2c chat', data);
  });

  // force client disconnect from server
  socket.on("forceDisconnect", function () {
    socket.disconnect();
  });

  socket.on("disconnect", function (data) {});
});
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://www.just-moment-trip.ml",
      "https://just-moment-trip.ml",
      "http://localhost:9000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(cookieParser());
app.use("/user", user);
app.use("/sign", sign);
app.use("/trip", trip);
app.use("/oauth", ouath);
app.use("/account", account);
app.use("/diary", diary);
// app.use("/post", post);
app.use("/comment", comment);

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});

//! socket 안쓴 서버
// const hashtag_delete_schedule = require("./controllers/diary/hashtag_delete_schedule");
// require("dotenv").config();
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const express = require("express");
// const app = express();
// const port = 8080;
// const user = require("./routes/user");
// const sign = require("./routes/sign");
// const trip = require("./routes/trip");
// const ouath = require("./routes/oauth");
// const account = require("./routes/account");
// const diary = require("./routes/diary");

// hashtag_delete_schedule.cron();

// app.use(express.json());
// app.use(
//   cors({
//     origin: ["https://www.just-moment-trip.ml", "http://localhost:9000"],
//     credentials: true,
//     methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
//   })
// );
// app.use(cookieParser());
// app.use("/user", user);
// app.use("/sign", sign);
// app.use("/trip", trip);
// app.use("/oauth", ouath);
// app.use("/account", account);
// app.use("/diary", diary);

// server = app.listen(port, () => {
//   console.log(`Listening on ${port}`);
// });
