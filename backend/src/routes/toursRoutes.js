
const express = require('express');
const router = express.Router();
const toursController = require('../controllers/toursController');

router.get('/', toursController.getAll);
router.get('/destino/:destinoId', toursController.getByDestinoId);
router.get('/:id', toursController.getById);
router.post('/', toursController.create);
router.put('/:id', toursController.update);
router.delete('/:id', toursController.remove);

module.exports = router;
