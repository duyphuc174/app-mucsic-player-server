module.exports = {
    createObject: function (req) {
        const baseUrl = `${req.protocol}://${req.headers.host}`;
        const Create = req.body;
        console.log(req.body);

        if (req.files.image) {
            const image = `${baseUrl}/img/${req.files.image[0].filename}`;
            Create.image = image;
        }
        if (req.files.audio) {
            const audio = `${baseUrl}/audio/${req.files.audio[0].filename}`;
            Create.audio = audio;
        }
        return Create;
    },
};
