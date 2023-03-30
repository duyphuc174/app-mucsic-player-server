const PlayList = require('../models/PlayList');
const { mongooseToObject } = require('../../util/mongoose');

class PlayListController {
    // [GET] /playlists/:userId
    async get(req, res, next) {
        await PlayList.find({ user: req.params.userId })
            .then((playLists) => res.json(playLists))
            .catch(next);
    }

    // [GET] /playlists/:playListId
    async get(req, res, next) {
        await PlayList.findOne({ _id: req.params.id })
            .populate('songs')
            .then((playList) => res.json(playList))
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
