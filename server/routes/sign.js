const express = require("express");
const router = express.Router();
const signController = require("../controllers/user/sign");

router.post("/up", signController.up.post);
router.post("/out", signController.out.post);
router.post("/in", signController.in.post);
router.post("/find", signController.find.post);
router.post("/emailVerification", signController.emailVerification.post);
module.exports = router;
