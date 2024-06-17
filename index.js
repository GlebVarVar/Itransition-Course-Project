const express = require('express');
const cors = require('cors');
const app = express();

const {postRouter, commentsRouter, usersRouter, photosRouter, likesRouter, tagsRouter, ratingRouter} = require('./routes/index')

require("dotenv").config();

const corsOptions ={
    origin:'https://itransition-course-project-65lw-bce4tqa3d.vercel.app/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(express.json());
app.use(cors(corsOptions));

const db = require('./models');


app.use("/api/posts", postRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/users", usersRouter);
app.use("/api/photos", photosRouter);
app.use("/api/likes", likesRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/rating", ratingRouter);


db.sequelize
    .sync().
    then(() => {
    app.listen(process.env.PORT || 3001, () => {
        console.log("server running on 'port 3001");
    });
})
    .catch((err) => {
        console.log(err);
    }); 



module.exports = app;