
const express = require('express');
const { body } = require('express-validator');
const { register, login, me } = require('../controllers/authController');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', [
  body('nombre').not().isEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], register);

router.post('/login', [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').not().isEmpty().withMessage('La contraseña es obligatoria')
], login);

router.get('/me', auth, me);

module.exports = router;
