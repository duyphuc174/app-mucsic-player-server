const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = function TokenMiddleware(req, res, next) {
    const token = req.cookies.token;
    const userId = jwt.verify(token, 'NDP');
    if (!userId) {
        return res.json({ message: 'Token không hợp lệ!' });
    }
    User.findOne({
        _id: userId,
    })
        .then(() => res.json({ message: 'Token hợp lệ!' }))
        .catch(() => res.json({ message: 'Không thể truy cập!' }));
};
