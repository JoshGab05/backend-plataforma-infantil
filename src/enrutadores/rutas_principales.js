const enrutador_base = require('express').Router();
const gestor_estudiantes = require('../controladores/gestor_estudiantes');
const gestor_juegos = require('../controladores/gestor_juegos');

// Rutas de API REST
enrutador_base.post('/registrar-estudiante', gestor_estudiantes.procesar_registro_infante);
enrutador_base.post('/guardar-resultado', gestor_juegos.procesar_puntaje_juego);
enrutador_base.get('/tablero-docentes', gestor_juegos.consultar_tablero_docente);

module.exports = enrutador_base;