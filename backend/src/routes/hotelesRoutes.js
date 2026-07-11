
const express = require('express');
const router = express.Router();
const hotelesController = require('../controllers/hotelesController');

router.get('/', hotelesController.getAll);
router.get('/destino/:destinoId', hotelesController.getByDestinoId);
router.get('/:id', hotelesController.getById);
router.post('/', hotelesController.create);
router.put('/:id', hotelesController.update);
router.delete('/:id', hotelesController.remove);

module.exports = router;
