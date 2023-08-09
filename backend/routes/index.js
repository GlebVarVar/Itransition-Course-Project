const postRouter = require('./Posts');
const commentsRouter = require('./Comments');
const usersRouter = require('./Users');
const photosRouter = require('./Photos');
const likesRouter = require('./Likes');
const tagsRouter = require('./Tags');
const ratingRouter = require('./Rating');

const authRouter = require('./authRouter');

module.exports = {
  authRouter,
  postRouter,
  commentsRouter,
  usersRouter,
  photosRouter,
  likesRouter,
  tagsRouter,
  ratingRouter,
};
