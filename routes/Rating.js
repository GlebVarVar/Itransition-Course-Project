const {Ratings} = require("../models")
const express = require('express')
const router = express.Router()

const { findUser } = require("../middleware/auth");


router.post("/", findUser, async (req, res) => {
    const {Rating, PostId} = req.body;
    const UserId = req.id;
    await Ratings.create({Rating, PostId, UserId});
    res.json('success');
});


module.exports = router;