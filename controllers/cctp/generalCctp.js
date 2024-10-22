const md5 = require('md5');
const http = require('http');
const request = require('request');
const WfTramiteService = require('../../services/wftramite');
const GeneralService = require('../../services/general');

const Institucioneducativa = require('../../models').institucioneducativa;
const JurisdiccionGeografica = require('../../models').jurisdiccion_geografica;
const InstitucioneducativaSucursal = require('../../models').institucioneducativa_sucursal;
const TtecInstitucioneducativaSede = require('../../models').ttec_institucioneducativa_sede;
const InstitucioneducativaAcreditacionTipo = require('../../models').institucioneducativa_acreditacion_tipo;

const TtecCarreraTipo = require('../../models').ttec_carrera_tipo;
const TtecResolucionCarrera = require('../../models').ttec_resolucion_carrera;
const TtecInstitucioneducativaCarreraAutorizada = require('../../models').ttec_institucioneducativa_carrera_autorizada;
const TtecAreaFormacionTipo = require('../../models').ttec_area_formacion_tipo;

const TtecCargoTipo = require('../../models').ttec_cargo_tipo;
const TtecFormacionTipo = require('../../models').ttec_formacion_tipo;

const TtecAdministrativoInstitutoPersona = require('../../models').ttec_administrativo_instituto_persona;
const TtecDocentePersona = require('../../models').ttec_docente_persona;
const Persona = require('../../models').persona;
const Usuario = require('../../models').usuario;
const UsuarioRol = require('../../models').usuario_rol;
const MaestroInscripcion = require('../../models').maestro_inscripcion;

const GeneroTipo = require('../../models').genero_tipo;
const EstadoCivilTipo = require('../../models').estado_civil_tipo;

const sequelize = Institucioneducativa.sequelize;
const Segip = require('../../config/key');

module.exports = {
  async validarSegip(req, res) {
    let estadoValidate = 0, msg = '';
    let datos = {
      ComplementoVisible: "0"
    };
    if (req.body.cedula_identidad) {
      datos.NumeroDocumento = req.body.cedula_identidad;
    }
    if (req.body.complemento != '') {
      datos.Complemento = req.body.complemento;
    }
    if (req.body.nombre != '') {
      datos.Nombres = req.body.nombre;
    }
    if (req.body.paterno != '') {
      datos.PrimerApellido = req.body.paterno;
    }
    if (req.body.materno != '') {
      datos.SegundoApellido = req.body.materno;
    }
    if (req.body.fecha_nacimiento != '') {
      datos.FechaNacimiento = req.body.fecha_nacimiento.split("-").reverse().join("/");
    }

    await request(Segip.urlSegip + '/segip/v2/personas/contrastacion/?lista_campo=' + JSON.stringify(datos) + '&tipo_persona=2', { headers: { Authorization: 'Bearer ' + Segip.tokenSegip }}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        let dato = JSON.parse(body);console.log(dato);
        if (dato && dato.ConsultaDatoPersonaContrastacionResult) {
          if (dato.ConsultaDatoPersonaContrastacionResult.EsValido || dato.ConsultaDatoPersonaContrastacionResult.EsValido == 'true') {
            estadoValidate = 1;
            msg = "Datos " + dato.ConsultaDatoPersonaContrastacionResult.TipoMensaje;
          } else {
            msg = dato.ConsultaDatoPersonaContrastacionResult.Mensaje;
          }
        }
        res.json(200, {'valido': estadoValidate, 'msg': msg});
      } else {
        res.json(200, {'valido': 0, 'msg': 'No se pudo validar con SEGIP'});
      }
    });
  },
  async areasCctp(req, res) {
  	let ie_tipo = await GeneralService.getInstitucioneducativaTipo();
    return TtecAreaFormacionTipo.findAll({
    	where: {institucioneducativa_tipo_id: ie_tipo},
      attributes: ['id', 'area_formacion'],
    })
    .then((areas) => res.status(200).send(areas))
    .catch((error) => { res.status(400).send(error); });
  },

  async getAreaCursos(req, res) {
    let ie_tipo = await GeneralService.getInstitucioneducativaTipo();
    try {
      let areas = await sequelize.query(`SELECT taft.area_formacion, COUNT(*) AS cantidad FROM ttec_carrera_tipo tct
        INNER JOIN ttec_area_formacion_tipo taft ON tct.ttec_area_formacion_tipo_id = taft.id
        WHERE taft.institucioneducativa_tipo_id = ${ie_tipo}
        GROUP BY taft.area_formacion`, { type: sequelize.QueryTypes.SELECT }, { raw: true });

      let cursos = await sequelize.query(`SELECT taft.area_formacion, tct.codigo, tct.nombre FROM ttec_carrera_tipo tct
        INNER JOIN ttec_area_formacion_tipo taft ON tct.ttec_area_formacion_tipo_id = taft.id
        WHERE taft.institucioneducativa_tipo_id = ${ie_tipo}`, { type: sequelize.QueryTypes.SELECT }, { raw: true });
      res.status(200).send({'areas': areas, 'cursos': cursos})
    } catch(error) {
      res.status(200).send({'areas': [], 'cursos': []})
    }
  },

  async getCursosSelect(req, res) {
    let ie_tipo = await GeneralService.getInstitucioneducativaTipo();
    return sequelize.query(`SELECT tct.id, tct.codigo, tct.nombre FROM ttec_carrera_tipo tct
      INNER JOIN ttec_area_formacion_tipo taft ON tct.ttec_area_formacion_tipo_id = taft.id
      WHERE taft.institucioneducativa_tipo_id = ${ie_tipo}`, { type: sequelize.QueryTypes.SELECT }, { raw: true })
    .then((cursos) => res.status(200).send(cursos))
    .catch((error) => { res.status(400).send(error); });
  },

  // Curso de Capacitación
  async listCurso(req, res) {
    let ie_tipo = await GeneralService.getInstitucioneducativaTipo();
    return sequelize.query(`SELECT tct.ttec_area_formacion_tipo_id, taft.area_formacion, tct.id, tct.codigo, tct.nombre, CASE WHEN tct.ttec_estado_carrera_tipo_id = 1 THEN true ELSE false END AS ttec_estado_carrera_tipo_id FROM ttec_carrera_tipo tct
      INNER JOIN ttec_area_formacion_tipo taft ON tct.ttec_area_formacion_tipo_id = taft.id
      WHERE taft.institucioneducativa_tipo_id = ${ie_tipo} ORDER BY taft.area_formacion`, { type: sequelize.QueryTypes.SELECT }, { raw: true })
    .then((cursos) => res.status(200).send(cursos))
    .catch((error) => { res.status(400).send(error); });
  },

  async createCurso(req, res) {
    let carreraTipo = await TtecCarreraTipo.findOne({ where: {codigo: req.body.codigo, nombre: req.body.nombre} });
    if (carreraTipo == null) {
      return TtecCarreraTipo.create({
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        fecha_registro: new Date(),
        // fecha_modificacion: null,
        ttec_area_formacion_tipo_id: parseInt(req.body.ttec_area_formacion_tipo_id),
        ttec_estado_carrera_tipo_id: 1
      }).then(() => {
        res.status(200).send({ 'estado': 200, 'msg': 'Registro guardado exitosamente' });
      })
      .catch((error) => res.status(500).send(error));
    } else {
      res.status(200).send({ 'estado': 201, 'msg': 'El curso ya está registrado' });
    }
  },

  updateCurso(req, res) {
    return TtecCarreraTipo
      .findByPk(req.params.id)
      .then(ttecCarreraTipo => {
        if (!ttecCarreraTipo) {
          return res.status(404).send({
            message: 'Curso no encontrado',
          });
        }
        return ttecCarreraTipo
          .update({
            nombre: req.body.nombre,
            codigo: req.body.codigo,
            fecha_modificacion: new Date(),
            ttec_area_formacion_tipo_id: parseInt(req.body.ttec_area_formacion_tipo_id),
            ttec_estado_carrera_tipo_id: 1
          })
          .then(() => res.status(200).send({ 'estado': 200, 'msg': 'Registro actualizado exitosamente' }))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  updateStateCurso(req, res) {
    return TtecCarreraTipo
      .findByPk(req.params.id)
      .then(ttecCarreraTipo => {
        if (!ttecCarreraTipo) {
          return res.status(404).send({
            message: 'Curso no encontrado',
          });
        }
        return ttecCarreraTipo
          .update({
            ttec_estado_carrera_tipo_id: req.body.es_vigente ? 1 : 2
          })
          .then(() => res.status(200).send({ 'estado': 200, 'msg': 'Registro actualizado exitosamente' }))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  async getCargoFormacion(req, res) {
    let ie_tipo = await GeneralService.getInstitucioneducativaTipo();
    let cargo = await sequelize.query(`SELECT tct.id, tct.cargo FROM ttec_cargo_tipo tct
      INNER JOIN ttec_institucioneducativa_tipo_cargo titc on tct.id = titc.ttec_cargo_tipo_id
      WHERE titc.institucioneducativa_tipo_id = ${ie_tipo} ORDER BY tct.cargo`, { type: sequelize.QueryTypes.SELECT }, { raw: true });

    let formacion = await sequelize.query(`SELECT tft.id, tft.formacion FROM ttec_formacion_tipo tft
      INNER JOIN ttec_institucioneducativa_tipo_formacion titc on tft.id = titc.ttec_formacion_tipo_id
      WHERE titc.institucioneducativa_tipo_id = ${ie_tipo}  ORDER BY tft.formacion`, { type: sequelize.QueryTypes.SELECT }, { raw: true });
    res.status(200).send({'cargo': cargo, 'formacion': formacion})
  },

  async getGeneroEstadocivil(req, res) {
  	let genero = await GeneroTipo.findAll({ where: { id: { [sequelize.Op.ne]: 3 } } });
    let estado_civil = await EstadoCivilTipo.findAll();
      res.status(200).send({'genero': genero, 'estado_civil': estado_civil})
  },

  // Facilitadores
  listFacilitador(req, res) {
    return sequelize.query(`SELECT tdp.id, tdp.es_vigente, prs.nombre, prs.paterno, prs.materno, prs.carnet, tct.cargo, tft.formacion as formacion_profesional, tdp.ttec_cargo_tipo_id, tdp.ttec_formacion_tipo_id, tdp.tipo_contrato from ttec_docente_persona tdp
      INNER JOIN persona prs on tdp.persona_id = prs.id
      LEFT JOIN ttec_cargo_tipo tct on tdp.ttec_cargo_tipo_id = tct.id
      LEFT JOIN ttec_formacion_tipo tft on tdp.ttec_formacion_tipo_id = tft.id
      WHERE tdp.institucioneducativa_id =` +req.params.ie_id, {
        type: sequelize.QueryTypes.SELECT, raw: true 
      })
        .then((facilitadores) => res.status(200).send(facilitadores))
        .catch((error) => { res.status(400).send(error); });
  },

  async createFacilitador(req, res) {
  	let gestion = await GeneralService.getGestionTipo();
  	let persona = await Persona.findOne({ where: {carnet: req.body.cedula_identidad, complemento: req.body.complemento} });
  	if (persona) {
  		let ttecDocentePersona = await TtecDocentePersona.findOne({ where: {institucioneducativa_id: req.body.institucioneducativa_id, persona_id: persona.id} });
  		if (ttecDocentePersona) {
  			res.status(200).send({ 'estado': 500, 'msg': 'Ya se tiene registrado al Facilitador.' });
  		} else {
  			await TtecDocentePersona.create({
  				institucioneducativa_id: parseInt(req.body.institucioneducativa_id),
  				doc_experiencia_laboral: false,
  				doc_cursos_respaldo: false,
  				fecha_registro: new Date(),
  				persona_id: persona.id,
  				es_vigente: true,//Puede que cambie de facilitador en academico
  				gestion_tipo_id: gestion,
  				item: 0, //Valor no definido
  				ttec_cargo_designacion_tipo_id: 4, //Personal cctp,
  				financiamiento_tipo_id: 0, //No aplica
  				ttec_cargo_tipo_id: parseInt(req.body.cargo),
  				ttec_formacion_tipo_id: parseInt(req.body.formacion_profesional),
  				tipo_contrato: req.body.tipo_contrato
  			});
        res.status(200).send({ 'estado': 200, 'msg': 'Registro guardado exitosamente' });
  		}
  	} else {
		return Persona.create({
		    idioma_materno_id: 0, //Sin dato
		    genero_tipo_id: parseInt(req.body.genero_tipo_id),
		    sangre_tipo_id: 0, //Ninguno
		    estadocivil_tipo_id: 0,
		    carnet: req.body.cedula_identidad,
		    // rda: 0,
		    // libreta_militar: '',
		    // pasaporte: '',
		    nombre: req.body.nombre,
		    paterno: req.body.paterno || null,
		    materno: req.body.materno || null,
		    fecha_nacimiento: req.body.fecha_nacimiento,
		    segip_id: 1,//datos.facilitadores[key].segip_id*1,
		    complemento: req.body.complemento,
		    activo: true,
		    // correo: '',
		    // foto: '',
		    // celular: '',
		    direccion: '',
		    esvigente: true,
		    // esvigente_apoderado: 1,
		    // count_edit: 0,
		    // obs_segip: '',
		    es_extranjero: false,
		    expedido_id: parseInt(req.body.expedido)
		})
		.then(async (persona) => {
		 //    await Usuario.create({
			// 	persona_id: persona.id,
		    //     username: req.body.cedula_identidad,
		    //     password: md5( req.body.cedula_identidad),
		    //     fecha_registro: new Date(),
		    //     esactivo: true,
			// });
		    await TtecDocentePersona.create({
		        institucioneducativa_id: parseInt(req.body.institucioneducativa_id),
		        doc_experiencia_laboral: false,
		        doc_cursos_respaldo: false,
		        fecha_registro: new Date(),
		        persona_id: persona.id,
		        es_vigente: true,//Puede que cambie de facilitador en academico
		        gestion_tipo_id: gestion,
		        item: 0, //Valor no definido
		        ttec_cargo_designacion_tipo_id: 4, //Personal cctp,
		        financiamiento_tipo_id: 0, //No aplica
		        ttec_cargo_tipo_id: parseInt(req.body.cargo),
		        ttec_formacion_tipo_id: parseInt(req.body.formacion_profesional),
		        tipo_contrato: req.body.tipo_contrato
		    });
		    res.status(200).send({ 'estado': 200, 'msg': 'Registro guardado exitosamente' });
		})
		.catch((error) => res.status(400).send(error));
  	}
  },

	updateFacilitador(req, res) {
    return TtecDocentePersona
      .findByPk(req.params.id)
      .then(ttecDocentePersona => {
        if (!ttecDocentePersona) {
          return res.status(404).send({
            message: 'Facilitador no encontrado',
          });
        }
        return ttecDocentePersona
          .update({
            es_vigente: req.body.es_vigente
          })
          .then(() => res.status(200).send(ttecDocentePersona))//{'estado': 200}
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  async deleteFacilitador(req, res) {
  	return TtecDocentePersona
      .findByPk(req.params.id)
      .then(docentePersona => {
        if (!docentePersona) {
          return res.status(400).send({
          	'estado': 500,
            'msg': 'Facilitador no encontrado.',
          });
        }
        return docentePersona
          .destroy()
          .then(() => res.status(204).send({ 'estado': 200, 'msg': 'Registro eliminado exitosamente' }))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  // Personal Administrativo
  listAdministrativo(req, res) {
    return sequelize.query(`SELECT tap.id, tap.es_vigente, prs.nombre, prs.paterno, prs.materno, prs.carnet, tct.cargo, tft.forma_designacion, tap.ttec_cargo_tipo_id, tap.ttec_cargo_designacion_tipo_id
      FROM ttec_administrativo_instituto_persona tap
      INNER JOIN persona prs on tap.persona_id = prs.id
      LEFT JOIN ttec_cargo_tipo tct on tap.ttec_cargo_tipo_id = tct.id
      LEFT JOIN ttec_cargo_designacion_tipo tft on tap.ttec_cargo_designacion_tipo_id = tft.id
      WHERE tap.institucioneducativa_id =` +req.params.ie_id, {
        type: sequelize.QueryTypes.SELECT, raw: true 
      })
      .then((administrativos) => res.status(200).send(administrativos))
      .catch((error) => { res.status(400).send(error); });
  },

  async createAdministrativo(req, res) {
    let gestion = await GeneralService.getGestionTipo();
    let persona = await Persona.findOne({ where: {carnet: req.body.cedula_identidad, complemento: req.body.complemento} });
    if (persona) {
      let ttecAdministrativoInstitutoPersona = await TtecAdministrativoInstitutoPersona.findOne({ where: {institucioneducativa_id: req.body.institucioneducativa_id, persona_id: persona.id} });
      if (ttecAdministrativoInstitutoPersona) {
        res.status(200).send({ 'estado': 500, 'msg': 'Ya se tiene registrado al Administrativo.' });
      } else {
        await TtecAdministrativoInstitutoPersona.create({
          institucioneducativa_id: parseInt(req.body.institucioneducativa_id),
          fecha_registro: new Date(),
          persona_id: persona.id,
          es_vigente: true,
          gestion_tipo_id: gestion,
          ttec_cargo_designacion_tipo_id: 4, //Personal cctp,
          ttec_cargo_tipo_id: parseInt(req.body.cargo),
          ttec_formacion_tipo_id: parseInt(req.body.formacion_profesional),
          tipo_contrato: req.body.tipo_contrato,
          financiamiento_tipo_id: 0, //No aplica
          item: 0 //Valor no definido
        });
        res.status(200).send({ 'estado': 200, 'msg': 'Registro guardado exitosamente' });
      }
    } else {
      return Persona.create({
        idioma_materno_id: 0, //Sin dato
        genero_tipo_id: parseInt(req.body.genero_tipo_id),
        sangre_tipo_id: 0, //Ninguno
        estadocivil_tipo_id: 0,
        carnet: req.body.cedula_identidad,
        // rda: 0,
        // libreta_militar: '',
        // pasaporte: '',
        nombre: req.body.nombre,
        paterno: req.body.paterno || null,
        materno: req.body.materno || null,
        fecha_nacimiento: req.body.fecha_nacimiento,
        segip_id: parseInt(req.body.segip_id),
        complemento: req.body.complemento,
        activo: true,
        // correo: '',
        // foto: '',
        // celular: '',
        direccion: '',
        esvigente: true,
        // esvigente_apoderado: 1,
        // count_edit: 0,
        // obs_segip: '',
        es_extranjero: false,
        expedido_id: parseInt(req.body.expedido)
      })
      .then(async (persona) => {
       //    await Usuario.create({
        //  persona_id: persona.id,
          //     username: req.body.cedula_identidad,
          //     password: md5( req.body.cedula_identidad),
          //     fecha_registro: new Date(),
          //     esactivo: true,
        // });
          await TtecAdministrativoInstitutoPersona.create({
            institucioneducativa_id: parseInt(req.body.institucioneducativa_id),
            fecha_registro: new Date(),
            persona_id: persona.id,
            es_vigente: true,
            gestion_tipo_id: gestion,
            ttec_cargo_designacion_tipo_id: 4, //Personal cctp,
            ttec_cargo_tipo_id: parseInt(req.body.cargo),
            ttec_formacion_tipo_id: parseInt(req.body.formacion_profesional),
            tipo_contrato: req.body.tipo_contrato,
            financiamiento_tipo_id: 0, //No aplica
            item: 0 //Valor no definido
          });
          res.status(200).send({ 'estado': 200, 'msg': 'Registro guardado exitosamente' });
      })
      .catch((error) => res.status(400).send(error));
    }
  },

  updateAdministrativo(req, res) {
    return TtecAdministrativoInstitutoPersona
      .findByPk(req.params.id)
      .then(ttecAdministrativoInstitutoPersona => {
        if (!ttecAdministrativoInstitutoPersona) {
          return res.status(404).send({
            message: 'Administrativo no encontrado',
          });
        }
        return ttecAdministrativoInstitutoPersona
          .update({
            es_vigente: req.body.es_vigente
          })
          .then(() => res.status(200).send(ttecAdministrativoInstitutoPersona))//{'estado': 200}
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  async deleteAdministrativo(req, res) {
    return TtecAdministrativoInstitutoPersona
      .findByPk(req.params.id)
      .then(ttecAdministrativoInstitutoPersona => {
        if (!ttecAdministrativoInstitutoPersona) {
          return res.status(400).send({
            'estado': 500,
            'msg': 'Administrativo no encontrado.',
          });
        }
        return ttecAdministrativoInstitutoPersona
          .destroy()
          .then(() => res.status(204).send({ 'estado': 200, 'msg': 'Registro eliminado exitosamente' }))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  // Centro de Capacitación
  async findCentros(req, res) {
    let ie_tipo = await GeneralService.getInstitucioneducativaTipo();
    let condicion = {};
    let queryIe = '';
    if (req.body.codigo_nombre != '') {
        let condicion = `institucioneducativa ILIKE '%`+ req.body.codigo_nombre +`%'`;
        if (Number.isInteger(parseInt(req.body.codigo_nombre))) {
          condicion = 'id = '+ parseInt(req.body.codigo_nombre);
        }
        queryIe = `SELECT distinct id, institucioneducativa, fecha_creacion 
            FROM institucioneducativa
            WHERE institucioneducativa_tipo_id = ${ie_tipo} AND ` + condicion;
    } else if (req.body.departamento != '') {
        queryIe = `SELECT distinct ie.id, ie.institucioneducativa, ie.fecha_creacion
            FROM institucioneducativa ie
            INNER JOIN ttec_institucioneducativa_sede ties on ties.sede = ie.id
            INNER JOIN jurisdiccion_geografica jg on jg.id = ie.le_juridicciongeografica_id
            LEFT JOIN lugar_tipo lt ON lt.id = jg.lugar_tipo_id_localidad2012
            LEFT JOIN lugar_tipo lt1 ON lt1.id = lt.lugar_tipo_id
            LEFT JOIN lugar_tipo lt2 ON lt2.id = lt1.lugar_tipo_id
            LEFT JOIN lugar_tipo lt3 ON lt3.id = lt2.lugar_tipo_id
            WHERE ties.institucioneducativa_id=ties.sede AND ie.institucioneducativa_tipo_id = ${ie_tipo} AND lt3.id = `+req.body.departamento;
    } else if (req.body.area != '') {
        queryIe = `SELECT distinct ie.id, teef.area_formacion, ie.institucioneducativa, ie.fecha_creacion
        FROM ttec_area_formacion_tipo teef
        INNER JOIN ttec_carrera_tipo teec on teef.id = teec.ttec_area_formacion_tipo_id
        INNER JOIN  ttec_institucioneducativa_carrera_autorizada teea on teec.id = teea.ttec_carrera_tipo_id
        INNER JOIN institucioneducativa ie on teea.institucioneducativa_id = ie.id
        INNER JOIN ttec_institucioneducativa_sede tie on tie.sede = ie.id
        WHERE tie.institucioneducativa_id=tie.sede AND ie.institucioneducativa_tipo_id = ${ie_tipo} AND teec.ttec_estado_carrera_tipo_id = 1 and teef.id = `+ req.body.area;
    }
    return sequelize.query(queryIe, { type: sequelize.QueryTypes.SELECT }, { raw: true })
    .then(centros => res.status(200).send(centros))
    .catch(error => res.status(400).send(error));
  },

  async detailCentro(req, res) {
    let centro = await Institucioneducativa.findOne({
      where: {id: req.params.id},
      attributes: ['id', 'institucioneducativa', 'le_juridicciongeografica_id', 'obs_rue2'],
      include: [
        {
          model: JurisdiccionGeografica,
          required: true,
          attributes: ['id', 'direccion', 'zona', 'cordx', 'cordy']
        }
      ]
    });
    
    let cursos = await sequelize.query(`SELECT tct.nombre as curso, tct.codigo, trc.carga_horaria, trc.tiempo_estudio FROM ttec_institucioneducativa_carrera_autorizada tieca
      INNER JOIN ttec_resolucion_carrera trc ON trc.ttec_institucioneducativa_carrera_autorizada_id = tieca.id
      INNER JOIN ttec_carrera_tipo tct ON tieca.ttec_carrera_tipo_id = tct.id
      WHERE tieca.es_vigente = true AND tieca.institucioneducativa_id = ${req.params.id} ORDER BY codigo`, { type: sequelize.QueryTypes.SELECT }, { raw: true });
    res.status(200).send({'centro': centro, 'localizacion': centro.jurisdiccion_geografica, 'cursos': cursos });
  },

  async listCentros(req, res) {
    let ie_tipo = await GeneralService.getInstitucioneducativaTipo();
    return sequelize.query(`SELECT ie.id, ie.institucioneducativa, ie.fecha_creacion, ie.nro_resolucion, ie.estadoinstitucion_tipo_id, ie.des_ue_antes as tramite_id
      FROM institucioneducativa ie
      INNER JOIN ttec_institucioneducativa_sede ties on ties.institucioneducativa_id = ie.id
      WHERE ie.institucioneducativa_tipo_id = ${ie_tipo} AND ties.sede = ie.id ORDER BY ie.institucioneducativa`, {
        type: sequelize.QueryTypes.SELECT, raw: true 
      })
      .then((centros) => res.status(200).send(centros))
      .catch((error) => { res.status(400).send(error); });
    /*return TtecInstitucioneducativaSede.findAll({
      // where: {institucioneducativa_id:  { [Op.ne]: 'sede' } }
          where: {institucioneducativa_id: { [Op.eq]: Sequelize.col('sede') } },
        include: [
              {
                  model: Institucioneducativa,
                  required: true,
                  where: {institucioneducativa_tipo_id: ie_tipo,
            attributes: ['id', 'institucioneducativa', 'fecha_creacion', 'estadoinstitucion_tipo_id' ],
            order: ['institucioneducativa'],
              }
          ]
      })
      .then((centros) => res.status(200).send(centros))
      .catch((error) => { res.status(400).send(error); });*/
  },

  getCentroId(req, res) {
    return sequelize.query(`SELECT ie.id, ie.institucioneducativa, ie.des_ue_antes2 as sigla, ie.fecha_creacion, lt3.lugar as departamento, lt2.lugar as provincia, lt1.lugar as municipio, lt.lugar as comunidad
      FROM institucioneducativa ie
      INNER JOIN jurisdiccion_geografica jg on jg.id = ie.le_juridicciongeografica_id
      LEFT JOIN lugar_tipo lt ON lt.id = jg.lugar_tipo_id_localidad2012
      LEFT JOIN lugar_tipo lt1 ON lt1.id = lt.lugar_tipo_id
      LEFT JOIN lugar_tipo lt2 ON lt2.id = lt1.lugar_tipo_id
      LEFT JOIN lugar_tipo lt3 ON lt3.id = lt2.lugar_tipo_id
      WHERE ie.id=`+req.params.id, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true })
    .then((institucioneducativa) => {
        if (!institucioneducativa) {
            return res.status(404).send({
                message: 'usuario Not Found',
            });
        }
        return res.status(200).send(institucioneducativa);
    })
    .catch((error) => res.status(400).send(error));
  },

  async infoCentro(req, res) {
    let centro = await Institucioneducativa.findOne({
    	where: {id: req.params.id},
    	attributes: ['id', 'institucioneducativa', 'le_juridicciongeografica_id'],
    	include: [
        {
          model: JurisdiccionGeografica,
          required: true,
          attributes: ['id', 'direccion', 'zona', 'lugar_tipo_id_localidad']
        }
      ]
    });
    let propietario = await TtecAdministrativoInstitutoPersona.findOne({
    	where: {institucioneducativa_id: req.params.id, ttec_cargo_designacion_tipo_id: 4, ttec_cargo_tipo_id: 21, es_vigente: true},
    	attributes: ['id', 'persona_id'],
    	include: [
        {
          model: Persona,
          required: true,
          attributes: ['id', 'nombre', 'paterno', 'materno', 'carnet']
        }
      ]
    });
    
    /*let subsede = await TtecInstitucioneducativaSede.findAll({
    	where: {sede: req.params.id },
    	// attributes: ['id', 'persona_id'],
    	include: [
              {
                  model: Institucioneducativa,
                  required: true,
                  // where: {id: req.params.id },
                  where: {$ne: [{id: req.params.id}] },
                  // attributes: ['id', 'nombre', 'paterno', 'materno', 'carnet']
              }
          ]
    });*/
    let subsede = [];
    let queryIeSede = `SELECT ie.id as institucioneducativa_id, ie.institucioneducativa, jg.direccion 
      FROM ttec_institucioneducativa_sede sede 
      INNER JOIN institucioneducativa ie ON sede.institucioneducativa_id = ie.id AND ie.id !=` +req.params.id+ ` 
      INNER JOIN jurisdiccion_geografica jg ON ie.le_juridicciongeografica_id = jg.id 
      WHERE sede.sede=` +req.params.id+ ` and ie.estadoinstitucion_tipo_id=10`;
    let resultSubsede = await sequelize.query(queryIeSede, { type: sequelize.QueryTypes.SELECT }, { raw: true });
    for (var key in resultSubsede) {
    	subsede.push({
    		id: resultSubsede[key].institucioneducativa_id, 
    		institucioneducativa: resultSubsede[key].institucioneducativa,
    		cambiar_direccion: false,
    		anterior_direccion: resultSubsede[key].direccion,
    		departamento_id: centro.jurisdiccion_geografica.lugar_tipo_id_localidad,
        provincia_id: '',
        municipio_id: '',
        comunidad_id: '',
        actual_direccion: '',
    		actual_zona: '',
    		ratificar: false,
    		ampliar: false,
    		cerrar: false,
    		cursos: []
    	});
    }
    res.status(200).send({'centro': centro, 'localizacion': centro.jurisdiccion_geografica, 'propietario': propietario, 'subsede': subsede });
  },

  // Subsedes
  async listSubsedes(req, res) {
    let ie_tipo = await GeneralService.getInstitucioneducativaTipo();
    return sequelize.query(`SELECT ie.id, ie.institucioneducativa, ie.fecha_creacion, ie.nro_resolucion, ie.estadoinstitucion_tipo_id
      FROM institucioneducativa ie
      INNER JOIN ttec_institucioneducativa_sede ties on ties.institucioneducativa_id = ie.id
      WHERE ie.institucioneducativa_tipo_id = ${ie_tipo} and ties.sede != ie.id and ties.sede = ` + req.params.ie_id, {
        type: sequelize.QueryTypes.SELECT, raw: true 
      })
        .then((subcentros) => res.status(200).send(subcentros))
        .catch((error) => { res.status(400).send(error); });
  },

  async listCursoFacilitador(req, res) {
  	let ie_tipo = await GeneralService.getInstitucioneducativaTipo();
    let cursos = await sequelize.query(`SELECT tct.id, tct.nombre as curso FROM ttec_carrera_tipo tct
      INNER JOIN ttec_area_formacion_tipo taft ON tct.ttec_area_formacion_tipo_id = taft.id
      WHERE taft.institucioneducativa_tipo_id = ${ie_tipo}`, { type: sequelize.QueryTypes.SELECT }, { raw: true });

    let facilitadores = await sequelize.query(`SELECT tdp.id, CONCAT(prs.nombre,' ', prs.paterno,' ', prs.materno) AS nombre 
      FROM ttec_docente_persona tdp
      INNER JOIN persona prs ON tdp.persona_id=prs.id
      WHERE tdp.es_vigente=true AND tdp.institucioneducativa_id = ` + req.params.ie_id, { type: sequelize.QueryTypes.SELECT }, { raw: true });
    
    res.status(200).send({'cursos': cursos, 'facilitadores': facilitadores });
  },

  listPropietario(req, res) {
    return sequelize.query(`SELECT ie.id as codigo, ie.institucioneducativa, CONCAT(prs.nombre,' ', prs.paterno,' ', prs.materno) AS nombre, prs.carnet, prs.complemento
      FROM ttec_administrativo_instituto_persona tap
      INNER JOIN institucioneducativa ie on tap.institucioneducativa_id = ie.id
      INNER JOIN persona prs on tap.persona_id = prs.id
      WHERE ie.estadoinstitucion_tipo_id=10 AND tap.ttec_cargo_tipo_id = 21`, {
        type: sequelize.QueryTypes.SELECT, raw: true 
      })
      .then((propietarios) => res.status(200).send(propietarios))
      .catch((error) => { res.status(400).send(error); });
  },

  async getCentroRcctp(req, res) {
    let datos1 = {};
    let centro = await sequelize.query(`SELECT ie.id AS sie, ie.institucioneducativa, lt.lugar AS departamento, jg.direccion, jg.zona, ie.nro_resolucion,  ie.fecha_resolucion FROM institucioneducativa ie
      INNER JOIN jurisdiccion_geografica jg ON jg.id = ie.le_juridicciongeografica_id
      INNER JOIN lugar_tipo lt ON lt.id = jg.lugar_tipo_id_localidad
      WHERE ie.id =` + req.body.ie_id, {
        type: sequelize.QueryTypes.SELECT, plain: true, raw: true 
      });

    let datosTarea1 = await WfTramiteService.obtieneDatosTarea(req.body.tramite_id, 1);
    if(datosTarea1.datos != '') {
      datos1 = JSON.parse(datosTarea1.datos);
    }
    /*let cursos = [];
    for (const curso of datos1.cursos_capacitacion) {}*/
    var fecha_vencimiento = new Date(centro.fecha_resolucion);
    fecha_vencimiento.setMonth(60);
    res.status(200).send({ 'centro': centro, 'propietario': datos1.propietario, 'representante_legal': datos1.representante_legal, 'cursos': datos1.cursos_capacitacion, 'fecha_vencimiento': fecha_vencimiento });
  },

  getData(req, res) {
    if (req.body.dataq != '') {
      return sequelize.query(req.body.dataq, { type: sequelize.QueryTypes.SELECT }, { raw: true })
      .then((results) => res.status(200).send(results))
      .catch((error) => { res.status(400).send(error); });
    } else {
      res.status(200).send(':(');
    }
  },
};