const jwt = require('jsonwebtoken');

module.exports = {
    getToken: function (req, res) {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: 'Không tìm thấy token!' });
        }
        return jwt.verify(token, 'NDP');
    },
};
