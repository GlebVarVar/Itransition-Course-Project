import express from "express";
const commentsRouter = express.Router();
import { Comments } from "../models";
import { findUser } from "../middleware/auth";
// const {validateToken} = import('../middlewares/AuthMiddleware')

commentsRouter.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

commentsRouter.post("/", findUser, async (req, res) => {
  // const comment = req.body;
  // const username = req.username;
  // comment.username = username;
  // await Comments.create(comment);
  // res.json("Added");
});

commentsRouter.delete("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  res.json("deleted");
});

export { commentsRouter };
