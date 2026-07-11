
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendar, FaUsers, FaMapMarkerAlt, FaAward, FaShieldAlt, FaLightbulb, FaStar, FaArrowRight } from 'react-icons/fa';
import { useDestinationImages } from '../hooks/useDestinationImages';

const DESTINOS_DATA = [
  { id: 1, nombre: 'Cartagena de Indias', ubicacion: { ciudad: 'Cartagena', pais: 'Colombia' }, descripcion: 'Ciudad histórica con playas de arena blanca y arquitectura colonial que te transporta a otro siglo.', precio: { valor: 1500000, moneda: 'COP' }, calificacion: 4.9, numeroResenas: 1523 },
  { id: 2, nombre: 'Eje Cafetero', ubicacion: { ciudad: 'Valle del Cocora', pais: 'Colombia' }, descripcion: 'Palmeras de cera gigantes, fincas cafeteras y paisajes verdes que quitan el aliento.', precio: { valor: 1200000, moneda: 'COP' }, calificacion: 4.9, numeroResenas: 987 },
  { id: 3, nombre: 'San Andrés Islas', ubicacion: { ciudad: 'San Andrés', pais: 'Colombia' }, descripcion: 'El mar de los siete colores, playas de ensueño y cultura raizal auténtica.', precio: { valor: 2000000, moneda: 'COP' }, calificacion: 4.9, numeroResenas: 1876 }
];

const PAQUETES_DATA = [
  { id: 1, nombre: 'Paquete Cartagena Completa', descripcion: 'Todo incluido: alojamiento en hotel 5 estrellas, tours por la ciudad amurallada, Islas del Rosario, desayuno buffet y transporte privado.', duracion_dias: 5, precio: 2500000, descuento: 10, destino: 'Cartagena de Indias' },
  { id: 2, nombre: 'Aventura Medellín y Guatapé', descripcion: 'Descubre la Ciudad de la Eterna Primavera, Comuna 13, Plaza Botero y la impresionante Piedra del Peñol en Guatapé.', duracion_dias: 4, precio: 1800000, descuento: 0, destino: 'Medellín' },
  { id: 3, nombre: 'Paraíso en San Andrés', descripcion: 'Playas de arena blanca, mar de 7 colores, tours por Johnny Cay y Cayo Acuario, todo incluido en resort frente al mar.', duracion_dias: 5, precio: 3200000, descuento: 15, destino: 'San Andrés Islas' }
];

const DestinationCard = ({ dest }) => {
  const { images, loading } = useDestinationImages(dest.nombre, 1);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -12 }}
      className="bg-[#111111] overflow-hidden cursor-pointer group border border-gray-800"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={images[0]?.url}
          alt={dest.nombre}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-black text-white mb-3">{dest.nombre}</h3>
        <div className="flex items-center gap-2 mb-4">
          <FaMapMarkerAlt className="text-gold text-sm" />
          <p className="text-white/50 text-sm tracking-wide">{dest.ubicacion.ciudad}, {dest.ubicacion.pais}</p>
        </div>
        <p className="text-white/50 mb-6 line-clamp-2">{dest.descripcion}</p>
        <div className="flex items-center gap-1 mb-6">
          <FaStar className="text-gold" />
          <span className="text-white font-bold">{dest.calificacion}</span>
          <span className="text-white/40">({dest.numeroResenas} reseñas)</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-gold font-black text-2xl">
              {dest.precio.moneda === 'COP' ? `$${dest.precio.valor.toLocaleString('es-CO')}` : `$${dest.precio.valor.toLocaleString('en-US')} ${dest.precio.moneda}`}
            </span>
            <span className="text-white/40 text-sm">/persona</span>
          </div>
          <Link
            to={`/destinos/${dest.id}`}
            className="text-gold font-black flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
          >
            Ver más <FaArrowRight />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const PackageCard = ({ pack }) => {
  const { images } = useDestinationImages(pack.destino, 1);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -12 }}
      className="bg-[#111111] overflow-hidden cursor-pointer group border border-gray-800"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={images[0]?.url}
          alt={pack.nombre}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {pack.descuento > 0 && (
          <div className="absolute top-6 left-6">
            <span className="bg-red-600 text-white px-5 py-2 text-xs font-black tracking-wider uppercase">-{pack.descuento}% OFF</span>
          </div>
        )}
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-black text-white mb-3">{pack.nombre}</h3>
        <div className="flex items-center gap-2 mb-4">
          <FaCalendar className="text-white/40" />
          <p className="text-white/50 text-sm tracking-wide">{pack.duracion_dias} días</p>
        </div>
        <p className="text-white/50 mb-8 line-clamp-2">{pack.descripcion}</p>
        <div className="flex items-baseline justify-between mb-8">
          <div className="flex items-baseline gap-2">
            {pack.descuento > 0 && <span className="text-white/30 line-through text-lg">${pack.precio.toLocaleString('es-CO')}</span>}
            <span className="text-gold font-black text-3xl">
              ${(pack.descuento > 0 ? pack.precio * (1 - pack.descuento / 100) : pack.precio).toLocaleString('es-CO')}
            </span>
            <span className="text-white/40">/persona</span>
          </div>
        </div>
        <Link
          to={`/paquetes/${pack.id}`}
          className="block w-full text-center bg-gold text-black py-4 px-6 font-black tracking-widest uppercase hover:bg-gold/90 transition-all duration-300"
        >
          Ver detalles
        </Link>
      </div>
    </motion.div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop)' }}>
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-gold text-sm md:text-base font-semibold tracking-[0.3em] uppercase mb-4">EXPERIENCIAS DE LUJO · COLOMBIA Y EL MUNDO</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight">
              Redefiniendo el <span className="italic text-gold">lujo</span> en los viajes
            </h1>
            <div className="w-24 h-1 bg-gold mx-auto mb-8" />
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-light mb-12 leading-relaxed">
              Exclusividad, distinción y aventuras en los destinos más selectos del mundo.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex flex-col sm:flex-row items-center gap-6 justify-center">
            <Link to="/destinos" className="bg-gold text-black px-12 py-5 hover:bg-gold/90 transition-all duration-300 font-black text-lg tracking-widest uppercase">
              Explorar Destinos
            </Link>
            <Link to="/paquetes" className="border-2 border-white text-white px-12 py-5 hover:bg-white hover:text-black transition-all duration-300 font-black text-lg tracking-widest uppercase">
              Ver Paquetes
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Destacados */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4">Selección exclusiva</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Destinos Destacados</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">Los destinos más exclusivos y queridos por nuestros viajeros</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DESTINOS_DATA.map((dest, idx) => <DestinationCard key={dest.id} dest={dest} />)}
          </div>
          <div className="text-center mt-16">
            <Link to="/destinos" className="inline-flex items-center gap-3 border-2 border-gold text-gold px-12 py-4 hover:bg-gold hover:text-black transition-all duration-300 font-black tracking-widest uppercase">
              Ver todos los destinos
            </Link>
          </div>
        </div>
      </section>

      {/* Paquetes */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4">Experiencias completas</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Paquetes Turísticos</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">Paquetes completos y exclusivos para tu próxima aventura</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PAQUETES_DATA.map((pack, idx) => <PackageCard key={pack.id} pack={pack} />)}
          </div>
          <div className="text-center mt-16">
            <Link to="/paquetes" className="inline-flex items-center gap-3 bg-gold text-black px-12 py-4 hover:bg-gold/90 transition-all duration-300 font-black tracking-widest uppercase">
              Ver todos los paquetes
            </Link>
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
              <img src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1200&auto=format&fit=crop" alt="Equipo" className="w-full" loading="lazy" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4">¿Quiénes somos?</p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8">VIAJES<span className="text-gold">PREMIUM</span></h2>
              <p className="text-white/60 text-lg mb-12 leading-relaxed">
                Redefiniendo el estándar del lujo en los viajes. Tu aliado estratégico para aventuras exclusivas y experiencias inolvidables.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="bg-[#0a0a0a] p-8 text-center border border-gray-800 hover:border-gold/30 transition-all duration-300">
                  <div className="bg-gold/10 w-16 h-16 flex items-center justify-center mx-auto mb-6"><FaAward className="text-gold text-2xl" /></div>
                  <h3 className="text-xl font-black text-white mb-3">Excelencia</h3>
                  <p className="text-white/50 text-sm">Servicio de la más alta calidad</p>
                </div>
                <div className="bg-[#0a0a0a] p-8 text-center border border-gray-800 hover:border-gold/30 transition-all duration-300">
                  <div className="bg-gold/10 w-16 h-16 flex items-center justify-center mx-auto mb-6"><FaShieldAlt className="text-gold text-2xl" /></div>
                  <h3 className="text-xl font-black text-white mb-3">Confianza</h3>
                  <p className="text-white/50 text-sm">Seguridad en cada viaje</p>
                </div>
                <div className="bg-[#0a0a0a] p-8 text-center border border-gray-800 hover:border-gold/30 transition-all duration-300">
                  <div className="bg-gold/10 w-16 h-16 flex items-center justify-center mx-auto mb-6"><FaLightbulb className="text-gold text-2xl" /></div>
                  <h3 className="text-xl font-black text-white mb-3">Innovación</h3>
                  <p className="text-white/50 text-sm">Experiencias únicas y modernas</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
