const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../app/middlewares/UploadMiddleware');
const TokenMiddleware = require('../app/middlewares/TokenMiddleware');

const songController = require('../app/controllers/SongController');

router.get('/', songController.showAll);
router.get('/trash', songController.showDeletedSongs);
router.get('/:id', songController.showById);
router.post('/create', songController.create);
router.delete('/:id', songController.delete);
router.delete('/:id/force', songController.forceDelete);
router.put('/:id', songController.update);
router.put('/:id/restore', songController.restore);

module.exports = router;
