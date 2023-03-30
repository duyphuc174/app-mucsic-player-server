const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayList = new Schema(
    {
        name: { type: String },
        image: { type: String },
        userId: { type: String },
        songIds: { type: [] },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('PlayList', PlayList);
