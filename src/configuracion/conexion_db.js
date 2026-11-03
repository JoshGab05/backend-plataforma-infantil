const motor_mysql = require('mysql2/promise');
require('dotenv').config();

const piscina_conexiones = motor_mysql.createPool({
    host: process.env.BD_HOST,
    port: process.env.BD_PUERTO,
    user: process.env.BD_USUARIO,
    password: process.env.BD_CLAVE,
    database: process.env.BD_NOMBRE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    }
});

const verificar_enlace_bd = async () => {
    try {
        const conexion_activa = await piscina_conexiones.getConnection();
        console.log('Enlace establecido exitosamente con el motor de persistencia MySQL en Aiven.');
        conexion_activa.release();
    } catch (falla_conexion) {
        console.error('Fallo crítico al enlazar con la base de datos:', falla_conexion.message);
    }
};

verificar_enlace_bd();

module.exports = piscina_conexiones;