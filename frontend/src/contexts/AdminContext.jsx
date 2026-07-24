import { createContext, useState, useEffect, useContext } from 'react';

const AdminContext = createContext();

// Default admin credentials
const DEFAULT_ADMIN_CREDENTIALS = {
  email: 'admin@viajes.com',
  password: 'admin123'
};

// Default data
const DEFAULT_DESTINOS = [
  {
    id: 1,
    nombre: "Cartagena de Indias",
    imagen: "https://images.unsplash.com/photo-1596326011042-c95980808c99?q=80&w=1600&auto=format&fit=crop",
    ubicacion: { ciudad: "Cartagena", pais: "Colombia" },
    precio: { valor: 1200000, moneda: "COP" },
    rating: 4.8,
    reviews: 284,
    categoria: "playa",
    descripcion: "Ciudad amurallada con playas caribeñas y rica historia colonial.",
    clima: "Tropical, 25-32°C",
    gastronomia: "Pescado frito, cocada, arequipe",
    actividades: ["Tours por la ciudad amurallada", "Islas del Rosario", "Playa Blanca"],
    galeria: []
  },
  {
    id: 2,
    nombre: "Eje Cafetero",
    imagen: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop",
    ubicacion: { ciudad: "Armenia", pais: "Colombia" },
    precio: { valor: 950000, moneda: "COP" },
    rating: 4.9,
    reviews: 198,
    categoria: "naturaleza",
    descripcion: "Valle del Cocora, plantaciones de café y paisajes verdes.",
    clima: "Templado, 15-24°C",
    gastronomia: "Bandeja paisa, café, pan de queso",
    actividades: ["Valle del Cocora", "Tours de café", "Parque del Café"],
    galeria: []
  },
  {
    id: 3,
    nombre: "Parque Nacional Tayrona",
    imagen: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=1600&auto=format&fit=crop",
    ubicacion: { ciudad: "Santa Marta", pais: "Colombia" },
    precio: { valor: 850000, moneda: "COP" },
    rating: 4.7,
    reviews: 342,
    categoria: "playa",
    descripcion: "Playas vírgenes, selva tropical y arrecifes de coral.",
    clima: "Tropical, 26-34°C",
    gastronomia: "Ceviche, pescado fresco, agua de coco",
    actividades: ["Senderismo", "Snorkeling", "Camping"],
    galeria: []
  },
  {
    id: 4,
    nombre: "Medellín",
    imagen: "https://images.unsplash.com/photo-1605209653915-b204bd0074ea?q=80&w=1600&auto=format&fit=crop",
    ubicacion: { ciudad: "Medellín", pais: "Colombia" },
    precio: { valor: 750000, moneda: "COP" },
    rating: 4.6,
    reviews: 410,
    categoria: "ciudad",
    descripcion: "Ciudad de la eterna primavera con innovación urbana.",
    clima: "Templado, 18-28°C",
    gastronomia: "Ajiaco, bandeja paisa, mazamorra",
    actividades: ["Metrocable", "Comuna 13", "Museo de Antioquia"],
    galeria: []
  },
  {
    id: 5,
    nombre: "San Andrés Islas",
    imagen: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    ubicacion: { ciudad: "San Andrés", pais: "Colombia" },
    precio: { valor: 1500000, moneda: "COP" },
    rating: 4.9,
    reviews: 267,
    categoria: "playa",
    descripcion: "Mar de 7 colores y playas de arena blanca.",
    clima: "Tropical, 27-32°C",
    gastronomia: "Rondón, fish and chips, coco loco",
    actividades: ["Playa Spratt Bight", "La Piscinita", "La Laguna de Big Pond"],
    galeria: []
  },
  {
    id: 6,
    nombre: "Caño Cristales",
    imagen: "https://images.unsplash.com/photo-1501785888041-af3ef281b395?q=80&w=1600&auto=format&fit=crop",
    ubicacion: { ciudad: "La Macarena", pais: "Colombia" },
    precio: { valor: 1100000, moneda: "COP" },
    rating: 4.8,
    reviews: 123,
    categoria: "naturaleza",
    descripcion: "Río de 5 colores (septiembre-noviembre).",
    clima: "Tropical, 24-34°C",
    gastronomia: "Comida típica llanera, casabe, chicha",
    actividades: ["Senderismo por el río", "Miradores", "Piscinas naturales"],
    galeria: []
  },
  {
    id: 7,
    nombre: "París, Francia",
    imagen: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop",
    ubicacion: { ciudad: "París", pais: "Francia" },
    precio: { valor: 4500, moneda: "USD" },
    rating: 4.9,
    reviews: 1245,
    categoria: "ciudad",
    descripcion: "Ciudad del amor, arte y gastronomía.",
    clima: "Templado, 8-24°C",
    gastronomia: "Croissants, queso, vino tinto",
    actividades: ["Torre Eiffel", "Louvre", "Seine River cruise"],
    galeria: []
  },
  {
    id: 8,
    nombre: "Cancún, México",
    imagen: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=1600&auto=format&fit=crop",
    ubicacion: { ciudad: "Cancún", pais: "México" },
    precio: { valor: 1800, moneda: "USD" },
    rating: 4.7,
    reviews: 892,
    categoria: "playa",
    descripcion: "Playas caribeñas y ruinas mayas.",
    clima: "Tropical, 26-33°C",
    gastronomia: "Tacos, ceviche, margaritas",
    actividades: ["Chichen Itzá", "Isla Mujeres", "Zona Hotelera"],
    galeria: []
  }
];

const DEFAULT_PAQUETES = [
  {
    id: 1,
    nombre: "Aventura en el Caribe",
    imagen: "https://images.unsplash.com/photo-1596326011042-c95980808c99?q=80&w=1600&auto=format&fit=crop",
    ubicacion: { ciudad: "Cartagena", pais: "Colombia" },
    precio: { valor: 2500000, moneda: "COP" },
    precioAntes: { valor: 3200000, moneda: "COP" },
    duracion: "5 días / 4 noches",
    personas: 2,
    rating: 4.8,
    reviews: 156,
    incluye: ["Vuelo", "Hotel 5 estrellas", "Desayuno", "Tours incluidos", "Traslados"],
    itinerario: [
      { dia: "Día 1", actividad: "Llegada y bienvenida" },
      { dia: "Día 2", actividad: "Tour por la ciudad amurallada" },
      { dia: "Día 3", actividad: "Excursión a las Islas del Rosario" },
      { dia: "Día 4", actividad: "Playa Blanca y tiempo libre" },
      { dia: "Día 5", actividad: "Desayuno y regreso" }
    ]
  },
  {
    id: 2,
    nombre: "Ruta del Café",
    imagen: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop",
    ubicacion: { ciudad: "Armenia", pais: "Colombia" },
    precio: { valor: 1800000, moneda: "COP" },
    precioAntes: { valor: 2200000, moneda: "COP" },
    duracion: "4 días / 3 noches",
    personas: 2,
    rating: 4.9,
    reviews: 98,
    incluye: ["Hotel boutique", "Desayuno", "3 comidas", "Tours", "Tasting café"],
    itinerario: [
      { dia: "Día 1", actividad: "Llegada y bienvenida con café" },
      { dia: "Día 2", actividad: "Valle del Cocora y finca cafetera" },
      { dia: "Día 3", actividad: "Parque del Café y actividades" },
      { dia: "Día 4", actividad: "Desayuno y despedida" }
    ]
  },
  {
    id: 3,
    nombre: "Escape a Tayrona",
    imagen: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=1600&auto=format&fit=crop",
    ubicacion: { ciudad: "Santa Marta", pais: "Colombia" },
    precio: { valor: 2100000, moneda: "COP" },
    precioAntes: null,
    duracion: "6 días / 5 noches",
    personas: 2,
    rating: 4.7,
    reviews: 134,
    incluye: ["Eco-hotel", "Todas comidas", "Entrada al parque", "Guía", "Traslados"],
    itinerario: [
      { dia: "Día 1", actividad: "Llegada y acomodación" },
      { dia: "Día 2", actividad: "Senderismo hasta Cabo San Juan" },
      { dia: "Día 3", actividad: "Snorkeling en el arrecife" },
      { dia: "Día 4", actividad: "Tiempo libre en la playa" },
      { dia: "Día 5", actividad: "Sendero de las 9 Piedras" },
      { dia: "Día 6", actividad: "Desayuno y regreso" }
    ]
  },
  {
    id: 4,
    nombre: "Medellín Experience",
    imagen: "https://images.unsplash.com/photo-1605209653915-b204bd0074ea?q=80&w=1600&auto=format&fit=crop",
    ubicacion: { ciudad: "Medellín", pais: "Colombia" },
    precio: { valor: 1600000, moneda: "COP" },
    precioAntes: { valor: 2000000, moneda: "COP" },
    duracion: "4 días / 3 noches",
    personas: 2,
    rating: 4.6,
    reviews: 87,
    incluye: ["Hotel", "Desayuno", "Tours", "Metrocable", "Cena incluida"],
    itinerario: [
      { dia: "Día 1", actividad: "Llegada y tour por el centro" },
      { dia: "Día 2", actividad: "Comuna 13 y metrocable" },
      { dia: "Día 3", actividad: "Museo de Antioquia y El Poblado" },
      { dia: "Día 4", actividad: "Tiempo libre y regreso" }
    ]
  },
  {
    id: 5,
    nombre: "San Andrés Paradise",
    imagen: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    ubicacion: { ciudad: "San Andrés", pais: "Colombia" },
    precio: { valor: 2900000, moneda: "COP" },
    precioAntes: null,
    duracion: "5 días / 4 noches",
    personas: 2,
    rating: 4.9,
    reviews: 112,
    incluye: ["Vuelo", "All inclusive", "Spa", "Tours", "Watersports"],
    itinerario: [
      { dia: "Día 1", actividad: "Llegada y check-in" },
      { dia: "Día 2", actividad: "Tour por la isla" },
      { dia: "Día 3", actividad: "La Piscinita y snorkeling" },
      { dia: "Día 4", actividad: "Día de spa y relax" },
      { dia: "Día 5", actividad: "Desayuno y regreso" }
    ]
  },
  {
    id: 6,
    nombre: "Río de 5 Colores",
    imagen: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop",
    ubicacion: { ciudad: "La Macarena", pais: "Colombia" },
    precio: { valor: 2400000, moneda: "COP" },
    precioAntes: { valor: 2800000, moneda: "COP" },
    duracion: "4 días / 3 noches",
    personas: 2,
    rating: 4.8,
    reviews: 67,
    incluye: ["Vuelo", "Hotel", "Guía", "Permisos", "Todas comidas"],
    itinerario: [
      { dia: "Día 1", actividad: "Llegada y preparación" },
      { dia: "Día 2", actividad: "Full day Caño Cristales" },
      { dia: "Día 3", actividad: "Senderos y piscinas naturales" },
      { dia: "Día 4", actividad: "Desayuno y regreso" }
    ]
  },
  {
    id: 7,
    nombre: "Lujo en París",
    imagen: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop",
    ubicacion: { ciudad: "París", pais: "Francia" },
    precio: { valor: 8900, moneda: "USD" },
    precioAntes: { valor: 10500, moneda: "USD" },
    duracion: "7 días / 6 noches",
    personas: 2,
    rating: 5.0,
    reviews: 234,
    incluye: ["Vuelo", "Hotel 5*", "Desayuno", "Tour VIP", "Entradas"],
    itinerario: [
      { dia: "Día 1", actividad: "Llegada y bienvenida" },
      { dia: "Día 2", actividad: "Louvre y Notre Dame" },
      { dia: "Día 3", actividad: "Torre Eiffel y cena" },
      { dia: "Día 4", actividad: "Versalles tour" },
      { dia: "Día 5", actividad: "Montmartre y boheme" },
      { dia: "Día 6", actividad: "Compras y tiempo libre" },
      { dia: "Día 7", actividad: "Desayuno y regreso" }
    ]
  },
  {
    id: 8,
    nombre: "Cancún All Inclusive",
    imagen: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=1600&auto=format&fit=crop",
    ubicacion: { ciudad: "Cancún", pais: "México" },
    precio: { valor: 3200, moneda: "USD" },
    precioAntes: null,
    duracion: "6 días / 5 noches",
    personas: 2,
    rating: 4.7,
    reviews: 312,
    incluye: ["Vuelo", "All inclusive", "Open bar", "Watersports", "Tours"],
    itinerario: [
      { dia: "Día 1", actividad: "Llegada y bienvenida" },
      { dia: "Día 2", actividad: "Chichen Itzá tour" },
      { dia: "Día 3", actividad: "Isla Mujeres y snorkeling" },
      { dia: "Día 4", actividad: "Tiempo libre en resort" },
      { dia: "Día 5", actividad: "Xcaret eco-park" },
      { dia: "Día 6", actividad: "Desayuno y regreso" }
    ]
  }
];

export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [destinos, setDestinos] = useState([]);
  const [paquetes, setPaquetes] = useState([]);

  // Initialize data from localStorage or use defaults
  useEffect(() => {
    try {
      // Initialize admin credentials
      const storedAdminCredentials = localStorage.getItem('adminCredentials');
      if (!storedAdminCredentials) {
        localStorage.setItem('adminCredentials', JSON.stringify(DEFAULT_ADMIN_CREDENTIALS));
      }
      
      // Initialize destinos
      const storedDestinos = localStorage.getItem('destinos');
      if (storedDestinos) {
        setDestinos(JSON.parse(storedDestinos));
      } else {
        setDestinos(DEFAULT_DESTINOS);
        localStorage.setItem('destinos', JSON.stringify(DEFAULT_DESTINOS));
      }
      
      // Initialize paquetes
      const storedPaquetes = localStorage.getItem('paquetes');
      if (storedPaquetes) {
        setPaquetes(JSON.parse(storedPaquetes));
      } else {
        setPaquetes(DEFAULT_PAQUETES);
        localStorage.setItem('paquetes', JSON.stringify(DEFAULT_PAQUETES));
      }
      
      // Check if admin is logged in
      const storedAdmin = localStorage.getItem('adminLoggedIn');
      if (storedAdmin) {
        setAdmin(JSON.parse(storedAdmin));
        setIsAdminLoggedIn(true);
      }
    } catch (err) {
      console.error('Error initializing admin data:', err);
    }
  }, []);

  // Save destinos to localStorage when they change
  useEffect(() => {
    if (destinos.length > 0) {
      localStorage.setItem('destinos', JSON.stringify(destinos));
    }
  }, [destinos]);

  // Save paquetes to localStorage when they change
  useEffect(() => {
    if (paquetes.length > 0) {
      localStorage.setItem('paquetes', JSON.stringify(paquetes));
    }
  }, [paquetes]);

  const adminLogin = (email, password) => {
    try {
      const storedCredentials = JSON.parse(localStorage.getItem('adminCredentials'));
      if (email.toLowerCase() === storedCredentials.email.toLowerCase() && password === storedCredentials.password) {
        const adminData = { email: storedCredentials.email };
        setAdmin(adminData);
        setIsAdminLoggedIn(true);
        localStorage.setItem('adminLoggedIn', JSON.stringify(adminData));
        return { success: true };
      }
      return { success: false, message: 'Credenciales incorrectas' };
    } catch (err) {
      return { success: false, message: 'Error al iniciar sesión' };
    }
  };

  const adminLogout = () => {
    setAdmin(null);
    setIsAdminLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
  };

  // Destinos CRUD
  const addDestino = (newDestino) => {
    const id = Date.now();
    const destinoToAdd = { ...newDestino, id };
    const newDestinosList = [...destinos, destinoToAdd];
    setDestinos(newDestinosList);
  };

  const updateDestino = (updatedDestino) => {
    const newDestinosList = destinos.map(destino =>
      destino.id === updatedDestino.id ? updatedDestino : destino
    );
    setDestinos(newDestinosList);
  };

  const deleteDestino = (destinoId) => {
    const newDestinosList = destinos.filter(destino => destino.id !== destinoId);
    setDestinos(newDestinosList);
  };

  // Paquetes CRUD
  const addPaquete = (newPaquete) => {
    const id = Date.now();
    const paqueteToAdd = { ...newPaquete, id };
    const newPaquetesList = [...paquetes, paqueteToAdd];
    setPaquetes(newPaquetesList);
  };

  const updatePaquete = (updatedPaquete) => {
    const newPaquetesList = paquetes.map(paquete =>
      paquete.id === updatedPaquete.id ? updatedPaquete : paquete
    );
    setPaquetes(newPaquetesList);
  };

  const deletePaquete = (paqueteId) => {
    const newPaquetesList = paquetes.filter(paquete => paquete.id !== paqueteId);
    setPaquetes(newPaquetesList);
  };

  return (
    <AdminContext.Provider value={{
      isAdminLoggedIn,
      admin,
      adminLogin,
      adminLogout,
      destinos,
      addDestino,
      updateDestino,
      deleteDestino,
      paquetes,
      addPaquete,
      updatePaquete,
      deletePaquete
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

