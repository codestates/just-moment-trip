const express = require("express");
const router = express.Router();
const mypageController = require("../controllers/mypage/index");
const tripController = require("../controllers/mypage/trip");

router.get("/", mypageController.get);
router.patch("/", mypageController.patch);
router.get("/trip", tripController.get);
router.post("/trip", tripController.post);
router.delete("/trip/:trip_id", tripController.delete);

module.exports = router;
