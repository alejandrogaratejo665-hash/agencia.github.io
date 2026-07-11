
const express = require('express');
const router = express.Router();
const vuelosController = require('../controllers/vuelosController');

router.get('/', vuelosController.getAll);
router.get('/:id', vuelosController.getById);
router.post('/', vuelosController.create);
router.put('/:id', vuelosController.update);
router.delete('/:id', vuelosController.remove);

module.exports = router;
