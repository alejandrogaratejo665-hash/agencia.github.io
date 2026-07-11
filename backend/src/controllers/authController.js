
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, email, password, telefono } = req.body;

    const usuarioExistente = await Usuario.findByEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const usuarioId = await Usuario.create({
      nombre,
      email,
      password: passwordHash,
      telefono
    });

    const usuario = await Usuario.findById(usuarioId);
    const token = jwt.sign({ id: usuarioId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      token,
      usuario
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const usuario = await Usuario.findByEmail(email);

    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    if (!usuario.activo) {
      return res.status(403).json({ mensaje: 'Cuenta desactivada' });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    const { password: _, ...usuarioSinPassword } = usuario;

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: usuarioSinPassword
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const me = async (req, res) => {
  try {
    res.json({ usuario: req.usuario });
  } catch (error) {
    console.error('Error en me:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = { register, login, me };
