import express from "express";
const usersRouter = express.Router();
import { Users, Posts, Likes, Ratings } from "../models";
import { findUserIn } from "../middleware/auth";
// const bcrypt = import("bcryptjs");
// const { validateToken } = import("../middlewares/AuthMiddleware");
// const { sign } = import("jsonwebtoken");

// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   const user = await Users.findOne({ where: { username: username } });

//   if (!user) res.json({ error: "User Doesn't Exist" });

//   bcrypt.compare(password, user.password).then(async (match) => {
//     if (!match) res.json({ error: "Wrong Username And Password Combination" });

//     const accessToken = sign(
//       { username: user.username, id: user.id },
//       "importantsecret"
//     );
//     res.json({ token: accessToken, username: username, id: user.id });
//   });
// });

// router.get("/auth", validateToken, (req, res) => {
//   res.json(req.user);
// });

// router.get("/basicinfo/:id", async (req, res) => {
//   const id = req.params.id;

//   const basicInfo = await Users.findByPk(id, {
//     attributes: { exclude: ["password"] },
//   });

//   res.json(basicInfo);
// });

usersRouter.get("/admin", async (req, res) => {
  const email = req.header("email");
  const basicInfo = await Users.findOne({ where: { email: email } });
  res.json(basicInfo);
});

usersRouter.get("/", async (req, res) => {
  const basicInfo = await Users.findAll({ include: [{ model: Posts, include: [Likes, Ratings] }] });
  console.log(basicInfo);
  res.json(basicInfo);
});

usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const basicInfo = await Users.findOne({
    where: { id: id },
    include: [{ model: Posts, include: [Likes, Ratings] }],
  });
  res.json(basicInfo);
});

// router.put("/changepassword", validateToken, async (req, res) => {
//   const { oldPassword, newPassword } = req.body;
//   const user = await Users.findOne({ where: { username: req.user.username } });

//   bcrypt.compare(oldPassword, user.password).then(async (match) => {
//     if (!match) res.json({ error: "Wrong Password Entered!" });

//     bcrypt.hash(newPassword, 10).then((hash) => {
//       Users.update(
//         { password: hash },
//         { where: { username: req.user.username } }
//       );
//       res.json("SUCCESS");
//     });
//   });
// });

usersRouter.put("/admin/:email", async (req, res) => {
  const email = req.params.email;
  await Users.update({ userType: "admin" }, { where: { email: email } });
  res.json("ADMIN ADDED SUCCESSFULLY");
});

export { usersRouter };
