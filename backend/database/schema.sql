
-- Crear base de datos
CREATE DATABASE IF NOT EXISTS agencia_viajes;
USE agencia_viajes;

-- Tabla de roles
CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  descripcion VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de usuarios
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

-- Tabla de destinos
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

-- Tabla de imagenes de destinos
CREATE TABLE IF NOT EXISTS imagenes_destinos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  destino_id INT NOT NULL,
  url VARCHAR(255) NOT NULL,
  principal TINYINT(1) DEFAULT 0,
  orden INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (destino_id) REFERENCES destinos(id) ON DELETE CASCADE
);

-- Tabla de hoteles
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

-- Tabla de habitaciones de hoteles
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

-- Tabla de vuelos
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

-- Tabla de paquetes turísticos
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

-- Tabla de imágenes de paquetes
CREATE TABLE IF NOT EXISTS imagenes_paquetes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paquete_id INT NOT NULL,
  url VARCHAR(255) NOT NULL,
  principal TINYINT(1) DEFAULT 0,
  orden INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (paquete_id) REFERENCES paquetes(id) ON DELETE CASCADE
);

-- Tabla de tours
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

-- Tabla de reservas
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

-- Tabla de pagos
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

-- Tabla de reseñas
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

-- Tabla de favoritos
CREATE TABLE IF NOT EXISTS favoritos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  tipo ENUM('destino', 'hotel', 'paquete', 'tour') NOT NULL,
  item_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_favorito (usuario_id, tipo, item_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de categorías de blog
CREATE TABLE IF NOT EXISTS categorias_blog (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  descripcion VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de blog
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

-- Tabla de comentarios de blog
CREATE TABLE IF NOT EXISTS comentarios_blog (
  id INT AUTO_INCREMENT PRIMARY KEY,
  blog_id INT NOT NULL,
  usuario_id INT,
  comentario TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (blog_id) REFERENCES blog(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Tabla de empresas aliadas
CREATE TABLE IF NOT EXISTS empresas_aliadas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  logo_url VARCHAR(255),
  descripcion TEXT,
  website VARCHAR(255),
  activo TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de preguntas frecuentes
CREATE TABLE IF NOT EXISTS faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pregunta VARCHAR(255) NOT NULL,
  respuesta TEXT NOT NULL,
  categoria VARCHAR(100),
  orden INT DEFAULT 0,
  activo TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar roles iniciales
INSERT INTO roles (nombre, descripcion) VALUES 
('admin', 'Administrador del sistema'),
('empleado', 'Empleado de la agencia'),
('cliente', 'Cliente de la agencia');

-- Insertar usuario administrador inicial (password: admin123)
INSERT INTO usuarios (nombre, email, password, telefono, rol_id) VALUES 
('Administrador', 'admin@agencia.com', '$2a$10$YourHashedPasswordHere', '3001234567', 1);
