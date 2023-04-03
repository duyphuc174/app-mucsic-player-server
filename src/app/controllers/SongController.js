const Song = require('../models/Song');
const { mongooseToObject } = require('../../util/mongoose');

class SongController {
    // [GET] /songs
    async getAll(req, res, next) {
        let condition = {};
        if (req.query.hasOwnProperty('_find')) {
            condition.name = new RegExp(req.query.search, 'i');
        }
        let songQuery = Song.find(condition);

        if (req.query.hasOwnProperty('_sort')) {
            songQuery = songQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([songQuery])
            .then((songs) => res.json(songs))
            .catch(next);
    }

    // [GET] /songs/:id
    async showById(req, res, next) {
        await Song.findOne({ _id: req.params.id })
            .populate('artist')
            .then((song) => res.json(song))
            .catch(next);
    }

    // [POST] /songs/create
    async create(req, res, next) {
        const baseUrl = `${req.protocol}://${req.headers.host}`;
        const { name, introduction, lyrics, artist } = req.body;

        const image = `${baseUrl}/img/${req.files.image[0].filename}`;
        const audio = `${baseUrl}/audio/${req.files.audio[0].filename}`;

        const song = new Song({ name, introduction, lyrics, audio, artist, image });
        await song
            .save()
            .then(() => res.json({ message: 'Thêm bài hát mới thành công!' }))
            .catch(next);
    }

    // [DELETE] /songs/:id
    async delete(req, res, next) {
        await Song.deleteOne({ _id: req.params.id })
            .then(() => res.json({ message: 'Đã xóa bài hát thành công!' }))
            .catch(next);
    }

    // [PUT] /songs/:id
    async update(req, res, next) {
        const baseUrl = `${req.protocol}://${req.headers.host}`;
        const { name, introduction, lyrics, artist } = req.body;

        const image = `${baseUrl}/img/${req.files.image[0].filename}`;
        const audio = `${baseUrl}/audio/${req.files.audio[0].filename}`;

        const song = {
            name: name,
            introduction: introduction,
            lyrics: lyrics,
            artist: artist,
            image: image !== null ? image : '',
            audio: audio !== null ? audio : '',
        };

        await Song.updateOne({ _id: req.params.id }, song)
            .then(() => res.json({ message: 'Sửa bài hát thành công!' }))
            .catch(next);
    }

    // [POST] /songs/:query
}

module.exports = new SongController();
