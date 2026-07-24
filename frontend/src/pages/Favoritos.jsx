import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaTimes, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { useFavorites } from '../contexts/FavoritesContext';

const Favoritos = () => {
  const { favorites, removeFavorite } = useFavorites();

  const getPriceDisplay = (precio) => {
    if (!precio) return '';
    if (precio.moneda === 'COP') {
      return `$${precio.valor.toLocaleString('es-CO')} COP`;
    }
    return `$${precio.valor.toLocaleString('en-US')} USD`;
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Mis <span className="text-gold">Favoritos</span>
          </h1>
          <p className="text-white/60 text-lg">
            {favorites.length === 0 
              ? 'No tienes favoritos aún. ¡Explora destinos y paquetes para agregar!' 
              : `Tienes ${favorites.length} favorito${favorites.length !== 1 ? 's' : ''}.`}
          </p>
        </motion.div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <FaHeart className="text-8xl text-gold/30 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Aún no tienes favoritos
            </h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Explora nuestros destinos y paquetes, y agrega los que te gusten a tus favoritos.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/destinos"
                className="bg-gold text-black px-8 py-3 rounded-xl font-bold hover:bg-gold/90 transition-all"
              >
                Ver Destinos
              </Link>
              <Link
                to="/paquetes"
                className="border border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-black transition-all"
              >
                Ver Paquetes
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((item, index) => (
              <motion.div
                key={`${item.type}-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#111111] border border-gray-800 rounded-2xl overflow-hidden group hover:border-gold/50 transition-all"
              >
                <div className="relative h-48">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <button
                    onClick={() => removeFavorite(item.id, item.type)}
                    className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white p-2 rounded-full hover:bg-red-600 hover:text-white transition-all"
                  >
                    <FaTimes size={16} />
                  </button>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white/80 mb-1">
                      <FaMapMarkerAlt className="text-gold" size={14} />
                      <span className="text-sm font-medium">
                        {item.ubicacion?.ciudad}, {item.ubicacion?.pais}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.nombre}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-white/60 uppercase tracking-wide">
                      {item.type === 'destino' ? 'Destino' : 'Paquete'}
                    </span>
                    <span className="text-gold font-bold text-xl">
                      {getPriceDisplay(item.precio)}
                    </span>
                  </div>

                  <Link
                    to={item.type === 'destino' ? `/destinos/${item.id}` : `/paquetes/${item.id}`}
                    className="block w-full text-center bg-white/10 text-white py-3 rounded-xl font-semibold hover:bg-gold hover:text-black transition-all"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favoritos;
