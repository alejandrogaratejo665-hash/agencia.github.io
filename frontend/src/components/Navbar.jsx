
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaPlane, FaUser, FaBars, FaTimes, FaHeart, FaUserShield } from 'react-icons/fa';

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/95 backdrop-blur-md shadow-lg' 
        : 'bg-black/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="flex items-center space-x-2">
            <FaPlane className="h-8 w-8 text-gold" />
            <span className="text-3xl font-black text-white tracking-wider">VIAJES<span className="text-gold">PREMIUM</span></span>
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-white/80 hover:text-gold transition-colors font-semibold tracking-wide">Inicio</Link>
            <Link to="/destinos" className="text-white/80 hover:text-gold transition-colors font-semibold tracking-wide">Destinos</Link>
            <Link to="/paquetes" className="text-white/80 hover:text-gold transition-colors font-semibold tracking-wide">Paquetes</Link>
            <Link to="/nosotros" className="text-white/80 hover:text-gold transition-colors font-semibold tracking-wide">Nosotros</Link>
            <Link to="/contacto" className="text-white/80 hover:text-gold transition-colors font-semibold tracking-wide">Contacto</Link>
            <Link to="/admin/login" className="text-white/80 hover:text-gold transition-colors font-semibold tracking-wide flex items-center gap-2">
              <FaUserShield className="h-4 w-4" />
              Admin
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {usuario ? (
              <>
                <Link to="/favoritos" className="text-white/80 hover:text-gold transition-colors">
                  <FaHeart className="h-5 w-5" />
                </Link>
                <Link to="/perfil" className="text-white/80 hover:text-gold transition-colors">
                  <FaUser className="h-5 w-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="border border-gold text-gold px-8 py-3 hover:bg-gold hover:text-black transition-all duration-300 font-semibold tracking-wide"
                >
                  CERRAR SESIÓN
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-gold transition-all duration-300 font-semibold tracking-wide"
                >
                  INICIAR SESIÓN
                </Link>
                <Link
                  to="/register"
                  className="bg-gold text-black px-8 py-3 hover:bg-gold/90 transition-all duration-300 font-bold tracking-wide"
                >
                  REGISTRARSE
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-4 py-6 space-y-4">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block text-white/80 hover:text-gold font-semibold py-2 tracking-wide"
            >
              INICIO
            </Link>
            <Link
              to="/destinos"
              onClick={() => setIsMenuOpen(false)}
              className="block text-white/80 hover:text-gold font-semibold py-2 tracking-wide"
            >
              DESTINOS
            </Link>
            <Link
              to="/paquetes"
              onClick={() => setIsMenuOpen(false)}
              className="block text-white/80 hover:text-gold font-semibold py-2 tracking-wide"
            >
              PAQUETES
            </Link>
            <Link
              to="/nosotros"
              onClick={() => setIsMenuOpen(false)}
              className="block text-white/80 hover:text-gold font-semibold py-2 tracking-wide"
            >
              NOSOTROS
            </Link>
            <Link
              to="/contacto"
              onClick={() => setIsMenuOpen(false)}
              className="block text-white/80 hover:text-gold font-semibold py-2 tracking-wide"
            >
              CONTACTO
            </Link>
            <Link
              to="/admin/login"
              onClick={() => setIsMenuOpen(false)}
              className="block text-white/80 hover:text-gold font-semibold py-2 tracking-wide"
            >
              PANEL ADMIN
            </Link>
            <hr className="my-4 border-gray-800" />
            {usuario ? (
              <>
                <Link
                  to="/perfil"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-white/80 hover:text-gold font-semibold py-2 tracking-wide"
                >
                  MI PERFIL
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left text-white font-semibold py-2"
                >
                  CERRAR SESIÓN
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-white/80 hover:text-gold font-semibold py-2 tracking-wide"
                >
                  INICIAR SESIÓN
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-gold text-black text-center px-4 py-3 font-bold tracking-wide"
                >
                  REGISTRARSE
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
