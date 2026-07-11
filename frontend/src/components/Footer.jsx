
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-black text-white mb-6 tracking-wider">
              VIAJES<span className="text-gold">PREMIUM</span>
            </h3>
            <p className="text-white/50 mb-6 leading-relaxed">
              Tu mejor opción para descubrir el mundo con comodidad, seguridad y exclusividad.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-white/50 hover:text-gold transition-all duration-300">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-white/50 hover:text-gold transition-all duration-300">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-white/50 hover:text-gold transition-all duration-300">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-white/50 hover:text-gold transition-all duration-300">
                <FaWhatsapp className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-6 tracking-wide">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-white/50 hover:text-gold transition-colors">Inicio</Link></li>
              <li><Link to="/destinos" className="text-white/50 hover:text-gold transition-colors">Destinos</Link></li>
              <li><Link to="/paquetes" className="text-white/50 hover:text-gold transition-colors">Paquetes</Link></li>
              <li><Link to="/nosotros" className="text-white/50 hover:text-gold transition-colors">Nosotros</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-6 tracking-wide">Contacto</h4>
            <ul className="space-y-3 text-white/50">
              <li>📍 Ciudadela el porvenir, Ibague - Tolima</li>
              <li>📞 (+57) 302 568 8426</li>
              <li>📧 alejandrogaratejo665@gmail.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-6 tracking-wide">Newsletter</h4>
            <p className="text-white/50 mb-6">Suscríbete para recibir ofertas exclusivas.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-5 py-3 bg-[#111111] border border-gray-800 text-white placeholder-white/30 focus:outline-none focus:border-gold transition-all duration-300"
              />
              <button className="bg-gold text-black px-8 py-3 font-bold tracking-widest uppercase hover:bg-gold/90 transition-all duration-300">
                Enviar
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-white/40">
          <p>&copy; 2026 VIAJESPREMIUM. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
