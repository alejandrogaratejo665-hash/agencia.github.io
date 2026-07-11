
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const seedDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'agencia_viajes',
    multipleStatements: true,
  });

  try {
    console.log('Conectando a MySQL...');

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'agencia_viajes'}\``);
    await connection.changeUser({ database: process.env.DB_NAME || 'agencia_viajes' });
    console.log('Base de datos seleccionada');

    const schemaSql = `
      CREATE TABLE IF NOT EXISTS roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL UNIQUE,
        descripcion VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        telefono VARCHAR(20),
        foto_perfil VARCHAR(255),
        rol_id INT NOT NULL,
        activo TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE RESTRICT
      );

      CREATE TABLE IF NOT EXISTS destinos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        ciudad VARCHAR(100),
        departamento VARCHAR(100),
        pais VARCHAR(100) NOT NULL DEFAULT 'Colombia',
        descripcion TEXT,
        historia TEXT,
        clima VARCHAR(255),
        mejor_epoca VARCHAR(255),
        actividades TEXT,
        lugares_turisticos TEXT,
        transporte TEXT,
        duracion_recomendada VARCHAR(100),
        precio_estimado DECIMAL(10,2),
        calificacion DECIMAL(3,2) DEFAULT 0,
        video_url VARCHAR(255),
        activo TINYINT(1) DEFAULT 1,
        destacado TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS imagenes_destinos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        destino_id INT NOT NULL,
        url VARCHAR(255) NOT NULL,
        principal TINYINT(1) DEFAULT 0,
        orden INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (destino_id) REFERENCES destinos(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS hoteles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        destino_id INT NOT NULL,
        direccion VARCHAR(255),
        descripcion TEXT,
        estrellas INT,
        precio_noche DECIMAL(10,2),
        calificacion DECIMAL(3,2) DEFAULT 0,
        servicios TEXT,
        activo TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (destino_id) REFERENCES destinos(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS habitaciones (
        id INT AUTO_INCREMENT PRIMARY KEY,
        hotel_id INT NOT NULL,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        tipo VARCHAR(50),
        capacidad INT,
        precio_noche DECIMAL(10,2),
        disponible TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (hotel_id) REFERENCES hoteles(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS vuelos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        origen VARCHAR(100) NOT NULL,
        destino VARCHAR(100) NOT NULL,
        aerolinea VARCHAR(100),
        fecha_salida DATETIME NOT NULL,
        fecha_llegada DATETIME NOT NULL,
        duracion VARCHAR(50),
        escalas INT DEFAULT 0,
        precio DECIMAL(10,2),
        asientos_disponibles INT,
        activo TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS paquetes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        itinerario TEXT,
        incluye TEXT,
        no_incluye TEXT,
        destino_id INT,
        precio DECIMAL(10,2),
        descuento DECIMAL(5,2) DEFAULT 0,
        duracion_dias INT,
        max_personas INT,
        calificacion DECIMAL(3,2) DEFAULT 0,
        destacado TINYINT(1) DEFAULT 0,
        activo TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (destino_id) REFERENCES destinos(id) ON DELETE SET NULL
      );

      CREATE TABLE IF NOT EXISTS imagenes_paquetes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        paquete_id INT NOT NULL,
        url VARCHAR(255) NOT NULL,
        principal TINYINT(1) DEFAULT 0,
        orden INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (paquete_id) REFERENCES paquetes(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS tours (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        destino_id INT,
        descripcion TEXT,
        duracion VARCHAR(100),
        precio DECIMAL(10,2),
        max_personas INT,
        activo TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (destino_id) REFERENCES destinos(id) ON DELETE SET NULL
      );

      CREATE TABLE IF NOT EXISTS reservas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        usuario_id INT NOT NULL,
        tipo ENUM('paquete', 'hotel', 'vuelo', 'tour') NOT NULL,
        item_id INT NOT NULL,
        fecha_inicio DATE NOT NULL,
        fecha_fin DATE,
        num_personas INT NOT NULL,
        precio_total DECIMAL(10,2),
        estado ENUM('pendiente', 'confirmada', 'cancelada', 'completada') DEFAULT 'pendiente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS pagos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        reserva_id INT NOT NULL,
        monto DECIMAL(10,2) NOT NULL,
        metodo_pago VARCHAR(50),
        estado ENUM('pendiente', 'aprobado', 'rechazado', 'reembolsado') DEFAULT 'pendiente',
        transaction_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (reserva_id) REFERENCES reservas(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS resenas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        usuario_id INT NOT NULL,
        tipo ENUM('destino', 'hotel', 'paquete', 'tour') NOT NULL,
        item_id INT NOT NULL,
        calificacion INT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
        comentario TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS favoritos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        usuario_id INT NOT NULL,
        tipo ENUM('destino', 'hotel', 'paquete', 'tour') NOT NULL,
        item_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_favorito (usuario_id, tipo, item_id),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS categorias_blog (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL UNIQUE,
        descripcion VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS blog (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        contenido TEXT NOT NULL,
        resumen VARCHAR(500),
        imagen_url VARCHAR(255),
        categoria_id INT,
        usuario_id INT,
        fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        activo TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (categoria_id) REFERENCES categorias_blog(id) ON DELETE SET NULL,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
      );

      CREATE TABLE IF NOT EXISTS comentarios_blog (
        id INT AUTO_INCREMENT PRIMARY KEY,
        blog_id INT NOT NULL,
        usuario_id INT,
        comentario TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (blog_id) REFERENCES blog(id) ON DELETE CASCADE,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
      );

      CREATE TABLE IF NOT EXISTS empresas_aliadas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        logo_url VARCHAR(255),
        descripcion TEXT,
        website VARCHAR(255),
        activo TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS faqs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        pregunta VARCHAR(255) NOT NULL,
        respuesta TEXT NOT NULL,
        categoria VARCHAR(100),
        orden INT DEFAULT 0,
        activo TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await connection.query(schemaSql);
    console.log('Tablas creadas exitosamente');

    const hashedPassword = await bcrypt.hash('admin123', 10);

    await connection.query(
      'INSERT IGNORE INTO roles (id, nombre, descripcion) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?)',
      [
        1, 'admin', 'Administrador del sistema',
        2, 'empleado', 'Empleado de la agencia',
        3, 'cliente', 'Cliente de la agencia'
      ]
    );

    await connection.query(
      'INSERT IGNORE INTO usuarios (nombre, email, password, telefono, rol_id) VALUES (?, ?, ?, ?, ?)',
      ['Administrador', 'admin@agencia.com', hashedPassword, '3001234567', 1]
    );
    console.log('Roles y admin creados');

    const destinosData = [
      {
        nombre: 'Cartagena de Indias',
        ciudad: 'Cartagena',
        departamento: 'Bolívar',
        pais: 'Colombia',
        descripcion: 'La ciudad histórica y turística de Colombia, con una arquitectura colonial impresionante y playas paradisíacas.',
        historia: 'Cartagena fue fundada en 1533 y fue un importante puerto durante la época colonial.',
        clima: 'Tropical, cálido y húmedo durante todo el año',
        mejor_epoca: 'Diciembre a marzo',
        actividades: 'Tours históricos, playas, islas del Rosario, gastronomía local',
        lugares_turisticos: 'Centro histórico, Castillo de San Felipe, Islas del Rosario, Playas de Bocagrande',
        transporte: 'Aeropuerto Internacional Rafael Núñez, taxis, buses turísticos',
        duracion_recomendada: '4-5 días',
        precio_estimado: 1500000,
        destacado: 1,
        calificacion: 4.8
      },
      {
        nombre: 'Medellín',
        ciudad: 'Medellín',
        departamento: 'Antioquia',
        pais: 'Colombia',
        descripcion: 'La ciudad de la eterna primavera, con una impresionante transformación social y urbana.',
        historia: 'Conocida por su historia de resiliencia y renacimiento.',
        clima: 'Primaveral todo el año, temperatura promedio 22°C',
        mejor_epoca: 'Todo el año',
        actividades: 'Metrocable, Comuna 13, tours gastronómicos, Guatapé',
        lugares_turisticos: 'Plaza Botero, Comuna 13, El Poblado, Guatapé',
        transporte: 'Aeropuerto José María Córdova, metro, taxis',
        duracion_recomendada: '3-4 días',
        precio_estimado: 1200000,
        destacado: 1,
        calificacion: 4.7
      },
      {
        nombre: 'San Andrés y Providencia',
        ciudad: 'San Andrés',
        departamento: 'San Andrés',
        pais: 'Colombia',
        descripcion: 'Paraíso caribeño con playas de arena blanca y mar de siete colores.',
        historia: 'Archipiélago con una rica cultura raizal.',
        clima: 'Tropical',
        mejor_epoca: 'Enero a abril',
        actividades: 'Buceo, snorkeling, playas, Johnny Cay',
        lugares_turisticos: 'Playa Spratt Bight, Johnny Cay, La Loma, Cayo Acuario',
        transporte: 'Aeropuerto Gustavo Rojas Pinilla, taxis, buses',
        duracion_recomendada: '5-6 días',
        precio_estimado: 2000000,
        destacado: 1,
        calificacion: 4.9
      },
      {
        nombre: 'Santa Marta y Tayrona',
        ciudad: 'Santa Marta',
        departamento: 'Magdalena',
        pais: 'Colombia',
        descripcion: 'Costa caribe con el Parque Nacional Tayrona y la Ciudad Perdida.',
        historia: 'Primera ciudad fundada en Colombia.',
        clima: 'Tropical',
        mejor_epoca: 'Diciembre a marzo',
        actividades: 'Senderismo en Tayrona, trekking a Ciudad Perdida, playas',
        lugares_turisticos: 'Parque Tayrona, Ciudad Perdida, Taganga, Rodadero',
        transporte: 'Aeropuerto Simón Bolívar, buses, taxis',
        duracion_recomendada: '5 días',
        precio_estimado: 1300000,
        destacado: 0,
        calificacion: 4.7
      },
      {
        nombre: 'Cancún',
        ciudad: 'Cancún',
        departamento: 'Quintana Roo',
        pais: 'México',
        descripcion: 'Destino turístico icónico con playas espectaculares y vida nocturna vibrante.',
        historia: 'Desarrollado como centro turístico desde los años 70.',
        clima: 'Tropical',
        mejor_epoca: 'Diciembre a abril',
        actividades: 'Playa del Carmen, Tulum, cenotes, Xcaret',
        lugares_turisticos: 'Zona Hotelera, Isla Mujeres, Tulum, Chichén Itzá',
        transporte: 'Aeropuerto Internacional de Cancún',
        duracion_recomendada: '5-6 días',
        precio_estimado: 3500000,
        destacado: 0,
        calificacion: 4.6
      },
    ];

    for (const destino of destinosData) {
      await connection.query(
        `INSERT INTO destinos (nombre, ciudad, departamento, pais, descripcion, historia, clima, mejor_epoca, actividades, lugares_turisticos, transporte, duracion_recomendada, precio_estimado, calificacion, destacado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          destino.nombre, destino.ciudad, destino.departamento, destino.pais, destino.descripcion, destino.historia,
          destino.clima, destino.mejor_epoca, destino.actividades, destino.lugares_turisticos, destino.transporte,
          destino.duracion_recomendada, destino.precio_estimado, destino.calificacion, destino.destacado
        ]
      );
    }
    console.log('Destinos insertados');

    const paquetesData = [
      {
        nombre: 'Paquete Cartagena Completa',
        descripcion: 'Todo incluido: alojamiento, tours, desayuno y transporte.',
        itinerario: 'Día 1: Llegada y tour centro histórico. Día 2: Islas del Rosario. Día 3: Tour gastronómico. Día4: Playas de Bocagrande. Día5: Regreso.',
        incluye: 'Alojamiento 4 noches, desayuno diario, tours mencionados, transporte aeropuerto-hotel',
        no_incluye: 'Almuerzos y cenas, gastos personales',
        destino_id: 1,
        precio: 2500000,
        descuento: 10,
        duracion_dias: 5,
        max_personas: 4,
        destacado: 1,
        calificacion: 4.7
      },
      {
        nombre: 'Aventura Medellín y Guatapé',
        descripcion: 'Descubre la ciudad de la eterna primavera y la Piedra del Peñol.',
        itinerario: 'Día 1: Llegada y tour Medellín. Día2: Comuna13 y Guatapé. Día3: Tour gastronómico. Día4: Regreso.',
        incluye: 'Alojamiento 3 noches, desayuno, tour Guatapé, transporte',
        no_incluye: 'Almuerzos y cenas',
        destino_id: 2,
        precio: 1800000,
        descuento: 0,
        duracion_dias: 4,
        max_personas: 6,
        destacado: 1,
        calificacion: 4.6
      },
      {
        nombre: 'Paraíso en San Andrés',
        descripcion: 'Playas, sol y mar de siete colores.',
        itinerario: 'Día 1: Llegada. Día 2: Johnny Cay y Cayo Acuario. Día 3: Tour islas. Día 4: Tiempo libre. Día5: Regreso.',
        incluye: 'Alojamiento 4 noches, desayuno, tour islas',
        no_incluye: 'Almuerzos y cenas',
        destino_id: 3,
        precio: 3200000,
        descuento: 15,
        duracion_dias: 5,
        max_personas: 4,
        destacado: 1,
        calificacion: 4.8
      }
    ];

    for (const paquete of paquetesData) {
      await connection.query(
        `INSERT INTO paquetes (nombre, descripcion, itinerario, incluye, no_incluye, destino_id, precio, descuento, duracion_dias, max_personas, destacado, calificacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          paquete.nombre, paquete.descripcion, paquete.itinerario, paquete.incluye, paquete.no_incluye,
          paquete.destino_id, paquete.precio, paquete.descuento, paquete.duracion_dias, paquete.max_personas,
          paquete.destacado, paquete.calificacion
        ]
      );
    }
    console.log('Paquetes insertados');

    console.log('¡Base de datos poblada exitosamente!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await connection.end();
  }
};

seedDatabase();
