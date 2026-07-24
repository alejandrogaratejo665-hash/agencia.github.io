
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";
import {
  FaMapMarkerAlt,
  FaStar,
  FaCheckCircle,
  FaUmbrellaBeach,
  FaMountain,
  FaCity,
  FaCamera,
  FaUtensils,
  FaHotel,
  FaHeart,
  FaShareAlt,
  FaPlay,
  FaTimes,
  FaCalendarAlt,
  FaUsers,
  FaCheck
} from 'react-icons/fa';
import { useDestinationImages } from '../hooks/useDestinationImages';
import { useFavorites } from '../contexts/FavoritesContext';

// Destination data, kept for other info
const DESTINOS_DATA = [
  {
    id: 1,
    nombre: 'Cartagena de Indias',
    ubicacion: { ciudad: 'Cartagena', departamento: 'Bolívar', pais: 'Colombia' },
    descripcion: 'La ciudad amurallada con playas de arena blanca, gastronomía caribeña y una historia colonial que te transporta al siglo XVI.',
    precio: { valor: 1500000, moneda: 'COP' },
    calificacion: 4.9,
    numeroResenas: 1523,
    destacado: true,
    tipo: 'playa',
    highlights: ['Centro Histórico', 'Islas del Rosario', 'Castillo San Felipe', 'Getsemaní'],
    clima: 'Tropical cálido y húmedo todo el año (25°C a 32°C)',
    mejor_epoca: 'Enero - Marzo (época seca)',
    actividades: ['Tours por el centro histórico', 'Visitar Islas del Rosario', 'Cena en Getsemaní', 'Playa Blanca', 'Museo del Oro Zenú', 'Buceo'],
    gastronomia: ['Ceviche', 'Bandeja Paisa', 'Cazuela de Mariscos', 'Arequipe'],
    alojamiento: ['Hostales en Getsemaní', 'Resorts en Bocagrande', 'Haciendas históricas'],
    itinerario_dia: [
      { dia: 1, titulo: 'Llegada y centro histórico', actividades: ['Llegada al aeropuerto', 'Recorrido por la ciudad amurallada', 'Cena en Getsemaní'] },
      { dia: 2, titulo: 'Islas del Rosario', actividades: ['Tour a las islas', 'Snorkeling', 'Playa blanca todo el día'] },
      { dia: 3, titulo: 'Castillo y cultura', actividades: ['Visitar Castillo San Felipe', 'Museo del Oro Zenú', 'Compras locales'] }
    ],
    // Optional video background URL
    videoBg: null
  },
  {
    id: 2,
    nombre: 'Eje Cafetero',
    ubicacion: { ciudad: 'Valle del Cocora', departamento: 'Quindío', pais: 'Colombia' },
    descripcion: 'Palmeras de cera gigantes, fincas cafeteras tradicionales y paisajes verdes que quitan el aliento en el corazón de Colombia.',
    precio: { valor: 1200000, moneda: 'COP' },
    calificacion: 4.9,
    numeroResenas: 987,
    destacado: true,
    tipo: 'naturaleza',
    highlights: ['Valle del Cocora', 'Fincas Cafeteras', 'Salento', 'Parque del Café'],
    clima: 'Templado todo el año (15°C a 24°C)',
    mejor_epoca: 'Todo el año',
    actividades: ['Tours de café', 'Senderismo Valle del Cocora', 'Parque del Café', 'Visitar Filandia'],
    gastronomia: ['Bandeja Paisa', 'Ajiaco', 'Pan de yuca', 'Mazamorra morada'],
    alojamiento: ['Fincas cafeteras', 'Hosterías campestres', 'Hotels en Armenia'],
    itinerario_dia: [
      { dia: 1, titulo: 'Llegada y Valle del Cocora', actividades: ['Llegada a Armenia', 'Senderismo Valle del Cocora', 'Cena en Salento'] },
      { dia: 2, titulo: 'Mundo cafetero', actividades: ['Tour por finca cafetera', 'Parque del Café', 'Ruta de la artesanía'] },
      { dia: 3, titulo: 'Filandia y regreso', actividades: ['Visitar Filandia', 'Mirador', 'Regreso'] }
    ],
    videoBg: null
  },
  {
    id: 3,
    nombre: 'Parque Nacional Tayrona',
    ubicacion: { ciudad: 'Santa Marta', departamento: 'Magdalena', pais: 'Colombia' },
    descripcion: 'Playas vírgenes, selva tropical húmeda y una conexión profunda con la naturaleza en el norte de Colombia.',
    precio: { valor: 1300000, moneda: 'COP' },
    calificacion: 4.8,
    numeroResenas: 2341,
    destacado: false,
    tipo: 'aventura',
    highlights: ['Playa Cabo San Juan', 'Ciudad Perdida', 'Senderos Naturaleza', 'Bahía Concha'],
    clima: 'Tropical húmedo (25°C a 32°C)',
    mejor_epoca: 'Enero - Marzo y Julio - Agosto',
    actividades: ['Senderismo', 'Acampar', 'Playa', 'Observación de aves', 'Ciudad Perdida'],
    gastronomia: ['Pescado fresco', 'Coco rallado', 'Patacones', 'Arequipe'],
    alojamiento: ['Camping en el parque', 'Eco-hoteles', 'Hostales en Taganga'],
    itinerario_dia: [
      { dia: 1, titulo: 'Llegada y entrada al parque', actividades: ['Llegada Santa Marta', 'Entrada al parque', 'Cabo San Juan'] },
      { dia: 2, titulo: 'Playas y senderos', actividades: ['Senderos naturales', 'Playa Arrecifes', 'Piscinas naturales'] },
      { dia: 3, titulo: 'Regreso y Taganga', actividades: ['Desayuno en playa', 'Regreso', 'Visitar Taganga'] }
    ],
    videoBg: null
  },
  {
    id: 4,
    nombre: 'Medellín: La Ciudad de la Eterna Primavera',
    ubicacion: { ciudad: 'Medellín', departamento: 'Antioquia', pais: 'Colombia' },
    descripcion: 'Innovación, cultura vibrante, clima perfecto todo el año y una historia de transformación que inspira al mundo.',
    precio: { valor: 1100000, moneda: 'COP' },
    calificacion: 4.7,
    numeroResenas: 1123,
    destacado: true,
    tipo: 'ciudad',
    highlights: ['Comuna 13', 'Metrocable', 'Plaza Botero', 'Guatapé'],
    clima: 'Primavera todo el año (18°C a 25°C)',
    mejor_epoca: 'Todo el año',
    actividades: ['Metrocable', 'Comuna 13', 'Museo de Antioquia', 'Guatapé', 'Plaza Botero'],
    gastronomia: ['Bandeja Paisa', 'Ajiaco', 'Churrasco antioqueño', 'Empanadas'],
    alojamiento: ['Hoteles en El Poblado', 'Hostales en Laureles', 'Apartamentos turísticos'],
    itinerario_dia: [
      { dia: 1, titulo: 'Innovación y arte', actividades: ['Metrocable', 'Comuna 13', 'Museo de Antioquia'] },
      { dia: 2, titulo: 'Guatapé y la Piedra', actividades: ['Excursión a Guatapé', 'Subir la Piedra', 'Paseo en lancha'] },
      { dia: 3, titulo: 'Comida y cultura', actividades: ['Plaza Botero', 'Comida típica', 'Parque Lleras'] }
    ],
    videoBg: null
  },
  {
    id: 5,
    nombre: 'San Andrés Islas',
    ubicacion: { ciudad: 'San Andrés', departamento: 'San Andrés y Providencia', pais: 'Colombia' },
    descripcion: 'El mar de los siete colores, playas de ensueño, cultura raizal y un paraíso caribeño en el corazón del Caribe colombiano.',
    precio: { valor: 2000000, moneda: 'COP' },
    calificacion: 4.9,
    numeroResenas: 1876,
    destacado: true,
    tipo: 'playa',
    highlights: ['Playa Spratt Bight', 'Johnny Cay', 'La Loma', 'Cayo Acuario'],
    clima: 'Tropical marítimo (26°C a 31°C)',
    mejor_epoca: 'Diciembre - Abril',
    actividades: ['Snorkeling', 'Playa', 'Tour a Johnny Cay', 'Compras libres de impuestos', 'Buceo'],
    gastronomia: ['Rundown', 'Ceviche', 'Pescado frito', 'Pan de coco'],
    alojamiento: ['Resorts all inclusive', 'Hostales', 'Apartamentos en la playa'],
    itinerario_dia: [
      { dia: 1, titulo: 'Llegada y playa', actividades: ['Llegada', 'Playa Spratt Bight', 'Cena en la playa'] },
      { dia: 2, titulo: 'Islas y cayos', actividades: ['Tour a Johnny Cay', 'Cayo Acuario', 'Snorkeling'] },
      { dia: 3, titulo: 'Compras y relax', actividades: ['Compras libres de impuestos', 'Playa', 'Despedida'] }
    ],
    videoBg: null
  },
  {
    id: 6,
    nombre: 'Caño Cristales',
    ubicacion: { ciudad: 'La Macarena', departamento: 'Meta', pais: 'Colombia' },
    descripcion: 'El río de los siete colores, un fenómeno natural único en el mundo que se convierte en un arcoíris líquido entre junio y noviembre.',
    precio: { valor: 1800000, moneda: 'COP' },
    calificacion: 4.9,
    numeroResenas: 765,
    destacado: false,
    tipo: 'naturaleza',
    highlights: ['Río de los Siete Colores', 'Cascadas', 'Senderos', 'Piscinas Naturales'],
    clima: 'Tropical cálido (26°C a 33°C)',
    mejor_epoca: 'Junio - Noviembre',
    actividades: ['Senderismo', 'Fotografía', 'Nadar en piscinas naturales', 'Cascadas'],
    gastronomia: ['Comida llanera', 'Sancocho', 'Carne a la llanera', 'Chicha'],
    alojamiento: ['Hoteles en La Macarena', 'Lodges turísticos', 'Eco-hoteles'],
    itinerario_dia: [
      { dia: 1, titulo: 'Llegada a La Macarena', actividades: ['Llegada', 'Reunión guía', 'Preparación'] },
      { dia: 2, titulo: 'Caño Cristales', actividades: ['Entrada al parque', 'Río de los siete colores', 'Fotografía'] },
      { dia: 3, titulo: 'Cascadas y regreso', actividades: ['Cascadas', 'Piscinas naturales', 'Regreso'] }
    ],
    videoBg: null
  },
  {
    id: 7,
    nombre: 'París, Francia',
    ubicacion: { ciudad: 'París', departamento: 'Isla de Francia', pais: 'Francia' },
    descripcion: 'La ciudad del amor, la Torre Eiffel, gastronomía michelín y una historia artística que ha marcado al mundo.',
    precio: { valor: 2500, moneda: 'USD' },
    calificacion: 4.9,
    numeroResenas: 4321,
    destacado: true,
    tipo: 'ciudad',
    highlights: ['Torre Eiffel', 'Museo Louvre', 'Montmartre', 'Seine River'],
    clima: 'Templado (8°C a 24°C)',
    mejor_epoca: 'Abril - Junio y Septiembre - Octubre',
    actividades: ['Torre Eiffel', 'Louvre', 'Montmartre', 'Seine River cruise', 'Champs-Élysées'],
    gastronomia: ['Croissants', 'Coq au vin', 'Ratatouille', 'Crème brûlée'],
    alojamiento: ['Hoteles boutique', 'Apartamentos turísticos', 'Hostales céntricos'],
    itinerario_dia: [
      { dia: 1, titulo: 'Iconos parisinos', actividades: ['Torre Eiffel', 'Champs-Élysées', 'Arco del Triunfo'] },
      { dia: 2, titulo: 'Arte y cultura', actividades: ['Louvre', 'Notre Dame', 'Seine cruise'] },
      { dia: 3, titulo: 'Montmartre y más', actividades: ['Montmartre', 'Sacré-Cœur', 'Compras'] }
    ],
    videoBg: null
  },
  {
    id: 8,
    nombre: 'Cancún, México',
    ubicacion: { ciudad: 'Cancún', departamento: 'Quintana Roo', pais: 'México' },
    descripcion: 'Resorts de lujo, playas de arena blanca y aguas turquesas, cenotes mágicos y la cultura maya en el corazón del Caribe mexicano.',
    precio: { valor: 1800, moneda: 'USD' },
    calificacion: 4.7,
    numeroResenas: 3456,
    destacado: true,
    tipo: 'playa',
    highlights: ['Zona Hotelera', 'Isla Mujeres', 'Cenotes', 'Tulum'],
    clima: 'Tropical (24°C a 32°C)',
    mejor_epoca: 'Diciembre - Abril',
    actividades: ['Playa', 'Cenotes', 'Tulum', 'Isla Mujeres', 'Chichén Itzá'],
    gastronomia: ['Tacos', 'Ceviche', 'Mole', 'Margarita'],
    alojamiento: ['Resorts all inclusive', 'Boutique hotels', 'Hostales en la playa'],
    itinerario_dia: [
      { dia: 1, titulo: 'Llegada y relax', actividades: ['Check-in', 'Playa', 'Cena en resort'] },
      { dia: 2, titulo: 'Cultura maya', actividades: ['Tulum', 'Cenotes', 'Cena en Tulum'] },
      { dia: 3, titulo: 'Isla Mujeres', actividades: ['Tour a Isla Mujeres', 'Playa Norte', 'Regreso'] }
    ],
    videoBg: null
  }
];

const getIconForType = (tipo) => {
  switch (tipo) {
    case 'playa':
      return <FaUmbrellaBeach className="text-xl" />;
    case 'naturaleza':
      return <FaMountain className="text-xl" />;
    case 'ciudad':
      return <FaCity className="text-xl" />;
    default:
      return <FaMountain className="text-xl" />;
  }
};

const DetalleDestino = () => {
  const { id } = useParams();
  const destino = DESTINOS_DATA.find(d => d.id === parseInt(id));
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingData, setBookingData] = useState({
    fechaInicio: '',
    fechaFin: '',
    personas: 1,
    nombre: '',
    email: '',
    telefono: ''
  });

  const { images, heroImage, loading, refetch } = useDestinationImages(destino?.nombre || 'travel');
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  const toggleFavorite = () => {
    const favoriteItem = {
      id: destino.id,
      type: 'destino',
      nombre: destino.nombre,
      imagen: heroImage?.url || destino.imagen || '',
      ubicacion: destino.ubicacion,
      precio: destino.precio
    };
    if (isFavorite(destino.id, 'destino')) {
      removeFavorite(destino.id, 'destino');
    } else {
      addFavorite(favoriteItem);
    }
  };

  if (!destino) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Destino no encontrado</h2>
          <Link to="/destinos" className="text-gold font-semibold hover:underline">
            Volver a destinos
          </Link>
        </div>
      </div>
    );
  }

  const slides = images.map((img) => ({
    src: img.full || img.url,
    title: img.alt,
    description: `Fotografía por ${img.author}`
  }));

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Mock booking save
    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    reservas.push({
      id: Date.now(),
      destino: destino.nombre,
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
      personas: 1,
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
                      Te contactaremos pronto para confirmar tu reserva a {destino.nombre}.
                    </p>
                    <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 text-left mb-6">
                      <p className="text-white/80 mb-2">
                        <span className="font-semibold text-white">Destino:</span> {destino.nombre}
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
      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
      />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Video Background if available */}
        {destino.videoBg ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={destino.videoBg} type="video/mp4" />
          </video>
        ) : (
          <img
            src={heroImage?.url}
            alt={destino.nombre}
            className="w-full h-full object-cover transition-all duration-1000"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

        {/* Top Actions */}
        <div className="absolute top-6 left-6 right-6 z-20 flex justify-between">
          <Link
            to="/destinos"
            className="bg-black/40 backdrop-blur-md text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-black/60 transition-all duration-300 flex items-center gap-2"
          >
            ← Volver
          </Link>
          <div className="flex gap-3">
            <button
              onClick={toggleFavorite}
              className={`bg-black/40 backdrop-blur-md p-3 rounded-xl hover:bg-black/60 transition-all duration-300 ${
                isFavorite(destino.id, 'destino') ? 'text-red-500' : 'text-white'
              }`}
            >
              <FaHeart className={isFavorite(destino.id, 'destino') ? 'fill-current' : ''} />
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
                {destino.ubicacion.ciudad}, {destino.ubicacion.pais}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-4">
              {destino.nombre}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <FaStar className="text-gold" />
                <span className="text-xl font-bold">{destino.calificacion}</span>
                <span className="text-white/60">({destino.numeroResenas} reseñas)</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white font-semibold">
                {getIconForType(destino.tipo)}
                <span className="capitalize">{destino.tipo}</span>
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
                <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                  <h2 className="text-2xl font-black text-white flex items-center gap-2">
                    <FaCamera className="text-gold" />
                    Galería
                  </h2>
                  {loading && (
                    <span className="text-white/60 text-sm animate-pulse">Cargando imágenes...</span>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-6">
                  {images.map((img, idx) => (
                    <div
                      key={img.id}
                      onClick={() => {
                        setLightboxIndex(idx);
                        setLightboxOpen(true);
                      }}
                      className="aspect-square overflow-hidden rounded-xl shadow-md cursor-pointer hover:scale-105 transition-transform duration-300 group"
                    >
                      <img
                        src={img.thumb || img.url}
                        alt={img.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <FaPlay className="text-white text-3xl" />
                      </div>
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
                <h2 className="text-2xl font-black text-white mb-4">Sobre este destino</h2>
                <p className="text-white/70 text-lg leading-relaxed">
                  {destino.descripcion}
                </p>
              </motion.div>

              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-[#111111] border border-gray-800 rounded-2xl p-8"
              >
                <h2 className="text-2xl font-black text-white mb-6">Lo mejor para ver</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {destino.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="bg-[#0a0a0a] p-4 rounded-xl text-center border border-gray-800 hover:border-gold/50 transition-all duration-300"
                    >
                      <FaCheckCircle className="text-gold mx-auto mb-2" />
                      <p className="text-white/90 font-semibold">{highlight}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Itinerario */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-[#111111] border border-gray-800 rounded-2xl p-8"
              >
                <h2 className="text-2xl font-black text-white mb-6">Itinerario sugerido</h2>
                <div className="space-y-6">
                  {destino.itinerario_dia.map((dia, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-gold text-black rounded-full flex items-center justify-center font-black text-xl shadow-lg">
                          {dia.dia}
                        </div>
                        {idx < destino.itinerario_dia.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-700 my-2" />
                        )}
                      </div>
                      <div className="flex-1 bg-[#0a0a0a] border border-gray-800 p-5 rounded-xl">
                        <h3 className="text-xl font-bold text-white mb-2">{dia.titulo}</h3>
                        <ul className="space-y-1">
                          {dia.actividades.map((act, actIdx) => (
                            <li key={actIdx} className="text-white/70 flex items-center gap-2">
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

              {/* Clima & Mejor época */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-[#111111] border border-gray-800 rounded-2xl p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-3">Clima</h3>
                  <p className="text-white/60">{destino.clima}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                  className="bg-[#111111] border border-gray-800 rounded-2xl p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-3">Mejor época para viajar</h3>
                  <p className="text-white/60">{destino.mejor_epoca}</p>
                </motion.div>
              </div>

              {/* Gastronomía & Alojamiento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-[#111111] border border-gray-800 rounded-2xl p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FaUtensils className="text-gold" />
                    Gastronomía
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {destino.gastronomia.map((item, idx) => (
                      <span key={idx} className="bg-[#0a0a0a] border border-gray-800 text-white/80 px-3 py-1.5 rounded-full text-sm font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.65 }}
                  className="bg-[#111111] border border-gray-800 rounded-2xl p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FaHotel className="text-gold" />
                    Alojamiento
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {destino.alojamiento.map((item, idx) => (
                      <span key={idx} className="bg-[#0a0a0a] border border-gray-800 text-white/80 px-3 py-1.5 rounded-full text-sm font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
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
                    {destino.precio.moneda === 'COP'
                      ? `$${destino.precio.valor.toLocaleString('es-CO')}`
                      : `$${destino.precio.valor.toLocaleString('en-US')} ${destino.precio.moneda}`}
                  </p>
                </div>
                <div className="space-y-4">
                  <Link
                    to="/paquetes"
                    className="block w-full text-center bg-gold text-black py-4 px-6 rounded-xl font-black hover:bg-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                  >
                    Ver paquetes disponibles
                  </Link>
                  <button
                    onClick={() => setBookingModalOpen(true)}
                    className="w-full text-center border-2 border-white text-white py-4 px-6 rounded-xl font-bold hover:bg-white hover:text-black transition-all duration-300 text-lg"
                  >
                    Consultar disponibilidad
                  </button>
                  <Link
                    to="/destinos"
                    className="block w-full text-center text-white/50 hover:text-white/80 font-semibold"
                  >
                    Ver más destinos
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

export default DetalleDestino;
