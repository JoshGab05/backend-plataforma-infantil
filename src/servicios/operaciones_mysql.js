const piscina_conexiones = require('../configuracion/conexion_db');

const insertar_nuevo_infante = async (nombre_recibido, edad_recibida) => {
    const instruccion_sql = 'INSERT INTO estudiantes_infantiles (nombre_completo, edad_anios) VALUES (?, ?)';
    const [resultado_insercion] = await piscina_conexiones.execute(instruccion_sql, [nombre_recibido, edad_recibida]);
    return resultado_insercion.insertId;
};

const guardar_progreso_actividad = async (identificador_infante, identificador_juego, puntaje_alcanzado) => {
    const instruccion_sql = 'INSERT INTO registro_progresos_historico (enlace_infante, enlace_actividad, puntuacion_obtenida) VALUES (?, ?, ?)';
    const [resultado] = await piscina_conexiones.execute(instruccion_sql, [identificador_infante, identificador_juego, puntaje_alcanzado]);
    return resultado.affectedRows;
};

const extraer_tablero_resultados = async () => {
    const instruccion_sql = `
        SELECT 
            e.nombre_completo, 
            e.edad_anios, 
            a.titulo_juego, 
            a.clasificacion_tema, 
            r.puntuacion_obtenida, 
            r.fecha_ejecucion_juego 
        FROM registro_progresos_historico r
        JOIN estudiantes_infantiles e ON r.enlace_infante = e.identificador_infante
        JOIN catalogo_actividades_didacticas a ON r.enlace_actividad = a.codigo_actividad
        ORDER BY r.fecha_ejecucion_juego DESC;
    `;
    const [filas_extraidas] = await piscina_conexiones.execute(instruccion_sql);
    return filas_extraidas;
};

module.exports = {
    insertar_nuevo_infante,
    guardar_progreso_actividad,
    extraer_tablero_resultados
};