var express = require('express');
var router = express.Router();
const tramiteController = require('../controllers/wftramite').wftramites;

router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('index', { title: 'API WorkFlow Trámites' });
});

router.post('/inicio', tramiteController.index);
router.post('/lista', tramiteController.lista);
router.post('/nuevo', tramiteController.nuevo);
router.post('/recibido/guardar', tramiteController.recibidosGuardar);
router.post('/recibido/enviar', tramiteController.recibidosEnviar);
router.post('/reporte/formulario', tramiteController.reporteFormulario);
router.post('/recibido/detalle', tramiteController.recibidosDetalle);
router.post('/recibido/derivar/usuario', tramiteController.recibidosDerivarUsuario);//en proceso, parte usuarios
router.post('/recibido/derivar/guardar', tramiteController.recibidosDerivarGuardar);
/* router.post('/nuevo', tramiteController.guardarTramiteNuevo);
router.post('/recibido', tramiteController.guardarTramiteRecibido);
router.post('/enviado', tramiteController.guardarTramiteNuevo); */

module.exports = router;
