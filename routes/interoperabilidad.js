var express = require('express');
var router = express.Router();
const interopController = require('../controllers').interoperabilidad;

/* GET Interoperabilidad listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'REST Interoperabilidad' });
});

router.get('/unidad/educativa/:rue', interopController.getUnidadEducativa);
router.get('/docente/:rue', interopController.getDocentes);
router.get('/administrativo/:rue', interopController.getAdministrativos);
router.get('/docente/administrativo/:rue', interopController.getDocenteAdministrativo);
router.get('/cursos/:rue', interopController.getCursos);
router.get('/estudiantes/:rue/:turno/:nivel/:grado/:paralelo', interopController.getEstudiantes);
router.post('/estudiante/mochila', interopController.postEstudianteMochila);
router.post('/maestro/mochila', interopController.postMaestroMochila);

module.exports = router;
