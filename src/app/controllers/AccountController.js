const Account = require('../models/Account');
const { mongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken');
const cookierParser = require('cookie-parser');

class AccountController {
    login(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;

        Account.findOne({
            username: username,
            password: password,
        })
            .then((account) => {
                const token = jwt.sign({ _id: account._id }, 'password');
                return res.json({ token: token });
            })
            .catch(next);
    }
}

module.exports = new AccountController();
