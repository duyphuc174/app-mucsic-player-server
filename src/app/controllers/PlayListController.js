const PlayList = require('../models/PlayList');
const { mongooseToObject } = require('../../util/mongoose');

class PlayListController {
    // [GET] /playlists/:userId
    get(req, res, next) {
        Promise.all([PlayList.find({ userId: req.params.userId })])
            .then(([playlists]) => res.json(playlists))
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
