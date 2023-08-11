import { Photos } from "../models";
import express from "express";
const photosRouter = express.Router();

photosRouter.post("/", async (req, res) => {
  const { mas, PostId } = req.body;
  console.log(req.body);

  if (mas.length !== 0) {
    console.log(mas);
    mas.forEach(async (Photo) => {
      await Photos.create({ Photo, PostId });
    });
  }

  res.json("success");
});

export { photosRouter };
