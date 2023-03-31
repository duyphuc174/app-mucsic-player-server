const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Account = new Schema(
    {
        username: { type: String },
        password: { type: String },
        role: { type: String },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Account', Account);
