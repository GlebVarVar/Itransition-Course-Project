const {Photos} = require("../models")
const express = require('express')
const router = express.Router()


router.post("/",  async (req, res) => {
    const {mas, PostId} = req.body;
    console.log(req.body)
     
    if (mas.length !==0 ) {
        await Photos.create({Photo: mas[0], PostId, Preview: true});
        mas.pop(0);
        console.log(mas);
        mas.forEach(async (Photo)  => {
            await Photos.create({Photo, PostId});
        })
    }
    
    res.json('success');
});

module.exports = router;