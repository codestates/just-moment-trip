const { comment } = require("../../models");
const tokenHandler = require("../tokenHandler");
const slack = require("../slack");

module.exports = {
  post: async (req, res) => {
    try {
      const { post_id, content } = req.body;
      if (!post_id || !content) {
        await slack.slack("Comment Post 422");
        return res.status(422).send({ message: "insufficient parameters supplied" });
      }
      const validity = await tokenHandler.accessTokenVerify(req, res);
      console.log("1111");
      console.log(validity.id);
      if (validity) {
        const payload = {
          post_id,
          content,
          user_id: validity.id,
        };
        const result = await comment.create(payload);
        await slack.slack("Comment Post 201", `id : ${result.id}`);
        res.status(201).send({ data: { id: result.id }, accessToken: validity.accessToken });
      }
    } catch (err) {
      await slack.slack("Comment Post 501");
      res.status(501).send("Comment Post");
    }
  },
  delete: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        const id = req.params.comment_id;
        const commentInfo = await comment.findOne({
          where: { id: id },
        });
        if (commentInfo) {
          await comment.destroy({
            where: { id: id },
          });
          await slack.slack("Comment Delete 200", `id : ${id}`);
          res.status(200).send({ data: { id: id }, accessToken: validity.accessToken });
        } else {
          await slack.slack("Comment Delete 404", `id : ${id}`);
          res.status(404).send({
            data: { id: id },
            accessToken: validity.accessToken,
            message: "Comment already delete",
          });
        }
      }
    } catch (err) {
      await slack.slack("Comment Delete 501");
      res.status(501).send("Comment Delete");
    }
  },
  patch: async (req, res) => {
    //patch 하나만 바꾸는거고 put은 모든거 지정(지정안한거 null됨)
    try {
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        const id = req.params.comment_id;
        const { new_content } = req.body;
        const commentInfo = await comment.findOne({
          where: { id: id },
        });
        const { content } = commentInfo;
        if (commentInfo) {
          if (content === new_content) {
            // 바뀐게 없음
            await slack.slack("Comment Patch 412", `id : ${id}`);
            res.status(412).send({
              data: { id: id },
              accessToken: validity.accessToken,
              message: "No Change",
            });
          } else {
            await comment.update(
              {
                content: new_content,
              },
              { where: { id: id } }
            );
            await slack.slack("Comment Patch 200", `id : ${id}`);
            res.status(200).send({ data: { id: id }, accessToken: validity.accessToken });
          }
        } else {
          //가계부 정보 없음
          await slack.slack("Comment Patch 404", `id : ${id}`);
          res.status(404).send({
            data: { id: id },
            accessToken: validity.accessToken,
            message: "No Comment Info",
          });
        }
      }
    } catch (err) {
      await slack.slack("Comment Patch 501");
      res.status(501).send("Comment Patch");
    }
  },
};
