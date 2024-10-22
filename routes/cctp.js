var express = require('express');
var router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/cctp/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.pdf')//file.originalname
    }
});
const upload = multer({
    storage: storage
});
const TramiteCctpController = require('../controllers/cctp').tramitesCctp;
const GeneralCctpController = require('../controllers/cctp').generalCctp;
const EstadisticaCctpController = require('../controllers/cctp').estadisticaCctp;

router.get('/', function (req, res, next) {
    // res.send('respond with a resource');
    res.render('index', { title: 'API Sistema de Centros de Capacitación Técnica Privados' });
});

// router.post('/apertura/nuevo', TramiteCctpController.aperturaNuevo);
router.get('/areas', GeneralCctpController.areasCctp);
router.post('/guarda/facilitador', GeneralCctpController.createFacilitador);
router.get('/lista/facilitador/:ie_id', GeneralCctpController.listFacilitador);
router.put('/modifica/facilitador/:id', GeneralCctpController.updateFacilitador);
router.delete('/elimina/facilitador/:id', GeneralCctpController.deleteFacilitador);

router.get('/lista/administrativo/:ie_id', GeneralCctpController.listAdministrativo);
router.post('/guarda/administrativo', GeneralCctpController.createAdministrativo);
router.put('/modifica/administrativo/:id', GeneralCctpController.updateAdministrativo);
router.delete('/elimina/administrativo/:id', GeneralCctpController.deleteAdministrativo);

router.get('/lista/propietarios', GeneralCctpController.listPropietario);

router.post('/guarda/centro', TramiteCctpController.createCentro);
router.get('/lista/centros', GeneralCctpController.listCentros);

router.get('/lista/cursos', GeneralCctpController.listCurso);
router.post('/guarda/curso', GeneralCctpController.createCurso);
router.put('/actualiza/curso/:id', GeneralCctpController.updateCurso);
// router.delete('/elimina/curso/:id', GeneralCctpController.deleteCurso);
router.put('/cambia/estado/curso/:id', GeneralCctpController.updateStateCurso);

router.get('/centro/:id', GeneralCctpController.getCentroId);
router.get('/informacion/centro/:id', GeneralCctpController.infoCentro);
router.get('/lista/subcentro/:ie_id', GeneralCctpController.listSubsedes);
router.get('/cursos/facilitadores/:ie_id', GeneralCctpController.listCursoFacilitador);
router.get('/lista/apertura/:lugar', TramiteCctpController.listaSolicitudApertura);
router.get('/obtiene/apertura/:id', TramiteCctpController.obtieneSolicitudApertura);
router.post('/nueva/apertura', TramiteCctpController.nuevaSolicitudApertura);
router.post('/inicio/apertura', TramiteCctpController.inicioTramiteApertura);
router.post('/inicio/apertura/subsede', TramiteCctpController.inicioTramiteAperturaSubsede);
router.post('/verifica/departamental/ape', upload.single('informe_viabilidad'), TramiteCctpController.verificaDepartamentalA);
router.post('/verifica/departamental/mod', upload.single('informe_viabilidad'), TramiteCctpController.verificaDepartamentalM);
router.post('/verifica/nacional', TramiteCctpController.verificaNacional);
router.post('/finaliza/nacional', upload.single('resolucion_ministerial'), TramiteCctpController.finalizaNacional);

router.post('/inicio/modificacion', TramiteCctpController.inicioTramiteModificacion);
router.post('/notifica/departamental', TramiteCctpController.guardaNotificacion);

router.get('/tramite/tipo/:tramite_id', TramiteCctpController.obtieneTramiteTareaTipo);
router.get('/tramite/tarea/:orden/:tramite_id', TramiteCctpController.obtieneTramiteTarea);
router.get('/tramite/tareaobs/:orden/:tramite_id', TramiteCctpController.obtieneTramiteTareaObs);
router.get('/tramite/imprime/:orden/:tramite_id', TramiteCctpController.obtieneTramiteImprime);
router.post('/centro/rcctp', GeneralCctpController.getCentroRcctp);
// router.post('/filtro/nacionalb', TramiteCctpController.filtroNacional);
//router.post('/ratificacion/dde', TramiteCctpController.ratificacionDDE);
//router.post('/ratificacion/dgea', TramiteCctpController.ratificacionDGEA);
router.get('/estadistica/solicitud', EstadisticaCctpController.solicitud);
router.get('/estadistica/tramite/tipo', EstadisticaCctpController.porTramiteTipo);

module.exports = router;
