
const pool = require('../config/database');

class Paquete {
  static async findAll(activos = true) {
    let query = 'SELECT * FROM paquetes';
    const params = [];
    if (activos) {
      query += ' WHERE activo = 1';
    }
    query += ' ORDER BY destacado DESC, nombre ASC';
    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM paquetes WHERE id = ?', [id]);
    return rows[0];
  }

  static async findDestacados() {
    const [rows] = await pool.query('SELECT * FROM paquetes WHERE destacado = 1 AND activo = 1 ORDER BY nombre ASC');
    return rows;
  }

  static async create(data) {
    const { nombre, descripcion, itinerario, incluye, no_incluye, destino_id, precio, descuento, duracion_dias, max_personas, destacado } = data;
    const [result] = await pool.query(
      `INSERT INTO paquetes (nombre, descripcion, itinerario, incluye, no_incluye, destino_id, precio, descuento, duracion_dias, max_personas, destacado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, descripcion, itinerario, incluye, no_incluye, destino_id, precio, descuento || 0, duracion_dias, max_personas, destacado || 0]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { nombre, descripcion, itinerario, incluye, no_incluye, destino_id, precio, descuento, duracion_dias, max_personas, destacado, activo } = data;
    await pool.query(
      `UPDATE paquetes SET 
       nombre = COALESCE(?, nombre), descripcion = COALESCE(?, descripcion), itinerario = COALESCE(?, itinerario), incluye = COALESCE(?, incluye), no_incluye = COALESCE(?, no_incluye), destino_id = COALESCE(?, destino_id), precio = COALESCE(?, precio), descuento = COALESCE(?, descuento), duracion_dias = COALESCE(?, duracion_dias), max_personas = COALESCE(?, max_personas), destacado = COALESCE(?, destacado), activo = COALESCE(?, activo)
       WHERE id = ?`,
      [nombre, descripcion, itinerario, incluye, no_incluye, destino_id, precio, descuento, duracion_dias, max_personas, destacado, activo, id]
    );
  }

  static async delete(id) {
    await pool.query('UPDATE paquetes SET activo = 0 WHERE id = ?', [id]);
  }
}

module.exports = Paquete;
