const PlayList = require('../models/PlayList');
const { mongooseToObject } = require('../../util/mongoose');

class PlaylistController {
    // [GET] /playlists/:userId
    async getByUser(req, res, next) {
        await PlayList.find({ user: req.params.userId })
            .then((playLists) => res.json(playLists))
            .catch(next);
    }

    // [GET] /playlists/:playListId
    async getById(req, res, next) {
        await PlayList.findOne({ _id: req.params.id })
            .populate('songs')
            .then((playList) => res.json(playList))
            .catch(next);
    }

    // [POST] /playlists/create
    async create(req, res, next) {
        const playlist = new PlayList(req.body);
        await playlist
            .save()
            .then(() => res.json({ message: 'Thêm playlist mới thành công!' }))
            .catch(next);
    }

    // [DELETE] /playlists/:id
    async delete(req, res, next) {
        await Playlist.deleteOne({ _id: req.params.id })
            .then(() => res.json({ message: 'Xóa playlist thành công!' }))
            .catch(next);
    }

    // [PUT] /playlists/:id
    async update(req, res, next) {
        await Playlist.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.json({ message: 'Sửa playlist thành công!' }))
            .catch(next);
    }
}

module.exports = new PlaylistController();
