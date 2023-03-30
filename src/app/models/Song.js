const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Song = new Schema(
    {
        name: { type: String },
        introduction: { type: String },
        image: { type: String },
        lyrics: { type: String },
        audio: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Song', Song);
