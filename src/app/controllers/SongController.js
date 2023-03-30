const Song = require('../models/Song');
const { mongooseToObject } = require('../../util/mongoose');

class SongController {
    // [GET] /songs
    async getAll(req, res, next) {
        await Song.find({})
            .populate('artist')
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
        const song = new Song(req.body);
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
        await Song.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.json({ message: 'Sửa bài hát thành công!' }))
            .catch(next);
    }

    // [POST] /songs/:query
}

module.exports = new SongController();
