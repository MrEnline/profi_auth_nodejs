const Router = require('express');
const authController = require('./authController');
const router = Router();
const { check } = require('express-validator');

//данный роутер прослушивает маршруты, отмеченные ниже
//и выполняет методы, которые задаются вторым параметром
router.post(
    '/registration',
    [
        check('username', 'Field cannot be empty').notEmpty(),
        check(
            'password',
            'Password must be more than 4 and less than 12 characters'
        ).isLength(4, 12),
    ],
    authController.registration
);
router.post('/login', authController.login);
router.get('/users', authController.getUsers);

module.exports = router;
