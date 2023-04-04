const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Album = new Schema(
    {
        name: { type: String },
        image: { type: String },
        releaseDate: { type: String },
        artist: { type: String, ref: 'Artist' },
        songs: [{ type: String, ref: 'Song' }],
    },
    {
        timestamps: true,
    },
);

Album.plugin(mongooseDelete, {
    overrideMethods: true,
    deletedAt: true,
});

module.exports = mongoose.model('Album', Album);
