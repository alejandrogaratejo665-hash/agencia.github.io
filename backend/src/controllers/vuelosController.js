
const Vuelo = require('../models/Vuelo');

const getAll = async (req, res) => {
  try {
    const vuelos = await Vuelo.findAll();
    res.json({ vuelos });
  } catch (error) {
    console.error('Error al obtener vuelos:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const vuelo = await Vuelo.findById(id);
    if (!vuelo) {
      return res.status(404).json({ mensaje: 'Vuelo no encontrado' });
    }
    res.json({ vuelo });
  } catch (error) {
    console.error('Error al obtener vuelo:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const create = async (req, res) => {
  try {
    const vueloId = await Vuelo.create(req.body);
    res.status(201).json({ mensaje: 'Vuelo creado exitosamente', id: vueloId });
  } catch (error) {
    console.error('Error al crear vuelo:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    await Vuelo.update(id, req.body);
    res.json({ mensaje: 'Vuelo actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar vuelo:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Vuelo.delete(id);
    res.json({ mensaje: 'Vuelo eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar vuelo:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = { getAll, getById, create, update, remove };
