const { post, comment, user } = require("../../models");
const tokenHandler = require("../tokenHandler");
const slack = require("../slack");

module.exports = {
  id: {
    get: async (req, res) => {
      const id = req.params.post_id;
      try {
        const postInfo = await post.findOne({
          include: [
            {
              model: user,
            },
          ],
          where: { id },
        });
        if (!postInfo) {
          return res.status(200).send({ data: {} });
        }

        const data = {
          id: postInfo.id,
          title: postInfo.title,
          content: postInfo.content,
          nickname: postInfo.user.nickname,
          created_at: postInfo.createdAt,
          updated_at: postInfo.updatedAt,
        };

        return res.status(200).send({ data });
      } catch (err) {
        await slack.slack("Post/:post_id GET 501");
        res.status(501).send("Post GET Server Error");
      }
    },
  },

  comment: {
    get: async (req, res) => {
      const id = req.params.post_id;
      try {
        const commentInfo = await comment.findAll({ where: { post_id: id }, raw: true });
        for (let i = 0; i < commentInfo.length; i++) {
          const userInfo = await user.findOne({ where: { id: commentInfo[i].user_id }, raw: true });
          commentInfo[i].nickname = userInfo.nickname;
        }

        return res.status(200).send({ data: commentInfo });
      } catch (err) {
        await slack.slack("Post/:post_id/comment GET 501");
        res.status(501).send("comment GET Server Error");
      }
    },
  },

  get: async (req, res) => {
    try {
      const postInfo = await post.findAll({
        include: [
          {
            model: user,
            attributes: ["nickname"],
          },
        ],
      });
      const data = postInfo.map((el) => {
        return {
          id: el.id,
          title: el.title,
          content: el.content,
          nickname: el.user.nickname,
          created_at: el.createdAt,
        };
      });
      return res.status(200).send({ data });
    } catch (err) {
      await slack.slack("Post GET 501");
      return res.status(501).send("Post GET Server Error");
    }
  },

  post: async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
      await slack.slack("Post Post 422");
      return res.status(422).send({ message: "insufficient parameters supplied" });
    }
    try {
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        const postPayload = {
          title,
          content,
          user_id: validity.id,
        };
        const postInfo = await post.create(postPayload);
        return res
          .status(201)
          .send({ data: { id: postInfo.id }, accessToken: validity.accessToken });
      }
    } catch (err) {
      await slack.slack("Post Post 501");
      res.status(501).send("Post Post Server Error");
    }
  },
  patch: async (req, res) => {
    const { new_title, new_content } = req.body;
    const id = req.params.post_id;
    if (!new_title || !new_content) {
      await slack.slack("Post Post 422");
      return res.status(422).send({ message: "insufficient parameters supplied" });
    }

    try {
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        const postInfo = await post.findOne({ where: { id } });
        if (!postInfo) {
          return res.status(404).send("Post Does not Exist");
        }
        await post.update(
          {
            title: new_title,
            content: new_content,
          },
          { where: { id } }
        );
        await slack.slack("Post Patch 200", `id : ${id}`);
        return res.status(200).send({ data: { id }, accessToken: validity.accessToken });
      }
    } catch (err) {
      await slack.slack("Post Patch 501");
      return res.status(501).send("Post Patch Server Error");
    }
  },
  delete: async (req, res) => {
    try {
      const validity = await tokenHandler.accessTokenVerify(req, res);
      if (validity) {
        const id = req.params.post_id;
        const postInfo = await post.findOne({
          where: { id },
        });
        if (postInfo) {
          await post.destroy({
            where: { id },
          });
          await slack.slack("Post Delete 200", `id : ${id}`);
          return res.status(200).send({ data: { id: id }, accessToken: validity.accessToken });
        } else {
          await slack.slack("Post Delete 404", `id : ${id}`);
          return res.status(404).send({
            data: { id: id },
            accessToken: validity.accessToken,
            message: "Post already deleted",
          });
        }
      }
    } catch (err) {
      await slack.slack("Post Delete 501");
      return res.status(501).send("Post Delete Server Error");
    }
  },
};
