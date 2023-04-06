const express = require('express');
const router = express.Router();

const playlistController = require('../app/controllers/PlayListController');

router.get('/', playlistController.showAll);
router.get('/id/:playListId', playlistController.showById);
router.post('/:userId/create', playlistController.create);
router.delete('/:id', playlistController.delete);
router.put('/:id', playlistController.update);
router.put('/:id/add-song', playlistController.addSong);
router.put('/:id/delete-song', playlistController.deleteSong);

module.exports = router;
