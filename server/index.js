require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = 8080;
const user = require("./routes/user");
const mypage = require("./routes/mypage");
const trip = require("./routes/trip");
// const hashtag = require("./routes/hashtag");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:9000",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(cookieParser());
app.use("/", user);
app.use("/mypage", mypage);
app.use("/trip", trip);
// app.use("/hashtag", hashtag);

server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
// /trip/trip_id/account
