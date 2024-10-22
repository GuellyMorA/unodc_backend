var express = require('express');
var router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/uegg/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.pdf')//file.originalname
    }
});
const upload = multer({
    storage: storage
});

/*
const ueggPcpaUnidadEducativaController      =  require('../controllers/uegg/ueggPcpaUnidadEducativa');
const UeggPcpaConstruccionController        =  require('../controllers/uegg/ueggPcpaConstruccion');
const UeggPcpaComisionTipoController        =  require('../controllers/uegg/ueggPcpaComisionTipo');
const UeggViolenciaDnaController            =  require('../controllers/uegg/ueggViolenciaDna');
*/



const ueggEmbEstudianteDerechosController    =  require('../controllers/uegg/ueggEmbEstudianteDerechos');
const ueggEmbEstudianteDerechosSegController    =  require('../controllers/uegg/ueggEmbEstudianteDerechosSeg');
const ueggEmbEstudianteEmbarazoController    =  require('../controllers/uegg/ueggEmbEstudianteEmbarazo');
const ueggEmbInformeEmbarazoController    =  require('../controllers/uegg/ueggEmbInformeEmbarazo');
const ueggEmbReporteEmbarazoTipoController    =  require('../controllers/uegg/ueggEmbReporteEmbarazoTipo');
const ueggPcpaAcccionesEjecucionController    =  require('../controllers/uegg/ueggPcpaAcccionesEjecucion');



const ueggPcpaActividadesEjecutadasController    =  require('../controllers/uegg/ueggPcpaActividadesEjecutadas');
const ueggPcpaActividadesEjecutadasDelController    =  require('../controllers/uegg/ueggPcpaActividadesEjecutadas');

const ueggPcpaActividadesPromocionController    =  require('../controllers/uegg/ueggPcpaActividadesPromocion');
const ueggPcpaActividadesPromocionDelController    =  require('../controllers/uegg/ueggPcpaActividadesPromocion');

const ueggPcpaActividadesTipoController    =  require('../controllers/uegg/ueggPcpaActividadesTipo');
const ueggPcpaActividadesTipoDetController    =  require('../controllers/uegg/ueggPcpaActividadesTipoDet');
const ueggPcpaComisionTipoController    =  require('../controllers/uegg/ueggPcpaComisionTipo');
const ueggPcpaConstruccionController    =  require('../controllers/uegg/ueggPcpaConstruccion');
const ueggPcpaConstruccionDelController    =  require('../controllers/uegg/ueggPcpaConstruccion');


const ueggPcpaIndicadoresEjecucionController    =  require('../controllers/uegg/ueggPcpaIndicadoresEjecucion');
const ueggPcpaIndicadoresTipoController    =  require('../controllers/uegg/ueggPcpaIndicadoresTipo');
const ueggPcpaMiembroComisionController    =  require('../controllers/uegg/ueggPcpaMiembroComision');
const ueggPcpaMiembroComisionDelController    =  require('../controllers/uegg/ueggPcpaMiembroComision');

const ueggPcpaMiembroTipoController    =  require('../controllers/uegg/ueggPcpaMiembroTipo');
const ueggPcpaReporteEmbarazoTipoController    =  require('../controllers/uegg/ueggPcpaReporteEmbarazoTipo');
const ueggPcpaUnidadEducativaController    =  require('../controllers/uegg/ueggPcpaUnidadEducativa');
const ueggViolenciaAccionesTipoController    =  require('../controllers/uegg/ueggViolenciaAccionesTipo');
const ueggViolenciaAgresorController    =  require('../controllers/uegg/ueggViolenciaAgresor');
const ueggViolenciaAutoFinalTipoController    =  require('../controllers/uegg/ueggViolenciaAutoFinalTipo');
const ueggViolenciaAutoInicialTipoController    =  require('../controllers/uegg/ueggViolenciaAutoInicialTipo');
const ueggViolenciaCasoAgresorController    =  require('../controllers/uegg/ueggViolenciaCasoAgresor');
const ueggViolenciaCasoComController    =  require('../controllers/uegg/ueggViolenciaCasoCom');
const ueggViolenciaCasoDnaController    =  require('../controllers/uegg/ueggViolenciaCasoDna');
const ueggViolenciaComDistController    =  require('../controllers/uegg/ueggViolenciaComDist');
const ueggViolenciaComDptalController    =  require('../controllers/uegg/ueggViolenciaComDptal');
const ueggViolenciaDnaController    =  require('../controllers/uegg/ueggViolenciaDna');
const ueggViolenciaEtapaPreliminarTipoController    =  require('../controllers/uegg/ueggViolenciaEtapaPreliminarTipo');
const ueggViolenciaEtapaPreparatoriaTipoController    =  require('../controllers/uegg/ueggViolenciaEtapaPreparatoriaTipo');
const ueggViolenciaHechoTipoController    =  require('../controllers/uegg/ueggViolenciaHechoTipo');
const ueggViolenciaInstanciaTipoController    =  require('../controllers/uegg/ueggViolenciaInstanciaTipo');
const ueggViolenciaJuicioAcFormalTipoController    =  require('../controllers/uegg/ueggViolenciaJuicioAcFormalTipo');
const ueggViolenciaOtrasFormTipoController    =  require('../controllers/uegg/ueggViolenciaOtrasFormTipo');
const ueggViolenciaProceSegDsController    =  require('../controllers/uegg/ueggViolenciaProceSegDs');
const ueggViolenciaQDenunciaTipoController    =  require('../controllers/uegg/ueggViolenciaQDenunciaTipo');
const ueggViolenciaRecJuTipoController    =  require('../controllers/uegg/ueggViolenciaRecJuTipo');
const ueggViolenciaRecRevTipoController    =  require('../controllers/uegg/ueggViolenciaRecRevTipo');
const ueggViolenciaSancionTipoController    =  require('../controllers/uegg/ueggViolenciaSancionTipo');
const ueggViolenciaSegDsController    =  require('../controllers/uegg/ueggViolenciaSegDs');
const ueggViolenciaSegInfraccionController    =  require('../controllers/uegg/ueggViolenciaSegInfraccion');
const ueggViolenciaSegSancionesController    =  require('../controllers/uegg/ueggViolenciaSegSanciones');
const ueggViolenciaSegSancionesDelController    =  require('../controllers/uegg/ueggViolenciaSegSancionesDel');
const ueggViolenciaVictimaController    =  require('../controllers/uegg/ueggViolenciaVictima');





router.get('/', function (req, res, next) {
    // res.send('respond with a resource');
    res.render('index', { title: 'API Sistema de Centros de Capacitación Técnica Privados' });
});



/*
router.get('/ueggPcpaConstruccion'          , UeggPcpaConstruccionController.list);
router.get('/ueggPcpaComisionTipo'          , UeggPcpaComisionTipoController.list);

router.get('/ueggPcpaUnidadEducativa'        , ueggPcpaUnidadEducativaController.list);
router.get('/ueggPcpaUnidadEducativa/:id'    , ueggPcpaUnidadEducativaController.getById);
router.post('/ueggPcpaUnidadEducativa'       , ueggPcpaUnidadEducativaController.add);
router.put('/ueggPcpaUnidadEducativa/:Id'    , ueggPcpaUnidadEducativaController.update);
router.delete('/ueggPcpaUnidadEducativa/:Id' , ueggPcpaUnidadEducativaController.delete);

router.get('/ueggViolenciaDna'              , UeggViolenciaDnaController.list);
router.get('/ueggViolenciaAccionesTipo'     , UeggViolenciaAccionesTipoController.list);
*/


router.get('/ueggEmbEstudianteDerechos',             ueggEmbEstudianteDerechosController.list);                                                                        
router.get('/ueggEmbEstudianteDerechosSeg',          ueggEmbEstudianteDerechosSegController.list);                                                                        
router.get('/ueggEmbEstudianteEmbarazo',             ueggEmbEstudianteEmbarazoController.list);                                                                        
router.get('/ueggEmbInformeEmbarazo',                ueggEmbInformeEmbarazoController.list);                                                                        
router.get('/ueggEmbReporteEmbarazoTipo',            ueggEmbReporteEmbarazoTipoController.list);    

router.get('/ueggPcpaAcccionesEjecucion',            ueggPcpaAcccionesEjecucionController.list);                                                                        
router.get('/ueggPcpaActividadesEjecutadas',         ueggPcpaActividadesEjecutadasController.list);    
router.get('/ueggPcpaActividadesEjecutadasList/:id', ueggPcpaActividadesEjecutadasController.listActividadesEjecutadas);    

router.get('/ueggPcpaActividadesPromocion',          ueggPcpaActividadesPromocionController.list);
router.get('/ueggPcpaActividadesPromocionList/:id',  ueggPcpaActividadesPromocionController.listActividadesPromocion);   

router.get('/ueggPcpaActividadesTipo',               ueggPcpaActividadesTipoController.list);                                                                        
router.get('/ueggPcpaActividadesTipoDet',            ueggPcpaActividadesTipoDetController.list);                                                                        
router.get('/ueggPcpaComisionTipo',                  ueggPcpaComisionTipoController.list);                                                                        
router.get('/ueggPcpaConstruccion',                  ueggPcpaConstruccionController.list);
router.get('/ueggPcpaConstruccion/:id',              ueggPcpaConstruccionController.getByUnidadEducativa);                                                                       
router.get('/ueggPcpaIndicadoresEjecucion',          ueggPcpaIndicadoresEjecucionController.list);                                                                        
router.get('/ueggPcpaIndicadoresTipo',               ueggPcpaIndicadoresTipoController.list);    



router.get('/ueggPcpaMiembroTipo',                   ueggPcpaMiembroTipoController.list);                                                                        
router.get('/ueggPcpaReporteEmbarazoTipo',           ueggPcpaReporteEmbarazoTipoController.list);                                                                        
router.get('/ueggPcpaUnidadEducativa',               ueggPcpaUnidadEducativaController.list);                                                                        
router.get('/ueggViolenciaAccionesTipo',             ueggViolenciaAccionesTipoController.list);                                                                        
router.get('/ueggViolenciaAgresor',                  ueggViolenciaAgresorController.list);                                                                        
router.get('/ueggViolenciaAutoFinalTipo',            ueggViolenciaAutoFinalTipoController.list);                                                                        
router.get('/ueggViolenciaAutoInicialTipo',          ueggViolenciaAutoInicialTipoController.list);                                                                        
router.get('/ueggViolenciaCasoAgresor',              ueggViolenciaCasoAgresorController.list);                                                                         
router.get('/ueggViolenciaCasoAgresor/caso/:numero', ueggViolenciaCasoAgresorController.getByCaso);            // MODIFICADO 20241001                                                             
router.get('/ueggViolenciaCasoAgresor/caso/:numero', ueggViolenciaCasoAgresorController.getByCaso);                       // MODIFICADO 20241001                                         
router.get('/ueggViolenciaCasoAgresor/caso/detalle/:numero', ueggViolenciaCasoAgresorController.getByCasoDetalle);              // MODIFICADO 20241001                                                          
router.get('/ueggViolenciaCasoAgresor/rude/:rude',   ueggViolenciaCasoAgresorController.getByRude);                // MODIFICADO 20241001                                                   
router.get('/ueggViolenciaCasoAgresor/rda/:rda',     ueggViolenciaCasoAgresorController.getByRda);                 // MODIFICADO 20241001                                                       
  
router.get('/ueggViolenciaCasoCom',                  ueggViolenciaCasoComController.list);                                                                        
router.get('/ueggViolenciaCasoDna',                  ueggViolenciaCasoDnaController.list);                                                                        
router.get('/ueggViolenciaComDist',                  ueggViolenciaComDistController.list);                                                                        
router.get('/ueggViolenciaComDptal',                 ueggViolenciaComDptalController.list);                                                                        
router.get('/ueggViolenciaDna',                      ueggViolenciaDnaController.list);                                                                        
router.get('/ueggViolenciaEtapaPreliminarTipo',      ueggViolenciaEtapaPreliminarTipoController.list);                                                                        
router.get('/ueggViolenciaEtapaPreparatoriaTipo',    ueggViolenciaEtapaPreparatoriaTipoController.list);                                                                        
router.get('/ueggViolenciaHechoTipo',                ueggViolenciaHechoTipoController.list);                                                                        
router.get('/ueggViolenciaInstanciaTipo',            ueggViolenciaInstanciaTipoController.list);                                                                        
router.get('/ueggViolenciaJuicioAcFormalTipo',       ueggViolenciaJuicioAcFormalTipoController.list);                                                                        
router.get('/ueggViolenciaOtrasFormTipo',            ueggViolenciaOtrasFormTipoController.list);                                                                        
router.get('/ueggViolenciaProceSegDs',               ueggViolenciaProceSegDsController.list);                                                                        
router.get('/ueggViolenciaQDenunciaTipo',            ueggViolenciaQDenunciaTipoController.list);                                                                        
router.get('/ueggViolenciaRecJuTipo',                ueggViolenciaRecJuTipoController.list);                                                                        
router.get('/ueggViolenciaRecRevTipo',               ueggViolenciaRecRevTipoController.list);                                                                        
router.get('/ueggViolenciaSancionTipo',              ueggViolenciaSancionTipoController.list);                                                                        
router.get('/ueggViolenciaSegDs',                    ueggViolenciaSegDsController.list);                                                                        
router.get('/ueggViolenciaSegInfraccion',            ueggViolenciaSegInfraccionController.list);                                                                        
router.get('/ueggViolenciaSegSanciones',             ueggViolenciaSegSancionesController.list);                                                                        
router.get('/ueggViolenciaSegSancionesDel',          ueggViolenciaSegSancionesDelController.list);                                                                        
router.get('/ueggViolenciaVictima',                  ueggViolenciaVictimaController.list);                                                           
router.get('/ueggEmbEstudianteEmbarazo/:rude',       ueggEmbEstudianteEmbarazoController.getByRude);                                                                      
router.get('/ueggViolenciaVictima/rda/:rda',         ueggViolenciaVictimaController.getByRda);                                                                      
router.get('/ueggViolenciaVictima/rude/:rude',       ueggViolenciaVictimaController.getByRude);                                                                        
router.get('/ueggViolenciaAgresor/rda/:rda',         ueggViolenciaAgresorController.getByRda);                                                                  
router.get('/ueggViolenciaAgresor/rude/:rude',       ueggViolenciaAgresorController.getByRude);               


router.post('/ueggEmbEstudianteDerechos',             ueggEmbEstudianteDerechosController.add);                                                                        
router.post('/ueggEmbEstudianteDerechosSeg',          ueggEmbEstudianteDerechosSegController.add);                                                                        
router.post('/ueggEmbEstudianteEmbarazo',             ueggEmbEstudianteEmbarazoController.add);                                                                               
router.post('/ueggEmbInformeEmbarazo',                ueggEmbInformeEmbarazoController.add);                                                                        
router.post('/ueggEmbReporteEmbarazoTipo',            ueggEmbReporteEmbarazoTipoController.add);                                                                        
router.post('/ueggPcpaAcccionesEjecucion',            ueggPcpaAcccionesEjecucionController.add);                                                                        
router.post('/ueggPcpaActividadesEjecutadas',         ueggPcpaActividadesEjecutadasController.add);                                                                        
router.post('/ueggPcpaActividadesPromocion',          ueggPcpaActividadesPromocionController.add);                                                                        
router.post('/ueggPcpaActividadesTipo',               ueggPcpaActividadesTipoController.add);                                                                        
router.post('/ueggPcpaActividadesTipoDet',            ueggPcpaActividadesTipoDetController.add);                                                                        
router.post('/ueggPcpaComisionTipo',                  ueggPcpaComisionTipoController.add);                                                                        
router.post('/ueggPcpaConstruccion',                  ueggPcpaConstruccionController.add);                                                                        
router.post('/ueggPcpaIndicadoresEjecucion',          ueggPcpaIndicadoresEjecucionController.add);                                                                        
router.post('/ueggPcpaIndicadoresTipo',               ueggPcpaIndicadoresTipoController.add);                                                                        
router.post('/ueggPcpaMiembroComision',               ueggPcpaMiembroComisionController.add);                                                                        
router.post('/ueggPcpaMiembroTipo',                   ueggPcpaMiembroTipoController.add);                                                                        
//router.post('/ueggPcpaReporteEmbarazoTipo',           ueggPcpaReporteEmbarazoTipoController.add);                                                                        
router.post('/ueggPcpaUnidadEducativa',                ueggPcpaUnidadEducativaController.add);                                                                        
router.post('/ueggViolenciaAccionesTipo',             ueggViolenciaAccionesTipoController.add);                                                                        
router.post('/ueggViolenciaAgresor',                  ueggViolenciaAgresorController.add);                                                                        
router.post('/ueggViolenciaAutoFinalTipo',            ueggViolenciaAutoFinalTipoController.add);                                                                        
router.post('/ueggViolenciaAutoInicialTipo',          ueggViolenciaAutoInicialTipoController.add);                                                                        
router.post('/ueggViolenciaCasoAgresor',              ueggViolenciaCasoAgresorController.add);                                                                        
router.post('/ueggViolenciaCasoCom',                  ueggViolenciaCasoComController.add);                                                                        
router.post('/ueggViolenciaCasoDna',                  ueggViolenciaCasoDnaController.add);                                                                        
router.post('/ueggViolenciaComDist',                  ueggViolenciaComDistController.add);                                                                        
router.post('/ueggViolenciaComDptal',                 ueggViolenciaComDptalController.add);                                                                        
router.post('/ueggViolenciaDna',                      ueggViolenciaDnaController.add);                                                                        
router.post('/ueggViolenciaEtapaPreliminarTipo',      ueggViolenciaEtapaPreliminarTipoController.add);                                                                        
router.post('/ueggViolenciaEtapaPreparatoriaTipo',    ueggViolenciaEtapaPreparatoriaTipoController.add);                                                                        
router.post('/ueggViolenciaHechoTipo',                ueggViolenciaHechoTipoController.add);                                                                        
router.post('/ueggViolenciaInstanciaTipo',            ueggViolenciaInstanciaTipoController.add);                                                                        
router.post('/ueggViolenciaJuicioAcFormalTipo',       ueggViolenciaJuicioAcFormalTipoController.add);                                                                        
router.post('/ueggViolenciaOtrasFormTipo',            ueggViolenciaOtrasFormTipoController.add);                                                                        
router.post('/ueggViolenciaProceSegDs',               ueggViolenciaProceSegDsController.add);                                                                        
router.post('/ueggViolenciaQDenunciaTipo',            ueggViolenciaQDenunciaTipoController.add);                                                                        
router.post('/ueggViolenciaRecJuTipo',                ueggViolenciaRecJuTipoController.add);                                                                        
router.post('/ueggViolenciaRecRevTipo',               ueggViolenciaRecRevTipoController.add);                                                                        
router.post('/ueggViolenciaSancionTipo',              ueggViolenciaSancionTipoController.add);                                                                        
router.post('/ueggViolenciaSegDs',                    ueggViolenciaSegDsController.add);                                                                        
router.post('/ueggViolenciaSegInfraccion',            ueggViolenciaSegInfraccionController.add);                                                                        
router.post('/ueggViolenciaSegSanciones',             ueggViolenciaSegSancionesController.add);                                                                        
router.post('/ueggViolenciaSegSancionesDel',          ueggViolenciaSegSancionesDelController.add);                                                                        
router.post('/ueggViolenciaVictima',                  ueggViolenciaVictimaController.add);                                                                        


router.get('/ueggEmbEstudianteDerechos/:id',             ueggEmbEstudianteDerechosController.getById);                                                                        
router.get('/ueggEmbEstudianteDerechosSeg/:id',          ueggEmbEstudianteDerechosSegController.getById);                                                                        
router.get('/ueggEmbEstudianteEmbarazo/:id',             ueggEmbEstudianteEmbarazoController.getById);                                                                        
router.get('/ueggEmbInformeEmbarazo/:id',                ueggEmbInformeEmbarazoController.getById);                                                                        
router.get('/ueggEmbReporteEmbarazoTipo/:id',            ueggEmbReporteEmbarazoTipoController.getById);                                                                        
router.get('/ueggPcpaAcccionesEjecucion/:id',            ueggPcpaAcccionesEjecucionController.getById);                                                                        
router.get('/ueggPcpaActividadesEjecutadas/:id',         ueggPcpaActividadesEjecutadasController.getById);                                                                        
router.get('/ueggPcpaActividadesPromocion/:id',          ueggPcpaActividadesPromocionController.getById);                                                                        
router.get('/ueggPcpaActividadesTipo/:id',               ueggPcpaActividadesTipoController.getById);                                                                        
router.get('/ueggPcpaActividadesTipoDet/:id',            ueggPcpaActividadesTipoDetController.getById);                                                                        
router.get('/ueggPcpaComisionTipo/:id',                  ueggPcpaComisionTipoController.getById);                                                                        
router.get('/ueggPcpaConstruccion/:id',                  ueggPcpaConstruccionController.getById);                                                                        
router.get('/ueggPcpaIndicadoresEjecucion/:id',          ueggPcpaIndicadoresEjecucionController.getById);                                                                        
router.get('/ueggPcpaIndicadoresTipo/:id',               ueggPcpaIndicadoresTipoController.getById);                                                                        
router.get('/ueggPcpaMiembroComision/:id',               ueggPcpaMiembroComisionController.getById);    
                                                                    
router.get('/ueggPcpaMiembroComision',               ueggPcpaMiembroComisionController.list); 
router.get('/ueggPcpaMiembroComisionList/:id',       ueggPcpaMiembroComisionController.listMiembrosComision);   


router.get('/ueggPcpaMiembroTipo/:id',                   ueggPcpaMiembroTipoController.getById);                                                                        
router.get('/ueggPcpaReporteEmbarazoTipo/:id',           ueggPcpaReporteEmbarazoTipoController.getById);                                                                        
router.get('/ueggPcpaUnidadEducativa/:id',                ueggPcpaUnidadEducativaController.getById);                                                                        
router.get('/ueggViolenciaAccionesTipo/:id',             ueggViolenciaAccionesTipoController.getById);                                                                        
router.get('/ueggViolenciaAgresor/:id',                  ueggViolenciaAgresorController.getById);                                                                        
router.get('/ueggViolenciaAutoFinalTipo/:id',            ueggViolenciaAutoFinalTipoController.getById);                                                                        
router.get('/ueggViolenciaAutoInicialTipo/:id',          ueggViolenciaAutoInicialTipoController.getById);                                                                        
router.get('/ueggViolenciaCasoAgresor/:id',              ueggViolenciaCasoAgresorController.getById);                                                                        
router.get('/ueggViolenciaCasoCom/:id',                  ueggViolenciaCasoComController.getById);                                                                        
router.get('/ueggViolenciaCasoDna/:id',                  ueggViolenciaCasoDnaController.getById);                                                                        
router.get('/ueggViolenciaComDist/:id',                  ueggViolenciaComDistController.getById);                                                                        
router.get('/ueggViolenciaComDptal/:id',                 ueggViolenciaComDptalController.getById);                                                                        
router.get('/ueggViolenciaDna/:id',                      ueggViolenciaDnaController.getById);                                                                        
router.get('/ueggViolenciaEtapaPreliminarTipo/:id',      ueggViolenciaEtapaPreliminarTipoController.getById);                                                                        
router.get('/ueggViolenciaEtapaPreparatoriaTipo/:id',    ueggViolenciaEtapaPreparatoriaTipoController.getById);                                                                        
router.get('/ueggViolenciaHechoTipo/:id',                ueggViolenciaHechoTipoController.getById);                                                                        
router.get('/ueggViolenciaInstanciaTipo/:id',            ueggViolenciaInstanciaTipoController.getById);                                                                        
router.get('/ueggViolenciaJuicioAcFormalTipo/:id',       ueggViolenciaJuicioAcFormalTipoController.getById);                                                                        
router.get('/ueggViolenciaOtrasFormTipo/:id',            ueggViolenciaOtrasFormTipoController.getById);                                                                        
router.get('/ueggViolenciaProceSegDs/:id',               ueggViolenciaProceSegDsController.getById);                                                                        
router.get('/ueggViolenciaQDenunciaTipo/:id',            ueggViolenciaQDenunciaTipoController.getById);                                                                        
router.get('/ueggViolenciaRecJuTipo/:id',                ueggViolenciaRecJuTipoController.getById);                                                                        
router.get('/ueggViolenciaRecRevTipo/:id',               ueggViolenciaRecRevTipoController.getById);                                                                        
router.get('/ueggViolenciaSancionTipo/:id',              ueggViolenciaSancionTipoController.getById);                                                                        
router.get('/ueggViolenciaSegDs/:id',                    ueggViolenciaSegDsController.getById);                                                                        
router.get('/ueggViolenciaSegInfraccion/:id',            ueggViolenciaSegInfraccionController.getById);                                                                        
router.get('/ueggViolenciaSegSanciones/:id',             ueggViolenciaSegSancionesController.getById);                                                                        
router.get('/ueggViolenciaSegSancionesDel/:id',          ueggViolenciaSegSancionesDelController.getById);                                                                        
router.get('/ueggViolenciaVictima/:id',                  ueggViolenciaVictimaController.getById); 


router.put('/ueggEmbEstudianteDerechos/:id',             ueggEmbEstudianteDerechosController.update);                                                                        
router.put('/ueggEmbEstudianteDerechosSeg/:id',          ueggEmbEstudianteDerechosSegController.update);                                                                        
router.put('/ueggEmbEstudianteEmbarazo/:id',             ueggEmbEstudianteEmbarazoController.update);                                                                        
router.put('/ueggEmbInformeEmbarazo/:id',                ueggEmbInformeEmbarazoController.update);                                                                        
router.put('/ueggEmbReporteEmbarazoTipo/:id',            ueggEmbReporteEmbarazoTipoController.update);                                                                        
router.put('/ueggPcpaAcccionesEjecucion/:id',            ueggPcpaAcccionesEjecucionController.update);  



router.put('/ueggPcpaActividadesEjecutadas/:id',         ueggPcpaActividadesEjecutadasController.update);  
router.put('/ueggPcpaActividadesEjecutadasDel/:id',         ueggPcpaActividadesEjecutadasDelController.deleteLogico);  



router.put('/ueggPcpaActividadesPromocion/:id',          ueggPcpaActividadesPromocionController.update);   
router.put('/ueggPcpaActividadesPromocionDel/:id',       ueggPcpaActividadesPromocionDelController.deleteLogico); 

router.put('/ueggPcpaActividadesTipo/:id',               ueggPcpaActividadesTipoController.update);                                                                        
router.put('/ueggPcpaActividadesTipoDet/:id',            ueggPcpaActividadesTipoDetController.update);                                                                        
router.put('/ueggPcpaComisionTipo/:id',                  ueggPcpaComisionTipoController.update);                                                                        
router.put('/ueggPcpaConstruccion/:id',                  ueggPcpaConstruccionController.update);                                                                        
router.put('/ueggPcpaConstruccionDel/:id',               ueggPcpaConstruccionDelController.deleteLogico); 


router.put('/ueggPcpaIndicadoresEjecucion/:id',          ueggPcpaIndicadoresEjecucionController.update);                                                                        
router.put('/ueggPcpaIndicadoresTipo/:id',               ueggPcpaIndicadoresTipoController.update);                                                                        
router.put('/ueggPcpaMiembroComision/:id',               ueggPcpaMiembroComisionController.update);  
router.put('/ueggPcpaMiembroComisionDel/:id',            ueggPcpaMiembroComisionDelController.deleteLogico); 


router.put('/ueggPcpaMiembroTipo/:id',                   ueggPcpaMiembroTipoController.update);                                                                        
//router.put('/ueggPcpaReporteEmbarazoTipo/:id',           ueggPcpaReporteEmbarazoTipoController.update);                                                                        
router.put('/ueggPcpaUnidadEducativa/:id',                ueggPcpaUnidadEducativaController.update);                                                                        
router.put('/ueggViolenciaAccionesTipo/:id',             ueggViolenciaAccionesTipoController.update);                                                                        
router.put('/ueggViolenciaAgresor/:id',                  ueggViolenciaAgresorController.update);                                                                        
router.put('/ueggViolenciaAutoFinalTipo/:id',            ueggViolenciaAutoFinalTipoController.update);                                                                        
router.put('/ueggViolenciaAutoInicialTipo/:id',          ueggViolenciaAutoInicialTipoController.update);                                                                        
router.put('/ueggViolenciaCasoAgresor/:id',              ueggViolenciaCasoAgresorController.update);                                                                        
router.put('/ueggViolenciaCasoCom/:id',                  ueggViolenciaCasoComController.update);                                                                        
router.put('/ueggViolenciaCasoDna/:id',                  ueggViolenciaCasoDnaController.update);                                                                        
router.put('/ueggViolenciaComDist/:id',                  ueggViolenciaComDistController.update);                                                                        
router.put('/ueggViolenciaComDptal/:id',                 ueggViolenciaComDptalController.update);                                                                        
router.put('/ueggViolenciaDna/:id',                      ueggViolenciaDnaController.update);                                                                        
router.put('/ueggViolenciaEtapaPreliminarTipo/:id',      ueggViolenciaEtapaPreliminarTipoController.update);                                                                        
router.put('/ueggViolenciaEtapaPreparatoriaTipo/:id',    ueggViolenciaEtapaPreparatoriaTipoController.update);                                                                        
router.put('/ueggViolenciaHechoTipo/:id',                ueggViolenciaHechoTipoController.update);                                                                        
router.put('/ueggViolenciaInstanciaTipo/:id',            ueggViolenciaInstanciaTipoController.update);                                                                        
router.put('/ueggViolenciaJuicioAcFormalTipo/:id',       ueggViolenciaJuicioAcFormalTipoController.update);                                                                        
router.put('/ueggViolenciaOtrasFormTipo/:id',            ueggViolenciaOtrasFormTipoController.update);                                                                        
router.put('/ueggViolenciaProceSegDs/:id',               ueggViolenciaProceSegDsController.update);                                                                        
router.put('/ueggViolenciaQDenunciaTipo/:id',            ueggViolenciaQDenunciaTipoController.update);                                                                        
router.put('/ueggViolenciaRecJuTipo/:id',                ueggViolenciaRecJuTipoController.update);                                                                        
router.put('/ueggViolenciaRecRevTipo/:id',               ueggViolenciaRecRevTipoController.update);                                                                        
router.put('/ueggViolenciaSancionTipo/:id',              ueggViolenciaSancionTipoController.update);                                                                        
router.put('/ueggViolenciaSegDs/:id',                    ueggViolenciaSegDsController.update);                                                                        
router.put('/ueggViolenciaSegInfraccion/:id',            ueggViolenciaSegInfraccionController.update);                                                                        
router.put('/ueggViolenciaSegSanciones/:id',             ueggViolenciaSegSancionesController.update);                                                                        
router.put('/ueggViolenciaSegSancionesDel/:id',          ueggViolenciaSegSancionesDelController.update);                                                                        
router.put('/ueggViolenciaVictima/:id',                  ueggViolenciaVictimaController.update);   



router.delete('/ueggEmbEstudianteDerechos/:id',             ueggEmbEstudianteDerechosController.delete);                                                                        
router.delete('/ueggEmbEstudianteDerechosSeg/:id',          ueggEmbEstudianteDerechosSegController.delete);                                                                        
router.delete('/ueggEmbEstudianteEmbarazo/:id',             ueggEmbEstudianteEmbarazoController.delete);                                                                        
router.delete('/ueggEmbInformeEmbarazo/:id',                ueggEmbInformeEmbarazoController.delete);                                                                        
router.delete('/ueggEmbReporteEmbarazoTipo/:id',            ueggEmbReporteEmbarazoTipoController.delete);                                                                        
router.delete('/ueggPcpaAcccionesEjecucion/:id',            ueggPcpaAcccionesEjecucionController.delete);                                                                        
router.delete('/ueggPcpaActividadesEjecutadas/:id',         ueggPcpaActividadesEjecutadasController.delete);                                                                        
router.delete('/ueggPcpaActividadesPromocion/:id',          ueggPcpaActividadesPromocionController.delete);                                                                        
router.delete('/ueggPcpaActividadesTipo/:id',               ueggPcpaActividadesTipoController.delete);                                                                        
router.delete('/ueggPcpaActividadesTipoDet/:id',            ueggPcpaActividadesTipoDetController.delete);                                                                        
router.delete('/ueggPcpaComisionTipo/:id',                  ueggPcpaComisionTipoController.delete);                                                                        
router.delete('/ueggPcpaConstruccion/:id',                  ueggPcpaConstruccionController.delete);                                                                        
router.delete('/ueggPcpaIndicadoresEjecucion/:id',          ueggPcpaIndicadoresEjecucionController.delete);                                                                        
router.delete('/ueggPcpaIndicadoresTipo/:id',               ueggPcpaIndicadoresTipoController.delete);                                                                        
router.delete('/ueggPcpaMiembroComision/:id',               ueggPcpaMiembroComisionController.delete);                                                                        
router.delete('/ueggPcpaMiembroTipo/:id',                   ueggPcpaMiembroTipoController.delete);                                                                        
//router.delete('/ueggPcpaReporteEmbarazoTipo/:id',           ueggPcpaReporteEmbarazoTipoController.delete);                                                                        
router.delete('/ueggPcpaUnidadEducativa/:id',                ueggPcpaUnidadEducativaController.delete);                                                                        
router.delete('/ueggViolenciaAccionesTipo/:id',             ueggViolenciaAccionesTipoController.delete);                                                                        
router.delete('/ueggViolenciaAgresor/:id',                  ueggViolenciaAgresorController.delete);                                                                        
router.delete('/ueggViolenciaAutoFinalTipo/:id',            ueggViolenciaAutoFinalTipoController.delete);                                                                        
router.delete('/ueggViolenciaAutoInicialTipo/:id',          ueggViolenciaAutoInicialTipoController.delete);                                                                        
router.delete('/ueggViolenciaCasoAgresor/:id',              ueggViolenciaCasoAgresorController.delete);                                                                        
router.delete('/ueggViolenciaCasoCom/:id',                  ueggViolenciaCasoComController.delete);                                                                        
router.delete('/ueggViolenciaCasoDna/:id',                  ueggViolenciaCasoDnaController.delete);                                                                        
router.delete('/ueggViolenciaComDist/:id',                  ueggViolenciaComDistController.delete);                                                                        
router.delete('/ueggViolenciaComDptal/:id',                 ueggViolenciaComDptalController.delete);                                                                        
router.delete('/ueggViolenciaDna/:id',                      ueggViolenciaDnaController.delete);                                                                        
router.delete('/ueggViolenciaEtapaPreliminarTipo/:id',      ueggViolenciaEtapaPreliminarTipoController.delete);                                                                        
router.delete('/ueggViolenciaEtapaPreparatoriaTipo/:id',    ueggViolenciaEtapaPreparatoriaTipoController.delete);                                                                        
router.delete('/ueggViolenciaHechoTipo/:id',                ueggViolenciaHechoTipoController.delete);                                                                        
router.delete('/ueggViolenciaInstanciaTipo/:id',            ueggViolenciaInstanciaTipoController.delete);                                                                        
router.delete('/ueggViolenciaJuicioAcFormalTipo/:id',       ueggViolenciaJuicioAcFormalTipoController.delete);                                                                        
router.delete('/ueggViolenciaOtrasFormTipo/:id',            ueggViolenciaOtrasFormTipoController.delete);                                                                        
router.delete('/ueggViolenciaProceSegDs/:id',               ueggViolenciaProceSegDsController.delete);                                                                        
router.delete('/ueggViolenciaQDenunciaTipo/:id',            ueggViolenciaQDenunciaTipoController.delete);                                                                        
router.delete('/ueggViolenciaRecJuTipo/:id',                ueggViolenciaRecJuTipoController.delete);                                                                        
router.delete('/ueggViolenciaRecRevTipo/:id',               ueggViolenciaRecRevTipoController.delete);                                                                        
router.delete('/ueggViolenciaSancionTipo/:id',              ueggViolenciaSancionTipoController.delete);                                                                        
router.delete('/ueggViolenciaSegDs/:id',                    ueggViolenciaSegDsController.delete);                                                                        
router.delete('/ueggViolenciaSegInfraccion/:id',            ueggViolenciaSegInfraccionController.delete);                                                                        
router.delete('/ueggViolenciaSegSanciones/:id',             ueggViolenciaSegSancionesController.delete);                                                                        
router.delete('/ueggViolenciaSegSancionesDel/:id',          ueggViolenciaSegSancionesDelController.delete);                                                                        
router.delete('/ueggViolenciaVictima/:id',                  ueggViolenciaVictimaController.delete);                                                                        



module.exports = router;




