const servicios_datos = require('../servicios/operaciones_mysql');

const procesar_puntaje_juego = async (peticion_entrante, respuesta_servidor) => {
    try {
        const { id_infante, id_juego, puntaje } = peticion_entrante.body;
        await servicios_datos.guardar_progreso_actividad(id_infante, id_juego, puntaje);
        respuesta_servidor.status(201).json({ mensaje: 'Puntaje almacenado con éxito en el histórico.' });
    } catch (falla_interna) {
        respuesta_servidor.status(500).json({ error: 'Falla al guardar el progreso.', detalle: falla_interna.message });
    }
};

const consultar_tablero_docente = async (peticion_entrante, respuesta_servidor) => {
    try {
        const listado_completo = await servicios_datos.extraer_tablero_resultados();
        respuesta_servidor.status(200).json({ registros: listado_completo });
    } catch (falla_interna) {
        respuesta_servidor.status(500).json({ error: 'No se pudo generar el reporte del docente.', detalle: falla_interna.message });
    }
};

module.exports = { procesar_puntaje_juego, consultar_tablero_docente };