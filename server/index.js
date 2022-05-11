const hashtag_delete_schedule = require("./controllers/diary/hashtag_delete_schedule");
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

hashtag_delete_schedule.cron();

app.use(express.json());
app.use(
  cors({
    origin: ["https://www.just-moment-trip.ml", "http://localhost:9000"],
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

server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
