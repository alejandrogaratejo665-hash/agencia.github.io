import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaStar, FaSearch, FaArrowRight, FaFilter } from 'react-icons/fa'
import { useAdmin } from '../contexts/AdminContext'

const Destinos = () => {
  const { destinos } = useAdmin()
  const [filtro, setFiltro] = useState('todos')
  const [busqueda, setBusqueda] = useState('')

  const destinosFiltrados = destinos.filter(destino => {
    const cumpleTipo = filtro === 'todos' || destino.categoria === filtro
    const cumpleBusqueda = destino.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (destino.ubicacion && destino.ubicacion.ciudad && destino.ubicacion.ciudad.toLowerCase().includes(busqueda.toLowerCase())) ||
      (destino.ubicacion && destino.ubicacion.pais && destino.ubicacion.pais.toLowerCase().includes(busqueda.toLowerCase()))
    return cumpleTipo && cumpleBusqueda
  })

  const getPriceDisplay = (precio) => {
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2000&auto=format&fit=crop)'
          }}
        >
          <div className="absolute inset-0 bg-black/75"></div>
        </div>

        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
          >
            Nuestros Destinos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            Explora el mundo con nosotros. Desde playas paradisíacas hasta ciudades llenas de historia.
          </motion.p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Search */}
            <div className="w-full lg:w-96">
              <div className="relative">
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Buscar destino, ciudad o país..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-[#111111] border border-gray-800 text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-all duration-300 text-sm tracking-wide"
                />
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-white/40 text-sm flex items-center gap-2 font-medium tracking-wide">
                <FaFilter /> Filtrar por:
              </span>
              {[
                { value: 'todos', label: 'Todos' },
                { value: 'playa', label: 'Playas' },
                { value: 'naturaleza', label: 'Naturaleza' },
                { value: 'ciudad', label: 'Ciudades' },
                { value: 'aventura', label: 'Aventura' }
              ].map((opcion) => (
                <button
                  key={opcion.value}
                  onClick={() => setFiltro(opcion.value)}
                  className={`px-6 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                    filtro === opcion.value
                      ? 'bg-gold text-black'
                      : 'text-white/60 hover:text-white hover:bg-[#111111]'
                  }`}
                >
                  {opcion.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {destinosFiltrados.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-white/50 text-xl">No se encontraron destinos que coincidan con tu búsqueda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {destinosFiltrados.map((destino, index) => (
                <motion.div
                  key={destino.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -12 }}
                  className="bg-[#111111] overflow-hidden cursor-pointer group border border-gray-800"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={destino.imagen}
                      alt={destino.nombre}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    {destino.destacado && (
                      <div className="absolute top-6 left-6">
                        <span className="bg-gold text-black px-5 py-2 text-xs font-black tracking-wider uppercase">
                          Destacado
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-black text-white mb-3">{destino.nombre}</h3>
                    {destino.ubicacion && (
                      <div className="flex items-center gap-2 mb-4">
                        <FaMapMarkerAlt className="text-gold text-sm" />
                        <p className="text-white/50 text-sm tracking-wide">
                          {destino.ubicacion.ciudad}, {destino.ubicacion.pais}
                        </p>
                      </div>
                    )}
                    {destino.descripcion && (
                      <p className="text-white/50 mb-6 line-clamp-2 text-sm">
                        {destino.descripcion}
                      </p>
                    )}
                    <div className="flex items-center gap-1 mb-6">
                      <FaStar className="text-gold" />
                      <span className="text-white font-bold">{destino.rating || '4.5'}</span>
                      <span className="text-white/40">({destino.reviews || '100'} reseñas)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-gold font-black text-xl">
                          {getPriceDisplay(destino.precio)}
                        </span>
                        <span className="text-white/40 text-sm">/persona</span>
                      </div>
                      <Link
                        to={`/destinos/${destino.id}`}
                        className="text-gold font-black flex items-center gap-2 group-hover:gap-3 transition-all duration-300 text-sm"
                      >
                        Ver más <FaArrowRight />
                      </Link>
                    </div>
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

export default Destinos
