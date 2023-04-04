const express = require('express');
const router = express.Router();

const artistController = require('../app/controllers/ArtistController');

router.get('/', artistController.showAll);
router.get('/:id', artistController.showById);
router.get('/deleted', artistController.showDeleted);
router.post('/create', artistController.create);
router.delete('/:id', artistController.delete);
router.delete('/:id/force', artistController.forceDelete);
router.patch('/:id/restore', artistController.restore);
router.put('/:id', artistController.update);

module.exports = router;
