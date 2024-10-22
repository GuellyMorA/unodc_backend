var express = require('express');
const multer = require('multer');
const infraInternetServicio = require('../controllers/infraestructura/infraInterServicio');
const infraInternetConexionTipo = require('../controllers/infraestructura/infraInternetConexionTipo');
const infraInternetDisponibilidadTipo = require('../controllers/infraestructura/infraInternetDisponibilidadTipo');
const infraInternetDisponibilidadServicioTipo = require('../controllers/infraestructura/InfraInternetDisponibilidadServicioTipo'); // gma

const infraInternetEmpresasTipo = require('../controllers/infraestructura/infraInternetEmpresasTipo');
const infraInternetPersonasTipo = require('../controllers/infraestructura/infraInternetPersonasTipo');

var router = express.Router();
const InfraAccesoMedioController = require('../controllers').infraAccesoMedio;
const InfraAccesoMedioGradaRampaController = require('../controllers').infraAccesoMedioGradaRampa;
const InfraAccesoEdificacionSenialeticaController = require('../controllers').infraAccesoEdificacionSenialetica;
const InfraAccesoEdificacionController = require('../controllers').infraAccesoEdificacion;
const InfraAccesoPredioTransporteController = require('../controllers').infraAccesoPredioTransporte;
const InfraAccesoTipoController = require('../controllers').infraAccesoTipo;
const InfraAguaUsoTipoController = require('../controllers').infraAguaUsoTipo;
const InfraAmbienteController = require('../controllers').infraAmbiente;
const InfraAmbienteCategoriaTipoController = require('../controllers').infraAmbienteCategoriaTipo;
const InfraAmbienteCondicionController = require('../controllers').infraAmbienteCondicion;
const InfraAmbienteDestinadoTipoController = require('../controllers').infraAmbienteDestinadoTipo;
const InfraAmbienteEspecialidadController = require('../controllers').infraAmbienteEspecialidad;
const InfraAmbienteMobiliarioController = require('../controllers').infraAmbienteMobiliario;
const InfraAmbientePredioInstitucioneducativaController = require('../controllers').infraAmbientePredioInstitucioneducativa;
const InfraAmbienteTipoController = require('../controllers').infraAmbienteTipo;
const InfraAmuralladoTipoController = require('../controllers').infraAmuralladoTipo;
const InfraAreaTipoController = require('../controllers').infraAreaTipo;
const InfraArtefactoBanioTipoController = require('../controllers').infraArtefactoBanioTipo;
const InfraBateriaArtefactoBanioController = require('../controllers').infraBateriaArtefactoBanio;
const InfraBloqueController = require('../controllers').infraBloque;
const InfraCaracteristicaConstruccionController = require('../controllers').infraCaracteristicaConstruccion;
const InfraCaracteristicaEdificacionController = require('../controllers').infraCaracteristicaEdificacion;
const InfraCaracteristicasEspacioController = require('../controllers').infraCaracteristicasEspacio;
const InfraCaracteristicaTerrenoController = require('../controllers').infraCaracteristicaTerreno;
const InfraCaracteristicaTipoController = require('../controllers').infraCaracteristicaTipo;
const InfraCondicionController = require('../controllers').infraCondicion;
const InfraConstruccionController = require('../controllers').infraConstruccion;
const InfraDisponibilidadServicioTipoController = require('../controllers').infraDisponibilidadServicioTipo;
const InfraDocumentacionTipoController = require('../controllers').infraDocumentacionTipo;
const InfraEdificacionTipoController = require('../controllers').infraEdificacionTipo;
const InfraEntidadEjecutoraTipoController = require('../controllers').infraEntidadEjecutoraTipo;
const InfraEquipamientoBrigadaTipoController = require('../controllers').infraEquipamientoBrigadaTipo;
const InfraEquipamientoCategoriaTipoController = require('../controllers').infraEquipamientoCategoriaTipo;
const InfraEquipamientoTipoController = require('../controllers').infraEquipamientoTipo;
const InfraEspaciosTipoController = require('../controllers').infraEspaciosTipo;
const InfraEstadoTipoController = require('../controllers').infraEstadoTipo;
const InfraEvacuacionTipoController = require('../controllers').infraEvacuacionTipo;
const InfraFuenteEnergiaTipoController = require('../controllers').infraFuenteEnergiaTipo;
const InfraGestionConstruccionTipoController = require('../controllers').infraGestionConstruccionTipo;
const InfraGradaRampaCuentaTipoController = require('../controllers').infraGradaRampaCuentaTipo;
const InfraHechoDelictivoController = require('../controllers').infraHechoDelictivo;
const InfraHurtoDelictivoController = require('../controllers').infraHurtoDelictivo;
const InfraInstalacionTipoController = require('../controllers').infraInstalacionTipo;
const InfraInstitucioneducativaEquipamientoBrigadaController = require('../controllers').infraInstitucioneducativaEquipamientoBrigada;
const InfraInstitucioneducativaPrevencionController = require('../controllers').infraInstitucioneducativaPrevencion;
const InfraMaterialTipoController = require('../controllers').infraMaterialTipo;
const InfraMedioAccesoTipoController = require('../controllers').infraMedioAccesoTipo;
const InfraMedioEliminacionBasuraTipoController = require('../controllers').infraMedioEliminacionBasuraTipo;
const InfraMedioEliminacionExcTipoController = require('../controllers').infraMedioEliminacionExcTipo;
const InfraMedioSuministroAguaTipoController = require('../controllers').infraMedioSuministroAguaTipo;
const InfraMedioTransporteCategoriaTipoController = require('../controllers').infraMedioTransporteCategoriaTipo;
const InfraMedioTransporteTipoController = require('../controllers').infraMedioTransporteTipo;
const InfraMobiliarioPredioInstitucioneducativaController = require('../controllers').infraMobiliarioPredioInstitucioneducativa;
const InfraNoPedagogicoInternadoController = require('../controllers').infraNoPedagogicoInternado;
const InfraMobiliarioTipoController = require('../controllers').infraMobiliarioTipo;
const InfraNoPedagogicoViviendaController = require('../controllers').infraNoPedagogicoVivienda;
const InfraPedagogicoController = require('../controllers').infraPedagogico;
const InfraPedagogicoRecreativoController = require('../controllers').infraPedagogicoRecreativo;
const InfraPeriodicidadEliminacionBasuraTipoController = require('../controllers').infraPeriodicidadEliminacionBasuraTipo;
const InfraPisoController = require('../controllers').infraPiso;
const InfraPredioFotoController = require('../controllers').infraPredioFoto;
const InfraPredioInstitucioneducativaController = require('../controllers').infraPredioInstitucioneducativa;
const InfraPredioTipoController = require('../controllers').infraPredioTipo;
const InfraPreguntaAmbienteController = require('../controllers').infraPreguntaAmbiente;
const InfraPreguntaTipoController = require('../controllers').infraPreguntaTipo;
const InfraPrevencionEquipamientoController = require('../controllers').infraPrevencionEquipamiento;
const InfraPropiedadTipoController = require('../controllers').infraPropiedadTipo;
const InfraProximoTipoController = require('../controllers').infraProximoTipo;
const InfraPurificadorAguaTipoController = require('../controllers').infraPurificadorAguaTipo;
const InfraResponsableTipoController = require('../controllers').infraResponsableTipo;
const InfraRiesgoController = require('../controllers').infraRiesgo;
const InfraRiesgoEventoController = require('../controllers').infraRiesgoEvento;
const InfraRiesgoEventoTipoController = require('../controllers').infraRiesgoEventoTipo;
const InfraRiesgoProximoController = require('../controllers').infraRiesgoProximo;
const InfraSenialeticaTipoController = require('../controllers').infraSenialeticaTipo;
const InfraServicioAguaController = require('../controllers').infraServicioAgua;
const InfraServicioElectricoController = require('../controllers').infraServicioElectrico;
const InfraServicioOtroController = require('../controllers').infraServicioOtro;
const InfraServicioOtroCategoriaTipoController = require('../controllers').infraServicioOtroCategoriaTipo;
const InfraServicioOtroCondicionController = require('../controllers').infraServicioOtroCondicion;
const InfraServicioOtroCuentaController = require('../controllers').infraServicioOtroCuenta;
const InfraServicioOtroTipoController = require('../controllers').infraServicioOtroTipo;
const InfraServicioSaneamientoController = require('../controllers').infraServicioSaneamiento;
const InfraServicioSaneamientoMedioEliminacionExcController = require('../controllers').infraServicioSaneamientoMedioEliminacionExc;
const InfraTenenciaTipoController = require('../controllers').infraTenenciaTipo;
const InfraTiempoSuspendidoTipoController = require('../controllers').infraTiempoSuspendidoTipo;
const InfraTopografiaTipoController = require('../controllers').infraTopografiaTipo;
const InfraUbicacionTipoController = require('../controllers').infraUbicacionTipo;
const ReportesController = require('../controllers').infraReportes;

const InfraPredioController = require('../controllers').infraPredio;
//const InfraAmbienteDestinadoTipoController = require('../controllers').infraAmbienteDestinadoTipo;


//const infraInstitucioneducativaEquipamientoBrigadaController  = require('../controllers/infraestructura/infraInstitucioneducativaEquipamientoBrigada');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});
const upload = multer({
    storage: storage
});
//Uso del upload en la ruta
//app.post('/api/uploadImage', upload.single('file'), ctrlFileUpload.uploadImage);

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Api Infraestructura');
});

/* Rutas para infraAccesoMedio */
router.get('/infraAccesoMedio', InfraAccesoMedioController.list);
router.get('/infraAccesoMedio/:id', InfraAccesoMedioController.getById);
router.get('/infraAccesoMedioTodo/:idpredio', InfraAccesoMedioController.getGradaRampaSenial);

/* Rutas para infraInstitucioneducativaEquipamientoBrigada */
router.get('/infraInstitucioneducativaEquipamientoBrigada', InfraInstitucioneducativaEquipamientoBrigadaController.list);
router.get('/infraInstitucioneducativaEquipamientoBrigada/:id', InfraInstitucioneducativaEquipamientoBrigadaController.getById);

/* Rutas para InfraAccesoMedioGradaRampa */
router.get('/infraAccesoMedioGradaRampa', InfraAccesoMedioGradaRampaController.list);
router.get('/infraAccesoMedioGradaRampa/:id', InfraAccesoMedioGradaRampaController.getById);

/* Rutas para infraAccesoEdificacionSenialetica */
router.get('/infraAccesoEdificacionSenialetica', InfraAccesoEdificacionSenialeticaController.list);
router.get('/infraAccesoEdificacionSenialetica/:id', InfraAccesoEdificacionSenialeticaController.getById);

/*Rutas para infraAccesoEdificacion*/
router.get('/infraAccesoEdificacion', InfraAccesoEdificacionController.list);
router.get('/infraAccesoEdificacion/:id', InfraAccesoEdificacionController.getById);
router.put('/infraAccesoEdificacionUpdate/:id', InfraAccesoEdificacionController.updateAcceso);
router.get('/infraAccesibilidad/:predioid', InfraAccesoEdificacionController.getAccesibilidad);
router.get('/infraAccesibilidadGradasRampas/:predioid', InfraAccesoEdificacionController.getRampasGradas);
router.get('/infraAccesibilidadGRS/:GRSId/:predioid', InfraAccesoEdificacionController.getGRSbyId);
router.post('/infraAccesoEdificacion', InfraAccesoEdificacionController.addAcceso);


/*Rutas para infraAccesoPredioTransporte */
router.get('/infraAccesoPredioTransporte', InfraAccesoPredioTransporteController.list);
router.get('/infraAccesoPredioTransporte/:id', InfraAccesoPredioTransporteController.getById);
router.post('/infraAccesoPredioTransporte', InfraAccesoPredioTransporteController.add);
router.delete('/infraAccesoPredioTransporte/:accesoId', InfraAccesoPredioTransporteController.delete);

// Rutas para infraAccesoTipo
router.get('/infraAccesoTipo', InfraAccesoTipoController.list);
router.get('/infraAccesoTipo/:id', InfraAccesoTipoController.getById);

//Rutas para infraAguaUsoTipo
router.get('/infraAguaUsoTipo', InfraAguaUsoTipoController.list);
router.get('/infraAguaUsoTipo/:id', InfraAguaUsoTipoController.getById);

//Rutas para infraAmbiente
router.get('/infraAmbiente', InfraAmbienteController.list);
router.get('/infraAmbiente/:id', InfraAmbienteController.getById);
router.get('/infraAmbientePreguntaPedagogico/:tipo_ambiente', InfraAmbienteController.preguntaPedagogico);
router.get('/infraAmbientePreguntaServicio/:tipo_ambiente/:predioid', InfraAmbienteController.preguntaServicio);
router.get('/infraAmbientePedagogico/:ambienteCategoriaId', InfraAmbienteController.ambientesPedagogicos);
router.get('/infraAmbientePedagogicolista/:predioId/:ambienteId', InfraAmbienteController.listaAmbientesPedagogicos);
router.get('/infraAmbienteParametricos/:ambienteId', InfraAmbienteController.ambientesParametricos);
router.get('/infraListaEspecialidadesBth/:jurisdiccionId', InfraAmbienteController.getlistaEspecialidadesBth);
router.post('/infraAmbienteNuevo', InfraAmbienteController.add);
router.get('/infraBuscaIdPregunta/:preguntaId/:materialId/:caracteristicaId', InfraAmbienteController.getIdCondicion);
router.get('/infraAmbienteNoPedagogicolista/:predioId/:ambienteId', InfraAmbienteController.listaAmbientesNoPedagogicos);
router.delete('/infraAmbiente/:id/:tipoAmbiente', InfraAmbienteController.deleteAmbientePedagogico);
router.get('/verificaAmbienteMobiliario/:ambienteId/:tipoAmbiente', InfraAmbienteController.verificaMobiliario);
router.get('/infraAmbienteDetalle/:predioId/:ambienteId/:tipoAmbienteId', InfraAmbienteController.getAmbienteDetalle);


//Rutas para infraAmbienteCategoriaTipo
router.get('/infraAmbienteCategoriaTipo', InfraAmbienteCategoriaTipoController.list);
router.get('/infraAmbienteCategoriaTipo/:id', InfraAmbienteCategoriaTipoController.getById);

//Rutas para infraAmbienteCondicion
router.get('/infraAmbienteCondicion', InfraAmbienteCondicionController.list);
router.get('/infraAmbienteCondicion/:id', InfraAmbienteCondicionController.getById);

//Rutas para infraAmbienteDestinadoTipo
router.get('/infraAmbienteDestinadoTipo', InfraAmbienteDestinadoTipoController.list);
router.get('/infraAmbienteDestinadoTipo/:id', InfraAmbienteDestinadoTipoController.getById);


//Rutas para infraAmbienteEspecialidad
router.get('/infraAmbienteEspecialidad', InfraAmbienteEspecialidadController.list);
router.get('/infraAmbienteEspecialidad/:id', InfraAmbienteEspecialidadController.getById);

//Rutas para infraAmbienteMobiliario
router.get('/infraAmbienteMobiliario', InfraAmbienteMobiliarioController.list);
router.get('/infraAmbienteMobiliario/:id', InfraAmbienteMobiliarioController.getById);
router.post('/infraAmbienteMobiliarioNuevo', InfraAmbienteMobiliarioController.add);
router.put('/infraAmbienteMobiliario', InfraAmbienteMobiliarioController.update);
router.delete('/infraAmbienteMobiliario/:id', InfraAmbienteMobiliarioController.delete);
router.get('/infraAmbienteMobiliarios/:id', InfraAmbienteMobiliarioController.getByAmbienteId);

//Rutas para infraAmbientePredioInstitucioneducativa
router.get('/infraAmbientePredioInstitucioneducativa', InfraAmbientePredioInstitucioneducativaController.list);
router.get('/infraAmbientePredioInstitucioneducativa/:id', InfraAmbientePredioInstitucioneducativaController.getById);

//Rutas para infraAmbienteTipo
router.get('/infraAmbienteTipo', InfraAmbienteTipoController.list);
router.get('/infraAmbienteTipo/:id', InfraAmbienteTipoController.getById);

//Rutas para infraAmuralladoTipo
router.get('/infraAmuralladoTipo', InfraAmuralladoTipoController.list);
router.get('/infraAmuralladoTipo/:id', InfraAmuralladoTipoController.getById);

//Rutas para infraAreaTipo
router.get('/infraAreaTipo', InfraAreaTipoController.list);
router.get('/infraAreaTipo/:id', InfraAreaTipoController.getById);

//Rutas para infraArtefactoBanioTipo
router.get('/infraArtefactoBanioTipo', InfraArtefactoBanioTipoController.list);
router.get('/infraArtefactoBanioTipo/:id', InfraArtefactoBanioTipoController.getById);

//Rutas para infraBateriaArtefactoBanio
router.get('/infraBateriaArtefactoBanio', InfraBateriaArtefactoBanioController.list);
router.get('/infraBateriaArtefactoBanio/:id', InfraBateriaArtefactoBanioController.getById);

//Rutas para infraBloque
router.get('/infraBloque', InfraBloqueController.list);
router.get('/infraBloque/:id', InfraBloqueController.getById);
router.post('/infraBloque', InfraBloqueController.add);
router.get('/infraBloquesPisos/:predioid', InfraBloqueController.getBloques);
router.post('/infraBloqueDatos', InfraBloqueController.add);
router.delete('/infraBloqueDatos/:id', InfraBloqueController.delete);
router.get('/infraBloqueLista/:predioId', InfraBloqueController.getBloquesLista);
router.get('/infraPisosLista/:bloqueId', InfraBloqueController.getPisosLista);

//Rutas para infraCaracteristicaConstruccion
router.get('/infraCaracteristicaConstruccion', InfraCaracteristicaEdificacionController.list);
router.get('/infraCaracteristicaConstruccion/:id', InfraCaracteristicaConstruccionController.getById);
router.put('/infraCaracteristicaConstruccion/:id', InfraCaracteristicaConstruccionController.update);
router.post('/infraCaracteristicaConstruccioNuevo', InfraCaracteristicaConstruccionController.addCaracteristica);
router.get('/listaCaracteristicaConstruccion/:predioId', InfraCaracteristicaConstruccionController.listaCaracteristica);

//Rutas para infraCaracteristicaEdificacion
router.get('/infraCaracteristicaEdificacion', InfraCaracteristicaEdificacionController.list);
router.get('/infraCaracteristicaEdificacion/:id', InfraCaracteristicaEdificacionController.getById);


//Rutas para infraCaracteristicasEspacio
router.get('/infraCaracteristicasEspacio', InfraCaracteristicasEspacioController.list);
router.get('/infraCaracteristicasEspacio/:id', InfraCaracteristicasEspacioController.getById);
router.post('/infraCaracteristicasEspacio', InfraCaracteristicasEspacioController.add);
router.delete('/infraCaracteristicasEspacio/:idterreno', InfraCaracteristicasEspacioController.deleteEspacios);

//Rutas para infraCaracteristicaTerreno
router.get('/infraCaracteristicaTerreno', InfraCaracteristicaTerrenoController.list);
router.get('/infraCaracteristicaTerreno/:id', InfraCaracteristicaTerrenoController.getById);
router.post('/infraCaracteristicaTerreno', InfraCaracteristicaTerrenoController.add);
router.get('/infraCaracteristicaTerrenoLista/:predioid', InfraCaracteristicaTerrenoController.getTerreno);
router.put('/infraCaracteristicaTerreno/:id', InfraCaracteristicaTerrenoController.update);

//Rutas para infraCaracteristicaTipo
router.get('/infraCaracteristicaTipo', InfraCaracteristicaTipoController.list);
router.get('/infraCaracteristicaTipo/:id', InfraCaracteristicaTipoController.getById);

//Rutas para infraCondicion
router.get('/infraCondicion', InfraCondicionController.list);
router.get('/infraCondicion/:id', InfraCondicionController.getById);

//Rutas para infraConstruccion
router.get('/infraConstruccion', InfraConstruccionController.list);
router.get('/infraConstruccion/:id', InfraConstruccionController.getById);
router.put('/infraConstruccion/:id', InfraConstruccionController.update);
router.post('/infraConstruccion', InfraConstruccionController.add);
router.delete('/infraConstruccion/:id', InfraConstruccionController.delete);

//Rutas para infraDisponibilidadServicioTipo
router.get('/infraDisponibilidadServicioTipo', InfraDisponibilidadServicioTipoController.list);
router.get('/infraDisponibilidadServicioTipo/:id', InfraDisponibilidadServicioTipoController.getById);

//Rutas para infraDocumentacionTipo
router.get('/infraDocumentacionTipo', InfraDocumentacionTipoController.list);
router.get('/infraDocumentacionTipo/:id', InfraDocumentacionTipoController.getById);

//Rutas para infraEdificacionTipo
router.get('/infraEdificacionTipo', InfraEdificacionTipoController.list);
router.get('/infraEdificacionTipo/:id', InfraEdificacionTipoController.getById);

//Rutas para infraEntidadEjecutoraTipo
router.get('/infraEntidadEjecutoraTipo', InfraEntidadEjecutoraTipoController.list);
router.get('/infraEntidadEjecutoraTipo/:id', InfraEntidadEjecutoraTipoController.getById);

//Rutas para infraEquipamientoBrigadaTipo
router.get('/infraEquipamientoBrigadaTipo', InfraEquipamientoBrigadaTipoController.list);
router.get('/infraEquipamientoBrigadaTipo/:id', InfraEquipamientoBrigadaTipoController.getById);

//Rutas para infraEquipamientoCategoriaTipo
router.get('/infraEquipamientoCategoriaTipo', InfraEquipamientoCategoriaTipoController.list);
router.get('/infraEquipamientoCategoriaTipo/:id', InfraEquipamientoCategoriaTipoController.getById);

//Rutas para infraEquipamientoTipo
router.get('/infraEquipamientoTipo', InfraEquipamientoTipoController.list);
router.get('/infraEquipamientoParametros', InfraEquipamientoTipoController.getEquipamientoTipos);
router.get('/infraEquipamientoTipo/:id', InfraEquipamientoTipoController.getById);

//Rutas para infraEspaciosTipo
router.get('/infraEspaciosTipo', InfraEspaciosTipoController.list);
router.get('/infraEspaciosTipo/:id', InfraEspaciosTipoController.getById);

//Rutas para infraEstadoTipo
router.get('/infraEstadoTipo', InfraEstadoTipoController.list);
router.get('/infraEstadoTipo/:id', InfraEstadoTipoController.getById);

//Rutas para infraEvacuacionTipo
router.get('/infraEvacuacionTipo', InfraEvacuacionTipoController.list);
router.get('/infraEvacuacionTipo/:id', InfraEvacuacionTipoController.getById);

//Rutas para infraEvacuacionTipo
router.get('/infraFuenteEnergiaTipo', InfraFuenteEnergiaTipoController.list);
router.get('/infraFuenteEnergiaTipo/:id', InfraFuenteEnergiaTipoController.getById);

//Rutas para infraGestionConstruccionTipo
router.get('/infraGestionConstruccionTipo', InfraGestionConstruccionTipoController.list);
router.get('/infraGestionConstruccionTipo/:id', InfraGestionConstruccionTipoController.getById);

//Rutas para infraGradaRampaCuentaTipo
router.get('/infraGradaRampaCuentaTipo', InfraGradaRampaCuentaTipoController.list);
router.get('/infraGradaRampaCuentaTipo/:id', InfraGradaRampaCuentaTipoController.getById);

//Rutas para infraHechoDelictivo
router.get('/infraHechoDelictivo', InfraHechoDelictivoController.list);
router.get('/infraHechoDelictivo/:id', InfraHechoDelictivoController.getById);
router.get('/infraHechoDelictivoDelito/:predioId', InfraHechoDelictivoController.getDelito);
router.post('/infraHechoDelictivoDelito', InfraHechoDelictivoController.add);
router.delete('/infraHechoDelictivoDelito/:id', InfraHechoDelictivoController.delete);

//Rutas para infraHurtoDelictivo
router.get('/infraHurtoDelictivo', InfraHurtoDelictivoController.list);
router.get('/infraHurtoDelictivo/:id', InfraHurtoDelictivoController.getById);
router.get('/infraHurto/:predioId', InfraHurtoDelictivoController.getHurto);
router.post('/infraHurto', InfraHurtoDelictivoController.add);
router.delete('/infraHurto/:id', InfraHurtoDelictivoController.delete);

//Rutas para infraInstalacionTipo
router.get('/infraInstalacionTipo', InfraInstalacionTipoController.list);
router.get('/infraInstalacionTipo/:id', InfraInstalacionTipoController.getById);

//Rutas para infraInstitucioneducativaEquipamientoBrigada
router.get('/infraInstitucioneducativaEquipamientoBrigada', InfraInstitucioneducativaEquipamientoBrigadaController.list);
router.get('/infraInstitucioneducativaEquipamientoBrigada/:id', InfraInstitucioneducativaEquipamientoBrigadaController.getById);

//Rutas para InfraInstitucioneducativaPrevencion
router.get('/infraInstitucioneducativaPrevencion', InfraInstitucioneducativaPrevencionController.list);
router.get('/infraInstitucioneducativaPrevencion/:id', InfraInstitucioneducativaPrevencionController.getById);
router.post('/infraInstitucioneducativaPrevencion', InfraInstitucioneducativaPrevencionController.add);
router.get('/infraPrevencion/:idipie', InfraInstitucioneducativaPrevencionController.getPrevencion);
router.put('/infraInstitucioneducativaPrevencion/:id', InfraInstitucioneducativaPrevencionController.update);

//Rutas para infraMaterialTipo
router.get('/infraMaterialTipo', InfraMaterialTipoController.list);
router.get('/infraMaterialTipo/:id', InfraMaterialTipoController.getById);

//Rutas para infraMedioAccesoTipo
router.get('/infraMedioAccesoTipo', InfraMedioAccesoTipoController.list);
router.get('/infraMedioAccesoTipo/:id', InfraMedioAccesoTipoController.getById);

//Rutas para infraMedioEliminacionBasuraTipo
router.get('/infraMedioEliminacionBasuraTipo', InfraMedioEliminacionBasuraTipoController.list);
router.get('/infraMedioEliminacionBasuraTipo/:id', InfraMedioEliminacionBasuraTipoController.getById);

//Rutas para infraMedioEliminacionExcTipo
router.get('/infraMedioEliminacionExcTipo', InfraMedioEliminacionExcTipoController.list);
router.get('/infraMedioEliminacionExcTipo/:id', InfraMedioEliminacionExcTipoController.getById);

//Rutas para infraMedioSuministroAguaTipo
router.get('/infraMedioSuministroAguaTipo', InfraMedioSuministroAguaTipoController.list);
router.get('/infraMedioSuministroAguaTipo/:id', InfraMedioSuministroAguaTipoController.getById);

//Rutas para infraMedioTransporteCategoriaTipo
router.get('/infraMedioTransporteCategoriaTipo', InfraMedioTransporteCategoriaTipoController.list);
router.get('/infraMedioTransporteCategoriaTipo/:id', InfraMedioTransporteCategoriaTipoController.getById);

//Rutas para infraMedioTransporteTipo
router.get('/infraMedioTransporteTipo', InfraMedioTransporteTipoController.list);
router.get('/infraMedioTransporteTipo/:id', InfraMedioTransporteTipoController.getById);
router.get('/infraMedioTransporteTipos/:categoriaId', InfraMedioTransporteTipoController.getMedioTransporte);
router.get('/infraListaViasAccesos/:predioId/:accesoTipoId', InfraMedioTransporteTipoController.getViasAccesos);


//Rutas para infraMobiliarioPredioInstitucioneducativa
router.get('/infraMobiliarioPredioInstitucioneducativa', InfraMobiliarioPredioInstitucioneducativaController.list);
router.get('/infraMobiliarioPredioInstitucioneducativa/:id', InfraMobiliarioPredioInstitucioneducativaController.getById);


//Rutas para infraMobiliarioTipo
router.get('/infraMobiliarioTipo', InfraMobiliarioTipoController.list);
router.get('/infraMobiliarioTipo/:id', InfraMobiliarioTipoController.getById);

//Rutas para infraMobiliarioPredioInstitucioneducativa
router.get('/infraNoPedagogicoInternado', InfraNoPedagogicoInternadoController.list);
router.get('/infraNoPedagogicoInternado/:id', InfraNoPedagogicoInternadoController.getById);

//Rutas para infraNoPedagogicoVivienda
router.get('/infraNoPedagogicoVivienda', InfraNoPedagogicoViviendaController.list);
router.get('/infraNoPedagogicoVivienda/:id', InfraNoPedagogicoViviendaController.getById);

//Rutas para infraPedagogico
router.get('/infraPedagogico', InfraPedagogicoController.list);
router.get('/infraPedagogico/:id', InfraPedagogicoController.getById);
router.post('infraPedagogicoNuevo', InfraPedagogicoController.getById);

//Rutas para infraPedagogicoRecreativo
router.get('/infraPedagogicoRecreativo', InfraPedagogicoRecreativoController.list);
router.get('/infraPedagogicoRecreativo/:id', InfraPedagogicoRecreativoController.getById);

//Rutas para infraPedagogicoRecreativo
router.get('/infraPeriodicidadEliminacionBasuraTipo', InfraPeriodicidadEliminacionBasuraTipoController.list);
router.get('/infraPeriodicidadEliminacionBasuraTipo/:id', InfraPeriodicidadEliminacionBasuraTipoController.getById);

//Rutas para infraPiso
router.get('/infraPiso', InfraPisoController.list);
router.get('/infraPiso/:id', InfraPisoController.getById);
router.post('/infraPisoBloque', InfraPisoController.add);
router.delete('/infraPisoBloque/:idbloque', InfraPisoController.deletePisos);

//Rutas para InfraPredio
router.get('/infraPredio', InfraPredioController.list);
router.get('/infraPredio/:id', InfraPredioController.getById);
router.post('/infraPredio', InfraPredioController.add);
router.post('/infraPredioNuevo', InfraPredioController.addPredio);
router.put('/infraPredio/:id', InfraPredioController.update);
router.get('/infraPredioInicial/:jurisdiccion/:gestion', InfraPredioController.getPredio);
router.get('/infraPredioListaUe/:jurisdiccion', InfraPredioController.getListaUe);
router.get('/infraPredioDatosUe/:predioId', InfraPredioController.getDatosUe);
router.get('/infraPredioDatosTotalesAcceso/:predioId', InfraPredioController.getTotalViasAcceso);
router.get('/infraPredioCaracteristica/:predioId', InfraPredioController.getPredioCaracteristica);
router.delete('/infraPredio/:idpredio', InfraPredioController.delete);
router.get('/infraInformacionPredio/:predioId', InfraPredioController.getInformacionPredio);
router.get('/infraPredioVerifica/:jurisdiccion/:gestion', InfraPredioController.verificaPredio);
router.get('/infraPredioValida/:gestion/:jurisdiccion', InfraPredioController.getValidacionCierre);
router.get('/infraPredioCierreOperativo/:gestion/:jurisdiccion', InfraPredioController.cerrarOperativo);
router.get('/infraPredioHabilitarOperativo/:gestion/:jurisdiccion', InfraPredioController.habilitarOperativo);

//Rutas para infraPredioFoto
router.get('/infraPredioFoto', InfraPredioFotoController.list);
router.get('/infraPredioFoto/:id', InfraPredioFotoController.getById);
router.post('/infraPredioFoto', upload.single('imagen'), InfraPredioFotoController.add);
router.put('/infraPredioFoto/:id', InfraPredioFotoController.update);
router.get('/infraPredioFotoPredio/:infraPredioId', InfraPredioFotoController.getByPredio);
router.get('/infraPredioFotoCantidad/:infraPredioId', InfraPredioFotoController.getCantidadByPredio);
router.delete('/infraPredioFoto/:id', InfraPredioFotoController.delete);
//router.post('/infraPredioFoto/uploadImage', upload.single('file'), InfraPredioFotoController.uploadImage);


//Rutas para infraPredioInstitucioneducativa
router.get('/infraPredioInstitucioneducativa', InfraPredioInstitucioneducativaController.list);
router.get('/infraPredioInstitucioneducativa/:id', InfraPredioInstitucioneducativaController.getById);
router.get('/infraPredioInstitucioneducativaExiste/:predioId/:sie', InfraPredioInstitucioneducativaController.getByIdExist);
router.get('/infraPredioInstitucioneducativaOperan/:predioid', InfraPredioInstitucioneducativaController.getUEoperan);
router.get('/infraPredioInstitucioneducativaList/:sie', InfraPredioInstitucioneducativaController.getListUE);
router.post('/infraPredioInstitucioneducativa', InfraPredioInstitucioneducativaController.add);
router.put('/infraPredioInstitucioneducativa/:id', InfraPredioInstitucioneducativaController.update);
router.delete('/infraPredioInstitucioneducativa/:id', InfraPredioInstitucioneducativaController.delete);
router.post('/infraPredioInstitucioneducativaAutomatico', InfraPredioInstitucioneducativaController.addAutomatico);

//Rutas para infraPredioTipo
router.get('/infraPredioTipo', InfraPredioTipoController.list);
router.get('/infraPredioTipo/:id', InfraPredioTipoController.getById);

//Rutas para infraPreguntaAmbiente  
router.get('/infraPreguntaAmbiente', InfraPreguntaAmbienteController.list);
router.get('/infraPreguntaAmbiente/:id', InfraPreguntaAmbienteController.getById);

//Rutas para infraPreguntaTipo
router.get('/infraPreguntaTipo', InfraPreguntaTipoController.list);
router.get('/infraPreguntaTipo/:id', InfraPreguntaTipoController.getById);

//Rutas para infraPrevencionEquipamiento
router.get('/infraPrevencionEquipamiento', InfraPrevencionEquipamientoController.list);
router.get('/infraPrevencionEquipamiento/:id', InfraPrevencionEquipamientoController.getById);
router.post('/infraPrevencionEquipamiento', InfraPrevencionEquipamientoController.add);
router.get('/infraPrevencionEquipamientoTodo/:idprevencion', InfraPrevencionEquipamientoController.getPrevencionEquipamiento);
router.delete('/infraPrevencionEquipamiento/:id', InfraPrevencionEquipamientoController.delete);
//Rutas para infraPropiedadTipo
router.get('/infraPropiedadTipo', InfraPropiedadTipoController.list);
router.get('/infraPropiedadTipo/:id', InfraPropiedadTipoController.getById);

//Rutas para infraProximoTipo
router.get('/infraProximoTipo', InfraProximoTipoController.list);
router.get('/infraProximoTipo/:id', InfraProximoTipoController.getById);

//Rutas para infraPurificadorAguaTipo
router.get('/infraPurificadorAguaTipo', InfraPurificadorAguaTipoController.list);
router.get('/infraPurificadorAguaTipo/:id', InfraPurificadorAguaTipoController.getById);

//Rutas para infraResponsableTipo
router.get('/infraResponsableTipo', InfraResponsableTipoController.list);
router.get('/infraResponsableTipo/:id', InfraResponsableTipoController.getById);

//Rutas para infraRiesgo
router.get('/infraRiesgo', InfraRiesgoController.list);
router.get('/infraRiesgo/:id', InfraRiesgoController.getById);
router.post('/infraRiesgo', InfraRiesgoController.add);
router.get('/infraRiesgoEdificio/:predioId', InfraRiesgoController.getRiesgoEdificio);
router.get('/infraRiesgoEdificioEvento/:predioId', InfraRiesgoController.getRiesgoEdificioEvento);
router.get('/infraRiesgoProximoVer/:predioId', InfraRiesgoController.getRiesgoProximo);
router.put('/infraRiesgo/:id', InfraRiesgoController.update);

//Rutas para infraRiesgoEvento
router.get('/infraRiesgoEvento', InfraRiesgoEventoController.list);
router.get('/infraRiesgoEvento/:id', InfraRiesgoEventoController.getById);
router.post('/infraRiesgoEvento', InfraRiesgoEventoController.add);
router.delete('/infraRiesgoEvento/:id', InfraRiesgoEventoController.delete);

//Rutas para infraRiesgoEventoTipo
router.get('/infraRiesgoEventoTipo', InfraRiesgoEventoTipoController.list);
router.get('/infraRiesgoEventoTipo/:id', InfraRiesgoEventoTipoController.getById);

//Rutas para infraRiesgoProximo
router.get('/infraRiesgoProximo', InfraRiesgoProximoController.list);
router.get('/infraRiesgoProximo/:id', InfraRiesgoProximoController.getById);

//Rutas para infraSenialeticaTipo
router.get('/infraSenialeticaTipo', InfraSenialeticaTipoController.list);
router.get('/infraSenialeticaTipo/:id', InfraSenialeticaTipoController.getById);

//Rutas para infraServicioAgua
router.get('/infraServicioAgua', InfraServicioAguaController.list);
router.get('/infraServicioAgua/:id', InfraServicioAguaController.getById);
router.get('/infraServicioAguaVer/:predioId', InfraServicioAguaController.getServicioAgua);
router.put('/infraServicioAgua/:id', InfraServicioAguaController.update);
router.post('/infraServicioAgua', InfraServicioAguaController.add);
router.delete('/infraServicioAgua/:id', InfraServicioAguaController.delete);
router.get('/infraServicioAguaCantidad/:idpredio', InfraServicioAguaController.getCantidad);

//Rutas para infraServicioElectrico
router.get('/infraServicioElectrico', InfraServicioElectricoController.list);
router.get('/infraServicioElectrico/:id', InfraServicioElectricoController.getById);
router.get('/infraServicioElectricoVer/:predioId', InfraServicioElectricoController.getServicioElectrico);
router.put('/infraServicioElectrico/:id', InfraServicioElectricoController.update);
router.post('/infraServicioElectrico', InfraServicioElectricoController.add);
router.delete('/infraServicioElectrico/:id', InfraServicioElectricoController.delete);
router.get('/infraServicioElectricoCantidades/:idpredio', InfraServicioElectricoController.getCantidadAmbientesElectricidad);

//Rutas para infraServicioOtro
router.get('/infraServicioOtro', InfraServicioOtroController.list);
router.get('/infraServicioOtro/:id', InfraServicioOtroController.getById);


//Rutas para infraServicioOtroCategoriaTipo
router.get('/infraServicioOtroCategoriaTipo', InfraServicioOtroCategoriaTipoController.list);
router.get('/infraServicioOtroCategoriaTipo/:id', InfraServicioOtroCategoriaTipoController.getById);

//Rutas para infraServicioOtroCondicion
router.get('/infraServicioOtroCondicion', InfraServicioOtroCondicionController.list);
router.get('/infraServicioOtroCondicion/:id', InfraServicioOtroCondicionController.getById);
router.get('/infraRespuestasServicioOtro/:predio_id', InfraServicioOtroCondicionController.getRespuestasServicios);

//Rutas para infraServicioOtroCuenta
router.get('/infraServicioOtroCuenta', InfraServicioOtroCuentaController.list);
router.get('/infraServicioOtroCuenta/:id', InfraServicioOtroCuentaController.getById);

//Rutas para infraServicioOtroTipo
router.get('/infraServicioOtroTipo', InfraServicioOtroTipoController.list);
router.get('/infraServicioOtroTipo/:id', InfraServicioOtroTipoController.getById);
router.post('/infraServicioNuevo', InfraServicioOtroTipoController.add);
router.post('/infraServicioOfreceCuentaPredioNuevo', InfraServicioOtroTipoController.addServicioOfreceCuenta);
router.put('/infraServicioOfreceCuentaPredioUpdate/:servicioCuentaOfrece', InfraServicioOtroTipoController.updateServicioOfreceCuenta);
router.get('/infraServiciosOfreceCuenta/:ueId/:predioId', InfraServicioOtroTipoController.getserviciosOfreceCuenta);
router.get('/infraBuscaIdPreguntaServicio/:preguntaId', InfraServicioOtroTipoController.getIdCondicionServicio);

//router.get('/infraServiciosOfreceCuentaPredio', InfraServicioOtroTipoController.getserviciosOfreceCuentaPredio);

//Rutas para infraServicioSaneamiento
router.get('/infraServicioSaneamiento', InfraServicioSaneamientoController.list);
router.get('/infraServicioSaneamiento/:id', InfraServicioSaneamientoController.getById);
router.post('/infraServicioSaneamiento', InfraServicioSaneamientoController.add);
router.put('/infraServicioSaneamiento/:id', InfraServicioSaneamientoController.update);
router.delete('/infraServicioSaneamiento/:id', InfraServicioSaneamientoController.delete);
router.get('/infraServicioSaneamientoVer/:predioId', InfraServicioSaneamientoController.getServicioSaneamiento);
router.get('/infraServicioSaneamientoVerExc/:predioId', InfraServicioSaneamientoController.getServicioSaneamientoExc);

router.get('/infraServicioSaneamientoBaniosVer/:predioId', InfraServicioSaneamientoController.getSaneamientoBanios);
router.get('/infraServicioSaneamientoVestuariosVer/:predioId', InfraServicioSaneamientoController.getSaneamientoVestuarios);

//Rutas para infraServicioSaneamientoMedioEliminacionExc
router.get('/infraServicioSaneamientoMedioEliminacionExc', InfraServicioSaneamientoMedioEliminacionExcController.list);
router.get('/infraServicioSaneamientoMedioEliminacionExcOtro/:idsaneamiento/:idtipo', InfraServicioSaneamientoMedioEliminacionExcController.listOtro);
router.get('/infraServicioSaneamientoMedioEliminacionExc/:id', InfraServicioSaneamientoMedioEliminacionExcController.getById);
router.post('/infraServicioSaneamientoMedioEliminacionExc', InfraServicioSaneamientoMedioEliminacionExcController.add);
router.delete('/infraServicioSaneamientoMedioEliminacionExcAll/:idsaneamiento', InfraServicioSaneamientoMedioEliminacionExcController.deleteAll);

//Rutas para infraTenenciaTipo
router.get('/infraTenenciaTipo', InfraTenenciaTipoController.list);
router.get('/infraTenenciaTipo/:id', InfraTenenciaTipoController.getById);

//Rutas para infraTiempoSuspendidoTipo
router.get('/infraTiempoSuspendidoTipo', InfraTiempoSuspendidoTipoController.list);
router.get('/infraTiempoSuspendidoTipo/:id', InfraTiempoSuspendidoTipoController.getById);

/* //Rutas para infraTopografiaTipo
router.get('/infraTopografiaTipo',InfraPredioFotoController.list);
router.get('/infraTopografiaTipo/:id', InfraPredioFotoController.getById);
 */
//Rutas para infraTopografiaTipo
router.get('/infraTopografiaTipo', InfraTopografiaTipoController.list);
router.get('/infraTopografiaTipo/:id', InfraTopografiaTipoController.getById);

//Rutas para infraUbicacionTipo
router.get('/infraUbicacionTipo', InfraUbicacionTipoController.list);
router.get('/infraUbicacionTipo/:id', InfraUbicacionTipoController.getById);

//Rutas para infraInternet
router.post('/infraInternetServicio', infraInternetServicio.add);
router.get('/infraInternetConexionTipo', infraInternetConexionTipo.list);
router.get('/infraInternetEmpresasTipo', infraInternetEmpresasTipo.list);
router.get('/infraInternetPersonasTipo', infraInternetPersonasTipo.list);
router.get('/infraInternetDisponibilidadTipo', infraInternetDisponibilidadTipo.list);
router.get('/infraInternetDisponibilidadServicioTipo', infraInternetDisponibilidadServicioTipo.list);// gma 



//Rutas para Reportes
router.get('/reportesDatos/:idpredio', ReportesController.getReporteDatos);
router.get('/reportesCaracteristicas/:idpredio', ReportesController.getReporteCaracteristicas);
router.get('/reportesServicios/:idpredio', ReportesController.getReporteServicios);
router.get('/reportesRiesgos/:idpredio', ReportesController.getReporteRiesgos);
router.get('/reportesAmbientes/:idpredio', ReportesController.getReporteAmbientes);
/* router.get('/reportes/:id', MesTipoController.getById); */
module.exports = router;