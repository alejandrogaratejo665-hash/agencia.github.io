import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendar, FaStar, FaSearch, FaArrowRight, FaFilter, FaCheckCircle } from 'react-icons/fa'
import { useAdmin } from '../contexts/AdminContext'

const Paquetes = () => {
  const { paquetes } = useAdmin()
  const [busqueda, setBusqueda] = useState('')

  const paquetesFiltrados = paquetes.filter(paquete =>
    paquete.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    (paquete.descripcion && paquete.descripcion.toLowerCase().includes(busqueda.toLowerCase()))
  )

  const getPriceDisplay = (precio) => {
    if (!precio) return ''
    if (precio.moneda === 'COP') {
      return `$${precio.valor.toLocaleString('es-CO')}`
    }
    return `$${precio.valor.toLocaleString('en-US')} ${precio.moneda}`
  }

  const getOldPriceDisplay = (precio) => {
    if (!precio) return ''
    if (precio.moneda === 'COP') {
      return `$${precio.valor.toLocaleString('es-CO')}`
    }
    return `$${precio.valor.toLocaleString('en-US')} ${precio.moneda}`
  }

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
                    {paquete.precioAntes && (
                      <div className="absolute top-6 left-6">
                        <span className="bg-red-600 text-white px-5 py-2 text-xs font-black tracking-wider uppercase">
                          -20% OFF
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-black text-white mb-3">{paquete.nombre}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <FaCalendar className="text-gold text-sm" />
                      <p className="text-white/50 text-sm tracking-wide">{paquete.duracion}</p>
                    </div>
                    <div className="flex items-center gap-1 mb-6">
                      <FaStar className="text-gold" />
                      <span className="text-white font-bold">{paquete.rating}</span>
                      <span className="text-white/40">({paquete.reviews} reseñas)</span>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-baseline gap-2">
                        {paquete.precioAntes && (
                          <span className="text-white/30 line-through text-sm">
                            {getOldPriceDisplay(paquete.precioAntes)}
                          </span>
                        )}
                        <span className="text-gold font-black text-2xl">
                          {getPriceDisplay(paquete.precio)}
                        </span>
                        <span className="text-white/40 text-sm">/persona</span>
                      </div>
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
  )
}

export default Paquetes
