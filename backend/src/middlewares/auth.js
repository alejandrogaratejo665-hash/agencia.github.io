
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ mensaje: 'Acceso denegado. No hay token.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id);
    
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Token inválido.' });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido.' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ mensaje: 'No autenticado.' });
    }

    const rolNombre = { 1: 'admin', 2: 'empleado', 3: 'cliente' }[req.usuario.rol_id];
    
    if (!roles.includes(rolNombre)) {
      return res.status(403).json({ mensaje: 'No tienes permisos para realizar esta acción.' });
    }

    next();
  };
};

module.exports = { auth, authorize };
