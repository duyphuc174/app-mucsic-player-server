const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken');
const cookierParser = require('cookie-parser');
const { createObject } = require('../../util/create');

class UserController {
    // [POST] /user/login
    // async login(req, res, next) {
    //     const username = req.body.username;
    //     const password = req.body.password;

    //     await User.findOne({
    //         username: username,
    //         password: password,
    //     })
    //         .then((user) => {
    //             const token = jwt.sign({ _id: user._id }, 'NDP', { expiresIn: '24h' });
    //             res.cookie('token', token, { maxAge: 3600000, httpOnly: true });
    //             return res.json(token);
    //         })
    //         .catch((err) => {
    //             res.json({ message: 'Tài khoản hoặc mật khẩu không chính xác!' });
    //         });
    // }

    // // [POST] /users/register
    // async register(req, res, next) {
    //     let userIsExisted = await User.findOne({ username: req.body.username });
    //     if (userIsExisted) {
    //         return res.status(400).json({ message: 'Tài khoản đã tồn tại' });
    //     }
    //     const user = new User(req.body);
    //     await user
    //         .save()
    //         .then(() => res.json({ message: 'Bạn đã tạo tài khoản thành công' }))
    //         .catch(next);
    // }

    // [GET] /users/profile
    async showProfile(req, res, next) {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: 'Bạn chưa đăng nhập!' });
        }
        const userId = jwt.verify(token, 'NDP');
        await User.findOne({ _id: userId })
            .then((user) => {
                res.json({
                    name: user.name,
                    image: user.image,
                    sex: user.sex,
                    role: user.role,
                    birthday: user.birthday,
                });
            })
            .catch(next);
    }

    // [PUT] /users/profile
    async updateProfile(req, res, next) {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: 'Bạn chưa đăng nhập!' });
        }
        const userId = jwt.verify(token, 'NDP');
        const profileUpdate = createObject(req);

        await User.updateOne({ _id: userId }, profileUpdate)
            .then(() => res.json({ message: 'Chỉnh sửa profile thành công!' }))
            .catch(next);
    }
}

module.exports = new UserController();
