import express from "express";
const authRouter = express.Router();
import controller from "./authController";
import { findUserIn } from "../middleware/auth";
import { check } from "express-validator";
// const authMiddleware = import('./middlewaree/authMiddleware')
// const roleMiddleware = import('./middlewaree/roleMiddleware')

authRouter.post("/registration", findUserIn, controller.registration);
// router.post('/registration', [
//     check('username', "Имя пользователя не может быть пустым").notEmpty(),
//     check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
// ], controller.registration)
authRouter.post("/login", controller.login);
// router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers)
authRouter.get("/users", controller.getUsers);

export { authRouter };
