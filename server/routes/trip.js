const express = require("express");
const router = express.Router();
const tripController = require("../controllers/trip");
const diaryController = require("../controllers/diary");
const accountController = require("../controllers/account");

router.get("/", tripController.get);
router.post("/", tripController.post);
router.delete("/:trip_id", tripController.delete);

router.get("/:trip_id/diary", diaryController.get);
router.post("/:trip_id/diary", diaryController.post);
router.delete("/:trip_id/diary/:diary_id", diaryController.delete);
router.patch("/:trip_id/diary/:diary_id", diaryController.patch);

router.get("/:trip_id/account", accountController.get);
router.post("/:trip_id/account", accountController.post);
router.delete("/:trip_id/account/:account_id", accountController.delete);
router.patch("/:trip_id/account/:account_id", accountController.patch);
module.exports = router;

"id",
  "title",
  "country",
  "total_price",
  "base_currency",
  "start_date",
  "end_date",
  "createdAt",
  "updatedAt",
  "user_id";
