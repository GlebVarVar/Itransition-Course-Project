const Router = require('express')
const router = new Router()
const controller = require('./authController')
const { findUserIn } = require('../middleware/auth');
const {check} = require("express-validator")
// const authMiddleware = require('./middlewaree/authMiddleware')
// const roleMiddleware = require('./middlewaree/roleMiddleware')

router.post('/registration', findUserIn, controller.registration)
// router.post('/registration', [
//     check('username', "Имя пользователя не может быть пустым").notEmpty(),
//     check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
// ], controller.registration)
router.post('/login', controller.login)
// router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers)
router.get('/users',  controller.getUsers)


module.exports = router;