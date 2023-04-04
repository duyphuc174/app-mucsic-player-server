const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = function AuthMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: 'Bạn chưa đăng nhập!' });
    }
    const userId = jwt.verify(token, 'NDP');
    if (!userId) {
        return res.json({ message: 'Không tìm thấy user!' });
    }
    User.findOne({
        _id: userId,
    })
        .then(() => next())
        .catch(() => res.json({ message: 'Không thể truy cập!' }));
};
