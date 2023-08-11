import { Alltags, Tags } from "../models";
import express from "express";
const tagsRouter = express.Router();

tagsRouter.get("/all", async (req, res) => {
  const listOftags = await Alltags.findAll();
  res.json(listOftags);
});

tagsRouter.post("/all", async (req, res) => {
  const { tag } = req.body;
  await Alltags.create({ tag: tag });
  res.json("success");
});

tagsRouter.post("/", async (req, res) => {
  const { tags, PostId } = req.body;
  tags.forEach(async (tag) => {
    await Tags.create({ tag, PostId });
  });
  res.json("success");
});

// router.post("/", async (req, res) => {
//     const {PostId } = req.body;
//     const UserId = req.user.id;

//     const found = await Likes.findOne({ where: { PostId: PostId, UserId: UserId } });
//     if(!found) {
//         await Likes.create({PostId: PostId, UserId: UserId});
//         res.json({liked: true});
//     } else {
//         await Likes.destroy({ where: { PostId: PostId, UserId: UserId } });
//         res.json({liked: false});
//     }

// });

export { tagsRouter };
