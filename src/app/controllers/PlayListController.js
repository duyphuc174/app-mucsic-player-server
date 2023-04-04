const PlayList = require('../models/PlayList');
const { mongooseToObject } = require('../../util/mongoose');
const { createObject } = require('../../util/create');

class PlaylistController {
    // [GET] /playlists/:userId
    async showByUser(req, res, next) {
        await PlayList.find({ user: req.params.userId })
            .then((playLists) => res.json(playLists))
            .catch(next);
    }

    // [GET] /playlists/:playListId
    async showById(req, res, next) {
        await PlayList.findOne({ _id: req.params.id })
            .populate('songs')
            .then((playList) => res.json(playList))
            .catch(next);
    }

    // [POST] /playlists/create
    async create(req, res, next) {
        const playlistCreate = createObject(req);
        const playList = new playlistCreate();

        await playlist
            .save()
            .then(() => res.json({ message: 'Thêm playlist mới thành công!' }))
            .catch(next);
    }

    // [DELETE] /playlists/:id
    async delete(req, res, next) {
        await Playlist.delete({ _id: req.params.id })
            .then(() => res.json({ message: 'Xóa playlist thành công!' }))
            .catch(next);
    }

    // [PUT] /playlists/:id
    async update(req, res, next) {
        await Playlist.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.json({ message: 'Sửa playlist thành công!' }))
            .catch(next);
    }

    // [PUT] /playlists/:id/add-song
    async addSong(req, res, next) {
        const playlist = await PlayList.findOne({ _id: req.params.id });
        const songs = playlist.songs;
        const songId = req.body._id;
        if (songs.includes(songId)) {
            return res.status(400).json({ message: 'Bài hát đã có trong playlist' });
        }
        songs.push(songId);
        await PlayList.updateOne({ _id: req.params.id }, songs)
            .then(() => res.json({ message: 'Bài hát đã được thêm vào playlist!' }))
            .catch(next);
    }
}

module.exports = new PlaylistController();
