"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var app = (0, express_1.default)();
dotenv_1.default.config();
var port = process.env.PORT || 3001;
var _a = require('./routes/index'), postRouter = _a.postRouter, commentsRouter = _a.commentsRouter, usersRouter = _a.usersRouter, photosRouter = _a.photosRouter, likesRouter = _a.likesRouter, tagsRouter = _a.tagsRouter, ratingRouter = _a.ratingRouter, authRouter = _a.authRouter;
var authController = require('./routes/authController');
app.use(express_1.default.json());
app.use((0, cors_1.default)());
var db = require('./models');
app.use('/api/posts', postRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/users', usersRouter);
app.use('/api/photos', photosRouter);
app.use('/api/likes', likesRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/rating', ratingRouter);
app.use('/api/auth', authRouter);
db.sequelize
    .sync()
    .then(function () {
    app.listen(port, function () {
        console.log("server running on port ".concat(port));
    });
})
    .catch(function (err) {
    console.log(err);
});
