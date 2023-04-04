const express = require('express');
const router = express.Router();

const artistController = require('../app/controllers/ArtistController');

router.get('/deleted', artistController.showDeleted);
router.get('/:id', artistController.showById);
router.post('/create', artistController.create);
router.delete('/:id', artistController.delete);
router.delete('/:id/force', artistController.forceDelete);
router.patch('/:id/restore', artistController.restore);
router.put('/:id', artistController.update);
router.get('/', artistController.showAll);

module.exports = router;
