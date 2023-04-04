const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Artist = new Schema(
    {
        name: { type: String },
        realName: { type: String },
        introduction: { type: String },
        image: { type: String },
        sex: { type: String },
        birthday: { type: Date },
    },
    {
        timestamps: true,
    },
);

Artist.plugin(mongooseDelete, {
    overrideMethods: true,
    deletedAt: true,
});

module.exports = mongoose.model('Artist', Artist);
