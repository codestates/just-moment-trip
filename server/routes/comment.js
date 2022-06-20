const express = require("express");
const router = express.Router();
const commentController = require("../controllers/postRequest/comment");

router.get("/", commentController.get);
router.post("/", commentController.post);
router.patch("/:comment_id", commentController.patch);
router.delete("/:comment_id", commentController.delete);
module.exports = router;
