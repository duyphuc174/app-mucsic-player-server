const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Song = new Schema(
    {
        name: { type: String },
        image: { type: String },
        lyrics: { type: String },
        audio: { type: String },
        artist: { type: String, ref: 'Artist' },
        genre: { type: String },
    },
    {
        timestamps: true,
    },
);

Song.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Song', Song);
