const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Album = new Schema(
    {
        name: { type: String },
        image: { type: String },
        releaseDate: { type: String },
        artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
        songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Album', Album);
