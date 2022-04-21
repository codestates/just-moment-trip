const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/signup", userController.signup.post);
router.post("/signin", userController.signin.post);
router.post("/signout", userController.signout.post);
router.delete("/withdrawal", userController.withdrawal.delete);

module.exports = router;
