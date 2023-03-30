const Song = require('../models/Song');
const { mongooseToObject } = require('../../util/mongoose');

class SongController {
    // [GET] /songs
    getAll(req, res, next) {
        Promise.all([Song.find({})])
            .then(([songs]) => res.json(songs))
            .catch(next);
    }

    // [GET] /songs/:id
    showById(req, res, next) {
        Song.findOne({ _id: req.params.id })
            .then((song) => res.json(song))
            .catch(next);
    }

    // // [GET] /songs/:slug
    // showBySlug(req, res, next) {
    //     Song.findOne({ slug: req.params.slug })
    //         .then((song) => res.json(song))
    //         .catch(next);
    // }

    // [POST] /songs/create
    create(req, res, next) {
        const song = new Song(req.body);
        song.save()
            .then(() => res.json({ message: 'Thêm bài hát mới thành công!' }))
            .catch(next);
    }

    // [DELETE] /songs/:id
    delete(req, res, next) {
        Song.deleteOne({ _id: req.params.id })
            .then(() => res.json({ message: 'Đã xóa bài hát thành công!' }))
            .catch(next);
    }

    // [PUT] /songs/:id
    update(req, res, next) {
        Song.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.json({ message: 'Sửa bài hát thành công!' }))
            .catch(next);
    }

    // [POST] /songs/:query
}

module.exports = new SongController();
