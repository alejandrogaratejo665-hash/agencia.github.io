
const Paquete = require('../models/Paquete');

const getAll = async (req, res) => {
  try {
    const paquetes = await Paquete.findAll();
    res.json({ paquetes });
  } catch (error) {
    console.error('Error al obtener paquetes:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const paquete = await Paquete.findById(id);
    if (!paquete) {
      return res.status(404).json({ mensaje: 'Paquete no encontrado' });
    }
    res.json({ paquete });
  } catch (error) {
    console.error('Error al obtener paquete:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const getDestacados = async (req, res) => {
  try {
    const paquetes = await Paquete.findDestacados();
    res.json({ paquetes });
  } catch (error) {
    console.error('Error al obtener paquetes destacados:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const create = async (req, res) => {
  try {
    const paqueteId = await Paquete.create(req.body);
    res.status(201).json({ mensaje: 'Paquete creado exitosamente', id: paqueteId });
  } catch (error) {
    console.error('Error al crear paquete:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    await Paquete.update(id, req.body);
    res.json({ mensaje: 'Paquete actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar paquete:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Paquete.delete(id);
    res.json({ mensaje: 'Paquete eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar paquete:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = { getAll, getById, getDestacados, create, update, remove };
