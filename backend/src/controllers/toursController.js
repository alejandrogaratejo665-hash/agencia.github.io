
const Tour = require('../models/Tour');

const getAll = async (req, res) => {
  try {
    const tours = await Tour.findAll();
    res.json({ tours });
  } catch (error) {
    console.error('Error al obtener tours:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const getByDestinoId = async (req, res) => {
  try {
    const { destinoId } = req.params;
    const tours = await Tour.findByDestinoId(destinoId);
    res.json({ tours });
  } catch (error) {
    console.error('Error al obtener tours por destino:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);
    if (!tour) {
      return res.status(404).json({ mensaje: 'Tour no encontrado' });
    }
    res.json({ tour });
  } catch (error) {
    console.error('Error al obtener tour:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const create = async (req, res) => {
  try {
    const tourId = await Tour.create(req.body);
    res.status(201).json({ mensaje: 'Tour creado exitosamente', id: tourId });
  } catch (error) {
    console.error('Error al crear tour:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    await Tour.update(id, req.body);
    res.json({ mensaje: 'Tour actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar tour:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Tour.delete(id);
    res.json({ mensaje: 'Tour eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar tour:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = { getAll, getByDestinoId, getById, create, update, remove };
