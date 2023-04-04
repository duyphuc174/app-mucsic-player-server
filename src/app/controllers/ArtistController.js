const Artist = require('../models/Artist');
const { mongooseToObject } = require('../../util/mongoose');
const { createObject } = require('../../util/create');
const { createQuery } = require('../../util/query');

class ArtistController {
    // [GET] /artists
    getAll(req, res, next) {
        const artistQuery = createQuery(req, Artist);

        Promise.all([artistQuery])
            .then(([artists]) => res.json(artists))
            .catch(next);
    }

    // [GET] /artists/:id
    async showById(req, res, next) {
        await Artist.findOne({ _id: req.params.id })
            .then((artist) => res.json(artist))
            .catch(next);
    }

    // [POST] /artists/create
    async create(req, res, next) {
        const artistCreate = createObject(req);

        const artist = new Artist(artistCreate);
        await artist
            .save()
            .then(() => res.json({ message: 'Thêm ca sĩ mới thành công!' }))
            .catch(next);
    }

    // [DELETE] /artists/:id
    async delete(req, res, next) {
        await Artist.deleteOne({ _id: req.params.id })
            .then(() => res.json({ message: 'Xóa ca sĩ thành công!' }))
            .catch(next);
    }

    // [PUT] /artists/:id
    async update(req, res, next) {
        await Artist.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.json({ message: 'Sửa ca sĩ thành công!' }))
            .catch(next);
    }
}

module.exports = new ArtistController();
