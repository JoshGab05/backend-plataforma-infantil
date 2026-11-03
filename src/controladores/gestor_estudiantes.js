const servicios_datos = require('../servicios/operaciones_mysql');

const procesar_registro_infante = async (peticion_entrante, respuesta_servidor) => {
    try {
        const { nombre_completo, edad_anios } = peticion_entrante.body;
        if (!nombre_completo || !edad_anios) {
            return respuesta_servidor.status(400).json({ alerta: 'Faltan credenciales del infante.' });
        }
        
        const identificador_generado = await servicios_datos.insertar_nuevo_infante(nombre_completo, edad_anios);
        respuesta_servidor.status(201).json({ 
            mensaje: 'Infante registrado correctamente.',
            id_asignado: identificador_generado 
        });
    } catch (falla_interna) {
        respuesta_servidor.status(500).json({ error: 'Falla en el motor de base de datos.', detalle: falla_interna.message });
    }
};

module.exports = { procesar_registro_infante };