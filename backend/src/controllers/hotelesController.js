
const Hotel = require('../models/Hotel');

const getAll = async (req, res) => {
  try {
    const hoteles = await Hotel.findAll();
    res.json({ hoteles });
  } catch (error) {
    console.error('Error al obtener hoteles:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const getByDestinoId = async (req, res) => {
  try {
    const { destinoId } = req.params;
    const hoteles = await Hotel.findByDestinoId(destinoId);
    res.json({ hoteles });
  } catch (error) {
    console.error('Error al obtener hoteles por destino:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ mensaje: 'Hotel no encontrado' });
    }
    res.json({ hotel });
  } catch (error) {
    console.error('Error al obtener hotel:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const create = async (req, res) => {
  try {
    const hotelId = await Hotel.create(req.body);
    res.status(201).json({ mensaje: 'Hotel creado exitosamente', id: hotelId });
  } catch (error) {
    console.error('Error al crear hotel:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    await Hotel.update(id, req.body);
    res.json({ mensaje: 'Hotel actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar hotel:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Hotel.delete(id);
    res.json({ mensaje: 'Hotel eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar hotel:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = { getAll, getByDestinoId, getById, create, update, remove };
