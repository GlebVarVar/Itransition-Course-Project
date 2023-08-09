import express, { Express, Request, Response } from 'express';
import cors from "cors";
import dotenv from 'dotenv';

const app: Express = express();
dotenv.config();
const port = process.env.PORT || 3001;

const {
  postRouter,
  commentsRouter,
  usersRouter,
  photosRouter,
  likesRouter,
  tagsRouter,
  ratingRouter,
  authRouter,
} = require('./routes/index');
const authController = require('./routes/authController');

app.use(express.json());
app.use(cors());

const db = require('./models');

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
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
