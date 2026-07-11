
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaStar, FaCheckCircle, FaCalendar, FaUsers, FaCamera, FaHeart, FaShareAlt, FaTimes, FaCalendarAlt, FaCheck } from 'react-icons/fa';

const PAQUETES_DATA = [
  {
    id: 1,
    nombre: 'Cartagena Premium 5 días',
    descripcion: 'Vive la experiencia caribeña definitiva con este paquete todo incluido. Disfruta de playas paradisíacas, gastronomía local, tours por la ciudad amurallada y una noche inolvidable en el corazón de Getsemaní.',
    destino: { ciudad: 'Cartagena', pais: 'Colombia' },
    precio: { valor: 2500000, moneda: 'COP' },
    calificacion: 4.9,
    numeroResenas: 654,
    duracion: '5 días / 4 noches',
    numeroPersonas: 2,
    tipo: 'playa',
     imagen: 'https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/bltdaa7db1aafde7898/68247b96976fff5d90dbe7cc/iStock-952878478-MOBILE-HEADER.jpg?fit=crop&auto=webp&quality=60&crop=smart&format=avif',
    galeria: [
      'https://image-tc.galaxy.tf/wijpeg-1rdrdiu7hjklvbbgh0xezvlrv/cartagena-colombia_standard.jpg?crop=71%2C0%2C1139%2C854',
      'https://plus.unsplash.com/premium_photo-1697730195920-86bc1a6eeab0?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FydGFnZW5hfGVufDB8fDB8fHww',
      'https://islasdelrosariotours.com/cdn/shop/files/Islas-del-rosario-desde-cartagena_1000x1000.jpg?v=1733368054',
      'https://static-dm.barcelo.com/is/image/barcelo/turismo-cartagena-de-indias?&&fmt=webp-alpha&qlt=75&wid=1200&fit=crop,1'
    ],
    destacado: true,
    incluye: ['Alojamiento 4 estrellas', 'Desayuno diario', 'Tours incluidos', 'Transfers aeropuerto-hotel'],
    noIncluye: ['Vuelos', 'Almuerzos y cenas', 'Seguro de viaje'],
    itinerario: [
      { dia: 1, titulo: 'Llegada a Cartagena', actividades: ['Llegada al aeropuerto', 'Transfer al hotel', 'Cena de bienvenida en Getsemaní'] },
      { dia: 2, titulo: 'Ciudad Amurallada y Castillo', actividades: ['Tour por centro histórico', 'Visita al Castillo San Felipe', 'Almuerzo típico'] },
      { dia: 3, titulo: 'Islas del Rosario', actividades: ['Tour a las islas', 'Snorkeling', 'Playa blanca todo el día'] },
      { dia: 4, titulo: 'Día libre y relax', actividades: ['Día en la playa', 'Tiempo libre para compras', 'Cena de despedida'] },
      { dia: 5, titulo: 'Regreso', actividades: ['Desayuno final', 'Transfer al aeropuerto'] }
    ]
  },
  {
    id: 2,
    nombre: 'Eje Cafetero Aventura',
    descripcion: 'Sumérgete en la cultura del café colombiano con tours por fincas, caminatas por el Valle del Cocora y una experiencia única en los pueblos más bellos del Quindío.',
    destino: { ciudad: 'Valle del Cocora', pais: 'Colombia' },
    precio: { valor: 1800000, moneda: 'COP' },
    calificacion: 4.8,
    numeroResenas: 432,
    duracion: '4 días / 3 noches',
    numeroPersonas: 2,
    tipo: 'naturaleza',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR88sqkMcUxo4teo0hvpTf2uLHQNgiYFsaBCPR7B8bi6IG5BBjEbhdaLrI&s=10',
    galeria: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_Z2awXC6e-IXuBIEYDlVMOy4aFk7J64Jz--vAB7CGA&s=10',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoogx_rtii_qayXnpvV6uakmV3jvrjUFS7vTi_Xj428Wg_diZwTxRC-Rs&s=10',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTJaNMOFPfcZ_2iMOGt0cmXTcHO0BeUbFBbwT0WPFXaoOtt6a1oAqc3lU&s=10',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrkrLKvkWwFXqNZjamTUqv45syriNw8JT1nr-puDs84LFW_FNa7Sdgzfs&s=10'
    ],
    destacado: true,
    incluye: ['Alojamiento en finca cafetera', 'Desayuno y almuerzo', 'Tour de café', 'Senderismo Valle del Cocora'],
    noIncluye: ['Vuelos', 'Cenas', 'Seguro de viaje'],
    itinerario: [
      { dia: 1, titulo: 'Llegada a Armenia', actividades: ['Llegada', 'Transfer a finca', 'Bienvenida con café'] },
      { dia: 2, titulo: 'Valle del Cocora', actividades: ['Senderismo', 'Visita palmeras de cera', 'Almuerzo campestre'] },
      { dia: 3, titulo: 'Salento y Filandia', actividades: ['Pueblos coloridos', 'Miradores', 'Ruta de artesanías'] },
      { dia: 4, titulo: 'Regreso', actividades: ['Desayuno', 'Transfer al aeropuerto'] }
    ]
  },
  {
    id: 3,
    nombre: 'París y Riviera Francesa',
    descripcion: 'Descubre la magia de París con la elegancia de la Costa Azul en un solo viaje icónico. Tour por monumentos, crucero por el Sena y días de sol en Niza y Mónaco.',
    destino: { ciudad: 'París', pais: 'Francia' },
    precio: { valor: 4500, moneda: 'USD' },
    calificacion: 4.9,
    numeroResenas: 87,
    duracion: '8 días / 7 noches',
    numeroPersonas: 2,
    tipo: 'luxury',
    imagen: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop',
    galeria: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501785888041-af3ef281b305?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1645566816086-e6093c472c6e?q=80&w=600&auto=format&fit=crop'
    ],
    destacado: true,
    incluye: ['Alojamiento 5 estrellas', 'Desayuno buffet', 'Tours guiados', 'Tren de alta velocidad'],
    noIncluye: ['Vuelos internacionales', 'Almuerzos y cenas', 'Entradas a museos'],
    itinerario: [
      { dia: 1, titulo: 'Llegada a París', actividades: ['Llegada CDG', 'Check-in hotel', 'Cena en Montmartre'] },
      { dia: 2, titulo: 'Iconos parisinos', actividades: ['Torre Eiffel', 'Louvre', 'Arco del Triunfo'] },
      { dia: 3, titulo: 'Seine y palacios', actividades: ['Crucero por el Sena', 'Palacio de Versalles'] },
      { dia: 4, titulo: 'Tren a Niza', actividades: ['Tren TGV', 'Llegada Costa Azul'] },
      { dia: 5, titulo: 'Niza y alrededores', actividades: ['Promenade des Anglais', 'Cannes', 'Antibes'] },
      { dia: 6, titulo: 'Mónaco y Montecarlo', actividades: ['Visita a Montecarlo', 'Casino', 'Oceanográfico'] },
      { dia: 7, titulo: 'Día libre', actividades: ['Playa o shopping', 'Cena de gala'] },
      { dia: 8, titulo: 'Regreso', actividades: ['Desayuno', 'Transfer aeropuerto'] }
    ]
  },
  {
    id: 4,
    nombre: 'Tayrona y Ciudad Perdida',
    descripcion: 'Una aventura en la selva del Caribe colombiano. Combina playas vírgenes del Parque Tayrona con la experiencia cultural de la Ciudad Perdida.',
    destino: { ciudad: 'Santa Marta', pais: 'Colombia' },
    precio: { valor: 2800000, moneda: 'COP' },
    calificacion: 4.7,
    numeroResenas: 543,
    duracion: '6 días / 5 noches',
    numeroPersonas: 2,
    tipo: 'aventura',
    imagen: 'https://images.unsplash.com/photo-1582674200075-38c560979004?q=80&w=1600&auto=format&fit=crop',
    galeria: [
      'https://images.unsplash.com/photo-1582674200075-38c560979004?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=600&auto=format&fit=crop'
    ],
    destacado: false,
    incluye: ['Guía indígena', 'Alojamiento en cabañas', 'Comidas durante trekking', 'Equipo básico'],
    noIncluye: ['Vuelos', 'Seguro especializado', 'Propinas'],
    itinerario: [
      { dia: 1, titulo: 'Llegada Santa Marta', actividades: ['Llegada', 'Briefing', 'Cena en Taganga'] },
      { dia: 2, titulo: 'Inicio trekking Ciudad Perdida', actividades: ['Primera caminata', 'Alojamiento en campamento'] },
      { dia: 3, titulo: 'Corazón de la selva', actividades: ['Caminata larga', 'Ríos', 'Flora y fauna'] },
      { dia: 4, titulo: 'Llegada a la Ciudad Perdida', actividades: ['Exploración', 'Cultura indígena'] },
      { dia: 5, titulo: 'Regreso y Tayrona', actividades: ['Caminata de vuelta', 'Entrada al Parque Tayrona'] },
      { dia: 6, titulo: 'Playa y despedida', actividades: ['Relax en playa', 'Cena final', 'Regreso'] }
    ]
  },
  {
    id: 5,
    nombre: 'Cancún Todo Incluido',
    descripcion: 'Resort de lujo en Cancún, Playa del Carmen, tours por cenotes y la zona arqueológica de Tulum en el Caribe mexicano.',
    destino: { ciudad: 'Cancún', pais: 'México' },
    precio: { valor: 1800, moneda: 'USD' },
    calificacion: 4.6,
    numeroResenas: 876,
    duracion: '7 días / 6 noches',
    numeroPersonas: 2,
    tipo: 'playa',
    imagen: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=1600&auto=format&fit=crop',
    galeria: [
      'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582674200075-38c560979004?q=80&w=600&auto=format&fit=crop'
    ],
    destacado: true,
    incluye: ['Resort todo incluido', 'Tours por cenotes', 'Visita a Tulum', 'Transfers'],
    noIncluye: ['Vuelos internacionales', 'Excursiones opcionales', 'Gastos personales'],
    itinerario: [
      { dia: 1, titulo: 'Llegada a Cancún', actividades: ['Llegada', 'Transfer al resort', 'Cena de bienvenida'] },
      { dia: 2, titulo: 'Día de relax', actividades: ['Playa todo el día', 'Spa y piscinas'] },
      { dia: 3, titulo: 'Tulum y cenotes', actividades: ['Visita a Tulum', 'Cenotes', 'Almuerzo en playa'] },
      { dia: 4, titulo: 'Isla Mujeres', actividades: ['Tour por la isla', 'Playa Norte', 'Snorkeling'] },
      { dia: 5, titulo: 'Playa del Carmen', actividades: ['Visita a la quinta avenida', 'Tiempo libre'] },
      { dia: 6, titulo: 'Día de relax', actividades: ['Resort, piscinas y playa'] },
      { dia: 7, titulo: 'Regreso', actividades: ['Desayuno final', 'Transfer al aeropuerto'] }
    ]
  },
  {
    id: 6,
    nombre: 'Ruta del Café Eje Cafetero',
    descripcion: 'Salento, Filandia, Valle del Cocora con sus palmeras de cera gigantes y fincas cafeteras tradicionales del Quindío.',
    destino: { ciudad: 'Valle del Cocora', pais: 'Colombia' },
    precio: { valor: 1600000, moneda: 'COP' },
    calificacion: 4.9,
    numeroResenas: 321,
    duracion: '4 días / 3 noches',
    numeroPersonas: 2,
    tipo: 'naturaleza',
    imagen: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop',
    galeria: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558470598-a5dd2004f6ae?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1645566816086-e6093c472c6e?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501785888041-af3ef281b305?q=80&w=600&auto=format&fit=crop'
    ],
    destacado: false,
    incluye: ['Alojamiento en finca', 'Tours de café', 'Senderismo Valle del Cocora', 'Transfers'],
    noIncluye: ['Vuelos', 'Cenas', 'Seguro de viaje'],
    itinerario: [
      { dia: 1, titulo: 'Llegada a Armenia', actividades: ['Llegada', 'Transfer a finca', 'Bienvenida'] },
      { dia: 2, titulo: 'Valle del Cocora', actividades: ['Senderismo', 'Palmeras de cera', 'Almuerzo'] },
      { dia: 3, titulo: 'Salento y Filandia', actividades: ['Pueblos', 'Miradores', 'Ruta del café'] },
      { dia: 4, titulo: 'Regreso', actividades: ['Desayuno', 'Transfer al aeropuerto'] }
    ]
  }
];

const DetallePaquete = () => {
  const { id } = useParams();
  const paquete = PAQUETES_DATA.find(p => p.id === parseInt(id));
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingData, setBookingData] = useState({
    fechaInicio: '',
    fechaFin: '',
    personas: 2,
    nombre: '',
    email: '',
    telefono: ''
  });

  if (!paquete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Paquete no encontrado</h2>
          <Link to="/paquetes" className="text-gold font-semibold hover:underline">
            Volver a paquetes
          </Link>
        </div>
      </div>
    );
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Mock booking save
    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    reservas.push({
      id: Date.now(),
      paquete: paquete.nombre,
      ...bookingData,
      fechaReserva: new Date().toISOString()
    });
    localStorage.setItem('reservas', JSON.stringify(reservas));
    setBookingSuccess(true);
  };

  const resetBooking = () => {
    setBookingSuccess(false);
    setBookingData({
      fechaInicio: '',
      fechaFin: '',
      personas: 2,
      nombre: '',
      email: '',
      telefono: ''
    });
    setBookingModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Booking Modal */}
      <AnimatePresence>
        {bookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#111111] border border-gray-800 rounded-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h2 className="text-2xl font-black text-white">
                  {bookingSuccess ? '¡Reserva confirmada!' : 'Consultar disponibilidad'}
                </h2>
                <button
                  onClick={resetBooking}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="p-6">
                {bookingSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaCheck className="text-gold text-4xl" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      ¡Tu solicitud ha sido enviada!
                    </h3>
                    <p className="text-white/60 mb-6">
                      Te contactaremos pronto para confirmar tu reserva del paquete {paquete.nombre}.
                    </p>
                    <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 text-left mb-6">
                      <p className="text-white/80 mb-2">
                        <span className="font-semibold text-white">Paquete:</span> {paquete.nombre}
                      </p>
                      <p className="text-white/80 mb-2">
                        <span className="font-semibold text-white">Fechas:</span> {bookingData.fechaInicio} - {bookingData.fechaFin}
                      </p>
                      <p className="text-white/80">
                        <span className="font-semibold text-white">Personas:</span> {bookingData.personas}
                      </p>
                    </div>
                    <button
                      onClick={resetBooking}
                      className="w-full bg-gold text-black py-3 font-bold rounded-xl hover:bg-gold/90 transition-all"
                    >
                      Cerrar
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-2 flex items-center gap-2">
                          <FaCalendarAlt className="text-gold" />
                          Fecha de inicio
                        </label>
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={bookingData.fechaInicio}
                          onChange={(e) => setBookingData({ ...bookingData, fechaInicio: e.target.value })}
                          className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-xl focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-2 flex items-center gap-2">
                          <FaCalendarAlt className="text-gold" />
                          Fecha de fin
                        </label>
                        <input
                          type="date"
                          required
                          min={bookingData.fechaInicio || new Date().toISOString().split('T')[0]}
                          value={bookingData.fechaFin}
                          onChange={(e) => setBookingData({ ...bookingData, fechaFin: e.target.value })}
                          className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-xl focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-2 flex items-center gap-2">
                        <FaUsers className="text-gold" />
                        Número de personas
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        required
                        value={bookingData.personas}
                        onChange={(e) => setBookingData({ ...bookingData, personas: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-xl focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-2">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingData.nombre}
                        onChange={(e) => setBookingData({ ...bookingData, nombre: e.target.value })}
                        className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-xl focus:outline-none focus:border-gold"
                        placeholder="Tu nombre"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-2">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        required
                        value={bookingData.email}
                        onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-xl focus:outline-none focus:border-gold"
                        placeholder="tu@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={bookingData.telefono}
                        onChange={(e) => setBookingData({ ...bookingData, telefono: e.target.value })}
                        className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-xl focus:outline-none focus:border-gold"
                        placeholder="Tu teléfono"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gold text-black py-4 font-black rounded-xl hover:bg-gold/90 transition-all text-lg"
                    >
                      Enviar solicitud
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <img 
          src={paquete.imagen} 
          alt={paquete.nombre} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Top Actions */}
        <div className="absolute top-6 left-6 right-6 z-20 flex justify-between">
          <Link 
            to="/paquetes" 
            className="bg-black/40 backdrop-blur-md text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-black/60 transition-all duration-300 flex items-center gap-2"
          >
            ← Volver
          </Link>
          <div className="flex gap-3">
            <button className="bg-black/40 backdrop-blur-md text-white p-3 rounded-xl hover:bg-black/60 transition-all duration-300">
              <FaHeart />
            </button>
            <button className="bg-black/40 backdrop-blur-md text-white p-3 rounded-xl hover:bg-black/60 transition-all duration-300">
              <FaShareAlt />
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-8 left-6 right-6 z-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-white/90 mb-3">
              <FaMapMarkerAlt />
              <span className="text-lg font-medium">
                {paquete.destino.ciudad}, {paquete.destino.pais}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              {paquete.nombre}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <FaStar className="text-gold" />
                <span className="text-xl font-bold">{paquete.calificacion}</span>
                <span className="text-white/60">({paquete.numeroResenas} reseñas)</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white font-semibold">
                <FaCalendar className="text-gold" />
                {paquete.duracion}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Galería */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[#111111] border border-gray-800 rounded-2xl overflow-hidden"
              >
                <div className="p-6 border-b border-gray-800">
                  <h2 className="text-2xl font-black text-white flex items-center gap-2">
                    <FaCamera className="text-gold" />
                    Galería
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-6">
                  {paquete.galeria.map((img, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-xl shadow-md">
                      <img 
                        src={img} 
                        alt={`${paquete.nombre} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Descripción */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#111111] border border-gray-800 rounded-2xl p-8"
              >
                <h2 className="text-2xl font-black text-white mb-4">Sobre este paquete</h2>
                <p className="text-white/70 text-lg leading-relaxed">
                  {paquete.descripcion}
                </p>
              </motion.div>

              {/* Incluye / No Incluye */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-[#111111] border border-gray-800 rounded-2xl p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FaCheckCircle className="text-gold" />
                    Incluye
                  </h3>
                  <ul className="space-y-2">
                    {paquete.incluye.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-white/70">
                        <FaCheckCircle className="text-gold text-xs" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="bg-[#111111] border border-gray-800 rounded-2xl p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FaCheckCircle className="text-white/30" />
                    No incluye
                  </h3>
                  <ul className="space-y-2">
                    {paquete.noIncluye.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-white/70">
                        <FaCheckCircle className="text-white/30 text-xs" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Itinerario */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-[#111111] border border-gray-800 rounded-2xl p-8"
              >
                <h2 className="text-2xl font-black text-white mb-6">Itinerario</h2>
                <div className="space-y-6">
                  {paquete.itinerario.map((dia, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-gold text-black rounded-full flex items-center justify-center font-black text-xl shadow-lg">
                          {dia.dia}
                        </div>
                        {index < paquete.itinerario.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-700 my-2"></div>
                        )}
                      </div>
                      <div className="flex-1 bg-[#0a0a0a] border border-gray-800 p-5 rounded-xl">
                        <h3 className="text-xl font-bold text-white mb-2">{dia.titulo}</h3>
                        <ul className="space-y-1">
                          {dia.actividades.map((act, i) => (
                            <li key={i} className="text-white/70 flex items-center gap-2">
                              <FaCheckCircle className="text-gold text-xs" />
                              {act}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-[#111111] border border-gray-800 rounded-2xl p-6 sticky top-24"
              >
                <div className="text-center mb-6">
                  <p className="text-white/60 text-sm mb-1">Precio por persona</p>
                  <p className="text-5xl font-black text-gold">
                    {paquete.precio.moneda === 'COP'
                      ? `$${paquete.precio.valor.toLocaleString('es-CO')}`
                      : `$${paquete.precio.valor.toLocaleString('en-US')} ${paquete.precio.moneda}`}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#0a0a0a] border border-gray-800 p-4 rounded-xl text-center">
                      <FaCalendar className="text-gold mx-auto mb-2" />
                      <p className="text-white/60 text-sm">Duración</p>
                      <p className="text-white font-bold">{paquete.duracion}</p>
                    </div>
                    <div className="bg-[#0a0a0a] border border-gray-800 p-4 rounded-xl text-center">
                      <FaUsers className="text-gold mx-auto mb-2" />
                      <p className="text-white/60 text-sm">Personas</p>
                      <p className="text-white font-bold">{paquete.numeroPersonas}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setBookingModalOpen(true)}
                    className="w-full text-center bg-gold text-black py-4 px-6 rounded-xl font-black hover:bg-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                  >
                    Reservar Ahora
                  </button>
                  <button
                    onClick={() => setBookingModalOpen(true)}
                    className="w-full text-center border-2 border-white text-white py-4 px-6 rounded-xl font-bold hover:bg-white hover:text-black transition-all duration-300 text-lg"
                  >
                    Consultar disponibilidad
                  </button>
                  <Link
                    to="/paquetes"
                    className="block w-full text-center text-white/50 hover:text-white/80 font-semibold"
                  >
                    Ver más paquetes
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetallePaquete;
