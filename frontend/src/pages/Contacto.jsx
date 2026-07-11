
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Mensaje enviado! Nos pondremos en contacto pronto.');
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4"
          >
            Contáctanos
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-6"
          >
            Contacto
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto text-lg"
          >
            Estamos aquí para ayudarte en lo que necesites
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-black text-white mb-8">Información de Contacto</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gold/10 p-4 border border-gold/20 flex-shrink-0">
                  <FaMapMarkerAlt className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Dirección</h3>
                  <p className="text-white/50">Ciudadela El porvenir, Ibague-tolima, Colombia</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold/10 p-4 border border-gold/20 flex-shrink-0">
                  <FaPhone className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Teléfono</h3>
                  <p className="text-white/50">(+57) 3025688426</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold/10 p-4 border border-gold/20 flex-shrink-0">
                  <FaEnvelope className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Email</h3>
                  <p className="text-white/50">alejandrogaratejo665@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold/10 p-4 border border-gold/20 flex-shrink-0">
                  <FaClock className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Horario de atención</h3>
                  <p className="text-white/50">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                  <p className="text-white/50">Sábados: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#111111] p-10 border border-gray-800"
          >
            <h2 className="text-2xl font-black text-white mb-8">Envíanos un mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-3">
                  Nombre completo
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-5 py-4 bg-black border border-gray-700 text-white placeholder-white/30 focus:outline-none focus:border-gold transition-all duration-300"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/80 mb-3">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-4 bg-black border border-gray-700 text-white placeholder-white/30 focus:outline-none focus:border-gold transition-all duration-300"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/80 mb-3">
                  Mensaje
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  className="w-full px-5 py-4 bg-black border border-gray-700 text-white placeholder-white/30 focus:outline-none focus:border-gold transition-all duration-300 resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold text-black py-4 font-bold tracking-widest uppercase hover:bg-gold/90 transition-all duration-300"
              >
                Enviar mensaje
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
