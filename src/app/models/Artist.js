const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Artist = new Schema(
    {
        name: { type: String },
        realName: { type: String },
        introduction: { type: String },
        image: { type: String },
        sex: { type: String },
        birthday: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Artist', Artist);
