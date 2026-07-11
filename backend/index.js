
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes');
const destinosRoutes = require('./src/routes/destinosRoutes');
const paquetesRoutes = require('./src/routes/paquetesRoutes');
const hotelesRoutes = require('./src/routes/hotelesRoutes');
const vuelosRoutes = require('./src/routes/vuelosRoutes');
const toursRoutes = require('./src/routes/toursRoutes');

const app = express();

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:5174'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/destinos', destinosRoutes);
app.use('/api/paquetes', paquetesRoutes);
app.use('/api/hoteles', hotelesRoutes);
app.use('/api/vuelos', vuelosRoutes);
app.use('/api/tours', toursRoutes);

// Rutas básicas de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Agencia de Viajes funcionando!' });
});

// Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`FRONTEND_URL: ${process.env.FRONTEND_URL}`);
});
