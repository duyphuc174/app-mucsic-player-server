const Album = require('../models/Album');
const { mongooseToObject } = require('../../util/mongoose');

class AlbumController {
    // [GET] /albums
    async getAll(req, res, next) {
        let condition = {};
        if (req.query.hasOwnProperty('_find')) {
            condition.name = new RegExp(req.query.search, 'i');
        }
        let albumQuery = Album.find(condition);

        if (req.query.hasOwnProperty('_sort')) {
            albumQuery = albumQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([albumQuery])
            .then(([albums]) => res.json(albums))
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
        const baseUrl = `${req.protocol}://${req.headers.host}`;
        const albumCreate = req.body;
        if (req.files.image) {
            const image = `${baseUrl}/img/${req.files.image[0].filename}`;
            albumCreate.image = image;
        }
        const album = new Album(albumCreate);
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
