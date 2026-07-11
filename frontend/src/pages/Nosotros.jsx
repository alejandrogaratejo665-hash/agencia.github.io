
import { motion } from 'framer-motion';
import { FaAward, FaShieldAlt, FaLightbulb } from 'react-icons/fa';

const Nosotros = () => {
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
            Conócenos
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-6"
          >
            Sobre Nosotros
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto text-lg"
          >
            Conoce la historia y el equipo que hace tus viajes realidad
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop" 
                alt="Equipo de ViajesPremium"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-black text-white mb-6">
              VIAJES<span className="text-gold">PREMIUM</span>
            </h2>
            <p className="text-white/60 text-lg mb-6 leading-relaxed">
              ViajesPremium nació en 2010 con la visión de transformar la experiencia de viajar en Colombia y el mundo. Lo que comenzó como una pequeña agencia familiar, hoy se ha convertido en una de las empresas líderes en el sector turístico del país.
            </p>
            <p className="text-white/60 text-lg leading-relaxed">
              Nuestro compromiso es brindar experiencias inolvidables, con un servicio personalizado y la calidad que mereces.
            </p>
          </motion.div>
        </div>

        <div>
          <h2 className="text-3xl font-black text-white mb-12 text-center">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: FaAward,
                title: 'Excelencia', 
                desc: 'Siempre buscamos la perfección en cada detalle para brindarte experiencias de primer nivel.' 
              },
              { 
                icon: FaShieldAlt,
                title: 'Confianza', 
                desc: 'Tu seguridad y tranquilidad son nuestra prioridad en cada viaje que planeamos para ti.' 
              },
              { 
                icon: FaLightbulb,
                title: 'Innovación', 
                desc: 'Actualizamos constantemente para mejorar tu experiencia y ofrecerte destinos únicos.' 
              },
            ].map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -10 }}
                className="bg-[#111111] p-8 border border-gray-800 text-center hover:border-gold/30 transition-all duration-300"
              >
                <div className="bg-gold/10 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <val.icon className="text-gold text-3xl" />
                </div>
                <h3 className="text-xl font-black text-white mb-3">{val.title}</h3>
                <p className="text-white/50">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
