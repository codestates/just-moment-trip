const express = require("express");
const router = express.Router();
const postController = require("../controllers/postRequest/post");

router.get("/", postController.get); //모든 포스트 겟 요쳥
router.post("/", postController.post); //포스트 작성 요청
router.get("/:post_id", postController.id.get); //post_id 에 대한 포스트 내용들 가져오기
router.get("/:post_id/comment", postController.comment.get);
router.patch("/post_id", postController.patch); //수정
router.delete("/post_id", postController.delete); // 삭제
module.exports = router;
