
const pool = require('../config/database');

class Hotel {
  static async findAll(activos = true) {
    let query = 'SELECT * FROM hoteles';
    const params = [];
    if (activos) {
      query += ' WHERE activo = 1';
    }
    query += ' ORDER BY nombre ASC';
    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async findByDestinoId(destinoId, activos = true) {
    let query = 'SELECT * FROM hoteles WHERE destino_id = ?';
    const params = [destinoId];
    if (activos) {
      query += ' AND activo = 1';
    }
    query += ' ORDER BY nombre ASC';
    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM hoteles WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { nombre, destino_id, direccion, descripcion, estrellas, precio_noche, servicios } = data;
    const [result] = await pool.query(
      `INSERT INTO hoteles (nombre, destino_id, direccion, descripcion, estrellas, precio_noche, servicios) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, destino_id, direccion, descripcion, estrellas, precio_noche, servicios]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { nombre, destino_id, direccion, descripcion, estrellas, precio_noche, servicios, activo } = data;
    await pool.query(
      `UPDATE hoteles SET 
       nombre = COALESCE(?, nombre), destino_id = COALESCE(?, destino_id), direccion = COALESCE(?, direccion), descripcion = COALESCE(?, descripcion), estrellas = COALESCE(?, estrellas), precio_noche = COALESCE(?, precio_noche), servicios = COALESCE(?, servicios), activo = COALESCE(?, activo)
       WHERE id = ?`,
      [nombre, destino_id, direccion, descripcion, estrellas, precio_noche, servicios, activo, id]
    );
  }

  static async delete(id) {
    await pool.query('UPDATE hoteles SET activo = 0 WHERE id = ?', [id]);
  }
}

module.exports = Hotel;
