import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaSignOutAlt,
  FaCalendar,
  FaHeart,
  FaPlane
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Perfil = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock reservations from localStorage
  const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111111] border border-gray-800 rounded-2xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-24 h-24 bg-gradient-to-br from-gold to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
              <FaUser className="text-4xl text-black" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                {usuario?.nombre || 'Usuario'}
              </h1>
              <p className="text-white/60 text-lg mb-4">
                Bienvenido a tu perfil de Viajes Premium
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-white/70">
                  <FaEnvelope className="text-gold" />
                  <span>{usuario?.email || 'email@ejemplo.com'}</span>
                </div>
                {usuario?.telefono && (
                  <div className="flex items-center gap-2 text-white/70">
                    <FaPhone className="text-gold" />
                    <span>{usuario.telefono}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600/20 text-red-400 border border-red-600/30 px-6 py-3 rounded-xl font-semibold hover:bg-red-600 hover:text-white transition-all"
            >
              <FaSignOutAlt />
              Cerrar Sesión
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#111111] border border-gray-800 rounded-2xl p-6 text-center"
          >
            <FaHeart className="text-3xl text-gold mx-auto mb-3" />
            <div className="text-4xl font-black text-white mb-1">
              {JSON.parse(localStorage.getItem('favorites') || '[]').length}
            </div>
            <p className="text-white/60">Favoritos</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#111111] border border-gray-800 rounded-2xl p-6 text-center"
          >
            <FaCalendar className="text-3xl text-gold mx-auto mb-3" />
            <div className="text-4xl font-black text-white mb-1">
              {reservas.length}
            </div>
            <p className="text-white/60">Reservas</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#111111] border border-gray-800 rounded-2xl p-6 text-center"
          >
            <FaPlane className="text-3xl text-gold mx-auto mb-3" />
            <div className="text-4xl font-black text-white mb-1">
              {new Date().getFullYear() - 2024}
            </div>
            <p className="text-white/60">Años con nosotros</p>
          </motion.div>
        </div>

        {/* Reservations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#111111] border border-gray-800 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
            <FaCalendar className="text-gold" />
            Mis Reservas
          </h2>

          {reservas.length === 0 ? (
            <div className="text-center py-12">
              <FaCalendar className="text-6xl text-gold/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Aún no tienes reservas
              </h3>
              <p className="text-white/60 mb-6">
                Explora destinos y paquetes para hacer tu primera reserva.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  to="/destinos"
                  className="bg-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-gold/90 transition-all"
                >
                  Ver Destinos
                </Link>
                <Link
                  to="/paquetes"
                  className="border border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-black transition-all"
                >
                  Ver Paquetes
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {reservas.map((reserva, index) => (
                <div
                  key={index}
                  className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {reserva.destino || reserva.paquete}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-white/70">
                        <div className="flex items-center gap-2">
                          <FaCalendar className="text-gold" />
                          {reserva.fechaInicio} - {reserva.fechaFin}
                        </div>
                        <div className="flex items-center gap-2">
                          <FaUser className="text-gold" />
                          {reserva.personas} {reserva.personas === 1 ? 'persona' : 'personas'}
                        </div>
                        <div className="flex items-center gap-2">
                          <FaEnvelope className="text-gold" />
                          {reserva.email}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gold font-semibold">
                      {new Date(reserva.fechaReserva).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Perfil;
