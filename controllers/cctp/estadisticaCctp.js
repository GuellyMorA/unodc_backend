const InstitucioneducativaTipo = require('../../models').institucioneducativa_tipo;
const Institucioneducativa = require('../../models').institucioneducativa;

const GestionTipo = require('../../models').gestion_tipo;
const sequelize = Institucioneducativa.sequelize;
// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;
// const Op = sequelize.Op;

module.exports = {
  async solicitud(req, res) {
    let solicitud = {
      total: 0,
      atendida: 0,
      pendiente: 0
    };
    let querySolicitud = "SELECT COUNT(id) total FROM solicitud_tramite WHERE codigo ILIKE 'CCTP%'";
    let resultTotal = await sequelize.query(querySolicitud, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });

    let queryAtendida = "SELECT COUNT(id) atendidas FROM solicitud_tramite WHERE codigo ILIKE 'CCTP%' AND estado=true";
    let resultAtendida = await sequelize.query(queryAtendida, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });

    solicitud.total = resultTotal.total;
    solicitud.atendida = resultAtendida.atendidas;
    solicitud.pendiente = (solicitud.total*1 - solicitud.atendida*1);

    res.status(200).send({'solicitud': solicitud});
  },

  async porTramiteTipo(req, res) {
    let tApertura = 16;
    let tModificacion = 17;
    let query = "SELECT COUNT(id) total FROM solicitud_tramite WHERE codigo ILIKE 'CCTP%'";
    let result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });

    let apertura = { total: 0, finalizado: 0, pendiente: 0},
      ratificacion = { total: 0, finalizado: 0, pendiente: 0},
      ampliacion = { total: 0, finalizado: 0, pendiente: 0},
      razon_social = { total: 0, finalizado: 0, pendiente: 0},
      domicilio = { total: 0, finalizado: 0, pendiente: 0},
      derecho_propietario = { total: 0, finalizado: 0, pendiente: 0},
      cierre = { total: 0, finalizado: 0, pendiente: 0},
      subsede = { total: 0, finalizado: 0, pendiente: 0};
    /*
      2 'Ratificación'
      3 'Ampliación'
      4 'Cambio de Razón Social'
      5 'Cambio de Domicilio'
      6 'Cambio de Derecho Propietario'
      7 'Cierre del Centro de Capacitación'
    */
    let resultAperturaIni = await sequelize.query(`SELECT count(wfd.*) as cantidad FROM wf_solicitud_tramite wfd
      LEFT JOIN tramite_detalle trd on wfd.tramite_detalle_id = trd.id
      LEFT JOIN flujo_proceso flp on trd.flujo_proceso_id = flp.id
      WHERE flp.flujo_tipo_id=`+tApertura+` and (wfd.datos::json->>'tipo_tramite') like '%1%' and
      wfd.es_valido=true and flp.orden=1`, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
    let resultAperturaFin = await sequelize.query(`SELECT count(wfd.*) as cantidad FROM wf_solicitud_tramite wfd
      LEFT JOIN tramite_detalle trd on wfd.tramite_detalle_id = trd.id
      LEFT JOIN flujo_proceso flp on trd.flujo_proceso_id = flp.id
      WHERE flp.flujo_tipo_id=`+tApertura+` and (wfd.datos::json->>'tipo_tramite') like '%1%' and
      wfd.es_valido=true and flp.orden=6`, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
    apertura.total = resultAperturaIni.cantidad;
    apertura.finalizado = resultAperturaFin.cantidad;
    apertura.pendiente = (apertura.total - apertura.finalizado);

    let resultRatificaionIni = await sequelize.query(`SELECT count(wfd.*) as cantidad FROM wf_solicitud_tramite wfd
      LEFT JOIN tramite_detalle trd on wfd.tramite_detalle_id = trd.id
      LEFT JOIN flujo_proceso flp on trd.flujo_proceso_id = flp.id
      WHERE flp.flujo_tipo_id=`+tModificacion+` and (wfd.datos::json->>'tipo_tramite') like '%2%' and
      wfd.es_valido=true and flp.orden=1`, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
    let resultRatificaionFin = await sequelize.query(`SELECT count(wfd.*) as cantidad FROM wf_solicitud_tramite wfd
      LEFT JOIN tramite_detalle trd on wfd.tramite_detalle_id = trd.id
      LEFT JOIN flujo_proceso flp on trd.flujo_proceso_id = flp.id
      WHERE flp.flujo_tipo_id=`+tModificacion+` and (wfd.datos::json->>'tipo_tramite') like '%2%' and
      wfd.es_valido=true and flp.orden=6`, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
    ratificacion.total = resultRatificaionIni.cantidad;
    ratificacion.finalizado = resultRatificaionFin.cantidad;
    ratificacion.pendiente = (ratificacion.total - ratificacion.finalizado);

    let resultAmpliacionIni = await sequelize.query(`SELECT count(wfd.*) as cantidad FROM wf_solicitud_tramite wfd
      LEFT JOIN tramite_detalle trd on wfd.tramite_detalle_id = trd.id
      LEFT JOIN flujo_proceso flp on trd.flujo_proceso_id = flp.id
      WHERE flp.flujo_tipo_id=`+tModificacion+` and (wfd.datos::json->>'tipo_tramite') like '%3%' and
      wfd.es_valido=true and flp.orden=1`, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
    let resultAmpliacionFin = await sequelize.query(`SELECT count(wfd.*) as cantidad FROM wf_solicitud_tramite wfd
      LEFT JOIN tramite_detalle trd on wfd.tramite_detalle_id = trd.id
      LEFT JOIN flujo_proceso flp on trd.flujo_proceso_id = flp.id
      WHERE flp.flujo_tipo_id=`+tModificacion+` and (wfd.datos::json->>'tipo_tramite') like '%3%' and
      wfd.es_valido=true and flp.orden=6`, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
    ampliacion.total = resultAmpliacionIni.cantidad;
    ampliacion.finalizado = resultAmpliacionFin.cantidad;
    ampliacion.pendiente = (ampliacion.total - ampliacion.finalizado);

    let resultRazonSocialIni = await sequelize.query(`SELECT count(wfd.*) as cantidad FROM wf_solicitud_tramite wfd
      LEFT JOIN tramite_detalle trd on wfd.tramite_detalle_id = trd.id
      LEFT JOIN flujo_proceso flp on trd.flujo_proceso_id = flp.id
      WHERE flp.flujo_tipo_id=`+tModificacion+` and (wfd.datos::json->>'tipo_tramite') like '%4%' and
      wfd.es_valido=true and flp.orden=1`, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
    let resultRazonSocialFin = await sequelize.query(`SELECT count(wfd.*) as cantidad FROM wf_solicitud_tramite wfd
      LEFT JOIN tramite_detalle trd on wfd.tramite_detalle_id = trd.id
      LEFT JOIN flujo_proceso flp on trd.flujo_proceso_id = flp.id
      WHERE flp.flujo_tipo_id=`+tModificacion+` and (wfd.datos::json->>'tipo_tramite') like '%4%' and
      wfd.es_valido=true and flp.orden=6`, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
    razon_social.total = resultRazonSocialIni.cantidad;
    razon_social.finalizado = resultRazonSocialFin.cantidad;
    razon_social.pendiente = (razon_social.total - razon_social.finalizado);

    let resultDomicilioIni = await sequelize.query(`SELECT count(wfd.*) as cantidad FROM wf_solicitud_tramite wfd
      LEFT JOIN tramite_detalle trd on wfd.tramite_detalle_id = trd.id
      LEFT JOIN flujo_proceso flp on trd.flujo_proceso_id = flp.id
      WHERE flp.flujo_tipo_id=`+tModificacion+` and (wfd.datos::json->>'tipo_tramite') like '%5%' and
      wfd.es_valido=true and flp.orden=1`, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
    let resultDomicilioFin = await sequelize.query(`SELECT count(wfd.*) as cantidad FROM wf_solicitud_tramite wfd
      LEFT JOIN tramite_detalle trd on wfd.tramite_detalle_id = trd.id
      LEFT JOIN flujo_proceso flp on trd.flujo_proceso_id = flp.id
      WHERE flp.flujo_tipo_id=`+tModificacion+` and (wfd.datos::json->>'tipo_tramite') like '%5%' and
      wfd.es_valido=true and flp.orden=6`, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
    domicilio.total = resultDomicilioIni.cantidad;
    domicilio.finalizado = resultDomicilioFin.cantidad;
    domicilio.pendiente = (domicilio.total - domicilio.finalizado);

    let resultDPropietarioIni = await sequelize.query(`SELECT count(wfd.*) as cantidad FROM wf_solicitud_tramite wfd
      LEFT JOIN tramite_detalle trd on wfd.tramite_detalle_id = trd.id
      LEFT JOIN flujo_proceso flp on trd.flujo_proceso_id = flp.id
      WHERE flp.flujo_tipo_id=`+tModificacion+` and (wfd.datos::json->>'tipo_tramite') like '%6%' and
      wfd.es_valido=true and flp.orden=1`, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
    let resultDPropietarioFin = await sequelize.query(`SELECT count(wfd.*) as cantidad FROM wf_solicitud_tramite wfd
      LEFT JOIN tramite_detalle trd on wfd.tramite_detalle_id = trd.id
      LEFT JOIN flujo_proceso flp on trd.flujo_proceso_id = flp.id
      WHERE flp.flujo_tipo_id=`+tModificacion+` and (wfd.datos::json->>'tipo_tramite') like '%6%' and
      wfd.es_valido=true and flp.orden=6`, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
    derecho_propietario.total = resultDPropietarioIni.cantidad;
    derecho_propietario.finalizado = resultDPropietarioFin.cantidad;
    derecho_propietario.pendiente = (derecho_propietario.total - derecho_propietario.finalizado);

    let resultCierreIni = await sequelize.query(`SELECT count(wfd.*) as cantidad FROM wf_solicitud_tramite wfd
      LEFT JOIN tramite_detalle trd on wfd.tramite_detalle_id = trd.id
      LEFT JOIN flujo_proceso flp on trd.flujo_proceso_id = flp.id
      WHERE flp.flujo_tipo_id=`+tModificacion+` and (wfd.datos::json->>'tipo_tramite') like '%7%' and
      wfd.es_valido=true and flp.orden=1`, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
    let resultCierreFin = await sequelize.query(`SELECT count(wfd.*) as cantidad FROM wf_solicitud_tramite wfd
      LEFT JOIN tramite_detalle trd on wfd.tramite_detalle_id = trd.id
      LEFT JOIN flujo_proceso flp on trd.flujo_proceso_id = flp.id
      WHERE flp.flujo_tipo_id=`+tModificacion+` and (wfd.datos::json->>'tipo_tramite') like '%7%' and
      wfd.es_valido=true and flp.orden=6`, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
    cierre.total = resultCierreIni.cantidad;
    cierre.finalizado = resultCierreFin.cantidad;
    cierre.pendiente = (cierre.total - cierre.finalizado);

    let resultSubsedeIni = await sequelize.query(`SELECT count(wfd.*) as cantidad FROM wf_solicitud_tramite wfd
      LEFT JOIN tramite_detalle trd on wfd.tramite_detalle_id = trd.id
      LEFT JOIN flujo_proceso flp on trd.flujo_proceso_id = flp.id
      WHERE flp.flujo_tipo_id=`+tModificacion+` and (wfd.datos::json->>'tipo_tramite') like '%8%' and
      wfd.es_valido=true and flp.orden=1`, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
    let resultSubsedeFin = await sequelize.query(`SELECT count(wfd.*) as cantidad FROM wf_solicitud_tramite wfd
      LEFT JOIN tramite_detalle trd on wfd.tramite_detalle_id = trd.id
      LEFT JOIN flujo_proceso flp on trd.flujo_proceso_id = flp.id
      WHERE flp.flujo_tipo_id=`+tModificacion+` and (wfd.datos::json->>'tipo_tramite') like '%8%' and
      wfd.es_valido=true and flp.orden=6`, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
    subsede.total = resultSubsedeIni.cantidad;
    subsede.finalizado = resultSubsedeFin.cantidad;
    subsede.pendiente = (subsede.total - subsede.finalizado);

    res.status(200).send({'apertura': apertura, 'ratificacion': ratificacion, 'ampliacion': ampliacion, 'razon_social': razon_social, 'domicilio': domicilio, 'derecho_propietario': derecho_propietario, 'cierre': cierre, 'subsede': subsede});
  },
};