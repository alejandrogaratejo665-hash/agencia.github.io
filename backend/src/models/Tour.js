
const pool = require('../config/database');

class Tour {
  static async findAll(activos = true) {
    let query = 'SELECT * FROM tours';
    const params = [];
    if (activos) {
      query += ' WHERE activo = 1';
    }
    query += ' ORDER BY nombre ASC';
    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async findByDestinoId(destinoId, activos = true) {
    let query = 'SELECT * FROM tours WHERE destino_id = ?';
    const params = [destinoId];
    if (activos) {
      query += ' AND activo = 1';
    }
    query += ' ORDER BY nombre ASC';
    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM tours WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { nombre, destino_id, descripcion, duracion, precio, max_personas } = data;
    const [result] = await pool.query(
      `INSERT INTO tours (nombre, destino_id, descripcion, duracion, precio, max_personas) VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, destino_id, descripcion, duracion, precio, max_personas]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { nombre, destino_id, descripcion, duracion, precio, max_personas, activo } = data;
    await pool.query(
      `UPDATE tours SET 
       nombre = COALESCE(?, nombre), destino_id = COALESCE(?, destino_id), descripcion = COALESCE(?, descripcion), duracion = COALESCE(?, duracion), precio = COALESCE(?, precio), max_personas = COALESCE(?, max_personas), activo = COALESCE(?, activo)
       WHERE id = ?`,
      [nombre, destino_id, descripcion, duracion, precio, max_personas, activo, id]
    );
  }

  static async delete(id) {
    await pool.query('UPDATE tours SET activo = 0 WHERE id = ?', [id]);
  }
}

module.exports = Tour;
