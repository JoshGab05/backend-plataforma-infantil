const marco_express = require('express');
const modulo_cors = require('cors');
require('dotenv').config();

require('./configuracion/conexion_db');

const servidor_api = marco_express();
const puerto_asignado = process.env.PUERTO_SERVIDOR || 3001;

servidor_api.use(modulo_cors({
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

servidor_api.use(marco_express.json());

const rutas_gestor = require('./enrutadores/rutas_principales');
servidor_api.use('/api/v1/plataforma-infantil', rutas_gestor);

servidor_api.use((peticion_entrante, respuesta_servidor) => {
    respuesta_servidor.status(404).json({
        estado_operacion: 'rechazado',
        motivo: 'El recurso solicitado no existe en la arquitectura del backend.'
    });
});

servidor_api.listen(puerto_asignado, () => {
    console.log(`Motor de backend operativo y escuchando tráfico en el puerto ${puerto_asignado}`);
});