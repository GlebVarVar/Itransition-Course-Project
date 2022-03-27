const express = require("express");
const router = express.Router();
const { Users, Posts, Likes, Ratings } = require("../models");
const {findUserIn} = require('../middleware/auth')
// const bcrypt = require("bcryptjs");
// const { validateToken } = require("../middlewares/AuthMiddleware");
// const { sign } = require("jsonwebtoken");

router.post("/registration", findUserIn, async (req, res) => {
  const { email, username } = req.body;

  await Users.create({
    username: username,
    email: email,
    userType: 'member'
  });
  res.json("SUCCESS");
});

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

router.get("/admin", async (req, res) => {
  const email = req.header("email");
  const basicInfo = await Users.findOne({ where: { email: email } });
  res.json(basicInfo);
});

router.get("/", async (req, res) => {
  const basicInfo = await Users.findAll({  include: [Posts, Likes, Ratings] });
  console.log(basicInfo);
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

module.exports = router;