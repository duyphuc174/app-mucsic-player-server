const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayList = new Schema(
    {
        name: { type: String },
        image: { type: String },
        user: { type: String, ref: 'User' },
        songs: [{ type: String, ref: 'Song' }],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('PlayList', PlayList);
