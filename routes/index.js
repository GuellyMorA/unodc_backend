var express = require('express');
var router = express.Router();

const UsuariosController = require('../controllers').usuarios;
const InstitucioneducativaController = require('../controllers').institucioneducativa;
const JurisdiccionGeograficaController = require('../controllers').jurisdiccionGeografica;
const LugarTipoController = require('../controllers').lugarTipo;
const MedioTransporteTipoController = require('../controllers').medioTransporteTipo;
const GestionTipoController = require('../controllers').gestionTipo;
const GeneroTipoController = require('../controllers').generoTipo;
const EstadoCivilTipoController = require('../controllers').estadoCivilTipo;
const TurnoTipoController = require('../controllers').turnoTipo;
const MesTipoController = require('../controllers').mesTipo;
const PaisTipoController = require('../controllers').paisTipo;
const DepartamentoTipoController = require('../controllers').departamentoTipo;
const GeneralCttpController = require('../controllers').generalCctp;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API Sistema de Información Educativa' });
});
//Rutas para usuario
router.post('/api/auth', UsuariosController.auth);
router.post('/api/change/auth', UsuariosController.changeAuth);

// //Rutas para institucioneducativa
// router.get('/api/institucioneducativa', InstitucioneducativaController.list);
// router.get('/api/institucioneducativa/:id', InstitucioneducativaController.getById);
// router.get('/api/institucioneducativaJg/:jurisdiccion', InstitucioneducativaController.getByJg);

// //Rutas externas
// /*router.post('/out/validar/segip', GeneralCttpController.validarSegip);
// router.get('/out/area/cursos', GeneralCttpController.getAreaCursos);
// router.get('/out/areas', GeneralCttpController.areasCctp);
// router.get('/out/cursos', GeneralCttpController.getCursosSelect);
// router.get('/out/cargo/formacion', GeneralCttpController.getCargoFormacion);
// router.get('/out/genero/estadocivil', GeneralCttpController.getGeneroEstadocivil);
// router.post('/out/buscar/centro', GeneralCttpController.findCentros);
// router.get('/out/detalle/centro/:id', GeneralCttpController.detailCentro);
// router.get('/out/pais', PaisTipoController.getPais);
// router.get('/out/departamento/:pais_tipo_id', DepartamentoTipoController.getDepartamento);
// router.get('/out/lugar/tipo/:nivel/:id', LugarTipoController.getLugarTipo);
// router.post('/out/info', GeneralCttpController.getData);
// */
// //Rutas para jurisdiccionGeografica
// router.get('/api/jurisdiccionGeografica', JurisdiccionGeograficaController.list);
// router.get('/api/jurisdiccionGeografica/:id', JurisdiccionGeograficaController.getById);

// //Rutas para lugarTipo
// router.get('/api/lugarTipo', LugarTipoController.list);
// router.get('/api/lugarTipo/:id', LugarTipoController.getById);

// //Rutas para medioTransporteTipo
// router.get('/api/medioTransporteTipo', MedioTransporteTipoController.list);
// router.get('/api/medioTransporteTipo/:id', MedioTransporteTipoController.getById);

// //Rutas para GestionTipo
// router.get('/api/gestionTipo', GestionTipoController.list);
// router.get('/api/gestionTipo/:id', GestionTipoController.getById);

// //Rutas para GeneroTipoController
// router.get('/api/genero/tipo', GeneroTipoController.list);
// //Rutas para EstadoCivilTipoController
// router.get('/api/estadocivil/tipo', EstadoCivilTipoController.list);

// //Rutas para TurnoTipo
// router.get('/api/turnoTipo', TurnoTipoController.list);
// router.get('/api/turnoTipoBasico', TurnoTipoController.listBasico);
// router.get('/api/turnoTipo/:id', TurnoTipoController.getById);

// //Rutas para MesTipo
// router.get('/api/mesTipo', MesTipoController.list);
// router.get('/api/mesTipo/:id', MesTipoController.getById);

module.exports = router;
