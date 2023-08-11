import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import {sequelize} from "./config";
const app: Express = express();
dotenv.config();
const port = process.env.PORT || 3001;

import {
  postsRouter,
  commentsRouter,
  usersRouter,
  photosRouter,
  likesRouter,
  tagsRouter,
  ratingRouter,
  authRouter,
} from "./routes";

app.use(express.json());
app.use(cors());


app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/users", usersRouter);
app.use("/api/photos", photosRouter);
app.use("/api/likes", likesRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/rating", ratingRouter);
app.use("/api/auth", authRouter);

sequelize.sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
