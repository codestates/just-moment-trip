const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account");

router.get("/", accountController.get);
router.post("/", accountController.post);
router.delete("/:account_id", accountController.delete);
router.patch("/:account_id", accountController.patch);

module.exports = router;
