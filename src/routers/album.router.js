const express = require('express');
const router = express.Router();

const albumController = require('../app/controllers/AlbumController');

router.get('/', albumController.getAll);
router.get('/id', albumController.getById);
router.post('/create', albumController.create);
router.delete('/:id', albumController.delete);
router.put('/:id', albumController.update);

module.exports = router;
