const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayList = new Schema(
    {
        name: { type: String },
        image: { type: String },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('PlayList', PlayList);
