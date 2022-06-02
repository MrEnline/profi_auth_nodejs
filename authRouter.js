const Router = require('express');
const authController = require('./authController');
const router = Router();
//данный роутер прослушивает маршруты, отмеченные ниже
//
router.post('/registration', authController.registration());
router.post('/login', authController.login());
router.get('/users', authController.getUsers());

module.exports = router;
