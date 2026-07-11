
# Agencia de Viajes - Plataforma Web Profesional

Plataforma web completa de agencia de viajes desarrollada con React, Node.js, Express y MySQL.

## Tecnologías Utilizadas

### Frontend
- React
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios
- React Icons

### Backend
- Node.js
- Express
- JWT (JSON Web Tokens)
- bcryptjs
- MySQL2
- CORS
- express-validator
- dotenv

### Base de Datos
- MySQL (XAMPP o cualquier servidor MySQL)

## Instalación y Configuración

### Requisitos Previos
- Node.js (v18 o superior)
- MySQL o XAMPP
- npm

### Paso 1: Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd agencia-de-viajes
```

### Paso 2: Configurar la Base de Datos
1. Inicia tu servidor MySQL (XAMPP u otro)
2. Asegúrate de que el servicio MySQL esté corriendo en el puerto 3306

### Paso 3: Configurar el Backend
1. Navega a la carpeta backend:
```bash
cd backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea y configura el archivo `.env` en la carpeta backend (ya está creado, verifica los valores):
```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=agencia_viajes
JWT_SECRET=tu_clave_secreta_super_segura_para_jwt
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```
Nota: Ajusta `DB_USER` y `DB_PASSWORD` según tu configuración de MySQL.

4. Ejecuta el script para crear y poblar la base de datos:
```bash
node database/seed.js
```

5. Inicia el servidor backend:
```bash
npm start
# O para desarrollo con reinicio automático:
npm run dev
```

El servidor backend estará disponible en http://localhost:3001

### Paso 4: Configurar el Frontend
1. Abre una nueva terminal y navega a la carpeta frontend:
```bash
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo de Vite:
```bash
npm run dev
```

El frontend estará disponible en http://localhost:5173

## Credenciales de Prueba
- **Administrador**:
  - Email: admin@agencia.com
  - Contraseña: admin123

## Funcionalidades Implementadas

### Frontend
- Página de inicio con buscador
- Página de destinos y paquetes turísticos
- Autenticación: login y registro
- Páginas de nosotros y contacto
- Navegación responsive
- Animaciones con Framer Motion

### Backend
- API RESTful
- Autenticación JWT
- Controladores para usuarios, destinos y paquetes
- Middleware de autorización
- Conexión a base de datos MySQL

### Base de Datos
- Tablas normalizadas para todos los módulos
- Datos de prueba pre-cargados

## Estructura del Proyecto

```
agencia-de-viajes/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── database/
│   ├── public/
│   ├── index.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── contexts/
    │   ├── pages/
    │   ├── services/
    │   ├── utils/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

## Características de Diseño
- Paleta de colores elegante: Azul oscuro, Azul brillante, Dorado
- Responsive design
- Sombras y bordes redondeados
- Animaciones suaves con Framer Motion
- Navegación fija al hacer scroll
