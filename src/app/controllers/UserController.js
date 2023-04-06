const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const cookierParser = require('cookie-parser');
const { createObject } = require('../../util/create');
const { getToken } = require('../../util/token');

class UserController {
    // [GET] /users/profile
    async showProfile(req, res, next) {
        const userId = getToken(req, res);
        console.log(userId);
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
        const userId = getToken(req, res);
        const profileUpdate = createObject(req);

        await User.updateOne({ _id: userId }, profileUpdate)
            .then(() => res.json({ message: 'Chỉnh sửa profile thành công!' }))
            .catch(next);
    }
}

module.exports = new UserController();
