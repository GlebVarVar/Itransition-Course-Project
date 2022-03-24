const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.static((__dirname + '/Client')));

const db = require('./models');

// Routers
const postRouter = require('./routes/Posts');
app.use("/api/posts", postRouter);
const commentsRouter = require('./routes/Comments');
app.use("/api/comments", commentsRouter);
const usersRouter = require('./routes/Users');
app.use("/api/registration", usersRouter);

// const likesRouter = require('./routes/Likes');
// app.use("/likes", likesRouter);
const tagsRouter = require('./routes/Tags');
app.use("/api/tags", tagsRouter);

db.sequelize
    .sync().
    then(() => {
    app.listen(process.env.PORT || 3001, () => {
        console.log("server running on 'port 3000");
    });
})
    .catch((err) => {
        console.log(err);
    }); 


