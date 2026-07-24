
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
import Favoritos from './pages/Favoritos';
import Perfil from './pages/Perfil';

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
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
