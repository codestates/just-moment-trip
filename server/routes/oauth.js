const express = require("express");
const router = express.Router();
const oauthController = require("../controllers/oauth/index");

router.get("/callback/kakao", oauthController.get);

module.exports = router;
