import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserShield, FaLock, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { useAdmin } from '../contexts/AdminContext';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = adminLogin(formData.email, formData.password);
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-gold mb-6 transition-colors">
            <FaArrowLeft />
            Volver al inicio
          </Link>
          <div className="w-20 h-20 bg-gradient-to-br from-gold to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FaUserShield className="text-4xl text-black" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">
            Panel de <span className="text-gold">Administrador</span>
          </h1>
          <p className="text-white/60">
            Inicia sesión para gestionar viajes y destinos
          </p>
          <p className="text-xs text-white/40 mt-2">
            Credenciales por defecto: admin@viajes.com / admin123
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111111] border border-gray-800 rounded-2xl p-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm"
            >
              {error}
            </motion.div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-semibold text-white/80 mb-2 flex items-center gap-2">
              <FaEnvelope className="text-gold" />
              Correo electrónico
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="admin@viajes.com"
              className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-xl focus:outline-none focus:border-gold transition-all"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-white/80 mb-2 flex items-center gap-2">
              <FaLock className="text-gold" />
              Contraseña
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-xl focus:outline-none focus:border-gold transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-black py-4 rounded-xl font-black text-lg hover:bg-gold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Iniciando...' : 'Iniciar sesión'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
