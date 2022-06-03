const Role = require('./models/Role.js');
const User = require('./models/User.js');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validation');

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: 'Error on registration' });
            }
            const { username, password } = req.body; //получаем имя и пароль из тела запроса
            const candidate = User.findOne(username);
            if (candidate) {
                return res.status(400).json({
                    message: 'A user with the same name already exists',
                });
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: 'USER' });
            const user = new User({
                username,
                password: hashPassword,
                roles: [userRole.value],
            });
            await user.save();
            return res.json({
                message: 'Пользователь успешно зарегистрирован',
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Registration error' });
        }
    }

    async login(req, res) {
        try {
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Login error' });
        }
    }

    async getUsers(req, res) {
        try {
            //добавление ролей в БД. Таким путем лучше не делать никогда
            // const userRole = new Role();
            // const adminRole = new Role({ value: 'ADMIN' });
            // await userRole.save();
            // await adminRole.save();
            res.json('Server working');
        } catch (error) {}
    }
}

module.exports = new authController();
