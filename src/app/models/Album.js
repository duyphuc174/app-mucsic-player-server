const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Album = new Schema(
    {
        name: { type: String },
        image: { type: String },
        releaseDate: { type: String },
        artistId: { type: String },
        songIds: { type: [] },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Album', Album);
