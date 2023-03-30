const express = require('express');
const router = express.Router();

const artistController = require('../app/controllers/ArtistController');

router.get('/', artistController.getAll);
router.get('/:id', artistController.showById);
router.post('/create', artistController.create);
router.delete('/:id', artistController.delete);
router.put('/:id', artistController.update);

module.exports = router;
