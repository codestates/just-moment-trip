require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = 8080;
const user = require("./routes/user");
const sign = require("./routes/sign");
const trip = require("./routes/trip");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:9000",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(cookieParser());
app.use("/user", user);
app.use("/sign", sign);
app.use("/trip", trip);

server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
