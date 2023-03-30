const express = require('express');
const router = express.Router();

const songController = require('../app/controllers/SongController');

router.get('/', songController.getAll);
router.get('/:id', songController.showById);
router.post('/create', songController.create);
router.delete('/:id', songController.delete);
router.put('/:id', songController.update);

module.exports = router;
