const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const PlayList = new Schema(
    {
        name: { type: String },
        // image: { type: String },
        user: { type: String, ref: 'User' },
        songs: [{ type: String, ref: 'Song' }],
    },
    {
        timestamps: true,
    },
);
PlayList.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: true,
});

module.exports = mongoose.model('PlayList', PlayList);
