const express = require("express");
const router = express.Router();
const diaryController = require("../controllers/diary");
const fuzzy = require("../controllers/diary/fuzzy");

router.get("/", diaryController.get);
router.post("/", diaryController.post);
router.delete("/:diary_id", diaryController.delete);
router.patch("/:diary_id", diaryController.patch);

router.get("/fuzzy", fuzzy.get);
module.exports = router;
