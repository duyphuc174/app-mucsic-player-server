const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: { type: String },
        username: { type: String },
        password: { type: String },
        image: { type: String },
        sex: { type: String },
        birthday: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);
