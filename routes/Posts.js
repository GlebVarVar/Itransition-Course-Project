const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");


const { findUser } = require("../middleware/auth");

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  // const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: listOfPosts });
});

router.get("/:postId", async (req, res) => {
  const id = req.params.postId;
  const post = await Posts.findByPk(id);
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

router.post("/", findUser, async (req, res) => {
  const info = req.body;
  info.username = req.username;
  info.UserId = req.id;
  await Posts.create(info);
  const lastRecord = await Posts.max('id',
    {where: {UserId: info.UserId}});
  
  
  res.json(lastRecord);
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

// router.delete("/:postId", validateToken, async (req, res) => {
//   const postId = req.params.postId;
//   await Posts.destroy({
//     where: {
//       id: postId,
//     },
//   });

//   res.json("DELETED SUCCESSFULLY");
// });



module.exports = router;