const PlayList = require('../models/PlayList');
const { mongooseToObject } = require('../../util/mongoose');
const { createObject } = require('../../util/create');
const { getToken } = require('../../util/token');

class PlaylistController {
    // [GET] /playlists/user/:userId
    async showAll(req, res, next) {
        // const userId = getToken(req, res);
        const userId = req.params.userId;
        await PlayList.find({ user: userId })
            .populate('songs')
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

    // [POST] /playlists/:userId/create
    async create(req, res, next) {
        // const userId = getToken(req, res);
        let playlistCreate = createObject(req);
        playlistCreate.user = req.params.userId;
        // console.log(playlistCreate);
        const playlist = new PlayList(playlistCreate);

        await playlist
            .save()
            .then(() => res.json({ message: 'Thêm playlist mới thành công!' }))
            .catch(next);
    }

    // [DELETE] /playlists/:id
    async delete(req, res, next) {
        await PlayList.delete({ _id: req.params.id })
            .then(() => res.json({ message: 'Xóa playlist thành công!' }))
            .catch(next);
    }

    // [PUT] /playlists/:id
    async update(req, res, next) {
        await PlayList.updateOne({ _id: req.params.id }, req.body)
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

        const songUpdate = {
            songs: songs,
        };
        await PlayList.updateOne({ _id: req.params.id }, songUpdate)
            .then(() => res.json({ message: 'Bài hát đã được thêm vào playlist!' }))
            .catch(next);
    }

    // [PUT] /playlists/:id/delete-song
    async deleteSong(req, res, next) {
        const playlist = await PlayList.findOne({ _id: req.params.id });
        let songs = playlist.songs;
        const songId = req.body._id;
        if (!songs.includes(songId)) {
            return res.status(400).json({ message: 'Bài hát không có trong playlist' });
        }
        songs = songs.fillter((song) => song !== songId);

        const songUpdate = {
            songs: songs,
        };
        await PlayList.updateOne({ _id: req.params.id }, songUpdate)
            .then(() => res.json({ message: 'Bài hát đã được xóa khỏi playlist!' }))
            .catch(next);
    }
}

module.exports = new PlaylistController();
