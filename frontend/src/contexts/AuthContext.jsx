
import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usuariosRegistrados, setUsuariosRegistrados] = useState(() => {
    const saved = localStorage.getItem('usuarios');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) {
      setUsuario(JSON.parse(usuarioStorage));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login
    const usuarioEncontrado = usuariosRegistrados.find(u => u.email === email && u.password === password);
    if (usuarioEncontrado) {
      const userData = { id: usuarioEncontrado.id, nombre: usuarioEncontrado.nombre, email: usuarioEncontrado.email, telefono: usuarioEncontrado.telefono };
      localStorage.setItem('usuario', JSON.stringify(userData));
      setUsuario(userData);
      return { usuario: userData, token: 'mock-token' };
    } else {
      throw new Error('Credenciales incorrectas. Por favor, registrese primero o verifique sus datos.');
    }
  };

  const register = async (nombre, email, password, telefono) => {
    // Mock register
    const usuarioExistente = usuariosRegistrados.find(u => u.email === email);
    if (usuarioExistente) {
      throw new Error('El correo electrónico ya está registrado.');
    }
    const nuevoUsuario = { id: Date.now(), nombre, email, password, telefono };
    const nuevosUsuarios = [...usuariosRegistrados, nuevoUsuario];
    setUsuariosRegistrados(nuevosUsuarios);
    localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
    const userData = { id: nuevoUsuario.id, nombre, email, telefono };
    localStorage.setItem('usuario', JSON.stringify(userData));
    setUsuario(userData);
    return { usuario: userData, token: 'mock-token' };
  };

  const logout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
