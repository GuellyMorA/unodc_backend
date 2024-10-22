const md5 = require('md5');
const WfTramiteService = require('../../services/wftramite');
const GeneralService = require('../../services/general');

const FlujoTipo = require('../../models').flujo_tipo;
const FlujoProceso = require('../../models').flujo_proceso;
const TramiteTipo = require('../../models').tramite_tipo;
const SolicitudTramite = require('../../models').solicitud_tramite;

const InstitucioneducativaAcreditacionTipo = require('../../models').institucioneducativa_acreditacion_tipo;
const JurisdiccionGeografica = require('../../models').jurisdiccion_geografica;
const Institucioneducativa = require('../../models').institucioneducativa;
const InstitucioneducativaSucursal = require('../../models').institucioneducativa_sucursal;
const TtecInstitucioneducativaSede = require('../../models').ttec_institucioneducativa_sede;

const TtecResolucionCarrera = require('../../models').ttec_resolucion_carrera;
const TtecRegimenEstudioTipo = require('../../models').ttec_regimen_estudio_tipo;

const TtecInstitucioneducativaCarreraAutorizada = require('../../models').ttec_institucioneducativa_carrera_autorizada;

const LugarTipo = require('../../models').lugar_tipo;

const Persona = require('../../models').persona;
const Usuario = require('../../models').usuario;
const UsuarioRol = require('../../models').usuario_rol;
const MaestroInscripcion = require('../../models').maestro_inscripcion;

const TtecAdministrativoInstitutoPersona = require('../../models').ttec_administrativo_instituto_persona;
const TtecDocentePersona = require('../../models').ttec_docente_persona;
const sequelize = Institucioneducativa.sequelize;

module.exports = {
  async listaSolicitudApertura(req, res) {
    let depto = await LugarTipo.findByPk(req.params.lugar, { attributes: ['id', 'codigo']});
    if (depto.codigo.length == 1) {
      depto.codigo = '0' + depto.codigo;
    }
    let lugar = await LugarTipo.findOne({ where: { lugar_tipo_id: 1, lugar_nivel_id: 8, codigo: depto.codigo }, attributes: ['id']});
    return sequelize.query("SELECT * FROM solicitud_tramite WHERE estado = false AND codigo LIKE 'CCTP%' AND CAST(((datos::json->>'institucional')::json->>'departamento_id') AS integer) = " + lugar.id +" ORDER BY fecha_registro DESC",
      {
        type: sequelize.QueryTypes.SELECT, raw: true 
      })
      .then((aperturas) => res.status(200).send(aperturas))
      .catch((error) => { res.status(400).send(error); });
  },

  obtieneSolicitudApertura(req, res) {
    return SolicitudTramite
      .findByPk(req.params.id)
      .then((solicitudTramite) => {
        if (!solicitudTramite) {
          return res.status(404).send({
            message: 'Solicitud no encontrada',
          });
        }
        return res.status(200).send(solicitudTramite.datos);
      })
      .catch((error) => res.status(400).send(error));
  },

  nuevaSolicitudApertura(req, res) {
    return SolicitudTramite
      .create({
        datos: JSON.stringify(req.body),
        fecha_registro: new Date(),
        estado: false
      })
      .then(async(solicitudTramite) => {
        await solicitudTramite.update({
          codigo: 'CCTP' + solicitudTramite.id,
        });
        res.status(200).send({estado: 200, msg: 'Solicitud del Trámite de Apertura enviada con éxito, con el código de solicitud '+solicitudTramite.codigo+'.', id: solicitudTramite.id});//Proceda con aproximarse a la Dirección Departamental
      })
      .catch((error) => res.status(500).send({estado: 500, msg: 'No se pudo enviar la Solicitud del Trámite de Apertura.', error: error}));
  },

  async inicioTramiteApertura(req, res) {
    let estado = 200;
    let mensaje = '';
    const usuario_id = req.body.userId;
    const rol_id = req.body.roluser;
    let datos = req.body.datos;
    let flujoproceso = await FlujoProceso.findOne({
        where: {
            'flujo_tipo_id': req.body.flujotipo_id,
            'orden': 1
        },
        include: [
            {
                model: FlujoTipo,
                required: true
            }
        ]
    });
    let flujo_tipo = flujoproceso.flujo_tipo.id;
    let tarea_id = flujoproceso.id;
    let tabla = 'institucioneducativa', ie_id = '';
    let tipotramite = await TramiteTipo.findOne({ where: {'obs': 'ACCTP'} });
    if (!tipotramite) {
        estado = 500;
        res.status(200).send({ estado: estado, msg: 'El Tipo de Trámite no está habilitado.' });
        return false;
    }
    let observaciones = '';
    let tipotramite_id = tipotramite.id;
    let tramite_id = '';
    let lugarlocalidad_id = 0, distrito_id = 0;
    distrito_id = req.body.roluserlugarid;

    // console.info('datossss', usuario_id, rol_id, flujo_tipo, tarea_id, tabla, ie_id, observaciones, tipotramite_id,'', tramite_id, 'datos', lugarlocalidad_id, distrito_id);
    let result;console.info('sssssssssssss',req.body.tramite_id);
    if (req.body.tramite_id == '') {
      result = await WfTramiteService.guardarTramiteNuevo(usuario_id, rol_id, flujo_tipo, tarea_id, tabla, ie_id, observaciones, tipotramite_id, '', tramite_id, datos, lugarlocalidad_id, distrito_id);
    } else {
      tramite_id = req.body.tramite_id;
      let condicion = 'NO';
      result = await WfTramiteService.guardarTramiteEnviado(usuario_id, rol_id, flujo_tipo, tarea_id, tabla, ie_id, observaciones, condicion, tramite_id, datos, lugarlocalidad_id, distrito_id);
    }
    //result = {dato: true, msg: 'mensaje', idtramite: 10};
    if (result.dato == true) {
      mensaje = result.msg;
      tramite_id = result.idtramite;

      if (req.body.tramite_id == '') {
        await SolicitudTramite.update({
          estado: true
        }, {where: { id: req.body.solicitud_id } });
      }
    } else {
      estado = 500;
      tramite_id = '';
      mensaje = result.msg;
      console.error(result.error);
    }
    res.status(200).send({ 'estado': estado, 'msg': mensaje, 'tramite_id': tramite_id });
  },

  async inicioTramiteModificacion(req, res) {
    let estado = 200;
    let mensaje = '';
    const usuario_id = req.body.params.userId;
    const rol_id = req.body.params.roluser;
    let datos = req.body.datos;
    let resultTarea = await WfTramiteService.obtieneTarea(req.body.params.flujotipo_id, 'idflujo', '');
    
    let flujo_tipo = req.body.params.flujotipo_id;
    let tarea_id = resultTarea.tarea_actual;
    let tabla = 'institucioneducativa', ie_id = req.body.params.ie_id;
    let tipotramite = await TramiteTipo.findOne({ where: {'obs': 'MCCTP'} });
    if (!tipotramite) {
      estado = 500;
      res.status(200).send({ estado: estado, msg: 'El Tipo de Trámite no está habilitado.' });
    }
    let observaciones = 'Inicio del trámite de modificación';
    let tipotramite_id = tipotramite.id;
    let tramite_id = '';
    let lugarlocalidad_id = 0, distrito_id = 0;
    distrito_id = req.body.params.roluserlugarid;

    let institucioneducativa = await Institucioneducativa.findByPk(ie_id, { attributes: ['fecha_resolucion', 'nro_resolucion']});
    let fecha_resolucion = new Date(institucioneducativa.fecha_resolucion), fecha_actual = new Date();
    fecha_resolucion.setMonth(60);
    if (true) {
    //if (fecha_actual.getTime() > fecha_resolucion.getTime()) {
      // let result = {dato: true, msg: 'mensaje', idtramite: 10};
      let result;
      if (req.body.params.tramite_id == '') {
        result = await WfTramiteService.guardarTramiteNuevo(usuario_id, rol_id, flujo_tipo, tarea_id, tabla, ie_id, observaciones, tipotramite_id, '', tramite_id, datos, lugarlocalidad_id, distrito_id);
      } else {
        tramite_id = req.body.params.tramite_id;
        let condicion = 'NO';
        result = await WfTramiteService.guardarTramiteEnviado(usuario_id, rol_id, flujo_tipo, tarea_id, tabla, ie_id, observaciones, condicion, tramite_id, datos, lugarlocalidad_id, distrito_id);
      }
      if (result.dato == true) {
        mensaje = result.msg;
        tramite_id = result.idtramite;
      } else {
        estado = 500;
        tramite_id = '';
        mensaje = result.msg;
        console.error(result.error);
      }
      res.status(200).send({ 'estado': estado, 'msg': mensaje, 'tramite_id': tramite_id });
    } else {
      estado = 500;
      res.status(200).send({ 'estado': estado, 'msg': 'La Resolución Ministerial ' + institucioneducativa.nro_resolucion + ' aún tiene vigencia, por lo tanto no puede iniciar trámites de cambio de información.', 'tramite_id': tramite_id });
    }
  },

  async inicioTramiteAperturaSubsede(req, res) {
    let estado = 200;
    let mensaje = '';
    const usuario_id = req.body.params.userId;
    const rol_id = req.body.params.roluser;
    let datos = req.body.datos;
    let resultTarea = await WfTramiteService.obtieneTarea(req.body.params.flujotipo_id, 'idflujo', '');
    
    let flujo_tipo = req.body.params.flujotipo_id;
    let tarea_id = resultTarea.tarea_actual;
    let tabla = 'institucioneducativa', ie_id = req.body.params.ie_id;
    let tipotramite = await TramiteTipo.findOne({ where: {'obs': 'MCCTP'} });
    if (!tipotramite) {
      estado = 500;
      res.status(200).send({ estado: estado, msg: 'El Tipo de Trámite no está habilitado.' });
    }
    let observaciones = 'Inicio del trámite de modificación';
    let tipotramite_id = tipotramite.id;
    let tramite_id = '';
    let lugarlocalidad_id = 0, distrito_id = 0;
    distrito_id = req.body.params.roluserlugarid;

    //console.info('datosssssssss', usuario_id, rol_id, flujo_tipo, tarea_id, tabla, ie_id, observaciones, tipotramite_id, '', tramite_id, 'datos', lugarlocalidad_id, distrito_id);
    let result;
    if (req.body.params.tramite_id == '') {
      result = await WfTramiteService.guardarTramiteNuevo(usuario_id, rol_id, flujo_tipo, tarea_id, tabla, ie_id, observaciones, tipotramite_id, '', tramite_id, datos, lugarlocalidad_id, distrito_id);
    } else {
      tramite_id = req.body.params.tramite_id;
      let condicion = 'NO';
      result = await WfTramiteService.guardarTramiteEnviado(usuario_id, rol_id, flujo_tipo, tarea_id, tabla, ie_id, observaciones, condicion, tramite_id, datos, lugarlocalidad_id, distrito_id);
    }
    // result = {dato: true, msg: 'mensaje', idtramite: 10};
    if (result.dato == true) {
      mensaje = result.msg;
      tramite_id = result.idtramite;
    } else {
      estado = 500;
      tramite_id = '';
      mensaje = result.msg;
      console.error(result.error);
    }
    res.status(200).send({ 'estado': estado, 'msg': mensaje, 'tramite_id': tramite_id });
  },

  async verificaDepartamentalA(req, res) {
    let estado = 200;
    let mensaje = '';
    let parametros = JSON.parse(req.body.params);
    const usuario_id = parametros.userId;
    const rol_id = parametros.roluser;
    let datos = {
      tipo_tramite: parametros.tipo_tramite,
      tramite_id: parametros.tramite_id,
      procede: (req.body.procede == true || req.body.procede == 'true'),
      informe_viabilidad: (req.body.procede==true || req.body.procede=='true')?req.file.filename:req.body.informe_viabilidad,
      evaluacion: JSON.parse(req.body.evaluacion),
      observacion: req.body.observacion
    };
    let condicion = (req.body.procede==true || req.body.procede=='true')?'SI':'NO';
    let resultTarea = await WfTramiteService.obtieneTarea(parametros.tramite_id, 'idtramite', condicion);
    // if (resultTarea.flujo_tipo == '') {
    //   res.status(200).send({ estado: 500, msg: 'No se obtiene las tareas.' });
    // }
    // Query equivalente
    /*let flujoProceso = await FlujoProceso.findOne({
        where: { flujo_tipo_id: 16, 'orden': 2 },
        attributes: ['id', 'flujo_tipo_id', 'tarea_sig_id', 'es_evaluacion'],
        include: [
            {
                model: FlujoTipo,
                required: true,
            }
        ]
    });*/
    let flujo_tipo = resultTarea.flujo_tipo;
    let tarea_id = resultTarea.tarea_actual;//tarea_actual tarea_siguiente
    let tabla = 'institucioneducativa', ie_id = parametros.ie_id;
    let observaciones = 'Verifica datos y/o inspección ocular';
    let tramite_id = parametros.tramite_id;
    let lugarlocalidad_id = 0, distrito_id = 0;
    distrito_id = parametros.roluserlugarid;

    // console.info('datossss111111', usuario_id, rol_id, flujo_tipo, tarea_id, tabla, ie_id, observaciones, condicion, tramite_id, JSON.stringify(datos), lugarlocalidad_id, distrito_id);
    // let result = {dato: true, estado: 200, msg: 'mensaje de respuesta'};
    let result = await WfTramiteService.guardarTramiteEnviado(usuario_id, rol_id, flujo_tipo, tarea_id, tabla, ie_id, observaciones, condicion, tramite_id, JSON.stringify(datos), lugarlocalidad_id, distrito_id);
    if (result.dato == true) {
      mensaje = result.msg;
      if (condicion == 'NO') {
        // let resultR = {dato: true, estado: 200, msg: 'mensaje de recibido'+resultTarea.tarea_siguiente};
        let resultR = await WfTramiteService.guardarTramiteRecibido(usuario_id, resultTarea.tarea_siguiente, tramite_id);
        if (resultR.dato == false) {
          estado = 500;
          mensaje = resultR.msg;
        }
        /*else {
          mensaje = resultR.msg;
        }*/
      }
    } else {
      estado = 500;
      mensaje = result.msg;
    }
    res.status(200).send({ 'estado': estado, 'msg': mensaje, 'condicion': condicion });
  },

  async verificaNacional(req, res) {
    let estado = 200;
    let mensaje = '';
    let parametros = JSON.parse(req.body.params);
    const usuario_id = parametros.userId;
    const rol_id = parametros.roluser;
    let datos = {
      institucioneducativa_id: parametros.ie_id,
      tipo_tramite: parametros.tipo_tramite,
      tramite_id: parametros.tramite_id,
      procede: (req.body.procede == true || req.body.procede == 'true'),
      pago_arancel: (req.body.pago_arancel==true || req.body.pago_arancel=='true')?'SI':'NO',
      evaluacion: JSON.parse(req.body.evaluacion),
      observacion: req.body.observacion
    };
    let condicion = (req.body.procede==true || req.body.procede=='true')?'SI':'NO';
    let resultTarea = await WfTramiteService.obtieneTarea(parametros.tramite_id, 'idtramite', condicion);
    // if (resultTarea.flujo_tipo == '') {
    //   res.status(200).send({ estado: 500, msg: 'No se obtiene las tareas.' });
    // }
    let flujo_tipo = resultTarea.flujo_tipo;
    let tarea_id = resultTarea.tarea_actual;
    let tabla = 'institucioneducativa', ie_id = parametros.ie_id;
    let observaciones = 'Verifica datos y registra u observa';
    let tramite_id = parametros.tramite_id;
    let lugarlocalidad_id = 0, distrito_id = 0;
    distrito_id = parametros.roluserlugarid;

    // console.info('infooo', usuario_id, rol_id, flujo_tipo, tarea_id, tabla, ie_id, observaciones, evaluacion, tramite_id, JSON.stringify(datos), lugarlocalidad_id, distrito_id);
    let result = await WfTramiteService.guardarTramiteEnviado(usuario_id, rol_id, flujo_tipo, tarea_id, tabla, ie_id, observaciones, condicion, tramite_id, JSON.stringify(datos), lugarlocalidad_id, distrito_id);
    mensaje = result.msg;
    if (result.dato == true) {
      if (condicion == 'SI') {
        let resultR = await WfTramiteService.guardarTramiteRecibido(usuario_id, resultTarea.tarea_siguiente, tramite_id);
        if (resultR.dato == false) {
          estado = 500;
          mensaje = resultR.msg;
        }
      }
    } else {
      estado = 500;
    }
    res.status(200).send({ 'estado': estado, 'msg': mensaje, 'condicion': condicion });
  },

  async finalizaNacional(req, res) {
    let estado = 200;
    let mensaje = '';
    let transaction;
    let parametros = JSON.parse(req.body.params);
    const usuario_id = parametros.userId;
    const rol_id = parametros.roluser;
    let datof = {
      institucioneducativa_id: parametros.ie_id,
      tipo_tramite: parametros.tipo_tramite,
      tramite_id: parametros.tramite_id,
      numero_rm: req.body.numero_rm,
      fecha_rm: req.body.fecha_rm,
      resolucion_ministerial: (req.body.resolucion_ministerial!=null)?req.file.filename:req.body.resolucion_ministerial
    };
    let resultTarea = await WfTramiteService.obtieneTarea(parametros.tramite_id, 'idtramite', '');
    let flujo_tipo = resultTarea.flujo_tipo;
    let tarea_id = resultTarea.tarea_actual;//tarea_actual tarea_siguiente
    let tabla = 'institucioneducativa', ie_id = parametros.ie_id;
    let observaciones = 'Finaliza tramite y registra en el sistema';
    let condicion = '';
    let tramite_id = parametros.tramite_id;
    let lugarlocalidad_id = 0, distrito_id = 0;
    distrito_id = parametros.roluserlugarid;

    // console.info('datossss111111', usuario_id, rol_id, flujo_tipo, tarea_id, tabla, ie_id, observaciones, condicion, tramite_id, JSON.stringify(datof), lugarlocalidad_id, distrito_id);
    // let result = {dato: true, estado: 200, msg: 'mensaje de respuesta'};
    let result = await WfTramiteService.guardarTramiteEnviado(usuario_id, rol_id, flujo_tipo, tarea_id, tabla, ie_id, observaciones, condicion, tramite_id, JSON.stringify(datof), lugarlocalidad_id, distrito_id);
    if (result.dato == true) {
      mensaje = result.msg;
      let gen_codigos_le = [];
      let personas_id = [];
      let codigo_le = 0;
      transaction = await sequelize.transaction();
      try {
        let gestion = await GeneralService.getGestionTipo();
        let ie_tipo = await GeneralService.getInstitucioneducativaTipo();
        
        let datosTramite = await WfTramiteService.obtieneDatosTarea(tramite_id, 1);
        if (datosTramite.datos != '') {
          let datos = JSON.parse(datosTramite.datos);
          let ieAcreditacionTipo = await InstitucioneducativaAcreditacionTipo.findAll({ where: {'obs': 'CCTP'}, attributes: ['id'], order: ['id'] });
          let regimen = await TtecRegimenEstudioTipo.findOne({ where: {'descripcion': 'CCTP'}, attributes: ['id'] });
          if (parametros.tipo_tramite.includes(1)) {//Apertura
            let persona = await Persona.findOne({ where: {carnet: datos.propietario.cedula_identidad, complemento: datos.propietario.complemento} });
            if (persona == null) {
              persona = await Persona.create({
                idioma_materno_id: 0, //Sin dato
                genero_tipo_id: parseInt(datos.propietario.genero_tipo_id),
                sangre_tipo_id: 0, //Ninguno
                estadocivil_tipo_id: 0, //Sin dato
                carnet: datos.propietario.cedula_identidad,
                // rda: 0,
                // libreta_militar: '',
                // pasaporte: '',
                paterno: datos.propietario.paterno,
                materno: datos.propietario.materno,
                nombre: datos.propietario.nombre,
                fecha_nacimiento: datos.propietario.fecha_nacimiento,
                segip_id: parseInt(datos.propietario.segip_id),
                complemento: datos.propietario.complemento,
                activo: true,
                // correo: '',
                // foto: '',
                // celular: '',
                direccion: datos.propietario.direccion,
                esvigente: true,
                // esvigente_apoderado: 1,
                // count_edit: 0,
                // obs_segip: '',
                es_extranjero: false,
                expedido_id: parseInt(datos.propietario.expedido)
              }); //, { transaction }
              personas_id.push(persona.id);
            }

            let coordenadas = datos.institucional.geolocalizacion == '' ? ['', ''] : JSON.parse(datos.institucional.geolocalizacion);
            codigo_le = await getCodeGenerateLE(datos.institucional.departamento_id, datos.institucional.provincia_id, datos.institucional.municipio_id);
            gen_codigos_le.push(codigo_le);

            let jurisdiccionGeografica = await JurisdiccionGeografica.create({
              id: codigo_le,
              lugar_tipo_id_localidad: parseInt(datos.institucional.departamento_id),
              lugar_tipo_id_distrito: 31352, //parseInt(datos.institucional.provincia_id), //31352 siguiendo ejemplo de ttec
              obs: 'Sede Central CCTP',
              cordx: coordenadas[0],
              cordy: coordenadas[1],
              // distrito_tipo_id: null,
              lugar_tipo_id_localidad2012: parseInt(datos.institucional.comunidad_id),
              circunscripcion_tipo_id: 1, //1: Circunscripcion #1
              // cod_nuc: '',
              // des_nuc: '',
              direccion: datos.institucional.direccion,
              zona: datos.institucional.zona,
              juridiccion_acreditacion_tipo_id: 1, //0: No acreditada y en proceso de regularización, 1: Acreditada y Legal
              validacion_geografica_tipo_id: 0, //0: Sin validar, 1: Coordenada validada en operativo
              // fecha_modificacion_localizacion: null,
              // fecha_modificacion_coordenada: null,
              // fecha_modificacion: null,
              fecha_registro: new Date(),
              usuario_id: usuario_id
            });
            
            let codigo_ue = await getCodeGenerateUE(jurisdiccionGeografica.id);
            let institucioneducativa = await Institucioneducativa.create({
              id: codigo_ue,
              le_juridicciongeografica_id: jurisdiccionGeografica.id,
              estadoinstitucion_tipo_id: 10, //10: Abierta
              convenio_tipo_id: 0, //0: sin dato
              dependencia_tipo_id: 3, //0: Privada
              institucioneducativa_tipo_id: ie_tipo, //CCTP
              orgcurricular_tipo_id: 0, //0: Sin definir
              institucioneducativa: 'CENTRO DE CAPACITACIÓN TÉCNICA ' + datos.institucional.nombre.toUpperCase(),
              rue_ue: null, //falta generar
              fecha_resolucion: req.body.fecha_rm,
              nro_resolucion: req.body.numero_rm,
              obs_rue: 'Apertura, Centro de Capacitación',
              des_ue_antes: tramite_id,
              fecha_creacion: new Date(),
              // fecha_cierre: null,
              institucioneducativa_acreditacion_tipo_id: ieAcreditacionTipo[0].id, //Acreditada y Legal CCTP
              obs_rue2: null,
              des_ue_antes2: datos.institucional.sigla,
              fecha_registro: new Date(),
              // fecha_modificacion: null
            }, { transaction });

            let ttecIeSede = await TtecInstitucioneducativaSede.create({
              institucioneducativa_id: institucioneducativa.id,
              sede: institucioneducativa.id, // De donde sale
              // fecha_cierre: null,
              estado: true,
              observacion: 'sede central cctp',
              fecha_registro: new Date(),
              persona_id: persona.id
            }, { transaction });

            for (var curso of datos.cursos_capacitacion) {
              let ttecIeSede = await TtecInstitucioneducativaCarreraAutorizada.create({
                institucioneducativa_id: institucioneducativa.id,
                ttec_carrera_tipo_id: curso.curso_capacitacion,
                fecha_registro: new Date(),
                es_enviado: false,
                es_vigente: true
              }, { transaction });
    
              let ttecResolucionCarrera = await TtecResolucionCarrera.create({
                descripcion: 'Resolución Ministerial CCTP',
                numero: req.body.numero_rm,
                path: '', //Ruta de la RM
                fecha: req.body.fecha_rm,
                // resuelve: '',
                ttec_resolucion_tipo_id: 1, //Resolucion Ministerial
                ttec_institucioneducativa_carrera_autorizada_id: ttecIeSede.id,
                fecha_registro: new Date(),
                // fecha_modificacion: null,
                tiempo_estudio: parseInt(curso.tiempo),
                carga_horaria: parseInt(curso.carga_horaria),
                operacion: 'APERTURA',
                nivel_tipo_id: 502, //Capacitación o crear otro catalogo
                ttec_regimen_estudio_tipo_id: (regimen) ? regimen.id : 4 //Mensual
              }, { transaction });
            }
            
            for (var personal of datos.personal_administrativo) {
              let complemento = personal.complemento == undefined ? '' : personal.complemento;
              let personaAdm = await Persona.findOne({ where: {carnet: personal.cedula_identidad, complemento: complemento} });
              if (personaAdm == null) {
                personaAdm = await Persona.create({
                  idioma_materno_id: 0, //Sin dato
                  genero_tipo_id: parseInt(personal.genero_tipo_id),
                  sangre_tipo_id: 0, //Ninguno
                  estadocivil_tipo_id: 0, //Sin dato
                  carnet: personal.cedula_identidad,
                  // rda: 0,
                  // libreta_militar: '',
                  // pasaporte: '',
                  paterno: personal.paterno,
                  materno: personal.materno,
                  nombre: personal.nombre,
                  fecha_nacimiento: personal.fecha_nacimiento,
                  segip_id: (personal.segip_id) ? parseInt(personal.segip_id) : 0,
                  complemento: complemento,
                  activo: true,
                  // correo: '',
                  // foto: '',
                  // celular: '',
                  direccion: personal.direccion,
                  esvigente: true,
                  // esvigente_apoderado: 1,
                  // count_edit: 0,
                  // obs_segip: '',
                  es_extranjero: false,
                  expedido_id: parseInt(personal.expedido)
                }); //, { transaction }
                personas_id.push(personaAdm.id);
              }

              let ttecAdministrativoInstitutoPersona = await TtecAdministrativoInstitutoPersona.findOne({ where: {persona_id: personaAdm.id, institucioneducativa_id: institucioneducativa.id} });
              if (ttecAdministrativoInstitutoPersona == null) {
                ttecAdministrativoInstitutoPersona = await TtecAdministrativoInstitutoPersona.create({
                  persona_id: personaAdm.id,
                  fecha_registro: new Date(),
                  es_vigente: true,
                  ttec_cargo_designacion_tipo_id: 4, //Personal CCTP
                  gestion_tipo_id: gestion,
                  institucioneducativa_id: institucioneducativa.id,
                  ttec_cargo_tipo_id: parseInt(personal.cargo),
                  ttec_formacion_tipo_id: parseInt(personal.formacion_profesional),
                  tipo_contrato: req.body.tipo_contrato,
                  financiamiento_tipo_id: 0, //No aplica
                  item: 0 //Valor no definido
                }, { transaction });
              } else {
                await ttecAdministrativoInstitutoPersona.update({
                  es_vigente: true,
                  fecha_modificacion: new Date()
                }, { transaction });
              }
            }

            for (var facilitador of datos.facilitadores) {
              let complemento = facilitador.complemento == undefined ? '' : facilitador.complemento;
              let personaFacilitador = await Persona.findOne({ where: {carnet: facilitador.cedula_identidad, complemento: complemento} });
              if (personaFacilitador == null) {
                personaFacilitador = await Persona.create({
                  idioma_materno_id: 0, //Sin dato
                  genero_tipo_id: parseInt(facilitador.genero_tipo_id),
                  sangre_tipo_id: 0, //Ninguno
                  estadocivil_tipo_id: 0, //Sin dato
                  carnet: facilitador.cedula_identidad,
                  // rda: 0,
                  // libreta_militar: '',
                  // pasaporte: '',
                  paterno: facilitador.paterno,
                  materno: facilitador.materno,
                  nombre: facilitador.nombre,
                  fecha_nacimiento: facilitador.fecha_nacimiento,
                  segip_id: (facilitador.segip_id) ? parseInt(facilitador.segip_id) : 0,
                  complemento: complemento,
                  activo: true,
                  // correo: '',
                  // foto: '',
                  // celular: '',
                  direccion: facilitador.direccion,
                  esvigente: true,
                  // esvigente_apoderado: 1,
                  // count_edit: 0,
                  // obs_segip: '',
                  es_extranjero: false,
                  expedido_id: parseInt(facilitador.expedido)
                }); //, { transaction }
                personas_id.push(personaFacilitador.id);
              }

              let ttecDocentePersona = await TtecDocentePersona.findOne({ where: {persona_id: personaFacilitador.id, institucioneducativa_id: institucioneducativa.id} });
              if (ttecDocentePersona == null) {
                ttecDocentePersona = await TtecDocentePersona.create({
                  institucioneducativa_id: institucioneducativa.id,
                  doc_experiencia_laboral: false,
                  doc_cursos_respaldo: false,
                  fecha_registro: new Date(),
                  persona_id: personaFacilitador.id,
                  es_vigente: true,//Puede que cambie de facilitador en academico
                  gestion_tipo_id: gestion,
                  item: 0, //Valor no definido
                  ttec_cargo_designacion_tipo_id: 4, //Personal cctp
                  financiamiento_tipo_id: 0, //No aplica
                  ttec_cargo_tipo_id: parseInt(facilitador.cargo),
                  ttec_formacion_tipo_id: parseInt(facilitador.formacion_profesional),
                  tipo_contrato: req.body.tipo_contrato
                }, { transaction });
              } else {
                await ttecDocentePersona.update({
                  es_vigente: true,
                  fecha_modificacion: new Date()
                }, { transaction });
              }
            }

            // Registro de propietario
            let ttecAdministrativoInstitutoPersona = await TtecAdministrativoInstitutoPersona.findOne({ where: {persona_id: persona.id, institucioneducativa_id: institucioneducativa.id} });
            if (ttecAdministrativoInstitutoPersona == null) {
              ttecAdministrativoInstitutoPersona = await TtecAdministrativoInstitutoPersona.create({
                persona_id: persona.id,
                fecha_registro: new Date(),
                es_vigente: true,
                ttec_cargo_designacion_tipo_id: 4, //Personal CCTP
                gestion_tipo_id: gestion,
                institucioneducativa_id: institucioneducativa.id,
                ttec_cargo_tipo_id: 21,
                ttec_formacion_tipo_id: 1,
                tipo_contrato: 'FIJO',
                financiamiento_tipo_id: 0, //No aplica
                item: 0 //Valor no definido
              }, { transaction });
            } else {
              await ttecAdministrativoInstitutoPersona.update({
                es_vigente: true,
                fecha_modificacion: new Date()
              }, { transaction });
            }

            let usuario = await Usuario.findOne({ where: {persona_id: persona.id} });
            if (usuario == null) {
              usuario = await Usuario.create({
                persona_id: persona.id,
                username: datos.propietario.cedula_identidad,
                password: md5(datos.propietario.cedula_identidad),
                fecha_registro: new Date(),
                // password2: '',
                esactivo: true,
                // estadopassword: null
              }, { transaction });
            }

            //Definir el Rol para el usuario que hara el tramite (Director u otro)
            let usuarioRol = await UsuarioRol.findOne({ where: {usuario_id: usuario.id, rol_tipo_id: 9} });
            if (usuarioRol == null) {
              usuarioRol = await UsuarioRol.create({
                rol_tipo_id: 9, //Director
                usuario_id: usuario.id,
                esactivo: true,
                lugar_tipo_id: 1,
                // circunscripcion_tipo_id: null,
                sub_sistema: 'CCTP' //Verificar si ya existe el usuario con ese rol y 
              }, { transaction });
            }
            
            //Inserción temporal a maestroInscripcion para la autenticación (Se supone que hace el trigger)
            //let institucioneducativaSucursal = await InstitucioneducativaSucursal.findOne({ where: {'institucioneducativa_id': institucioneducativa.id} });
            let institucioneducativaSucursal = await InstitucioneducativaSucursal.create({
              sucursal_tipo_id: 1,
              institucioneducativa_id: institucioneducativa.id,
              gestion_tipo_id: gestion,
              le_juridicciongeografica_id: jurisdiccionGeografica.id,
              nombre_subcea: '',
              cod_cerrada_id: 10,
              periodo_tipo_id: 1,
              turno_tipo_id: 0,
              direccion: '',
              zona: '',
              esabierta: true
            }, { transaction });

            let maestroInscripcion = await MaestroInscripcion.create({
              cargo_tipo_id: 1, //Director
              formacion_tipo_id: 0, //Ninguna
              institucioneducativa_id: institucioneducativa.id,
              rda_planillas_id: 0,
              persona_id: persona.id,
              gestion_tipo_id: gestion,
              especialidad_tipo_id: 0,
              financiamiento_tipo_id: 0,
              periodo_tipo_id: 5, //Modular, no corresponde
              ref: 0,
              estadomaestro_id: 1, //Activo
              rol_tipo_id: 9, //Director
              institucioneducativa_sucursal_id: institucioneducativaSucursal.id,
              normalista: false,
              idioma_materno_id: 0, //Sin dato,
              leeescribebraile: false,
              // estudia_idioma_materno_id: null,
              formaciondescripcion: '',
              // lugar_tipo: null,
              // item_director: null,
              // horas: null,
              // item: null,
              fecha_registro: new Date(),
              // fecha_modificacion: null,
              es_vigente_administrativo: true,
              // unidad_militar_tipo_id: 0,
              // recinto_penitenciario_tipo_id: 0,
              // educacion_diversa_tipo_id: 0
            }, { transaction });
          }
          if (parametros.tipo_tramite.includes(2)) {//Ratificacion
            if (datos.ratificacion.central.ratificar == true) {
              let ttecIeCarreraAutorizada = await TtecInstitucioneducativaCarreraAutorizada.findAll({
                where: {
                  institucioneducativa_id: datos.institucioneducativa_id,
                  es_vigente: true
                },
                attributes: ['id', 'ttec_carrera_tipo_id'],
                include: [
                  {
                    model: TtecResolucionCarrera,
                    required: true,
                    attributes: ['tiempo_estudio', 'carga_horaria']
                  }
                ]
              });

              for (var carreraAutorizada of ttecIeCarreraAutorizada) {
                await carreraAutorizada.update({
                  es_vigente: false,
                  fecha_modificacion: new Date()
                }, {where: { id: carreraAutorizada.id } }, { transaction });

                let ttecIeSedeRat = await TtecInstitucioneducativaCarreraAutorizada.create({
                  institucioneducativa_id: parseInt(datos.institucioneducativa_id),
                  ttec_carrera_tipo_id: carreraAutorizada.ttec_carrera_tipo_id,
                  fecha_registro: new Date(),
                  es_enviado: false,
                  es_vigente: true
                }, { transaction });

                let ttecResolucionCarrera = await TtecResolucionCarrera.create({
                  descripcion: 'Resolución Ministerial CCTP',
                  numero: req.body.numero_rm,
                  path: '', //Ruta de la RM
                  fecha: req.body.fecha_rm,
                  // resuelve: '',
                  ttec_resolucion_tipo_id: 1, //Resolucion Ministerial
                  ttec_institucioneducativa_carrera_autorizada_id: ttecIeSedeRat.id,
                  fecha_registro: new Date(),
                  tiempo_estudio: carreraAutorizada.ttec_resolucion_carrera.tiempo,
                  carga_horaria: carreraAutorizada.ttec_resolucion_carrera.carga_horaria,
                  operacion: 'RATIFICACION',
                  nivel_tipo_id: 502, //Capacitación o crear otro catalogo
                  ttec_regimen_estudio_tipo_id: (regimen) ? regimen.id : 4 //Mensual
                }, { transaction });
              }
            }

            for (var subsede of datos.ratificacion.subsede) {
              if (subsede.ratificar == true) {
                let ttecIeCarreraAutorizada = await TtecInstitucioneducativaCarreraAutorizada.findAll({
                  where: {
                    institucioneducativa_id: subsede.id,
                    es_vigente: true
                  },
                  attributes: ['id', 'ttec_carrera_tipo_id'],
                  include: [
                    {
                      model: TtecResolucionCarrera,
                      required: true,
                      attributes: ['tiempo_estudio', 'carga_horaria']
                    }
                  ]
                });

                for (var carreraAutorizada of ttecIeCarreraAutorizada) {
                  await carreraAutorizada.update({
                    es_vigente: false,
                    fecha_modificacion: new Date()
                  }, {where: { id: carreraAutorizada.id } }, { transaction });

                  let ttecIeSedeRat = await TtecInstitucioneducativaCarreraAutorizada.create({
                    institucioneducativa_id: parseInt(subsede.id),
                    ttec_carrera_tipo_id: parseInt(carreraAutorizada.ttec_carrera_tipo_id),
                    fecha_registro: new Date(),
                    es_enviado: false,
                    es_vigente: true
                  }, { transaction });

                  let ttecResolucionCarrera = await TtecResolucionCarrera.create({
                    descripcion: 'Resolución Ministerial CCTP',
                    numero: req.body.numero_rm,
                    path: '', //Ruta de la RM
                    fecha: req.body.fecha_rm,
                    // resuelve: '',
                    ttec_resolucion_tipo_id: 1, //Resolucion Ministerial
                    ttec_institucioneducativa_carrera_autorizada_id: ttecIeSedeRat.id,
                    fecha_registro: new Date(),
                    tiempo_estudio: parseInt(carreraAutorizada.ttec_resolucion_carrera.tiempo),
                    carga_horaria: parseInt(carreraAutorizada.ttec_resolucion_carrera.carga_horaria),
                    operacion: 'RATIFICACION',
                    nivel_tipo_id: 502, //Capacitación o crear otro catalogo
                    ttec_regimen_estudio_tipo_id: (regimen) ? regimen.id : 4 //Mensual
                  }, { transaction });
                }
              }
            }
          }
          if (parametros.tipo_tramite.includes(3)) {//Ampliacion
            if (datos.ampliacion.central.ampliar == true) {
              for (var curso of datos.ampliacion.central.cursos) {
                let ttecIeSedeAmp = await TtecInstitucioneducativaCarreraAutorizada.create({
                  institucioneducativa_id: parseInt(datos.institucioneducativa_id),
                  ttec_carrera_tipo_id: parseInt(curso.curso_capacitacion),
                  fecha_registro: new Date(),
                  es_enviado: false,
                  es_vigente: true
                }, { transaction });

                let ttecResolucionCarrera = await TtecResolucionCarrera.create({
                  descripcion: 'Resolución Ministerial CCTP',
                  numero: req.body.numero_rm,
                  path: '', //Ruta de la RM
                  fecha: req.body.fecha_rm,
                  // resuelve: '',
                  ttec_resolucion_tipo_id: 1, //Resolucion Ministerial
                  ttec_institucioneducativa_carrera_autorizada_id: ttecIeSedeAmp.id,
                  fecha_registro: new Date(),
                  tiempo_estudio: parseInt(curso.tiempo),
                  carga_horaria: parseInt(curso.carga_horaria),
                  operacion: 'AMPLIACION',
                  nivel_tipo_id: 502, //Capacitación o crear otro catalogo
                  ttec_regimen_estudio_tipo_id: (regimen) ? regimen.id : 4 //Mensual
                }, { transaction });
              }
            }

            for (var subsede of datos.ampliacion.subsede) {
              if (subsede.ampliar == true) {
                for (var curso of subsede.cursos) {
                  let ttecIeSedeAmp = await TtecInstitucioneducativaCarreraAutorizada.create({
                    institucioneducativa_id: parseInt(subsede.id),
                    ttec_carrera_tipo_id: parseInt(curso.curso_capacitacion),
                    fecha_registro: new Date(),
                    es_enviado: false,
                    es_vigente: true
                  }, { transaction });

                  let ttecResolucionCarrera = await TtecResolucionCarrera.create({
                    descripcion: 'Resolución Ministerial CCTP',
                    numero: req.body.numero_rm,
                    path: '', //Ruta de la RM
                    fecha: req.body.fecha_rm,
                    // resuelve: '',
                    ttec_resolucion_tipo_id: 1, //Resolucion Ministerial
                    ttec_institucioneducativa_carrera_autorizada_id: ttecIeSedeAmp.id,
                    fecha_registro: new Date(),
                    tiempo_estudio: parseInt(curso.tiempo),
                    carga_horaria: parseInt(curso.carga_horaria),
                    operacion: 'AMPLIACION',
                    nivel_tipo_id: 502, //Capacitación o crear otro catalogo
                    ttec_regimen_estudio_tipo_id: (regimen) ? regimen.id : 4 //Mensual
                  }, { transaction });
                }
              }
            }
          }
          if (parametros.tipo_tramite.includes(4)) {//Cambio de razon social
            await Institucioneducativa.update({
              institucioneducativa: 'CENTRO DE CAPACITACIÓN TÉCNICA ' + datos.razon_social.nombre.toUpperCase(),
              fecha_modificacion: new Date()
            }, {where: { id: parametros.ie_id } }, { transaction });
          }
          if (parametros.tipo_tramite.includes(5)) {//Cambio de domicilio
            if (datos.domicilio.central.cambiar_direccion == true) {
              let coordenadas = datos.domicilio.central.geolocalizacion == '' ? ['', ''] : JSON.parse(datos.domicilio.central.geolocalizacion);
              codigo_le = await getCodeGenerateLE(datos.domicilio.central.departamento_id, datos.domicilio.central.provincia_id, datos.domicilio.central.municipio_id);
              gen_codigos_le.push(codigo_le);

              let jurisdiccionGeografica = await JurisdiccionGeografica.create({
                id: codigo_le,
                lugar_tipo_id_localidad: parseInt(datos.domicilio.central.departamento_id),
                lugar_tipo_id_distrito: 31352, //parseInt(datos.domicilio.central.provincia_id), //31352 siguiendo ejemplo de Institutos
                obs: 'Sede Central CCTP',
                cordx: coordenadas[0],
                cordy: coordenadas[1],
                // distrito_tipo_id: null,
                lugar_tipo_id_localidad2012: parseInt(datos.domicilio.central.comunidad_id),
                circunscripcion_tipo_id: 1, //1: Circunscripcion #1
                // cod_nuc: '',
                // des_nuc: '',
                direccion: datos.domicilio.central.actual_direccion,
                zona: datos.domicilio.central.actual_zona,
                juridiccion_acreditacion_tipo_id: 1, //0: No acreditada y en proceso de regularización, 1: Acreditada y Legal
                validacion_geografica_tipo_id: 0, //0: Sin validar, 1: Coordenada validada en operativo
                // fecha_modificacion_localizacion: null,
                // fecha_modificacion_coordenada: null,
                fecha_modificacion: new Date(),
                fecha_registro: new Date(),
                usuario_id: usuario_id
              });//, { transaction }

              await Institucioneducativa.update({
                le_juridicciongeografica_id: jurisdiccionGeografica.id,
                fecha_modificacion: new Date()
              }, {where: { id: datos.institucioneducativa_id } }, { transaction });
            }

            for (var subsede of datos.domicilio.subsede) {
              if (subsede.cambiar_direccion == true) {
                let coordenadas = subsede.geolocalizacion == '' ? ['', ''] : JSON.parse(subsede.geolocalizacion);
                codigo_le = await getCodeGenerateLE(subsede.departamento_id, subsede.provincia_id, subsede.municipio_id);
                gen_codigos_le.push(codigo_le);
                let jurisdiccionGeografica = await JurisdiccionGeografica.create({
                  id: codigo_le,
                  lugar_tipo_id_localidad: parseInt(subsede.departamento_id),
                  lugar_tipo_id_distrito: 31352, //parseInt(subsede.provincia_id), //31352 siguiendo ejemplo de Institutos
                  obs: 'Subsede CCTP',
                  cordx: coordenadas[0],
                  cordy: coordenadas[1],
                  // distrito_tipo_id: null,
                  lugar_tipo_id_localidad2012: parseInt(subsede.comunidad_id),
                  circunscripcion_tipo_id: 1, //1: Circunscripcion #1
                  // cod_nuc: '',
                  // des_nuc: '',
                  direccion: subsede.actual_direccion,
                  zona: subsede.actual_zona,
                  juridiccion_acreditacion_tipo_id: 1, //0: No acreditada y en proceso de regularización, 1: Acreditada y Legal
                  validacion_geografica_tipo_id: 0, //0: Sin validar, 1: Coordenada validada en operativo
                  // fecha_modificacion_localizacion: null,
                  // fecha_modificacion_coordenada: null,
                  fecha_modificacion: new Date(),
                  fecha_registro: new Date(),
                  usuario_id: usuario_id
                });//, { transaction }

                await Institucioneducativa.update({
                  le_juridicciongeografica_id: jurisdiccionGeografica.id,
                  fecha_modificacion: new Date()
                }, {where: { id: subsede.id } }, { transaction });
              }
            }
          }
          if (parametros.tipo_tramite.includes(6)) {//Cambio de derecho propietario FLTA REVISAR
            /*await TtecAdministrativoInstitutoPersona.update({
              es_vigente: false,
              fecha_modificacion: new Date()
            }, {where: { persona_id: datos.derecho_propietario.apropietario_id, institucioneducativa_id: datos.institucioneducativa_id, ttec_cargo_designacion_tipo_id: 4, ttec_cargo_tipo_id: 21 } }, { transaction });*/
            await Usuario.update({
              esactivo: false
            }, {where: { persona_id: datos.derecho_propietario.apropietario_id } }, { transaction });
            await Persona.update({
              activo: false,
              esvigente: false
            }, {where: { id: datos.derecho_propietario.apropietario_id } }, { transaction });

            let complemento = datos.derecho_propietario.complemento==undefined?'':datos.derecho_propietario.complemento;
            let personaProp = await Persona.findOne({ where: {carnet: datos.derecho_propietario.cedula_identidad, complemento: complemento} });
            if (personaProp == null) {
              personaProp = await Persona.create({
                idioma_materno_id: 0, //Sin dato
                genero_tipo_id: parseInt(datos.derecho_propietario.genero_tipo_id),
                sangre_tipo_id: 0, //Ninguno
                estadocivil_tipo_id: 0, //Sin dato
                carnet: datos.derecho_propietario.cedula_identidad,
                // rda: 0,
                // libreta_militar: '',
                // pasaporte: '',
                paterno: datos.derecho_propietario.paterno,
                materno: datos.derecho_propietario.materno,
                nombre: datos.derecho_propietario.nombres,
                fecha_nacimiento: datos.derecho_propietario.fecha_nacimiento,
                segip_id: parseInt(datos.derecho_propietario.segip_id),
                complemento: complemento,
                activo: true,
                // correo: '',
                // foto: '',
                // celular: '',
                direccion: datos.derecho_propietario.direccion,
                esvigente: true,
                // esvigente_apoderado: 1,
                // count_edit: 0,
                // obs_segip: '',
                es_extranjero: false,
                expedido_id: parseInt(datos.derecho_propietario.expedido)
              }, { transaction });
            }

            //Tal registro no se registra, mas bien seria extendido en institucioneducativa_sede
            // let ttecAdministrativoInstitutoPersona = await TtecAdministrativoInstitutoPersona.create({
            //   persona_id: personaProp.id,
            //   fecha_registro: new Date(),
            //   // fecha_modificacion: null,
            //   es_vigente: true,
            //   ttec_cargo_designacion_tipo_id: 4, //Personal CCTP
            //   gestion_tipo_id: gestion,
            //   institucioneducativa_id: parseInt(datos.institucioneducativa_id),
            //   ttec_cargo_tipo_id: 21, //"Personal de Apoyo", crear registros en el catalogo
            //   financiamiento_tipo_id: 0, //No aplica
            //   item: 0 //Valor no definido
            // }, { transaction });

            let usuarioProp = await Usuario.create({
              persona_id: personaProp.id,
              username: datos.derecho_propietario.cedula_identidad,
              password: md5(datos.derecho_propietario.cedula_identidad),
              fecha_registro: new Date(),
              // password2: '',
              esactivo: true,
              // estadopassword: null
            }, { transaction });

            let usuarioRol = await UsuarioRol.create({
              rol_tipo_id: 9, //Director
              usuario_id: usuarioProp.id,
              esactivo: true,
              lugar_tipo_id: 1,
              // circunscripcion_tipo_id: null,
              sub_sistema: 'CCTP'
            }, { transaction });

            //Inserción temporal a maestroInscripcion para la autenticación
            let institucioneducativaSucursal = await InstitucioneducativaSucursal.findOne({ where: {'institucioneducativa_id': datos.institucioneducativa_id*1} });
            let maestroInscripcion = await MaestroInscripcion.create({
              cargo_tipo_id: 1, //Director
              formacion_tipo_id: 0, //Ninguna
              institucioneducativa_id: parseInt(datos.institucioneducativa_id),
              rda_planillas_id: 0,
              persona_id: personaProp.id,
              gestion_tipo_id: gestion,
              especialidad_tipo_id: 0,
              financiamiento_tipo_id: 0,
              periodo_tipo_id: 5, //Modular, no corresponde
              ref: 0,
              estadomaestro_id: 1, //Activo
              rol_tipo_id: 9, //Director
              institucioneducativa_sucursal_id: institucioneducativaSucursal.id,
              normalista: false,
              idioma_materno_id: 0, //Sin dato,
              leeescribebraile: false,
              // estudia_idioma_materno_id: null,
              formaciondescripcion: '',
              // lugar_tipo: null,
              // item_director: null,
              // horas: null,
              // item: null,
              fecha_registro: new Date(),
              // fecha_modificacion: null,
              es_vigente_administrativo: true,
              // unidad_militar_tipo_id: 0,
              // recinto_penitenciario_tipo_id: 0,
              // educacion_diversa_tipo_id: 0
            }, { transaction });
          }
          if (parametros.tipo_tramite.includes(7)) {//Cierre del Centro
            if (datos.cierre_centro.central.cerrar == true) {
              await Institucioneducativa.update({
                estadoinstitucion_tipo_id: 19, //10 Apertura, 19 cerrado
                institucioneducativa_acreditacion_tipo_id: 5,//Del catalogo
                fecha_cierre: new Date().toString().substring(0, 10),
                fecha_modificacion: new Date()
              }, {where: { id: datos.institucioneducativa_id } }, { transaction });

              await TtecInstitucioneducativaSede.update({
                estado: false,
                fecha_cierre: new Date()
              }, { where: { institucioneducativa_id: datos.institucioneducativa_id, sede: datos.institucioneducativa_id } }, { transaction });
            }

            for (var subsede of datos.cierre_centro.subsede) {
              if (subsede.cerrar == true || datos.cierre_centro.central.cerrar == true) {
                await Institucioneducativa.update({
                  estadoinstitucion_tipo_id: 19,
                  institucioneducativa_acreditacion_tipo_id: 5,
                  fecha_cierre: new Date().toString().substring(0, 10),
                  fecha_modificacion: new Date()
                }, {where: { id: subsede.id } }, { transaction });

                await TtecInstitucioneducativaSede.update({
                  estado: false,
                  fecha_cierre: new Date()
                }, { where: { institucioneducativa_id: subsede.id, sede: datos.institucioneducativa_id } }, { transaction });
              }
            }
          }
          if (parametros.tipo_tramite.includes(8)) {//Apertura de Subsede
            let ieSedeCentral = await TtecInstitucioneducativaSede.findOne({ where: { institucioneducativa_id: parseInt(datos.institucioneducativa_id), sede: parseInt(datos.institucioneducativa_id) }, attributes: ['persona_id'] });
            // let depto = await sequelize.query('SELECT CAST(codigo AS INTEGER) FROM lugar_tipo WHERE id='+(datos.institucional.departamento_id*1)+' AND lugar_nivel_id=8', { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
            // let provincia = await sequelize.query('SELECT CAST(codigo AS INTEGER) FROM lugar_tipo WHERE id='+(datos.institucional.provincia_id*1)+' AND lugar_nivel_id=9', { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
            // let municipio = await sequelize.query('SELECT CAST(codigo AS INTEGER) FROM lugar_tipo WHERE id='+(datos.institucional.municipio_id*1)+' AND lugar_nivel_id=10', { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
            let coordenadas = datos.institucional.geolocalizacion == '' ? ['', ''] : JSON.parse(datos.institucional.geolocalizacion);
            codigo_le = await getCodeGenerateLE(datos.institucional.departamento_id, datos.institucional.provincia_id, datos.institucional.municipio_id);
            gen_codigos_le.push(codigo_le);

            let jurisdiccionGeografica = await JurisdiccionGeografica.create({
              id: codigo_le,
              lugar_tipo_id_localidad: parseInt(datos.institucional.departamento_id),
              lugar_tipo_id_distrito: 31352, //parseInt(datos.institucional.provincia_id), //31352 siguiendo ejemplo de Institutos
              obs: 'Subsede CCTP',
              cordx: coordenadas[0],
              cordy: coordenadas[1],
              // distrito_tipo_id: null,
              lugar_tipo_id_localidad2012: parseInt(datos.institucional.comunidad_id),
              circunscripcion_tipo_id: 1, //1: Circunscripcion #1
              // cod_nuc: '',
              // des_nuc: '',
              direccion: datos.institucional.direccion,
              zona: datos.institucional.zona,
              juridiccion_acreditacion_tipo_id: 1, //0: No acreditada y en proceso de regularización, 1: Acreditada y Legal
              validacion_geografica_tipo_id: 0, //0: Sin validar, 1: Coordenada validada en operativo
              // fecha_modificacion_localizacion: null,
              // fecha_modificacion_coordenada: null,
              // fecha_modificacion: null,
              fecha_registro: new Date(),
              usuario_id: usuario_id
            });

            let codigo_ue = await getCodeGenerateUE(jurisdiccionGeografica.id);
            let institucioneducativa = await Institucioneducativa.create({
              id: codigo_ue,
              le_juridicciongeografica_id: jurisdiccionGeografica.id,
              estadoinstitucion_tipo_id: 10, //10: Abierta
              convenio_tipo_id: 0, //0: sin dato
              dependencia_tipo_id: 3, //3: Privada
              institucioneducativa_tipo_id: ie_tipo, //CCTP
              orgcurricular_tipo_id: 0, //0: Sin definir
              institucioneducativa: datos.institucional.nombre.toUpperCase(),
              rue_ue: null, //falta generar
              fecha_resolucion: req.body.fecha_rm,
              nro_resolucion: req.body.numero_rm,
              obs_rue: 'Apertura, Subsede de Capacitación',
              des_ue_antes: tramite_id,
              fecha_creacion: new Date(),
              // fecha_cierre: null,
              institucioneducativa_acreditacion_tipo_id: ieAcreditacionTipo[0].id, //Acreditada y Legal CCTP
              // obs_rue2: null,
              des_ue_antes2: datos.institucional.sigla,
              fecha_registro: new Date(),
              // fecha_modificacion: null
            }, { transaction });

            let ttecIeSede = await TtecInstitucioneducativaSede.create({
              institucioneducativa_id: institucioneducativa.id,
              sede: parseInt(datos.institucioneducativa_id), //De donde sale
              // fecha_cierre: null,
              estado: true,
              observacion: 'subsede cctp',
              fecha_registro: new Date(),
              // fecha_modificacion: null
              persona_id: (ieSedeCentral) ? ieSedeCentral.persona_id : null
            }, { transaction });

            for (var curso of datos.cursos_capacitacion) {
              let ttecIeCarreraAutorizada = await TtecInstitucioneducativaCarreraAutorizada.create({
                institucioneducativa_id: institucioneducativa.id,
                ttec_carrera_tipo_id: parseInt(curso.curso_capacitacion),
                fecha_registro: new Date(),
                // fecha_modificacion: null,
                es_enviado: false,
                es_vigente: true
              }, { transaction });

              let ttecResolucionCarrera = await TtecResolucionCarrera.create({
                descripcion: 'Resolución Ministerial CCTP',
                numero: req.body.numero_rm,
                path: '', //Ruta de la RM
                fecha: req.body.fecha_rm,
                // resuelve: '',
                ttec_resolucion_tipo_id: 1, //Resolucion Ministerial
                ttec_institucioneducativa_carrera_autorizada_id: ttecIeCarreraAutorizada.id,
                fecha_registro: new Date(),
                // fecha_modificacion: null,
                tiempo_estudio: parseInt(curso.tiempo),
                carga_horaria: parseInt(curso.carga_horaria),
                operacion: 'APERTURA',
                nivel_tipo_id: 502, //Capacitación o crear otro catalogo
                ttec_regimen_estudio_tipo_id: (regimen) ? regimen.id : 4//4 Mensual
              }, { transaction });
            }
          }

          // Commit
          await transaction.commit();
        }
      } catch(error) {
        for (var i = 0; i < gen_codigos_le.length; i++) {
          await JurisdiccionGeografica.destroy({
            where: { id: gen_codigos_le[i] }
          });
        }
        for (var i = 0; i < personas_id.length; i++) {
          await Persona.destroy({
            where: { id: personas_id[i] }
          });
        }
        // if (codigo_le != 0) {
        //   await JurisdiccionGeografica.destroy({
        //     where: { id: codigo_le }
        //   });
        // }
        // Eliminar el trámite
        console.error(error);
        if (transaction) await transaction.rollback();
        res.status(200).send({ 'estado': 500, 'msg': 'No se pudo registra los datos '+error });
      }
    } else {
      estado = 500; 
      mensaje = result.msg;
    }
    res.status(200).send({ 'estado': estado, 'msg': mensaje });
  },

  async verificaDepartamentalM(req, res) {
    let estado = 200;
    let mensaje = '';
    let parametros = JSON.parse(req.body.params);
    const usuario_id = parametros.userId;
    const rol_id = parametros.roluser;
    let datos = {
      institucioneducativa_id: parametros.ie_id,
      tipo_tramite: parametros.tipo_tramite,
      tramite_id: parametros.tramite_id,
      procede: (req.body.procede == true || req.body.procede == 'true'),
      informe_viabilidad: (req.body.procede==true || req.body.procede=='true')?req.file.filename:req.body.informe_viabilidad,
      evaluacion: JSON.parse(req.body.evaluacion),
      observacion: req.body.observacion
    };
    let condicion = (req.body.procede==true || req.body.procede=='true')?'SI':'NO';
    let resultTarea = await WfTramiteService.obtieneTarea(parametros.tramite_id, 'idtramite', '');
    // if (resultTarea.flujo_tipo == '') {
    //   res.status(200).send({ estado: 500, msg: 'No se obtiene las tareas.' });
    // }
    let flujo_tipo = resultTarea.flujo_tipo;
    let tarea_id = resultTarea.tarea_actual;//tarea_actual tarea_siguiente
    let tabla = 'institucioneducativa', ie_id = parametros.ie_id;
    let observaciones = 'Verifica datos de modificación';
    let tramite_id = parametros.tramite_id;
    let lugarlocalidad_id = 0, distrito_id = 0;
    distrito_id = parametros.roluserlugarid;

    // console.info('datossss111111', usuario_id, rol_id, flujo_tipo, tarea_id, tabla, ie_id, observaciones, condicion, tramite_id, JSON.stringify(datos), lugarlocalidad_id, distrito_id);
    //let result1 = {dato: true, estado: 200, msg: 'mensaje de respuesta'};
    let result1 = await WfTramiteService.guardarTramiteEnviado(usuario_id, rol_id, flujo_tipo, tarea_id, tabla, ie_id, observaciones, '', tramite_id, JSON.stringify(datos), lugarlocalidad_id, distrito_id);
    if (result1.dato == true) {
      mensaje = result1.msg;
      let resultR1 = await WfTramiteService.guardarTramiteRecibido(usuario_id, resultTarea.tarea_siguiente, tramite_id);
      if (resultR1.dato == true) {
        mensaje = resultR1.msg;
        let resultTarea2 = await WfTramiteService.obtieneTarea(tramite_id, 'idtramite', condicion);
        let result2 = await WfTramiteService.guardarTramiteEnviado(usuario_id, rol_id, flujo_tipo, resultTarea2.tarea_actual, tabla, ie_id, observaciones, condicion, tramite_id, JSON.stringify(datos), lugarlocalidad_id, distrito_id);
        if (result2.dato == true) {
          mensaje = result2.msg;
          if (condicion == 'NO') {
            let resultR2 = await WfTramiteService.guardarTramiteRecibido(usuario_id, resultTarea2.tarea_siguiente, tramite_id);
            if (resultR2.dato == true) {
              mensaje = resultR2.msg;
            } else {
              estado = 500;
              mensaje = resultR2.msg;
            }
          }
        }
      } else {
        estado = 500;
        mensaje = resultR1.msg;
      }
    } else {
      estado = 500;
      mensaje = result.msg;
    }
    res.status(200).send({ 'estado': estado, 'msg': mensaje, 'condicion': condicion });
  },

  async obtieneTramiteTarea(req, res) {
    let orden = req.params.orden;
    let datosTarea = await WfTramiteService.obtieneDatosTarea(req.params.tramite_id, orden);
    if (orden == 4 && datosTarea.datos == '') {
      orden--;
      datosTarea = await WfTramiteService.obtieneDatosTarea(req.params.tramite_id, orden);
    } else {
      if (orden == 3 && datosTarea.datos == '') {
        orden--;
        datosTarea = await WfTramiteService.obtieneDatosTarea(req.params.tramite_id, orden);
      }
    }
    res.status(200).send(datosTarea);
  },

  // Funcion para obtener la primera tarea y tarea observada en caso de devolucion.
  async obtieneTramiteTareaObs(req, res) {
    let orden = req.params.orden;
    let datosTarea = await WfTramiteService.obtieneDatosTarea(req.params.tramite_id, 1);
    let datosTareaO = await WfTramiteService.obtieneDatosTarea(req.params.tramite_id, orden);//console.info('obssssssss',datosTareaO);
    let datosObs = JSON.parse(datosTareaO.datos);
    datosTarea.subsanable = datosObs.subsanable;
    datosTarea.observacion = datosObs.observacion;
    res.status(200).send(datosTarea);
  },

  async obtieneTramiteTareaTipo(req, res) {
    // let orden = req.params.orden;
    let datosTarea = await WfTramiteService.obtieneDatosTarea(req.params.tramite_id, 1);
    let datos = JSON.parse(datosTarea.datos);
    res.status(200).send(datos.tipo_tramite);
  },

  async obtieneTramiteImprime(req, res) {
    let datos1 = {}, datos3 = [];
    let institucioneducativa = '';
    let departamento = '';
    let datosTarea1 = await WfTramiteService.obtieneDatosTarea(req.params.tramite_id, 1);
    if(datosTarea1.datos != '') {
      datos1 = JSON.parse(datosTarea1.datos);
      if (datos1.tipo_tramite.includes(1) || datos1.tipo_tramite.includes(8)) {
        institucioneducativa = datos1.institucional.nombre;
        departamento = datos1.institucional.departamento_nombre;
      } else {
        let institucionEducativa = await Institucioneducativa.findOne({
          where: {id: datos1.institucioneducativa_id}
        });
        institucioneducativa = institucionEducativa.institucioneducativa;
        departamento = 'La Paz';//datos1.institucional.departamento_nombre;//Corregir
      }
    }
    let tipo_tramites = '';
    let datosTarea2 = await WfTramiteService.obtieneDatosTarea(req.params.tramite_id, req.params.orden);
    if (datosTarea2.datos != '') {
      datos2 = JSON.parse(datosTarea2.datos);
      var cantidad_tramites = (datos2.tipo_tramite.length-1);
      for (var key in datos2.tipo_tramite) {
        let tramite_nombre = '';
        switch (datos2.tipo_tramite[key]) {
          case 2:
            tramite_nombre = 'Ratificación';
            break;
          case 3:
            tramite_nombre = 'Ampliación';
            break;
          case 4:
            tramite_nombre = 'Cambio de Razón Social';
            break;
          case 5:
            tramite_nombre = 'Cambio de Domicilio';
            break;
          case 6:
            tramite_nombre = 'Cambio de derecho Propietario';
            break;
          case 7:
            tramite_nombre = 'Cierre del Centro de Capacitación';
            break;
          default:
            tramite_nombre = 'Apertura';
            break;
        }
        tipo_tramites += tramite_nombre+(key < cantidad_tramites?', ':'');
      }
    }
    var fecha = new Date();
    res.status(200).send({ 'tipo_tramite': tipo_tramites, 'institucioneducativa': institucioneducativa, 'departamento': departamento, 'lugar_fecha': (departamento +', '+(fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear())), 'evaluacion': datos2.evaluacion, datosTarea2 });
  },

  async guardaNotificacion(req, res){
    let estado = 200;
    let mensaje = '';
    let parametros = JSON.parse(req.body.params);
    const usuario_id = parametros.userId;
    const rol_id = parametros.roluser;
    let datof = {
      institucioneducativa_id: parametros.ie_id,
      tipo_tramite: parametros.tipo_tramite,
      tramite_id: parametros.tramite_id,
      subsanable: req.body.subsanable,
      observacion: req.body.observacion,
      devolucion: 1,
      //resolucion_ministerial: (req.body.resolucion_ministerial!=null)?req.file.filename:req.body.resolucion_ministerial
    };
    let condicion = (req.body.subsanable==true || req.body.subsanable=='true')?'SI':'NO';
    let resultTarea = await WfTramiteService.obtieneTarea(parametros.tramite_id, 'idtramite', condicion);
    let flujo_tipo = resultTarea.flujo_tipo;
    let tarea_id = resultTarea.tarea_actual;//tarea_actual tarea_siguiente
    let tabla = 'institucioneducativa', ie_id = parametros.ie_id;
    let observaciones = 'Finaliza tramite y registra en el sistema';
    let tramite_id = parametros.tramite_id;
    let lugarlocalidad_id = 0, distrito_id = 0;
    distrito_id = parametros.roluserlugarid;

    // console.info('datossss111111', usuario_id, rol_id, flujo_tipo, tarea_id, tabla, ie_id, observaciones, condicion, tramite_id, JSON.stringify(datof), lugarlocalidad_id, distrito_id);
    //let result = {dato: true, estado: 200, msg: 'mensaje de respuesta'};
    let result = await WfTramiteService.guardarTramiteEnviado(usuario_id, rol_id, flujo_tipo, tarea_id, tabla, ie_id, observaciones, condicion, tramite_id, JSON.stringify(datof), lugarlocalidad_id, distrito_id);
    if (result.dato == true) {
      mensaje = result.msg;
    } else {
      estado = 500;
      mensaje = result.msg;
    }
    res.status(200).send({ 'estado': estado, 'msg': mensaje });
  },

  async createCentro(req, res) {
    let transaction;
    let gestion = await GeneralService.getGestionTipo();
    let ie_tipo = await GeneralService.getInstitucioneducativaTipo();
    let ieAcreditacionTipo = await InstitucioneducativaAcreditacionTipo.findAll({ where: {'obs': 'CCTP'}, attributes: ['id'], order: ['id'] });
    // let persona = await Persona.findOne({ where: {carnet: req.body.cedula_identidad, complemento: req.body.complemento} });
    transaction = await sequelize.transaction();
    let codigo_le = 0;
    let datos = req.body;
    try {
      codigo_le = await getCodeGenerateLE(datos.institucional.departamento_id, datos.institucional.provincia_id, datos.institucional.municipio_id);

      let jurisdiccionGeografica = await JurisdiccionGeografica.create({
        id: codigo_le,
        lugar_tipo_id_localidad: parseInt(datos.institucional.departamento_id),
        lugar_tipo_id_distrito: 31352, //parseInt(datos.institucional.provincia_id), //31352 siguiendo ejemplo de ttec
        obs: 'Sede Central CCTP',
        cordx: coordenadas[0],
        cordy: coordenadas[1],
        // distrito_tipo_id: null,
        lugar_tipo_id_localidad2012: parseInt(datos.institucional.comunidad_id),
        circunscripcion_tipo_id: 1, //1: Circunscripcion #1
        // cod_nuc: '',
        // des_nuc: '',
        direccion: datos.institucional.direccion,
        zona: datos.institucional.zona,
        juridiccion_acreditacion_tipo_id: 1, //0: No acreditada y en proceso de regularización, 1: Acreditada y Legal
        validacion_geografica_tipo_id: 0, //0: Sin validar, 1: Coordenada validada en operativo
        // fecha_modificacion_localizacion: null,
        // fecha_modificacion_coordenada: null,
        // fecha_modificacion: null,
        fecha_registro: new Date(),
        usuario_id: usuario_id
      });

      let codigo_ue = await getCodeGenerateUE(jurisdiccionGeografica.id);

      let institucioneducativa = await Institucioneducativa.create({
        id: codigo_ue,
        le_juridicciongeografica_id: jurisdiccionGeografica.id,
        estadoinstitucion_tipo_id: 10, //10: Abierta
        convenio_tipo_id: 0, //0: sin dato
        dependencia_tipo_id: 3, //0: Privada
        institucioneducativa_tipo_id: ie_tipo, //CCTP
        orgcurricular_tipo_id: 0, //0: Sin definir
        institucioneducativa: 'CENTRO DE CAPACITACIÓN TÉCNICA ' + datos.institucional.nombre.toUpperCase(),
        rue_ue: null, //falta generar
        fecha_resolucion: datos.fecha_rm,
        nro_resolucion: datos.numero_rm,
        obs_rue: 'Apertura, Centro de Capacitación',
        // des_ue_antes: '',
        fecha_creacion: new Date(),//datos.fecha_creacion//new Date(),
        // fecha_cierre: null,
        institucioneducativa_acreditacion_tipo_id: ieAcreditacionTipo[0].id, //Acreditada y Legal CCTP
        obs_rue2: null,
        // des_ue_antes2: '',
        fecha_registro: new Date(),
        fecha_modificacion: null
      }, { transaction });

      let institucioneducativaSucursal = await InstitucioneducativaSucursal.create({
        sucursal_tipo_id: 1,
        institucioneducativa_id: institucioneducativa.id,
        gestion_tipo_id: gestion,
        le_juridicciongeografica_id: jurisdiccionGeografica.id,
        nombre_subcea: '',
        cod_cerrada_id: 10,
        periodo_tipo_id: 1,
        turno_tipo_id: 0,
        direccion: datos.institucional.direccion,
        zona: datos.institucional.zona,
        esabierta: true
      }, { transaction });

      let ttecIeSede = await TtecInstitucioneducativaSede.create({
        institucioneducativa_id: institucioneducativa.id,
        sede: institucioneducativa.id, // De donde sale
        // fecha_cierre: null,
        estado: true,
        observacion: 'sede central cctp',
        fecha_registro: new Date(),
        // fecha_modificacion: null
      }, { transaction });

      for (var key in datos.cursos_capacitacion) {
        let ttecIeSede = await TtecInstitucioneducativaCarreraAutorizada.create({
          institucioneducativa_id: institucioneducativa.id,
          ttec_carrera_tipo_id: datos.cursos_capacitacion[key].curso_capacitacion,
          fecha_registro: new Date(),
          // fecha_modificacion: null,
          es_enviado: false,
          es_vigente: true
        }, { transaction });

        let ttecResolucionCarrera = await TtecResolucionCarrera.create({
          descripcion: 'Resolución Ministerial CCTP',
          numero: datos.numero_rm,
          path: '', //Ruta de la RM
          fecha: datos.fecha_rm,
          // resuelve: '',
          ttec_resolucion_tipo_id: 1, //Resolucion Ministerial
          ttec_institucioneducativa_carrera_autorizada_id: ttecIeSede.id,
          fecha_registro: new Date(),
          // fecha_modificacion: null,
          tiempo_estudio: parseInt(datos.cursos_capacitacion[key].tiempo),
          carga_horaria: parseInt(datos.cursos_capacitacion[key].carga_horaria),
          operacion: 'REGISTRO',
          nivel_tipo_id: 502, //Capacitación o crear otro catalogo
          ttec_regimen_estudio_tipo_id: 4 //Mensual
        }, { transaction });
      }
      let persona = await Persona.findOne({ where: {carnet: datos.propietario.cedula_identidad, complemento: datos.propietario.complemento} });
      if (persona == null) {
        persona = await Persona.create({
          idioma_materno_id: 0, //Sin dato
          genero_tipo_id: parseInt(datos.propietario.genero_tipo_id),
          sangre_tipo_id: 0, //Ninguno
          estadocivil_tipo_id: 0,
          carnet: datos.propietario.cedula_identidad,
          // rda: 0,
          // libreta_militar: '',
          // pasaporte: '',
          paterno: datos.propietario.paterno,
          materno: datos.propietario.materno,
          nombre: datos.propietario.nombre,
          fecha_nacimiento: datos.propietario.fecha_nacimiento,
          segip_id: 1,//datos.propietario.segip_id*1,
          complemento: datos.propietario.complemento,
          activo: true,
          // correo: '',
          // foto: '',
          // celular: '',
          direccion: datos.propietario.direccion,
          esvigente: true,
          // esvigente_apoderado: 1,
          // count_edit: 0,
          // obs_segip: '',
          es_extranjero: false,
          expedido_id: parseInt(datos.propietario.expedido)
        }, { transaction });
      }

      // Registro de propietario
      let ttecAdministrativoInstitutoPersona = await TtecAdministrativoInstitutoPersona.create({
        persona_id: persona.id,
        fecha_registro: new Date(),
        // fecha_modificacion: null,
        es_vigente: true,
        ttec_cargo_designacion_tipo_id: 4, //Personal CCTP
        gestion_tipo_id: gestion,
        institucioneducativa_id: institucioneducativa.id,
        ttec_cargo_tipo_id: 21,
        ttec_formacion_tipo_id: 1,
        tipo_contrato: 'FIJO',
        financiamiento_tipo_id: 0, //No aplica
        item: 0 //Valor no definido
      }, { transaction });
      
      let usuario = await Usuario.findOne({ where: {persona_id: persona.id} });
      if (usuario == null) {
        usuario = await Usuario.create({
          persona_id: persona.id,
          username: datos.propietario.cedula_identidad,
          password: md5(datos.propietario.cedula_identidad),
          fecha_registro: new Date(),
          esactivo: true,
        }, { transaction });
      } else {
        usuario.update({
          esactivo: true,
        });
      }

      //Definir el Rol para los tramites posteriores, validar si ya existe
      let usuarioRol = await UsuarioRol.create({
        rol_tipo_id: 9, //Director
        usuario_id: usuario.id,
        esactivo: true,
        lugar_tipo_id: 1,
        // circunscripcion_tipo_id: null,
        sub_sistema: 'CCTP'//El subsistema puede ser una o mas, se deberia recuperar
      }, { transaction });

      //Inserción temporal a maestroInscripcion para la autenticación
      // let institucioneducativaSucursal = await InstitucioneducativaSucursal.findOne({ where: {'institucioneducativa_id': institucioneducativa.id} });
      let maestroInscripcion = await MaestroInscripcion.create({
        cargo_tipo_id: 1, //Director
        formacion_tipo_id: 0, //Ninguna
        institucioneducativa_id: institucioneducativa.id,
        rda_planillas_id: 0,
        persona_id: persona.id,
        gestion_tipo_id: gestion,
        especialidad_tipo_id: 0,
        financiamiento_tipo_id: 0,
        periodo_tipo_id: 5, //Modular, no corresponde
        ref: 0,
        estadomaestro_id: 1, //Activo
        rol_tipo_id: 9, //Director
        institucioneducativa_sucursal_id: institucioneducativaSucursal.id,
        normalista: false,
        idioma_materno_id: 0, //Sin dato,
        leeescribebraile: false,
        // estudia_idioma_materno_id: null,
        formaciondescripcion: '',
        // lugar_tipo: null,
        // item_director: null,
        // horas: null,
        // item: null,
        fecha_registro: new Date(),
        // fecha_modificacion: null,
        es_vigente_administrativo: true,
        // unidad_militar_tipo_id: 0,
        // recinto_penitenciario_tipo_id: 0,
        // educacion_diversa_tipo_id: 0
      }, { transaction });

      await transaction.commit();
      res.status(200).send({ 'estado': 200, 'msg': 'Registro guardado exitosamente' });
    } catch(error) {
      if (transaction) await transaction.rollback();
      res.status(200).send({ 'estado': 500, 'msg': 'No se puedo registra los datos '+error });
    }
  },
};

async function getCodeGenerateLE(departamento_id, provincia_id, municipio_id) {
  let depto = await LugarTipo.findByPk(departamento_id, { attributes: ['id', 'codigo'] });
  let provincia = await LugarTipo.findByPk(provincia_id, { attributes: ['id', 'codigo'] });
  let municipio = await LugarTipo.findByPk(municipio_id, { attributes: ['id', 'codigo'] });
  let result_le = await sequelize.query('SELECT get_genera_codigo_le(:dep,:pro,:mun)', {
    replacements: { 
      dep: parseInt(depto.codigo),
      pro: parseInt(provincia.codigo),
      mun: parseInt(municipio.codigo)
    },
    type: sequelize.QueryTypes.SELECT, plain: true
  });
  return result_le.get_genera_codigo_le > 0 ? result_le.get_genera_codigo_le : (result_le.get_genera_codigo_le*-1);
};

async function getCodeGenerateUE(jurisdiccion_geografica_id) {
  let result_ue = await sequelize.query('SELECT get_genera_codigo_ue2012(:codigo_le)', {
    replacements: { 
      codigo_le: jurisdiccion_geografica_id
    },
    type: sequelize.QueryTypes.SELECT, plain: true
  });
  return result_ue.get_genera_codigo_ue2012;
};