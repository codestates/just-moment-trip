const express = require("express");
const router = express.Router();
const diaryController = require("../controllers/diary");

router.get("/", diaryController.get);
router.post("/", diaryController.post);
router.delete("/:diary_id", diaryController.delete);
router.patch("/:diary_id", diaryController.patch);

module.exports = router;
