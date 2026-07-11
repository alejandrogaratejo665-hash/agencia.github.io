
const pool = require('../config/database');

class Vuelo {
  static async findAll(activos = true) {
    let query = 'SELECT * FROM vuelos';
    const params = [];
    if (activos) {
      query += ' WHERE activo = 1';
    }
    query += ' ORDER BY fecha_salida ASC';
    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM vuelos WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { origen, destino, aerolinea, fecha_salida, fecha_llegada, duracion, escalas, precio, asientos_disponibles } = data;
    const [result] = await pool.query(
      `INSERT INTO vuelos (origen, destino, aerolinea, fecha_salida, fecha_llegada, duracion, escalas, precio, asientos_disponibles) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [origen, destino, aerolinea, fecha_salida, fecha_llegada, duracion, escalas || 0, precio, asientos_disponibles]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { origen, destino, aerolinea, fecha_salida, fecha_llegada, duracion, escalas, precio, asientos_disponibles, activo } = data;
    await pool.query(
      `UPDATE vuelos SET 
       origen = COALESCE(?, origen), destino = COALESCE(?, destino), aerolinea = COALESCE(?, aerolinea), fecha_salida = COALESCE(?, fecha_salida), fecha_llegada = COALESCE(?, fecha_llegada), duracion = COALESCE(?, duracion), escalas = COALESCE(?, escalas), precio = COALESCE(?, precio), asientos_disponibles = COALESCE(?, asientos_disponibles), activo = COALESCE(?, activo)
       WHERE id = ?`,
      [origen, destino, aerolinea, fecha_salida, fecha_llegada, duracion, escalas, precio, asientos_disponibles, activo, id]
    );
  }

  static async delete(id) {
    await pool.query('UPDATE vuelos SET activo = 0 WHERE id = ?', [id]);
  }
}

module.exports = Vuelo;
