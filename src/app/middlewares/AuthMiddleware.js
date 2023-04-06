const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getToken } = require('../../util/token');

module.exports = function AuthMiddleware(req, res, next) {
    const userId = getToken(req, res);
    if (!userId) {
        return res.json({ message: 'Không tìm thấy user!' });
    }
    User.findOne({
        _id: userId,
    })
        .then(() => next())
        .catch(() => res.json({ message: 'Không thể truy cập!' }));
};
