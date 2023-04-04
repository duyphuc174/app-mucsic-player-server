const Song = require('../models/Song');
const { mongooseToObject } = require('../../util/mongoose');
const { createObject } = require('../../util/create');
const { createQuery } = require('../../util/query');

class SongController {
    // [GET] /songs
    showAll(req, res, next) {
        const songQuery = createQuery(req, Song);

        Promise.all([songQuery])
            .then(([songs]) => res.json(songs))
            .catch(next);
    }

    // [GET] /songs/:id
    async showById(req, res, next) {
        await Song.findOne({ _id: req.params.id })
            .populate('artist')
            .then((song) => res.json(song))
            .catch(next);
    }

    // [GET] /songs/deleted
    async showDeletedSongs(req, res, next) {
        await Song.findDeleted({})
            .then((songs) => res.json(songs))
            .catch(next);
    }

    // [POST] /songs/create
    async create(req, res, next) {
        const songCreate = createObject(req);

        const song = new Song(songCreate);
        await song
            .save()
            .then(() => res.json({ message: 'Thêm bài hát mới thành công!' }))
            .catch(next);
    }

    // [DELETE] /songs/:id/force
    async forceDelete(req, res, next) {
        await Song.deleteOne({ _id: req.params.id })
            .then(() => res.json({ message: 'Bài hát đã được xóa vĩnh viễn!' }))
            .catch(next);
    }

    // [DELETE] /songs/:id
    async delete(req, res, next) {
        await Song.delete({ _id: req.params.id })
            .then(() => res.json({ message: 'Bài hát đã được xóa!' }))
            .catch(next);
    }

    // [PATCH] /songs/:id/restore
    async restore(req, res, next) {
        await Song.restore({ _id: req.params.id })
            .then(() => {
                res.json({ message: 'Khôi phục bài hát thành công!' });
            })
            .catch(next);
    }

    // [PUT] /songs/:id
    async update(req, res, next) {
        const songUpdate = createObject(req);

        await Song.updateOne({ _id: req.params.id }, songUpdate)
            .then(() => res.json({ message: 'Sửa bài hát thành công!' }))
            .catch(next);
    }
}

module.exports = new SongController();
