const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken');
const cookierParser = require('cookie-parser');
const { createObject } = require('../../util/create');

class UserController {
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
