const express = require('express')
const router = express.Router()
const {Likes} = require("../models")
const { findUser } = require("../middleware/auth");

router.post("/", findUser, async (req, res) => {
    const {PostId } = req.body;
    const UserId = req.id;

    const found = await Likes.findOne({ where: { PostId: PostId, UserId: UserId } });
    if(!found) {
        await Likes.create({PostId: PostId, UserId: UserId});
        const count = await Likes.findAll({ where: { PostId: PostId} })
        res.json({count: count.length});
    } else {
        await Likes.destroy({ where: { PostId: PostId, UserId: UserId } });
        const count = await Likes.findAll({ where: { PostId: PostId} })
        res.json({count: count.length});
    }
    
});



module.exports = router;