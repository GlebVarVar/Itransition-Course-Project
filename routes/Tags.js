const {Alltags} = require("../models")
const express = require('express')
const router = express.Router()


router.get("/",  async (req, res) => {
    const listOftags = await Alltags.findAll();
    console.log(listOftags);
    res.json(listOftags);
    
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

module.exports = router;