const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../app/middlewares/UploadMiddleware');
const TokenMiddleware = require('../app/middlewares/AuthMiddleware');

const songController = require('../app/controllers/SongController');

router.get('/deleted', songController.showDeleted);
router.get('/:id', songController.showById);
router.post('/create', songController.create);
router.delete('/:id', songController.delete);
router.delete('/:id/force', songController.forceDelete);
router.put('/:id', songController.update);
router.patch('/:id/restore', songController.restore);
router.get('/', songController.showAll);

module.exports = router;
