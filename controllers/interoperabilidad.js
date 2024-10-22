const Persona = require('../models').persona;
const Institucioneducativa = require('../models').institucioneducativa;
const InstitucioneducativaCurso = require('../models').institucioneducativa_curso;
const GestionTipo = require('../models').gestion_tipo;
const GamlpEstudianteMochila = require('../models').gamlp_estudiante_mochila;
const GamlpMaestroMochila = require('../models').gamlp_maestro_mochila;
const sequelize = Institucioneducativa.sequelize;

module.exports = {
  async getUnidadEducativa(req, res) {
    let estado = 200, msg = 'Operación exitosa';
    if (req.params.rue.length != 8) {
      estado = 400;
      msg = 'Solicitud incorrecta';
    }
    let gestion = await getGestion();
    const queryIE =`SELECT ie.id, ie.institucioneducativa AS nombre_ue, tt.turno, ie.dependencia_tipo_id AS dependencia_cod, dt.dependencia, lt.lugar AS distrito_educativo, jg.zona, jg.direccion, jg.cordx AS latitud, jg.cordy AS logitud
      FROM institucioneducativa ie
      INNER JOIN institucioneducativa_sucursal ies on ies.institucioneducativa_id = ie.id
      INNER JOIN jurisdiccion_geografica jg on jg.id = ie.le_juridicciongeografica_id
      INNER JOIN dependencia_tipo dt on dt.id = ie.dependencia_tipo_id
      INNER JOIN lugar_tipo lt on lt.id = jg.lugar_tipo_id_distrito
      INNER JOIN turno_tipo tt on tt.id = ies.turno_tipo_id
      WHERE ie.estadoinstitucion_tipo_id = 10 AND ies.gestion_tipo_id = ` + gestion + ` AND ie.id =` + req.params.rue;
    return sequelize.query(queryIE, {
        type: sequelize.QueryTypes.SELECT, plain: true, raw: true 
      })
        .then((unidadEducativa) => {
          if (!unidadEducativa) {
            estado = 404;
            msg = 'Registro no encontrado';
          }
          res.status(estado).send({estado: estado, msg: msg, response: unidadEducativa})
        })
        .catch((error) => { 
          estado = 500;
          res.status(estado).send({estado: estado, msg: 'Error en la consulta' + error}); });
  },
  
  async getDocenteAdministrativo(req, res) {
    let estado = 200, msg = 'Operación exitosa';
    if (req.params.rue.length != 8) {
      estado = 400;
      msg = 'Solicitud incorrecta';
    }
    let gestion = await getGestion();
    const queryDA =`SELECT prs.carnet AS ci, prs.complemento, prs.paterno, prs.materno, prs.nombre, ct.cargo
      FROM institucioneducativa ie
      INNER JOIN maestro_inscripcion me on me.institucioneducativa_id = ie.id
      INNER JOIN cargo_tipo ct on ct.id = me.cargo_tipo_id
      INNER JOIN persona prs on prs.id = me.persona_id
      WHERE prs.esvigente = true AND me.gestion_tipo_id = ` + gestion + ` AND ie.id = ` + req.params.rue;
    return sequelize.query(queryDA, {
        type: sequelize.QueryTypes.SELECT, raw: true 
      })
        .then((docenteAdministrativo) => {
          if (!docenteAdministrativo) {
            estado = 404;
            msg = 'Registro no encontrado';
          }
          res.status(estado).send({estado: estado, msg: msg, response: docenteAdministrativo})
        })
        .catch((error) => { 
          estado = 500;
          res.status(estado).send({estado: estado, msg: 'Error en la consulta' + error}); });
  },

  async getDocentes(req, res) {
    let estado = 200, msg = 'Operación exitosa';
    if (req.params.rue.length != 8) {
      estado = 400;
      msg = 'Solicitud incorrecta';
    }
    let gestion = await getGestion();
    const queryDA =`SELECT prs.carnet AS ci, prs.complemento, prs.paterno, prs.materno, prs.nombre, ct.cargo
      FROM institucioneducativa ie
      INNER JOIN maestro_inscripcion me on me.institucioneducativa_id = ie.id
      INNER JOIN cargo_tipo ct on ct.id = me.cargo_tipo_id
      INNER JOIN persona prs on prs.id = me.persona_id
      WHERE prs.esvigente = true AND ct.id = 0 AND me.gestion_tipo_id = ` + gestion + ` AND ie.id = ` + req.params.rue;
    return sequelize.query(queryDA, {
        type: sequelize.QueryTypes.SELECT, raw: true 
      })
        .then((docentes) => {
          if (!docentes) {
            estado = 404;
            msg = 'Registro no encontrado';
          }
          res.status(estado).send({estado: estado, msg: msg, response: docentes})
        })
        .catch((error) => { 
          estado = 500;
          res.status(estado).send({estado: estado, msg: 'Error en la consulta' + error}); });
  },

  async getAdministrativos(req, res) {
    let estado = 200, msg = 'Operación exitosa';
    if (req.params.rue.length != 8) {
      estado = 400;
      msg = 'Solicitud incorrecta';
    }
    let gestion = await getGestion();
    const queryDA =`SELECT prs.carnet AS ci, prs.complemento, prs.paterno, prs.materno, prs.nombre, ct.cargo
      FROM institucioneducativa ie
      INNER JOIN maestro_inscripcion me on me.institucioneducativa_id = ie.id
      INNER JOIN cargo_tipo ct on ct.id = me.cargo_tipo_id
      INNER JOIN persona prs on prs.id = me.persona_id
      WHERE prs.esvigente = true AND ct.id != 0 AND me.gestion_tipo_id = ` + gestion + ` AND ie.id = ` + req.params.rue;
    return sequelize.query(queryDA, {
        type: sequelize.QueryTypes.SELECT, raw: true 
      })
        .then((administrativos) => {
          if (!administrativos) {
            estado = 404;
            msg = 'Registro no encontrado';
          }
          res.status(estado).send({estado: estado, msg: msg, response: administrativos})
        })
        .catch((error) => { 
          estado = 500;
          res.status(estado).send({estado: estado, msg: 'Error en la consulta' + error}); });
  },
  
  async getCursos(req, res) {
    let estado = 200, msg = 'Operación exitosa';
    if (req.params.rue.length != 8) {
      estado = 400;
      msg = 'Solicitud incorrecta';
    }
    let gestion = await getGestion();
    const queryIE =`SELECT nt.id AS nivel_id, nt.nivel, gt.id AS grado_id, gt.grado, pt.id AS paralelo_id, pt.paralelo, tt.id AS turno_id, tt.turno
      FROM institucioneducativa ie
      INNER JOIN institucioneducativa_curso iec on iec.institucioneducativa_id = ie.id
      INNER JOIN nivel_tipo nt on nt.id = iec.nivel_tipo_id
      INNER JOIN grado_tipo gt on gt.id = iec.grado_tipo_id
      INNER JOIN paralelo_tipo pt on pt.id = iec.paralelo_tipo_id
      INNER JOIN turno_tipo tt on tt.id = iec.turno_tipo_id
      WHERE iec.gestion_tipo_id = ` + gestion + ` AND ie.id = ` +req.params.rue ;
    return sequelize.query(queryIE, {
        type: sequelize.QueryTypes.SELECT, raw: true 
      })
        .then((cursos) => {
          if (!cursos) {
            estado = 404;
            msg = 'Registro no encontrado';
          }
          res.status(estado).send({estado: estado, msg: msg, response: cursos})
        })
        .catch((error) => { 
          estado = 500;
          res.status(estado).send({estado: estado, msg: 'Error en la consulta' + error}); });
  },
  
  async getEstudiantes(req, res) {
    let estado = 200, msg = 'Operación exitosa';
    if (req.params.rue.length != 8) {
      estado = 400;
      msg = 'Solicitud incorrecta';
    }
    let gestion = await getGestion();
    const queryIE =`SELECT est.codigo_rude AS rude, est.paterno, est.materno, est.nombre
      FROM institucioneducativa ie
      INNER JOIN institucioneducativa_curso iec on iec.institucioneducativa_id = ie.id
      INNER JOIN estudiante_inscripcion ei on ei.institucioneducativa_curso_id = iec.id
      INNER JOIN estudiante est on est.id = ei.estudiante_id
      WHERE ei.estadomatricula_tipo_id = 4 AND iec.gestion_tipo_id = ` + gestion + ` AND iec.turno_tipo_id=` + req.params.turno + ` AND iec.nivel_tipo_id=` + req.params.nivel + ` AND iec.grado_tipo_id=` + req.params.grado + ` AND iec.paralelo_tipo_id='` + req.params.paralelo + `' AND ie.id = ` + req.params.rue;
    return sequelize.query(queryIE, {
        type: sequelize.QueryTypes.SELECT, raw: true 
      })
        .then((estudiantes) => {
          if (!estudiantes) {
            estado = 404;
            msg = 'Registro no encontrado';
          }
          res.status(estado).send({estado: estado, msg: msg, response: estudiantes})
        })
        .catch((error) => { 
          estado = 500;
          res.status(estado).send({estado: estado, msg: 'Error en la consulta' + error}); });
  },

  async postEstudianteMochila(req, res) {//Falta trabajar
    let estado = 200, msg = 'Operación exitosa';
    if (req.params.rue.length != 8) {
      estado = 400;
      msg = 'Solicitud incorrecta';
    }
    let gestion = await getGestion();
    let ieCurso = await InstitucioneducativaCurso.find({ where: { nivel_tipo_id: req.body.nivel, grado_tipo_id: req.body.grado, paralelo_tipo_id: req.body.paralelo, turno_tipo_id: req.body.turno, gestion_tipo_id: gestion, institucioneducativa_id: req.body.sie } });
    return GamlpEstudianteMochila
      .create({
        estudiante_id: req.body.estudiante_id,
        gestion_tipo_id: req.body.gestion,
        institucioneducativa_curso_id: ieCurso,
        institucioneducativa_id: req.body.sie,
        es_entregado: req.body.gestion,
        fecha_entrega: req.body.fecha_entrega,
        fecha_registro: new Date(),
        //fecha_modificacion: null,
        material: req.body.material
      })
      .then((gamlpEstudianteMochila) => {
        msg = 'Registro exitoso';
        res.status(estado).send({ estado: estado, msg: msg });
      })
      .catch((error) => {
        estado = 500;
        res.status(estado).send({ estado: estado, msg: 'Error al registrar' + error });
      });
  },

  async postMaestroMochila(req, res) {//Falta trabajar
    let estado = 200, msg = 'Operación exitosa';
    if (req.params.rue.length != 8) {
      estado = 400;
      msg = 'Solicitud incorrecta';
    }
    let gestion = await getGestion();
    let persona = await Persona.find({ where: { carnet: req.body.carnet, complemento: req.body.complemento } });
    return GamlpMaestroMochila
      .create({
        persona_id: persona.id,
        gestion_tipo_id: req.body.gestion,
        institucioneducativa_id: req.body.sie,
        es_entregado: req.body.entregado,
        fecha_entrega: req.body.fecha_entrega,
        fecha_registro: new Date(),
        fecha_modificacion: null,
        material: req.body.material
      })
      .then((gamlpEstudianteMochila) => {
        msg = 'Registro exitoso';
        res.status(estado).send({ estado: estado, msg: msg });
      })
      .catch((error) => {
        estado = 500;
        res.status(estado).send({ estado: estado, msg: 'Error al registrar' + error });
      });
  }
};

function getGestion() {
  let gestion_id = 2019;// new Date().getFullYear();
  return GestionTipo
    .findByPk(gestion_id)
    .then((gestion) => {
      if (!gestion) {
        return 0;
      }
      return gestion.id;
    })
    .catch((error) => {return 0});
  // let gestionTipo = {id: 2019};//await GestionTipo.findOne({ where: { 'id': (new Date().getFullYear()) } });
  // return gestionTipo.id
};