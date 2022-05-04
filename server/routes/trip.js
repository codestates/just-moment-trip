const express = require("express");
const router = express.Router();
const tripController = require("../controllers/trip");

router.get("/", tripController.get);
router.post("/", tripController.post);
router.delete("/:trip_id", tripController.delete);

module.exports = router;
