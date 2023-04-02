const Artist = require('../models/Artist');
const { mongooseToObject } = require('../../util/mongoose');

class ArtistController {
    // [GET] /artists
    getAll(req, res, next) {
        let artistQuery = Artist.find({});

        if (req.query.hasOwnProperty('_sort')) {
            artistQuery = artistQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([artistQuery])
            .then((artists) => res.json(artists))
            .catch(next);
    }

    // [GET] /artists/:id
    showById(req, res, next) {
        Artist.findOne({ _id: req.params.id })
            .then((artist) => res.json(artist))
            .catch(next);
    }

    // [POST] /artists/create
    create(req, res, next) {
        const artist = new Artist(req.body);
        artist
            .save()
            .then(() => res.json({ message: 'Thêm ca sĩ mới thành công!' }))
            .catch(next);
    }

    // [DELETE] /artists/:id
    delete(req, res, next) {
        Artist.deleteOne({ _id: req.params.id })
            .then(() => res.json({ message: 'Xóa ca sĩ thành công!' }))
            .catch(next);
    }

    // [PUT] /artists/:id
    update(req, res, next) {
        Artist.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.json({ message: 'Sửa ca sĩ thành công!' }))
            .catch(next);
    }
}

module.exports = new ArtistController();
