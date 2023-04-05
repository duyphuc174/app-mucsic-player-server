const express = require('express');
const router = express.Router();

const albumController = require('../app/controllers/AlbumController');

router.get('/:id', albumController.showById);
router.post('/create', albumController.create);
router.delete('/:id', albumController.delete);
router.put('/:id', albumController.update);
router.put('/:id/add-song', albumController.addSong);
router.get('/', albumController.showAll);

module.exports = router;
