import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa';
import { useAdmin } from '../contexts/AdminContext';

const AdminPaquetes = () => {
  const { paquetes, addPaquete, updatePaquete, deletePaquete } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPaquete, setEditingPaquete] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    imagen: '',
    ubicacion: { ciudad: '', pais: '' },
    precio: { valor: '', moneda: 'COP' },
    precioAntes: null,
    duracion: '',
    personas: 2,
    rating: 4.5,
    reviews: 0,
    incluye: [],
    itinerario: []
  });

  const openModal = (paquete = null) => {
    if (paquete) {
      setEditingPaquete(paquete);
      setFormData(paquete);
    } else {
      setEditingPaquete(null);
      setFormData({
        nombre: '',
        imagen: '',
        ubicacion: { ciudad: '', pais: '' },
        precio: { valor: '', moneda: 'COP' },
        precioAntes: null,
        duracion: '',
        personas: 2,
        rating: 4.5,
        reviews: 0,
        incluye: [],
        itinerario: []
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      precio: { ...formData.precio, valor: Number(formData.precio.valor) },
      precioAntes: formData.precioAntes && formData.precioAntes.valor
        ? { ...formData.precioAntes, valor: Number(formData.precioAntes.valor) }
        : null
    };
    if (editingPaquete) {
      updatePaquete(dataToSave);
    } else {
      addPaquete(dataToSave);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (paqueteId) => {
    if (confirm('¿Estás seguro de que quieres eliminar este paquete?')) {
      deletePaquete(paqueteId);
    }
  };

  const getPriceDisplay = (precio) => {
    if (!precio) return '';
    if (precio.moneda === 'COP') {
      return `$${precio.valor.toLocaleString('es-CO')} COP`;
    }
    return `$${precio.valor.toLocaleString('en-US')} USD`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Paquetes</h1>
          <p className="text-white/60">Gestiona tus paquetes turísticos</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-gold/90 transition-all"
        >
          <FaPlus />
          Nuevo Paquete
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paquetes.map((paquete, index) => (
          <motion.div
            key={paquete.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-[#111111] border border-gray-800 rounded-2xl overflow-hidden group"
          >
            <div className="h-40 relative">
              <img src={paquete.imagen} alt={paquete.nombre} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              {paquete.precioAntes && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  -20% OFF
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{paquete.nombre}</h3>
              <p className="text-white/60 text-sm mb-3">{paquete.ubicacion.ciudad}, {paquete.ubicacion.pais}</p>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-gold font-bold">{getPriceDisplay(paquete.precio)}</div>
                  {paquete.precioAntes && (
                    <div className="text-white/40 text-sm line-through">{getPriceDisplay(paquete.precioAntes)}</div>
                  )}
                </div>
                <div className="text-sm text-white/60">
                  ⭐ {paquete.rating} ({paquete.reviews} reviews)
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(paquete)}
                  className="flex-1 bg-white/10 text-white py-2 rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <FaEdit size={14} />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(paquete.id)}
                  className="flex-1 bg-red-500/20 text-red-400 py-2 rounded-xl font-semibold hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <FaTrash size={14} />
                  Eliminar
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#111111] border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h2 className="text-2xl font-black text-white">
                  {editingPaquete ? 'Editar Paquete' : 'Nuevo Paquete'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">Nombre</label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-xl focus:outline-none focus:border-gold"
                    placeholder="Nombre del paquete"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-2">URL Imagen</label>
                  <input
                    type="url"
                    value={formData.imagen}
                    onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-xl focus:outline-none focus:border-gold"
                    placeholder="https://..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">Ciudad</label>
                    <input
                      type="text"
                      required
                      value={formData.ubicacion.ciudad}
                      onChange={(e) => setFormData({
                        ...formData,
                        ubicacion: { ...formData.ubicacion, ciudad: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-xl focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">País</label>
                    <input
                      type="text"
                      required
                      value={formData.ubicacion.pais}
                      onChange={(e) => setFormData({
                        ...formData,
                        ubicacion: { ...formData.ubicacion, pais: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-xl focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">Precio</label>
                    <input
                      type="number"
                      required
                      value={formData.precio.valor}
                      onChange={(e) => setFormData({
                        ...formData,
                        precio: { ...formData.precio, valor: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-xl focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">Moneda</label>
                    <select
                      value={formData.precio.moneda}
                      onChange={(e) => setFormData({
                        ...formData,
                        precio: { ...formData.precio, moneda: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-xl focus:outline-none focus:border-gold"
                    >
                      <option value="COP">COP</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">Precio anterior</label>
                    <input
                      type="number"
                      value={formData.precioAntes?.valor || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        precioAntes: { ...formData.precioAntes || { moneda: formData.precio.moneda }, valor: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-xl focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">Duración</label>
                    <input
                      type="text"
                      value={formData.duracion}
                      onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                      className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-xl focus:outline-none focus:border-gold"
                      placeholder="5 días /4 noches"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">Personas</label>
                    <input
                      type="number"
                      value={formData.personas}
                      onChange={(e) => setFormData({ ...formData, personas: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-xl focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2">Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                      className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-xl focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 border border-gray-700 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gold text-black py-3 rounded-xl font-bold hover:bg-gold/90 transition-all flex items-center justify-center gap-2"
                  >
                    <FaSave size={14} />
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPaquetes;
