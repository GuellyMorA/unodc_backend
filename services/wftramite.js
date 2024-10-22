const Tramite = require('../models').tramite;
const TramiteDetalle = require('../models').tramite_detalle;
const FlujoProceso = require('../models').flujo_proceso;
const RolTipo = require('../models').rol_tipo;
const ProcesoTipo = require('../models').proceso_tipo;
const FlujoTipo = require('../models').flujo_tipo;
const LugarTipo = require('../models').lugar_tipo;
const LugarTipo1 = require('../models').lugar_tipo;
const WfUsuarioFlujoProceso = require('../models').wf_usuario_flujo_proceso;
const WfSolicitudTramite = require('../models').wf_solicitud_tramite;
const WfTareaCompuerta = require('../models').wf_tarea_compuerta;
const Usuario = require('../models').usuario;
const Institucioneducativa = require('../models').institucioneducativa;
const JurisdiccionGeografica = require('../models').jurisdiccion_geografica;
const DistritoTipo = require('../models').distrito_tipo;
const MaestroInscripcion = require('../models').maestro_inscripcion;
const Persona = require('../models').persona;
const sequelize = Tramite.sequelize;

module.exports = {
    // Funcion que guarda un nuevo tramite
    async guardarTramiteNuevo(usuario, rol, flujotipo, tarea, tabla, id_tabla, observacion, tipotramite, varevaluacion, idtramite, datos, lugarTipoLocalidad_id, lugarTipoDistrito_id) {
        let ie = null;
        let ei = null;
        let mi = null;
        let ai = null;
        let transaction;
        let flujoProceso = await FlujoProceso.findByPk(tarea);

        // insert tramite
        switch (tabla) {
            case 'institucioneducativa':
                if (id_tabla) {
                    ie = id_tabla;
                }
                break;
            case 'estudiante_inscripcion':
                if (id_tabla) {
                    ei = id_tabla;
                }
                break;
            case 'apoderado_inscripcion':
                if (id_tabla) {
                    ai = id_tabla;
                }
                break;
            case 'maestro_inscripcion':
                if (id_tabla) {
                    mi = id_tabla;
                }
                break;
            default:
                break;
        }

        transaction = await sequelize.transaction();
        try {
            // Insert Tramite
            let tramite = await Tramite.create({
                estudiante_inscripcion_id: ei,
                flujo_tipo_id: flujotipo,
                tramite_tipo: tipotramite,
                fecha_tramite: new Date(),
                fecha_registro: new Date(),
                esactivo: true,
                gestion_id: (new Date()).getFullYear(),
                apoderado_inscripcion_id: ai,
                maestro_inscripcion_id: mi,
                institucioneducativa_id: ie
            }, { transaction });

            // Insert TramiteDetalle
            let tramiteDetalle = await TramiteDetalle.create({
                tramite_id: tramite.id,
                fecha_registro: new Date(),
                fecha_recepcion: new Date(),
                fecha_envio: new Date(),
                flujo_proceso_id: tarea,
                usuario_remitente_id: usuario,
                obs: observacion.toUpperCase(),
                tramite_estado_id: 15
            }, { transaction });
            let wfdatos;
            if (datos) {
                // Insert WfSolicitudTramite
                wfdatos = await WfSolicitudTramite.create({
                    tramite_detalle_id: tramiteDetalle.id,
                    datos: datos,
                    es_valido: true,
                    fecha_registro: new Date(),
                    lugar_tipo_localidad_id: lugarTipoLocalidad_id || null,
                    lugar_tipo_distrito_id: lugarTipoDistrito_id || null
                }, { transaction });
            }
            let tarea_sig_id;
            if (flujoProceso.es_evaluacion == true) {
                await tramiteDetalle.update({
                    valor_evaluacion: varevaluacion
                }, { transaction });

                let wfcondiciontarea = await WfTareaCompuerta.findOne({
                    where: {
                        flujo_proceso_id: flujoProceso.id,
                        condicion: varevaluacion
                    }
                });
                tarea_sig_id = wfcondiciontarea.condicion_tarea_siguiente;
            } else {
                tarea_sig_id = flujoProceso.tarea_sig_id;
            }
            
            let flujoProceso2 = await FlujoProceso.findOne({
                where: { id: tramiteDetalle.flujo_proceso_id },
                include: [
                    {
                        model: RolTipo,
                        required: true
                    }
                ]
            });
            // Obtiene el usuario destinatario
            let uDestinatario = await obtieneUsuarioDestinatario(tarea, tarea_sig_id, id_tabla, tabla, tramite, wfdatos, flujoProceso2);
            if (uDestinatario == false) {
                // Rollback en caso de no existir usuario destinatario
                if (transaction) await transaction.rollback();
                return { 'dato': false, 'msg': 'Error, no existe usuario destinatario registrado.' };
            } else {
                // Update TramiteDetalle
                await tramiteDetalle.update({
                    usuario_destinatario_id: uDestinatario
                }, { transaction });
            }
            // Update Tramite
            await tramite.update({
                tramite: tramiteDetalle.id
            }, { transaction });
            // Commit
            await transaction.commit();
            return { 'dato': true, 'msg': 'El trámite Nro. ' + tramite.id + ' se guardó correctamente.', 'idtramite': tramite.id };
        } catch (err) {
            // Rollback error en el registro
            if (transaction) await transaction.rollback();
            return { 'dato': false, 'msg': 'Ocurrio un error al guardar el trámite.', 'error': err };
        }
    },

    // Funcion que guarda un tramite como recibido
    async guardarTramiteRecibido(idusuario, tarea, idtramite) {
        let transaction;
        let flujoproceso = await FlujoProceso.findOne({
            where: { id: tarea },
            include: [
                {
                    model: ProcesoTipo,
                    required: true
                },
                {
                    model: RolTipo,
                    required: true
                }
            ]
        });
        let usuario = await Usuario.findByPk(idusuario);
        let tramite = await Tramite.findByPk(idtramite);

        // Corregir la verificaUsuarioRemitente
        let verifica = true;//await verificaUsuarioRemitente(usuario, flujoproceso, tramite);
        if (verifica == false) {
            return { 'dato': false, 'msg': 'El usuario, no corresponde para recibir la tarea ' + flujoproceso.proceso_tipo.proceso_tipo + '.' };
        }

        transaction = await sequelize.transaction();
        try {
            // Insert tramite recibido
            let tramiteDetalle = await TramiteDetalle.create({
                tramite_id: tramite.id,
                fecha_registro: new Date(),
                fecha_recepcion: new Date(),
                tramite_estado_id: 3,
                flujo_proceso_id: flujoproceso.id,
                usuario_remitente_id: usuario.id,
                usuario_destinatario_id: usuario.id,
            }, { transaction });

            // Update tarea anterior en tramite detalle
            let td_anterior = await TramiteDetalle.findByPk(Number(tramite.tramite));
            await tramiteDetalle.update({
                tramite_detalle_id: td_anterior.id
            }, { transaction });

            // Update tramite
            await tramite.update({
                tramite: tramiteDetalle.id
            }, { transaction });

            // Commit
            await transaction.commit();
            return { 'dato': true, 'msg': 'El trámite Nro. ' + tramite.id + ' se recibió correctamente' };
        } catch (err) {
            // Rollback error en el registro
            if (transaction) await transaction.rollback();
            return { 'dato': false, 'msg': 'Ocurrio un error al guardar el trámite.', 'error': err };
        }
    },

    // Funcion general para guardar una tarea de un tramite
    async guardarTramiteEnviado(idusuario, rol, flujotipo, tarea, tabla, id_tabla, observacion, varevaluacion, idtramite, datos, lugarTipoLocalidad_id, lugarTipoDistrito_id) {
        let transaction;
        let msg = '';

        let flujoproceso = await FlujoProceso.findByPk(tarea);
        let usuario = await Usuario.findByPk(idusuario);
        let tramite = await Tramite.findByPk(idtramite);
        let tramiteDetalle = await TramiteDetalle.findByPk(tramite.tramite);

        if (!usuario || tramiteDetalle.usuario_remitente_id != usuario.id) {
            return { 'dato': false, 'msg': 'Error, tramite no enviado pues el usuario remitente no corresponde.' };
        }
        let wfdatos = await WfSolicitudTramite.findOne({
            where: {
                es_valido: true
            },
            include: [
                {
                    model: TramiteDetalle,
                    required: true,
                    where: {
                        tramite_id: tramite.id
                    },
                    include: [
                        {
                            model: FlujoProceso,
                            required: true,
                            where: { orden: 1 },
                            include: [
                                {
                                    model: RolTipo
                                }
        
                            ]
                        }
                    ]
                }
            ],
        });
        transaction = await sequelize.transaction();
        try {
            // Asigana usuario destinatario
            let tarea_sig_id = null, uDestinatario;
            // tarea_sig_id = null si despues de la evaluacion termina el tramite
            if (flujoproceso.es_evaluacion == true) {
                await tramiteDetalle.update({
                    valor_evaluacion: varevaluacion
                }, { transaction });

                let wfcondiciontarea = await WfTareaCompuerta.findOne({
                    where: {
                        flujo_proceso_id: flujoproceso.id,
                        condicion: varevaluacion
                    }
                });

                if (wfcondiciontarea.condicion_tarea_siguiente != null) {
                    tarea_sig_id = wfcondiciontarea.condicion_tarea_siguiente;
                    uDestinatario = await obtieneUsuarioDestinatario(tarea, tarea_sig_id, id_tabla, tabla, tramite,wfdatos,wfdatos.tramite_detalle.flujo_proceso);
                    if (uDestinatario == false) {
                        if (transaction) await transaction.rollback();
                        return { 'dato': false, 'msg': 'Error, no existe usuario destinatario registrado.' };
                    } else {
                        await tramiteDetalle.update({
                            usuario_destinatario_id: uDestinatario
                        }, { transaction });
                    }
                }
            } else {
                if (flujoproceso.tarea_sig_id != null) {
                    tarea_sig_id = flujoproceso.tarea_sig_id;
                    uDestinatario = await obtieneUsuarioDestinatario(tarea, tarea_sig_id, id_tabla, tabla, tramite, wfdatos,wfdatos.tramite_detalle.flujo_proceso);
                    if (uDestinatario == false) {
                        if (transaction) await transaction.rollback(); //Verificar si corresponde
                        return { 'dato': false, 'msg': 'Error, no existe usuario destinatario registrado.' };
                    } else {
                        await tramiteDetalle.update({
                            usuario_destinatario_id: uDestinatario
                        }, { transaction });
                    }
                }
            }

            // guarda tramite enviado/devuelto
            let tramiteestado;
            if ((flujoproceso.tarea_sig_id != null && flujoproceso.es_evaluacion == false) || (tarea_sig_id != null && flujoproceso.es_evaluacion == true)) {
                if (tarea_sig_id > flujoproceso.id) {
                    tramiteestado = 15; //enviado
                } else {
                    tramiteestado = 4; //devuelto
                }
            } else {
                tramiteestado = 15; //enviado
            }

            await tramiteDetalle.update({
                obs: observacion.toUpperCase(),
                fecha_envio: new Date(),
                tramite_estado_id: tramiteestado
            }, { transaction });

            // Inserta datos propios de la solicitud en esta tarea
            if (datos) {
                let wfDatos = await WfSolicitudTramite.findOne({
                    where: { es_valido: true },
                    include: [
                        {
                            model: TramiteDetalle,
                            required: true,
                            where: {
                                tramite_id: idtramite,
                                flujo_proceso_id: tarea
                            }
                        }
                    ]
                });

                if (wfDatos) {
                    await wfDatos.update({
                        es_valido: false,
                        fecha_modificacion: new Date()
                    }, { transaction });
                }

                // Insert WfSolicitudTramite
                await WfSolicitudTramite.create({
                    tramite_detalle_id: tramiteDetalle.id,
                    datos: datos,
                    es_valido: true,
                    fecha_registro: new Date(),
                    lugar_tipo_localidad_id: lugarTipoLocalidad_id || null,
                    lugar_tipo_distrito_id: lugarTipoDistrito_id || null
                }, { transaction });
            }

            // Si es la ultima tarea del tramite se finaliza el tramite
            if ((flujoproceso.tarea_sig_id == null && flujoproceso.es_evaluacion == false) || (tarea_sig_id == null && flujoproceso.es_evaluacion == true)) {
                await tramite.update({
                    fecha_fin: new Date()
                }, { transaction });
                msg = 'TOME NOTA, el trámite Nro. ' + tramite.id + ' a finalizado.';
            } else {
                msg = 'El trámite Nro. ' + tramite.id + ' se envió correctamente.';
            }

            // Commit
            await transaction.commit();
            return { 'dato': true, 'msg': msg, 'idtramite': tramite.id };
        } catch (err) {
            // Rollback error en el registro
            if (transaction) await transaction.rollback();
            return { 'dato': false, 'msg': 'Ocurrio un error al enviar el trámite.' + err, 'error': err };
        }
    },

    // Funcion para obtener la tarea Fujo Tipo, Actual, Siguiente, Condicion
    async obtieneTarea(id, tipo, condicion) {// id = idtramite, tipo = (idflujo o idtramite) literal
        let tarea = {
            flujo_tipo: '',
            tarea_actual: '',
            tarea_siguiente: '',
            condicion: ''
        };
        
        if(id && tipo!='') {
            let resultFlujoProceso = null;
            if(tipo == 'idtramite') {
                let tramite = await Tramite.findByPk(id);
                let tramiteDetalle = await TramiteDetalle.findOne({
                    where: { id: tramite.tramite },
                    attributes: ['id'],
                    include: [
                        {
                            model: FlujoProceso,
                            required: true,
                            attributes: ['id', 'flujo_tipo_id', 'tarea_sig_id', 'es_evaluacion']
                        }
                    ]
                });
                if (tramiteDetalle) {
                    resultFlujoProceso = tramiteDetalle.flujo_proceso;
                }
            }else if(tipo == 'idflujo') {
                let flujoProceso = await FlujoProceso.findOne({
                    where: { flujo_tipo_id: id, 'orden': 1 },
                    attributes: ['id', 'flujo_tipo_id', 'tarea_sig_id', 'es_evaluacion']
                });
                if (flujoProceso) {
                    resultFlujoProceso = flujoProceso;
                }
            }
            if (resultFlujoProceso != null) {
                if (resultFlujoProceso.es_evaluacion) {
                    let wfTareaCompuerta = await WfTareaCompuerta.findOne({
                        attributes: ['id', 'condicion_tarea_siguiente', 'condicion'],
                        where: {
                            condicion: condicion
                        },
                        include: [
                            {
                                model: FlujoProceso,
                                required: true,
                                where: { id: resultFlujoProceso.id },
                                attributes: ['id', 'flujo_tipo_id']
                            }
                        ]
                    });
                    if (wfTareaCompuerta) {
                        tarea.flujo_tipo = wfTareaCompuerta.flujo_proceso.flujo_tipo_id;
                        tarea.tarea_actual = wfTareaCompuerta.flujo_proceso.id;
                        tarea.tarea_siguiente = wfTareaCompuerta.condicion_tarea_siguiente;
                        tarea.condicion = wfTareaCompuerta.condicion;
                    }
                } else {
                    tarea.flujo_tipo = resultFlujoProceso.flujo_tipo_id;
                    tarea.tarea_actual = resultFlujoProceso.id;
                    tarea.tarea_siguiente = resultFlujoProceso.tarea_sig_id;
                }
            }
        }
        return tarea;
    },

    // Funcion para obtener los DATOS del trámite por tarea
    async obtieneDatosTarea(idtramite, nivel) {
        let tarea = {
            datos: '',
        };
        
        let datos_tramite = await WfSolicitudTramite.findOne({
          where: { 'es_valido': true },
          attributes: ['id', 'datos'],
          include: [
            {
              model: TramiteDetalle,
              required: true,
              where: { tramite_id: idtramite },
              include: [
                {
                  model: FlujoProceso,
                  required: true,
                  where: { orden: nivel },
                }
              ]
            }
          ]
        });
        if (datos_tramite) {
            tarea.datos = datos_tramite.datos;
        }
        return tarea;
    }
};

// Funcion para asignar el usuario destinatario de la tarea actual
/*async function obtieneUsuarioDestinatario(tarea, tarea_sig_id, id_tabla, tabla, tramite,wfdatos,flujoProceso2) {
    let uid;
    let lugar_tipo_distrito;
    let lugar_tipo_departamento;
    let flujoprocesoSiguiente = await FlujoProceso.findOne({
        where: { id: tarea_sig_id },
        include: [
            {
                model: RolTipo,
                required: true
            }
        ]
    });
    // console.log('flujoprocesoSiguienteeeeeeeeeeeeeeeeee',tarea_sig_id, flujoprocesoSiguiente);
    let nivel_id = flujoprocesoSiguiente.rol_tipo.lugar_nivel_tipo_id;
    switch (tabla) {
        case 'institucioneducativa':
            if (tramite.institucioneducativa_id) {
                let institucioneducativa = await Institucioneducativa.findOne({
                    where: { id: id_tabla },
                    include: [
                        {
                            model: JurisdiccionGeografica,
                            required: true,
                            include: [
                                {
                                    model: DistritoTipo,
                                    required: true
                                }
                            ]
                        },
                    ]
                });
                lugar_tipo_distrito = institucioneducativa.jurisdiccion_geografica.lugar_tipo_id_distrito;
                lugar_tipo_departamento = institucioneducativa.jurisdiccion_geografica.lugar_tipo.lugar_tipo_id;
            } else {
                if(flujoProceso2.rol_tipo.lugar_nivel_tipo_id == 7){
                    lugar_tipo_distrito = wfdatos.lugar_tipo_distrito_id;
                    let lt = await LugarTipo.findOne({
                        where: { id: lugar_tipo_distrito }
                    });
                    lugar_tipo_departamento = lt.lugar_tipo_id;
                }                
                if(flujoProceso2.rol_tipo.lugar_nivel_tipo_id == 6 || flujoProceso2.rol_tipo.lugar_nivel_tipo_id == 8){
                    lugar_tipo_distrito = wfdatos.lugar_tipo_distrito_id;
                    lugar_tipo_departamento = wfdatos.lugar_tipo_distrito_id;
                }
            }
            break;
        case 'estudiante_inscripcion':
            break;
        case 'apoderado_inscripcion':
            break;
        case 'maestro_inscripcion':
            break;
        default:
            break;
    }
    // console.log('nivel_iddddddddddddddddddddddddddd',nivel_id, flujoprocesoSiguiente.id, lugar_tipo_departamento);
    let usuarioDestinatario;
    switch (nivel_id) {
        case 7:   // Distrito
            usuarioDestinatario = await WfUsuarioFlujoProceso.findAll({
                where: {
                    flujo_proceso_id: flujoprocesoSiguiente.id,
                    esactivo: true,
                    lugar_tipo_id: lugar_tipo_distrito
                }
            });
            if (usuarioDestinatario) {
                if (usuarioDestinatario.length > 1) {
                    uid = await asignaUsuarioDestinatario(tarea_actual, tarea_sig_id, usuarioDestinatario[0].lugar_tipo_id);
                } else {
                    uid = usuarioDestinatario[0].usuario_id;
                }
            } else {
                return false;
            }
            break;
        case 6:   // Departamento
        case 8:
            usuarioDestinatario = await WfUsuarioFlujoProceso.findAll({
                where: {
                    flujo_proceso_id: flujoprocesoSiguiente.id,
                    esactivo: true,
                    lugar_tipo_id: lugar_tipo_departamento //Corregir
                },
            });//console.log('ddddddddddddddddddddddddddd',usuarioDestinatario);
            if (usuarioDestinatario.length > 0) {
                if (usuarioDestinatario.length > 1) {
                    uid = await asignaUsuarioDestinatario(tarea_actual, tarea_sig_id, usuarioDestinatario[0].lugar_tipo_id);
                } else {
                    uid = usuarioDestinatario[0].usuario_id;
                }
            } else {
                return false;
            }return false;
            break;
        case 0://nivel nacional        
            if (flujoprocesoSiguiente.rol_tipo_id == 9) {  // si es director
                const query = `select u.* from maestro_inscripcion m
                    join usuario u on m.persona_id = u.persona_id
                    where m.institucioneducativa_id = `+ institucioneducativa.id + ` and m.gestion_tipo_id = ` + (new Date()).getFullYear() + ` and (m.cargo_tipo_id = 1 or m.cargo_tipo_id = 12) and m.es_vigente_administrativo is true and u.esactivo is true`;
                usuarioDestinatario = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT }, { raw: true });
                if (usuarioDestinatario.length > 0) {
                    uid = usuarioDestinatario[0].id;
                } else {
                    return false;
                }
            } else if (flujoprocesoSiguiente.rol_tipo_id == 8) { // si es tecnico nacional
                console.log('rol_tipo_idiiiiiiiiiiiiiiiiiiiiiiiiiial',nivel_id, flujoprocesoSiguiente.rol_tipo_id, flujoprocesoSiguiente.id);
                const query = `select * from wf_usuario_flujo_proceso ufp where ufp.esactivo is true and ufp.flujo_proceso_id=` + flujoprocesoSiguiente.id + ` and lugar_tipo_id=1`;
                usuarioDestinatario = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT }, { raw: true });
                if (usuarioDestinatario.length > 0) {
                    console.log('1111111111111>0');
                    if (usuarioDestinatario.length > 1) {console.log('1111111111111>1');
                        uid = await asignaUsuarioDestinatario(tarea_actual, tarea_sig_id, 1);
                    } else {console.log('1111111111111>1 else');
                        uid = usuarioDestinatario[0].usuario_id;
                    }
                } else {console.log('1111111111111>0 else');
                    return false;
                }
            }
            break;
        default:
            break;
    }
    return uid;//Usuario.findByPk(uid);
};*/

async function obtieneUsuarioDestinatario(tarea, tarea_sig_id, id_tabla, tabla, tramite,wfdatos,flujoProceso2) {
    let uid;
    let lugar_tipo_distrito;
    let lugar_tipo_departamento;
    let flujoprocesoSiguiente = await FlujoProceso.findOne({
        where: { id: tarea_sig_id },
        include: [
            {
                model: RolTipo,
                required: true
            }
        ]
    });

    let nivel_id = flujoprocesoSiguiente.rol_tipo.lugar_nivel_tipo_id;
    switch (tabla) {
        case 'institucioneducativa':
            if (tramite.institucioneducativa_id) {
                let institucioneducativa = await Institucioneducativa.findOne({where: { id: id_tabla }});
                if(institucioneducativa.institucioneducativa_tipo_id != 11 ){
                    let institucioneducativa = await Institucioneducativa.findOne({
                        where: { id: id_tabla },
                        include: [
                            {
                                model: JurisdiccionGeografica,
                                required: true,
                                include: [
                                    {
                                        model: DistritoTipo,
                                        required: true
                                    }
                                ]
                            }
                        ]
                    });
                    lugar_tipo_distrito = institucioneducativa.jurisdiccion_geografica.lugar_tipo_id_distrito;
                    lugar_tipo_departamento = institucioneducativa.distrito_tipo.departamento_tipo_id;
                }else{
                    const query = `select lt3.* from jurisdiccion_geografica le
                    join lugar_tipo lt on lt.id=le.lugar_tipo_id_localidad2012
                    join lugar_tipo lt1 on lt1.id=lt.lugar_tipo_id
                    join lugar_tipo lt2 on lt2.id=lt1.lugar_tipo_id
                    join lugar_tipo lt3 on lt3.id=lt2.lugar_tipo_id
                    where le.id=`+institucioneducativa.le_juridicciongeografica_id;
                    let lugar_tipo = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT, plain:true }, { raw: true });
                    lugar_tipo_distrito = lugar_tipo.codigo * 1;
                    lugar_tipo_departamento = lugar_tipo.codigo * 1;
                }
            } else {
                lugar_tipo_distrito = wfdatos.lugar_tipo_distrito_id;
                let lt = await LugarTipo.findOne({
                    where: { id: lugar_tipo_distrito },
                    // include:[
                    //     {
                    //         model: LugarTipo1,
                    //         required: true
                    //     }
                    // ]
                });
                if(flujoProceso2.rol_tipo.lugar_nivel_tipo_id == 7){
                    
                    lugar_tipo_departamento = lt.lugar_tipo1.codigo;
                }                
                if(flujoProceso2.rol_tipo.lugar_nivel_tipo_id == 6 || flujoProceso2.rol_tipo.lugar_nivel_tipo_id == 8){
                    lugar_tipo_distrito = lt.codigo;
                    lugar_tipo_departamento = lt.codigo;
                }
            }
            break;
        case 'estudiante_inscripcion':
            break;
        case 'apoderado_inscripcion':
            break;
        case 'maestro_inscripcion':
            break;
        default:
            break;
    }

    let usuarioDestinatario;
    switch (nivel_id) {
        case 7:   // Distrito
            usuarioDestinatario = await WfUsuarioFlujoProceso.findAll({
                where: {
                    flujo_proceso_id: flujoprocesoSiguiente.id,
                    esactivo: true,
                    lugar_tipo_id: lugar_tipo_distrito
                }
            });
            if (usuarioDestinatario) {
                if (usuarioDestinatario.length > 1) {
                    uid = await asignaUsuarioDestinatario(tarea_actual, tarea_sig_id, usuarioDestinatario[0].lugar_tipo_id);
                } else {
                    uid = usuarioDestinatario[0].usuario_id;
                }
            } else {
                return false;
            }
            break;
        case 6:   // Departamento
        case 8:
            const query = `select ufp.* from wf_usuario_flujo_proceso ufp join lugar_tipo lt on ufp.lugar_tipo_id=lt.id where ufp.flujo_proceso_id=`+ flujoprocesoSiguiente.id+` and ufp.esactivo is true and cast(lt.codigo as int)=`+lugar_tipo_departamento;
            usuarioDestinatario = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT }, { raw: true });
            if (usuarioDestinatario.length > 0) {
                if (usuarioDestinatario.length > 1) {
                    uid = await asignaUsuarioDestinatario(tarea_actual, tarea_sig_id, usuarioDestinatario[0].lugar_tipo_id);
                } else {
                    uid = usuarioDestinatario[0].usuario_id;
                }
            } else {
                return false;
            }
            break;
        case 0://nivel nacional
            // institucioneducativa.id = id_tabla
            if (flujoprocesoSiguiente.rol_tipo_id == 9) {  // si es director
                const query = `select u.* from maestro_inscripcion m
                    join usuario u on m.persona_id = u.persona_id
                    where m.institucioneducativa_id = `+ id_tabla + ` and m.gestion_tipo_id = ` + (new Date()).getFullYear() + ` and (m.cargo_tipo_id = 1 or m.cargo_tipo_id = 12) and m.es_vigente_administrativo is true and u.esactivo is true`;
                usuarioDestinatario = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT }, { raw: true });
                if (usuarioDestinatario.length > 0) {
                    uid = usuarioDestinatario[0].id;
                } else {
                    return false;
                }
            } else if (flujoprocesoSiguiente.rol_tipo_id == 8) { // si es tecnico nacional
                const query = `select * from wf_usuario_flujo_proceso ufp where ufp.esactivo is true and ufp.flujo_proceso_id=` + flujoprocesoSiguiente.id + ` and lugar_tipo_id=1`;
                usuarioDestinatario = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT }, { raw: true });
                if (usuarioDestinatario.length > 0) {
                    if (usuarioDestinatario.length > 1) {
                        uid = await asignaUsuarioDestinatario(tarea_actual, tarea_sig_id, 1);
                    } else {
                        uid = usuarioDestinatario[0].usuario_id;
                    }
                } else {
                    return false;
                }
            }
            break;
        default:
            break;
    }
    return uid;//Usuario.findByPk(uid);
};

// funcion que asigna usuario destinatario si la tarea tiene mas de un usuario registrado
async function asignaUsuarioDestinatario(tarea_actual_id, tarea_sig_id, lugar_tipo) {
    const query = `select a.usuario_id,case when b.nro is null then 0 else b.nro end as nro
        from 
        (select usuario_id from wf_usuario_flujo_proceso wf
        where wf.flujo_proceso_id=`+ tarea_sig_id + ` and wf.esactivo is true and wf.lugar_tipo_id=` + lugar_tipo + `)a
        left join 
        (select td.usuario_destinatario_id,count(*) as nro
        from tramite t
        join tramite_detalle td on cast(t.tramite as int)=td.id
        where flujo_proceso_id=`+ tarea_actual_id + ` and (td.tramite_estado_id=15 or td.tramite_estado_id=4) group by td.usuario_destinatario_id)b on a.usuario_id=b.usuario_destinatario_id  order by b.nro desc`;
    let usuarios = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT }, { raw: true });
    return usuarios[0].usuario_id;
};

// Funcion que verifica usuario remitente
async function verificaUsuarioRemitente(usuario, flujoproceso, tramite) {
    console.log(tramite.institucioneducativa);

    let valida, institucioneducativa;
    if (!usuario || !flujoproceso || !tramite) {
        valida = false;
        return valida;
    }

    let nivel = flujoproceso.rol_tipo.lugar_nivel_tipo_id;
    if (tramite.institucioneducativa_id) {
        institucioneducativa = await Institucioneducativa.findOne({where: { id: tramite.institucioneducativa_id }});
    } else if (tramite.estudiante_inscripcion_id) {
        institucioneducativa = tramite.estudiante_inscripcion.institucioneducativa_curso.institucioneducativa;
    } else if (tramite.maestro_inscripcion_id) {
        institucioneducativa = tramite.maestro_inscripcion.institucioneducativa;
    } else if (tramite.apoderado_inscripcion_id) {
        institucioneducativa = tramite.apoderado_inscripcion.estudiante_inscripcion.institucioneducativa_curso.institucioneducativa;
    } else {
        institucioneducativa = null;
    }
    //Obtenemos lugar tipo de la tarea en funcion al tramite
    let lugar_tipo_distrito;
    let lugar_tipo_departamento;
    if (institucioneducativa) {
        
        if(institucioneducativa.institucioneducativa_tipo_id != 11 ){
            lugar_tipo_distrito = institucioneducativa.jurisdiccion_geografica.lugar_tipo_id_distrito;
            let lt = await LugarTipo.findOne({
                where: { id: lugar_tipo_distrito },
                include:[
                    {
                        model: LugarTipo1,
                        required: true
                    }
                ]
            });
            //console.log(lt.lugar_tipo1.id);            
            lugar_tipo_departamento = lt.lugar_tipo1.codigo;
        }else{
            console.log(institucioneducativa.jurisdiccion_geografica.id)
            const query = `select lt3.* from jurisdiccion_geografica le
            join lugar_tipo lt on lt.id=le.lugar_tipo_id_localidad2012
            join lugar_tipo lt1 on lt1.id=lt.lugar_tipo_id
            join lugar_tipo lt2 on lt2.id=lt1.lugar_tipo_id
            join lugar_tipo lt3 on lt3.id=lt2.lugar_tipo_id
            where le.id=`+institucioneducativa.jurisdiccion_geografica.id;
            let lugar_tipo = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT, plain:true }, { raw: true });
            lugar_tipo_distrito = lugar_tipo.codigo * 1;
            lugar_tipo_departamento = lugar_tipo.codigo * 1;
        }
        
    } else {
        //Query que realiza lo mismo que models de abajo
        /*let query_WfST = `SELECT * FROM wf_solicitud_tramite wfd
            LEFT JOIN tramite_detalle trd on wfd.tramite_detalle_id = trd.id
            LEFT JOIN flujo_proceso flp on trd.flujo_proceso_id = flp.id
            WHERE trd.tramite_id = `+ tramite.id +'and flp.orden = 1 and wfd.es_valido = true';
        let wfdatos = await sequelize.query(query_WfST, { type: sequelize.QueryTypes.SELECT, plain: true }, { raw: true });
        lugar_tipo_distrito = (wfdatos)?wfdatos.lugar_tipo_distrito_id:0;*/
        
        let wfdatos = await WfSolicitudTramite.findOne({
            where: {
                es_valido: true
            },
            include: [
                {
                    model: TramiteDetalle,
                    required: true,
                    where: {
                        tramite_id: tramite.id
                    },
                    include: [
                        {
                            model: FlujoProceso,
                            required: true,
                            where: { orden: 1 },
                            include: [
                                {
                                    model: RolTipo
                                }
                            ]
                        }
                    ]
                }
            ],
        });console.log('aaaaaaaaaaa111', wfdatos.tramite_detalle.flujo_proceso.rol_tipo.lugar_nivel_tipo_id);
        if(wfdatos.tramite_detalle.flujo_proceso.rol_tipo.lugar_nivel_tipo_id == 7){
            lugar_tipo_distrito = wfdatos.lugar_tipo_distrito_id;
            let lt = await LugarTipo.findOne({
                where: { id: lugar_tipo_distrito }
            });
            lugar_tipo_departamento = lt.lugar_tipo_id;
        }
        if(wfdatos.tramite_detalle.flujo_proceso.rol_tipo.lugar_nivel_tipo_id == 6 || wfdatos.tramite_detalle.flujo_proceso.rol_tipo.lugar_nivel_tipo_id == 8){
            lugar_tipo_distrito = wfdatos.lugar_tipo_distrito_id;
            lugar_tipo_departamento = wfdatos.lugar_tipo_distrito_id;
        }
    }
    let lugarTipoId;
    switch (nivel) {
        case 7:   // Distrito
            lugarTipoId = lugar_tipo_distrito;
            break;
        case 6:   // Departamento
        case 8:
            lugarTipoId = lugar_tipo_departamento;
            break;
        case 0://nivel nacional
            if (flujoproceso.rol_tipo_id == 8) { // si es tecnico nacional
                lugarTipoId = 1;
            }
            break;
        default:
            break;
    }
    let uRemitente;
    if (flujoproceso.rol_tipo_id == 9) { //director
        uRemitente = await MaestroInscripcion.findOne({
            where: {
                institucioneducativa_id: institucioneducativa.id,
                gestion_tipo_id: (new Date()).getFullYear(),
                cargo_tipo_id: [1, 12],
                es_vigente_administrativo: true
            },
            include: [
                {
                    model: Persona,
                    required: true,
                    attributes: ['id'],
                    include: Usuario,
                    required: true,
                    model: [
                        {
                            model: Usuario,
                            required: true,
                            where: {
                                esactivo: true,
                                id: usuario.id
                            }
                        }
                    ]
                }
            ]
        });
    } else {
        uRemitente = await WfUsuarioFlujoProceso.findOne({
            where: {
                usuario_id: usuario.id,
                flujo_proceso_id: flujoproceso.id,
                esactivo: true,
                lugar_tipo_id: lugarTipoId
            }
        });
    }
    if (uRemitente) {
        valida = true;
    } else {
        valida = false;
    }
    return valida;
};