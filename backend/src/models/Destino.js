
const pool = require('../config/database');

class Destino {
  static async findAll(activos = true) {
    let query = 'SELECT * FROM destinos';
    const params = [];
    if (activos) {
      query += ' WHERE activo = 1';
    }
    query += ' ORDER BY destacado DESC, nombre ASC';
    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM destinos WHERE id = ?', [id]);
    return rows[0];
  }

  static async findDestacados() {
    const [rows] = await pool.query('SELECT * FROM destinos WHERE destacado = 1 AND activo = 1 ORDER BY nombre ASC');
    return rows;
  }

  static async create(data) {
    const { nombre, ciudad, departamento, pais, descripcion, historia, clima, mejor_epoca, actividades, lugares_turisticos, transporte, duracion_recomendada, precio_estimado, video_url, destacado } = data;
    const [result] = await pool.query(
      `INSERT INTO destinos (nombre, ciudad, departamento, pais, descripcion, historia, clima, mejor_epoca, actividades, lugares_turisticos, transporte, duracion_recomendada, precio_estimado, video_url, destacado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, ciudad, departamento, pais, descripcion, historia, clima, mejor_epoca, actividades, lugares_turisticos, transporte, duracion_recomendada, precio_estimado, video_url, destacado || 0]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { nombre, ciudad, departamento, pais, descripcion, historia, clima, mejor_epoca, actividades, lugares_turisticos, transporte, duracion_recomendada, precio_estimado, video_url, destacado, activo } = data;
    await pool.query(
      `UPDATE destinos SET 
       nombre = COALESCE(?, nombre), ciudad = COALESCE(?, ciudad), departamento = COALESCE(?, departamento), pais = COALESCE(?, pais), descripcion = COALESCE(?, descripcion), historia = COALESCE(?, historia), clima = COALESCE(?, clima), mejor_epoca = COALESCE(?, mejor_epoca), actividades = COALESCE(?, actividades), lugares_turisticos = COALESCE(?, lugares_turisticos), transporte = COALESCE(?, transporte), duracion_recomendada = COALESCE(?, duracion_recomendada), precio_estimado = COALESCE(?, precio_estimado), video_url = COALESCE(?, video_url), destacado = COALESCE(?, destacado), activo = COALESCE(?, activo)
       WHERE id = ?`,
      [nombre, ciudad, departamento, pais, descripcion, historia, clima, mejor_epoca, actividades, lugares_turisticos, transporte, duracion_recomendada, precio_estimado, video_url, destacado, activo, id]
    );
  }

  static async delete(id) {
    await pool.query('UPDATE destinos SET activo = 0 WHERE id = ?', [id]);
  }
}

module.exports = Destino;
