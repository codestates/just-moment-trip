const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/", userController.get);
router.patch("/", userController.patch);
router.delete("/", userController.delete);
module.exports = router;
