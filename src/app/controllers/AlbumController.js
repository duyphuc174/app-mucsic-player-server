const Album = require('../models/Album');
const { mongooseToObject } = require('../../util/mongoose');

class AlbumController {
    // [GET] /albums
    async getAll(req, res, next) {
        await Album.find({})
            .then((albums) => res.json(albums))
            .catch(next);
    }

    // [GET] /albums/:albumId
    async getById(req, res, next) {
        await Album.findOne({ _id: req.params.id })
            .populate('songs')
            .populate('artist')
            .then((album) => res.json(album))
            .catch(next);
    }

    // [POST] /albums/create
    create(req, res, next) {
        const album = new Album(req.body);
        album
            .save()
            .then(() => res.json({ message: 'Thêm album mới thành công!' }))
            .catch(next);
    }

    // [DELETE] /albums/:id
    delete(req, res, next) {
        Album.deleteOne({ _id: req.params.id })
            .then(() => res.json({ message: 'Xóa album thành công!' }))
            .catch(next);
    }

    // [PUT] /albums/:id
    update(req, res, next) {
        Album.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.json({ message: 'Sửa album thành công!' }))
            .catch(next);
    }
}

module.exports = new AlbumController();
