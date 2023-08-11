import { Ratings } from "../models";
import express, { Request, Response } from "express";
const ratingRouter = express.Router();

import { findUser, findUserHeaders } from "../middleware/auth";

ratingRouter.post("/", findUser, async (req: Request, res: Response) => {
  // const { Rating, PostId } = req.body;
  // const UserId = req.id;
  // await Ratings.create({ Rating, PostId, UserId });
  // res.json("success");
});

ratingRouter.post("/:postId", findUser, async (req, res) => {
  // const PostId = req.params.postId;
  // const UserId = req.id;
  // const Rating = req.body.Rating;

  // const found = await Ratings.findOne({ where: { PostId: PostId, UserId: UserId } });
  // if (!found) {
  //   await Ratings.create({ PostId: PostId, UserId: UserId, Rating: Rating });
  // } else {
  //   await Ratings.update({ Rating: Rating }, { where: { PostId: PostId, UserId: UserId } });
  // }
  // res.json("success");
});

ratingRouter.get("/:postId", findUserHeaders, async (req, res) => {
  // const postId = req.params.postId;
  // const UserId = req.id;

  // const ratings = await Ratings.findAll({ where: { PostId: postId, UserId: UserId } });
  // res.json(ratings);
});

export { ratingRouter };
