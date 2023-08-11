import express from "express";
const postsRouter = express.Router();
import { Posts, Likes, Ratings, Tags, Photos } from "../models";

import { findUser } from "../middleware/auth";

postsRouter.get("/", async (req, res) => {
  // const displayPosts = req.headers.countofdisplay;
  // const filter = req.headers.filter;

  // if (filter == "Books" || filter == "Games" || filter == "Films") {
  //   console.log(filter);
  //   const countOfPosts = await Posts.count({ where: { category: filter } });
  //   console.log(countOfPosts);
  //   if (displayPosts > countOfPosts) {
  //     const listOfPosts = await Posts.findAll({
  //       where: { category: filter },
  //       include: [Likes, Ratings, Tags, Photos],
  //     });
  //     listOfPosts.reverse();
  //     res.json({ addition: false, listOfPosts: listOfPosts });
  //   } else {
  //     const listOfPosts = await Posts.findAll({
  //       where: { category: filter },
  //       include: [Likes, Ratings, Tags, Photos],
  //       limit: countOfPosts,
  //       ffset: countOfPosts - displayPosts,
  //     });
  //     listOfPosts.reverse();
  //     res.json({ listOfPosts: listOfPosts });
  //   }
  // } else {
  //   const countOfPosts = await Posts.count();
  //   if (displayPosts > countOfPosts) {
  //     const listOfPosts = await Posts.findAll({ include: [Likes, Ratings, Tags, Photos] });
  //     listOfPosts.reverse();
  //     res.json({ addition: false, listOfPosts: listOfPosts });
  //   } else {
  //     const listOfPosts = await Posts.findAll({
  //       limit: countOfPosts,
  //       offset: countOfPosts - displayPosts,
  //       include: [Likes, Ratings, Tags, Photos],
  //     });
  //     listOfPosts.reverse();
  //     res.json({ listOfPosts: listOfPosts });
  //   }
  // }
});

postsRouter.get("/:postId", async (req, res) => {
  const id = req.params.postId;
  console.log(id);
  const post = await Posts.findByPk(id, { include: [Likes, Ratings, Tags, Photos] });
  res.json(post);
});

// router.get("/byuserId/:id", async (req, res) => {
//   const id = req.params.id;
//   const listOfPosts = await Posts.findAll({
//     where: { UserId: id },
//     include: [Likes],
//   });
//   res.json(listOfPosts);
// });

postsRouter.post("/", findUser, async (req, res) => {
  // const info = req.body;
  // info.username = req.username;
  // info.UserId = req.id;
  // await Posts.create(info);
  // const lastRecord = await Posts.max("id", { where: { UserId: info.UserId } });

  // res.json(lastRecord);
});

// router.put("/title", async (req, res) => {
//   const {newTitle, id} = req.body;
//   await Posts.update({title: newTitle}, {where: {id: id}})
//   res.json(newTitle);
// });

// router.put("/posttext", validateToken, async (req, res) => {
//   const {newText, id} = req.body;
//   await Posts.update({postText: newText}, {where: {id: id}})
//   res.json(newText);
// });

postsRouter.delete("/:postId", async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

postsRouter.delete("/:email", async (req, res) => {
  const email = req.params.email;
  await Posts.destroy({
    where: {
      email: email,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

export { postsRouter };
