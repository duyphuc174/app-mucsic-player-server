const Album = require('../models/Album');
const { mongooseToObject } = require('../../util/mongoose');
const { createObject } = require('../../util/create');
const { createQuery } = require('../../util/query');

class AlbumController {
    // [GET] /albums
    async showAll(req, res, next) {
        const albumQuery = createQuery(req, Album);
        albumQuery.populate('songs').populate('artist');

        Promise.all([albumQuery])
            .then(([albums]) => res.json(albums))
            .catch(next);
    }

    // [GET] /albums/:albumId
    async showById(req, res, next) {
        await Album.findOne({ _id: req.params.id })
            .populate('songs')
            .populate('artist')
            .then((album) => res.json(album))
            .catch(next);
    }

    // [POST] /albums/create
    async create(req, res, next) {
        const albumCreate = createObject(req);
        const album = new Album(albumCreate);
        await album
            .save()
            .then(() => res.json({ message: 'Thêm album mới thành công!' }))
            .catch(next);
    }

    // [DELETE] /albums/:id
    async delete(req, res, next) {
        await Album.delete({ _id: req.params.id })
            .then(() => res.json({ message: 'Xóa album thành công!' }))
            .catch(next);
    }

    // [PUT] /albums/:id
    async update(req, res, next) {
        const albumUpdate = createObject(req);
        await Album.updateOne({ _id: req.params.id }, albumUpdate)
            .then(() => res.json({ message: 'Sửa album thành công!' }))
            .catch(next);
    }

    // [PUT] /albums/:id/add-song
    async addSong(req, res, next) {
        const album = await Album.findOne({ _id: req.params.id });
        const songs = album.songs;
        const songId = req.body._id;
        if (songs.includes(songId)) {
            return res.status(400).json({ message: 'Bài hát đã có trong album' });
        }
        songs.push(songId);
        const albumUpdate = {
            songs: songs,
        };
        await Album.updateOne({ _id: req.params.id }, albumUpdate)
            .then(() => res.json({ message: 'Bài hát đã được thêm vào album!' }))
            .catch(next);
    }
}

module.exports = new AlbumController();
