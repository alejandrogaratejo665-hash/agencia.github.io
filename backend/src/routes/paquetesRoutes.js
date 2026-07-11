
const express = require('express');
const { getAll, getById, getDestacados, create, update, remove } = require('../controllers/paquetesController');
const { auth, authorize } = require('../middlewares/auth');

const router = express.Router();

router.get('/', getAll);
router.get('/destacados', getDestacados);
router.get('/:id', getById);
router.post('/', auth, authorize('admin', 'empleado'), create);
router.put('/:id', auth, authorize('admin', 'empleado'), update);
router.delete('/:id', auth, authorize('admin'), remove);

module.exports = router;
