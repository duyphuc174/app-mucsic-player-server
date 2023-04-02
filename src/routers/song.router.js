const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../app/middlewares/UploadMiddleware');

const songController = require('../app/controllers/SongController');

router.get('/', songController.getAll);
router.get('/:id', songController.showById);
router.post('/create', uploadMiddleware.single('image'), songController.create);
router.delete('/:id', songController.delete);
router.put('/:id', songController.update);

module.exports = router;
