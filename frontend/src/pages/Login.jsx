
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-black text-white">Iniciar Sesión</h2>
          <p className="text-white/60 mt-2">Bienvenido de nuevo</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#111111] border border-gray-800 p-8"
        >
          {error && (
            <div className="bg-red-900/30 text-red-400 p-4 border border-red-800 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 text-white placeholder-white/30 focus:outline-none focus:border-gold transition-all duration-300"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 text-white placeholder-white/30 focus:outline-none focus:border-gold transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-black py-3 font-bold tracking-widest uppercase hover:bg-gold/90 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? <FaSpinner className="animate-spin" /> : null}
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-white/60">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="text-gold font-bold hover:underline">
                Regístrate aquí
              </Link>
            </p>
            <p className="text-white/40 text-sm">
              ¿Eres administrador?{' '}
              <Link to="/admin/login" className="text-gold/70 font-semibold hover:text-gold hover:underline">
                Ir al panel de administración
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
