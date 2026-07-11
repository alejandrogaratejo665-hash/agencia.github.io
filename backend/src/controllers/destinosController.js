
const Destino = require('../models/Destino');

const getAll = async (req, res) => {
  try {
    const destinos = await Destino.findAll();
    res.json({ destinos });
  } catch (error) {
    console.error('Error al obtener destinos:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const destino = await Destino.findById(id);
    if (!destino) {
      return res.status(404).json({ mensaje: 'Destino no encontrado' });
    }
    res.json({ destino });
  } catch (error) {
    console.error('Error al obtener destino:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const getDestacados = async (req, res) => {
  try {
    const destinos = await Destino.findDestacados();
    res.json({ destinos });
  } catch (error) {
    console.error('Error al obtener destinos destacados:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const create = async (req, res) => {
  try {
    const destinoId = await Destino.create(req.body);
    res.status(201).json({ mensaje: 'Destino creado exitosamente', id: destinoId });
  } catch (error) {
    console.error('Error al crear destino:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    await Destino.update(id, req.body);
    res.json({ mensaje: 'Destino actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar destino:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Destino.delete(id);
    res.json({ mensaje: 'Destino eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar destino:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = { getAll, getById, getDestacados, create, update, remove };
