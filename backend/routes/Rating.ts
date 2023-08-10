const {Ratings} = require("../models")
const express = require('express')
const router = express.Router()

const { findUser, findUserHeaders } = require("../middleware/auth");


router.post("/", findUser, async (req, res) => {
    const {Rating, PostId} = req.body;
    const UserId = req.id;
    await Ratings.create({Rating, PostId, UserId});
    res.json('success');
});


router.post("/:postId", findUser, async (req, res) => {
    const PostId = req.params.postId;
    const UserId = req.id;
    const Rating = req.body.Rating

    const found = await Ratings.findOne({ where: { PostId: PostId, UserId: UserId } });
    if(!found) {
        await Ratings.create({PostId: PostId, UserId: UserId, Rating: Rating});
        

    } else {
        await Ratings.update({Rating: Rating}, { where: { PostId: PostId, UserId: UserId } });
    
    }
    res.json("success")
});


router.get("/:postId", findUserHeaders, async (req, res) => {
    const postId = req.params.postId;
    const UserId = req.id;

    const ratings = await Ratings.findAll({ where: { PostId: postId, UserId: UserId} });
    res.json(ratings);
  });

module.exports = router;