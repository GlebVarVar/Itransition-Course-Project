const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { findUser } = require("../middleware/auth");
// const {validateToken} = require('../middlewares/AuthMiddleware')

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

router.post("/", findUser, async (req, res) => {
  const comment = req.body;
  const username = req.username;
  comment.username = username;
  await Comments.create(comment);
  res.json("Added");
});

router.delete("/:commentId",  async (req, res) => {
  const commentId = req.params.commentId;
  await Comments.destroy({where: {
    id: commentId,
  }});

  res.json("deleted")
});



module.exports = router;