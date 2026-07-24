
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendar, FaStar, FaSearch, FaArrowRight, FaFilter, FaCheckCircle } from 'react-icons/fa';

const PAQUETES_DATA = [
  {
    id: 1,
    nombre: 'Paquete Cartagena Completa',
    descripcion: 'Todo incluido: alojamiento en hotel 5 estrellas, tours por la ciudad amurallada, Islas del Rosario, desayuno buffet y transporte privado.',
    duracion_dias: 5,
    precio: 2500000,
    descuento: 10,
    calificacion: 4.9,
    numeroResenas: 654,
    imagen: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1600&auto=format&fit=crop',
    destacado: true,
    highlights: ['Hotel 5 Estrellas', 'Islas del Rosario', 'Transporte Privado', 'Desayuno Buffet']
  },
  {
    id: 2,
    nombre: 'Aventura Medellín y Guatapé',
    descripcion: 'Descubre la Ciudad de la Eterna Primavera, Comuna 13, Plaza Botero y la impresionante Piedra del Peñol en Guatapé.',
    duracion_dias: 4,
    precio: 1800000,
    descuento: 0,
    calificacion: 4.7,
    numeroResenas: 432,
    imagen: 'https://images.unsplash.com/photo-1645566816086-e6093c472c6e?q=80&w=1600&auto=format&fit=crop',
    destacado: true,
    highlights: ['Comuna 13', 'Piedra del Peñol', 'Plaza Botero', 'Metrocable']
  },
  {
    id: 3,
    nombre: 'Paraíso en San Andrés',
    descripcion: 'Playas de arena blanca, mar de 7 colores, tours por Johnny Cay y Cayo Acuario, todo incluido en resort frente al mar.',
    duracion_dias: 5,
    precio: 3200000,
    descuento: 15,
    calificacion: 4.9,
    numeroResenas: 789,
    imagen: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1600&auto=format&fit=crop',
    destacado: true,
    highlights: ['Resort Frente al Mar', 'Johnny Cay', 'Cayo Acuario', 'Todo Incluido']
  },
  {
    id: 4,
    nombre: 'Explorando Tayrona',
    descripcion: 'Parque Nacional Tayrona, playas vírgenes, senderos de naturaleza y la legendaria Ciudad Perdida en una aventura única.',
    duracion_dias: 6,
    precio: 2800000,
    descuento: 5,
    calificacion: 4.8,
    numeroResenas: 543,
    imagen: 'https://images.unsplash.com/photo-1582674200075-38c560979004?q=80&w=1600&auto=format&fit=crop',
    destacado: false,
    highlights: ['Parque Tayrona', 'Ciudad Perdida', 'Senderos Naturaleza', 'Cabañas Eco']
  },
  {
    id: 5,
    nombre: 'Cancún Todo Incluido',
    descripcion: 'Resort de lujo en Cancún, Playa del Carmen, tours por cenotes y la zona arqueológica de Tulum en el Caribe mexicano.',
    duracion_dias: 7,
    precio: 1800,
    moneda: 'USD',
    descuento: 20,
    calificacion: 4.6,
    numeroResenas: 876,
    imagen: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=1600&auto=format&fit=crop',
    destacado: true,
    highlights: ['Resort de Lujo', 'Cenotes', 'Tulum', 'Playa del Carmen']
  },
  {
    id: 6,
    nombre: 'Ruta del Café Eje Cafetero',
    descripcion: 'Salento, Filandia, Valle del Cocora con sus palmeras de cera gigantes y fincas cafeteras tradicionales del Quindío.',
    duracion_dias: 4,
    precio: 1600000,
    descuento: 0,
    calificacion: 4.9,
    numeroResenas: 321,
    imagen: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop',
    destacado: false,
    highlights: ['Valle del Cocora', 'Fincas Cafeteras', 'Salento', 'Filandia']
  }
];

const Paquetes = () => {
  const [busqueda, setBusqueda] = useState('');

  const paquetesFiltrados = PAQUETES_DATA.filter(paquete => 
    paquete.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    paquete.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop)'
          }}
        >
          <div className="absolute inset-0 bg-black/75"></div>
        </div>
        
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6"
          >
            Nuestros Paquetes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            Paquetes completos y exclusivos para tu próxima aventura.
          </motion.p>
        </div>
      </section>

      {/* Search */}
      <section className="py-12 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Buscar paquete..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-[#111111] border border-gray-800 text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-all duration-300 text-sm tracking-wide"
            />
          </div>
        </div>
      </section>

      {/* Paquetes Grid */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {paquetesFiltrados.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-white/50 text-xl">No se encontraron paquetes que coincidan con tu búsqueda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paquetesFiltrados.map((paquete, index) => (
                <motion.div
                  key={paquete.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -12 }}
                  className="bg-[#111111] overflow-hidden cursor-pointer group border border-gray-800"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={paquete.imagen} 
                      alt={paquete.nombre}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    {paquete.descuento > 0 && (
                      <div className="absolute top-6 left-6">
                        <span className="bg-red-600 text-white px-5 py-2 text-xs font-black tracking-wider uppercase">
                          -{paquete.descuento}% OFF
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-black text-white mb-3">{paquete.nombre}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <FaCalendar className="text-gold text-sm" />
                      <p className="text-white/50 text-sm tracking-wide">{paquete.duracion_dias} días</p>
                    </div>
                    <p className="text-white/50 mb-6 line-clamp-2 text-sm">
                      {paquete.descripcion}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {paquete.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-1 text-xs text-white/60">
                          <FaCheckCircle className="text-gold text-xs" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 mb-6">
                      <FaStar className="text-gold" />
                      <span className="text-white font-bold">{paquete.calificacion}</span>
                      <span className="text-white/40">({paquete.numeroResenas} reseñas)</span>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-baseline gap-2">
                        {paquete.descuento > 0 && (
                          <span className="text-white/30 line-through text-sm">
                            {paquete.moneda === 'COP'
                              ? `$${paquete.precio.toLocaleString('es-CO')}`
                              : `$${paquete.precio.toLocaleString('en-US')} ${paquete.moneda}`}
                          </span>
                        )}
                        <span className="text-gold font-black text-2xl">
                          {paquete.moneda === 'COP'
                            ? `$${(paquete.descuento > 0 ? paquete.precio * (1 - paquete.descuento / 100) : paquete.precio).toLocaleString('es-CO')}`
                            : `$${(paquete.descuento > 0 ? paquete.precio * (1 - paquete.descuento / 100) : paquete.precio).toLocaleString('en-US')} ${paquete.moneda || 'COP'}`}
                        </span>
                        <span className="text-white/40 text-sm">/persona</span>
                      </div>
                      <Link
                        to={`/paquetes/${paquete.id}`}
                        className="text-gold font-black flex items-center gap-2 group-hover:gap-3 transition-all duration-300 text-sm"
                      >
                        Ver más <FaArrowRight />
                      </Link>
                    </div>
                    <Link
                      to={`/paquetes/${paquete.id}`}
                      className="block w-full text-center bg-gold text-black py-4 px-6 font-black tracking-widest uppercase hover:bg-gold/90 transition-all duration-300"
                    >
                      Ver detalles
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Paquetes;
