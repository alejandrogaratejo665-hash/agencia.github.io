
const pool = require('../config/database');

class Usuario {
  static async create(usuarioData) {
    const { nombre, email, password, telefono, rol_id = 3 } = usuarioData;
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, telefono, rol_id) VALUES (?, ?, ?, ?, ?)',
      [nombre, email, password, telefono, rol_id]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT id, nombre, email, telefono, foto_perfil, rol_id, activo, created_at FROM usuarios WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, data) {
    const { nombre, telefono, foto_perfil } = data;
    await pool.query(
      'UPDATE usuarios SET nombre = COALESCE(?, nombre), telefono = COALESCE(?, telefono), foto_perfil = COALESCE(?, foto_perfil) WHERE id = ?',
      [nombre, telefono, foto_perfil, id]
    );
  }
}

module.exports = Usuario;
