const express = require('express');
const router = express.Router();

const playlistController = require('../app/controllers/PlayListController');

router.get('/userId/:userId', playlistController.getByUser);
router.get('/id/:playListId', playlistController.getById);
router.post('/create', playlistController.create);
router.delete('/:id', playlistController.delete);
router.put('/:id', playlistController.update);

module.exports = router;
