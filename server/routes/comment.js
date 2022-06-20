const express = require("express");
const router = express.Router();
const commentController = require("../controllers/postRequest/comment");

router.get("/comment", commentController.get);
router.post("/comment", commentController.post);
router.patch("/comment/:comment_id", commentController.patch);
router.delete("/comment/:comment_id", commentController.delete);
module.exports = router;
