
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinos from './pages/Destinos';
import DetalleDestino from './pages/DetalleDestino';
import Paquetes from './pages/Paquetes';
import DetallePaquete from './pages/DetallePaquete';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinos" element={<Destinos />} />
          <Route path="/destinos/:id" element={<DetalleDestino />} />
          <Route path="/paquetes" element={<Paquetes />} />
          <Route path="/paquetes/:id" element={<DetallePaquete />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/perfil" element={<div className="p-8 text-center"><h1 className="text-3xl">Mi Perfil</h1></div>} />
          <Route path="/favoritos" element={<div className="p-8 text-center"><h1 className="text-3xl">Mis Favoritos</h1></div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
