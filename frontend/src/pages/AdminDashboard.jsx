import { Link, useNavigate, Outlet, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHome,
  FaMapMarkerAlt,
  FaSuitcase,
  FaSignOutAlt,
  FaUserShield,
  FaArrowLeft
} from 'react-icons/fa';
import { useAdmin } from '../contexts/AdminContext';

const getPriceDisplay = (precio) => {
  if (!precio) return '';
  if (precio.moneda === 'COP') {
    return `$${precio.valor.toLocaleString('es-CO')} COP`;
  }
  return `$${precio.valor.toLocaleString('en-US')} USD`;
};

const AdminDashboard = () => {
  const { isAdminLoggedIn, adminLogout } = useAdmin();
  const navigate = useNavigate();

  if (!isAdminLoggedIn) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = () => {
    adminLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Sidebar */}
      <div className="flex">
        <div className="w-64 bg-[#111111] border-r border-gray-800 min-h-screen p-6 flex flex-col fixed left-0 top-0">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-gold mb-4 transition-colors">
              <FaArrowLeft />
              Volver al sitio
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-yellow-600 rounded-xl flex items-center justify-center">
                <FaUserShield className="text-2xl text-black" />
              </div>
              <div>
                <h2 className="text-white font-bold">Admin</h2>
                <p className="text-xs text-white/50">Panel de Control</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            <NavLink
              to="/admin/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gold/10 text-gold'
                    : 'text-white hover:bg-gold/10 hover:text-gold'
                }`
              }
            >
              <FaHome />
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/dashboard/destinos"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gold/10 text-gold'
                    : 'text-white hover:bg-gold/10 hover:text-gold'
                }`
              }
            >
              <FaMapMarkerAlt />
              Destinos
            </NavLink>
            <NavLink
              to="/admin/dashboard/paquetes"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gold/10 text-gold'
                    : 'text-white hover:bg-gold/10 hover:text-gold'
                }`
              }
            >
              <FaSuitcase />
              Paquetes
            </NavLink>
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-400 rounded-xl hover:bg-red-500/10 transition-all mt-4"
          >
            <FaSignOutAlt />
            Cerrar sesión
          </button>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export const AdminDashboardHome = () => {
  const { destinos, paquetes } = useAdmin();

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-black text-white mb-2">Dashboard</h1>
        <p className="text-white/60">Resumen general del sistema</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#111111] border border-gray-800 rounded-2xl p-6"
        >
          <FaMapMarkerAlt className="text-3xl text-gold mb-3" />
          <div className="text-4xl font-black text-white mb-1">{destinos.length}</div>
          <p className="text-white/60">Destinos</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#111111] border border-gray-800 rounded-2xl p-6"
        >
          <FaSuitcase className="text-3xl text-gold mb-3" />
          <div className="text-4xl font-black text-white mb-1">{paquetes.length}</div>
          <p className="text-white/60">Paquetes</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#111111] border border-gray-800 rounded-2xl p-6"
        >
          <FaHome className="text-3xl text-gold mb-3" />
          <div className="text-4xl font-black text-white mb-1">
            {JSON.parse(localStorage.getItem('usuarios') || '[]').length}
          </div>
          <p className="text-white/60">Usuarios</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#111111] border border-gray-800 rounded-2xl p-6"
        >
          <FaSuitcase className="text-3xl text-gold mb-3" />
          <div className="text-4xl font-black text-white mb-1">
            {JSON.parse(localStorage.getItem('reservas') || '[]').length}
          </div>
          <p className="text-white/60">Reservas</p>
        </motion.div>
      </div>

      {/* Quick Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#111111] border border-gray-800 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Destinos Recientes</h3>
          <div className="space-y-3">
            {destinos.slice(-5).reverse().map((destino, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-black/30 rounded-xl">
                <img src={destino.imagen} alt={destino.nombre} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="font-semibold text-white">{destino.nombre}</div>
                  <div className="text-sm text-gold">{getPriceDisplay(destino.precio)}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#111111] border border-gray-800 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Paquetes Recientes</h3>
          <div className="space-y-3">
            {paquetes.slice(-5).reverse().map((paquete, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-black/30 rounded-xl">
                <img src={paquete.imagen} alt={paquete.nombre} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="font-semibold text-white">{paquete.nombre}</div>
                  <div className="text-sm text-gold">{getPriceDisplay(paquete.precio)}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
