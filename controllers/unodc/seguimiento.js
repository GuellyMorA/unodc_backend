
const Seguimiento = require('../../models/unodc').seguimiento ; 
const sequelize = Seguimiento.sequelize;

const EventLog = require('../../models/unodc').event_log_operaciones; // Importar modelo de errores
const logger = require('../../config/logger');

const logOperation = async (req, message, query, parameters, operation) => {
      try {
        body= req ? req.req.body : '';
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
          await EventLog.create({
            operacion_realizada: operation  + '- query:'+ query  + '- parameters: '+ parameters,
            observacion: 'user_login: '+  body.user_login + '-message: '+   message  ,
            fec_registro:  date+' '+ time,
            sesion_log_id: 0,
           usu_cre:  body.user_login
          });
              
        
      } catch (error) {
          logger.error('Error al guardar log', { message: error.message });
      }
    };
    
    const logError = async (req,message, stack, query, parameters, operation) => {
      try {
        body= req ? req.body : '';
        const id= req ? req.body.id : '';
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
          await EventLog.create({
            operacion_realizada: operation  + '- query:'+ query  + '- parameters: '+ parameters,
            observacion: 'user_login: '+  body.user_login + '-message: '+   message  + '-stack: '+   stack,
            fec_registro:  date+' '+time,
            sesion_log_id: 0,
            usu_cre:  body.user_login,

          });
      } catch (error) {
          logger.error('Error al guardar error log', { message: error.message });
      }
    };
    

module.exports = {

  listRepByNivelGeoByUsuId(req, res) {
    console.log(' req.params.usuarios_id, req.params.depto_id: ', req.params.usuarios_id, req.params.depto_id);
    /// denunci  y denunciante
    return sequelize.query(`
    SELECT 
    count(seg.estado) AS cantidad , CASE   WHEN seg.fec_registro = CURRENT_DATE::DATE  AND seg.estado   = 'ASIGNADO' THEN 'ASIGNADO_HOY' ELSE seg.estado  END  AS estado
    FROM 
           denuncia_personas dper 
           INNER JOIN nivel_geografico depto ON dper.nivel_geografico_id = depto.id 
           INNER JOIN nivel_geografico mun ON dper.nivel_geografico_sigla  = mun.sigla 
           LEFT  JOIN seguimiento seg ON dper.id  = seg.denuncia_personas_id 
           LEFT  JOIN usuarios usu  ON seg.usuarios_id  = usu.id 
           LEFT  JOIN actividades act  ON seg.actividades_id  = act.id 
           WHERE  --rbc2025 seg.usuarios_id =  :usuarios_id 
             seg.usuarios_id =  CASE   WHEN :depto_id   = 0 THEN seg.usuarios_id
                                                       ELSE :usuarios_id  END
           AND  dper.nivel_geografico_id =  CASE   WHEN :depto_id   = 0 THEN dper.nivel_geografico_id
                                                       ELSE :depto_id  END
    GROUP by  seg.estado ,CASE   WHEN seg.fec_registro = CURRENT_DATE::DATE  AND seg.estado   = 'ASIGNADO' THEN 'ASIGNADO_HOY' ELSE seg.estado  END
    ORDER by  seg.estado ASC
           
     `, {
      replacements: {
    
        usuarios_id: req.params.usuarios_id,
        depto_id: req.params.depto_id
      },
      type: sequelize.QueryTypes.SELECT,
      plain: false,
      raw: true
    })
      .then((seguimiento) => res.status(200).send(seguimiento))
      .catch((error) => {
        res.status(400).send(error);
      });
  },
    

   listByCodByNivelGeoByUsuId(req, res) {
    console.log(' req.params.usuarios_id, req.params.depto_id, req.params.cod_denuncia: ', req.params.usuarios_id, req.params.depto_id,  req.params.cod_denuncia );
    /// denunci  y denunciante
    return sequelize.query(`
    SELECT 
    ROW_NUMBER() OVER (ORDER BY seg.fec_cre ASC, seg.id ASC) AS fila, dper.id AS denuncia_personas_id ,dper.cod_denuncia, --dper.sigla  , dper.lugar_hecho ,dper.nivel_geografico_id  as depto_id ,depto.descripcion  as departamento , dper.nivel_geografico_sigla  as mun_id , mun.descripcion  as municipio ,
    seg.id AS seg_id , seg.observacion, TO_CHAR(seg.fec_registro, 'DD/MM/YYYY') AS fec_registro, seg.usuarios_id, usu.id AS  gestor_id ,
    (dper.fec_cre::DATE - CURRENT_DATE::DATE )::integer +45::integer   AS    dias_retraso,
   act.id AS actividades_id , act.actividad, act.sigla AS actividad_sigla, act.descripcion, act.tipo AS  actividad_tipo ,       
   dper.usu_cre,TO_CHAR(dper.fec_cre, 'DD/MM/YYYY')  AS fec_cre   , dper.usu_mod  ,dper.fec_mod ,dper.estado ,  dper.transaccion
   FROM 
          denuncia_personas dper 
          INNER JOIN nivel_geografico depto ON dper.nivel_geografico_id = depto.id 
          INNER JOIN nivel_geografico mun ON dper.nivel_geografico_sigla  = mun.sigla 
          LEFT  JOIN seguimiento seg ON dper.id  = seg.denuncia_personas_id 
          LEFT  JOIN usuarios usu  ON seg.usuarios_id  = usu.id 
          LEFT  JOIN actividades act  ON seg.actividades_id  = act.id 
    WHERE  dper.cod_denuncia =    :cod_denuncia :: text AND  :usuarios_id =  :usuarios_id  --seg.usuarios_id =  :usuarios_id 
          AND  dper.nivel_geografico_id =  CASE   WHEN :depto_id   = 0 THEN dper.nivel_geografico_id
                                                      ELSE :depto_id  END
          AND    act.tipo <>'ASIGNADO'  
     `, {
      replacements: {
        cod_denuncia: req.params.cod_denuncia,
        usuarios_id: req.params.usuarios_id,
        depto_id: req.params.depto_id
      },
      type: sequelize.QueryTypes.SELECT,
      plain: false,
      raw: true
    })
      .then((seguimiento) => res.status(200).send(seguimiento))
      .catch((error) => {
        res.status(400).send(error);
      });
  },
    
  listByCodByNivelGeo(req, res) { //   front: seguimientoListByCod ok 
    console.log(' req.params.usuarios_id, req.params.depto_id  ', req.params.usuarios_id, req.params.depto_id, req.params.rol);
    /// denunci  y denunciante
    return sequelize.query(`
   SELECT DISTINCT ON (dper.cod_denuncia)    --    ROW_NUMBER() OVER (ORDER BY dper.cod_denuncia ASC)
    0 AS fila, dper.id as denuncia_personas_id ,dper.cod_denuncia, dper.sigla  , dper.lugar_hecho ,dper.nivel_geografico_id  as depto_id ,depto.descripcion  as departamento , dper.nivel_geografico_sigla  as mun_id , mun.descripcion  as municipio ,
   TO_CHAR(dper.fec_registro_hecho, 'DD/MM/YYYY')  AS fec_registro_hecho  , dper.hora_registro_hecho ,dper.detalle_hecho , 
   case  when dper.reserva_identidad IS FALSE  AND denuncia_anonima IS FALSE  then 'Denuncia' else 
            (case  when dper.reserva_identidad  then 'Reserva identidad'  ELSE 'Anonima'  end ) end as tipo_denuncia,
            dper.reserva_identidad, dper.reserva_identidad as reserva_identidad_si,   case  when dper.reserva_identidad IS FALSE THEN TRUE  ELSE FALSE  END  as reserva_identidad_no, dper.denuncia_anonima ,
    seg.id AS seg_id , seg.observacion, TO_CHAR(seg.fec_registro, 'DD/MM/YYYY') AS fec_registro,  seg.usuarios_id, usu.id AS  gestor_id ,usu.apellido_pat AS apellido_pat_gestor  ,usu.apellido_mat AS apellido_mat_gestor  ,usu.nombres AS nombres_gestor , 
    gr.sigla_ab || ' '||   usu.nombres || ' '|| usu.apellido_pat || ' ' || usu.apellido_mat AS gestor_seguimiento , 
    usu.grados_sigla || '. '||   usu.nombres || ' '|| usu.apellido_pat || ' ' || usu.apellido_mat AS gestor_seguimiento_dos,
    (dper.fec_cre::DATE - CURRENT_DATE::DATE )::integer + COALESCE( p3.param_numerico_ini::integer, 0)  + COALESCE( p1.param_numerico_ini::integer, 0)  + COALESCE( p2.param_numerico_ini::integer, 0)   AS dias_retraso,
   act.id AS actividades_id , act.actividad, act.sigla AS actividad_sigla, act.descripcion, act.tipo AS  actividad_tipo ,  '' As dnado_nombre_completo_concat,        
   dper.usu_cre,TO_CHAR(dper.fec_cre, 'DD/MM/YYYY')  AS fec_cre   , dper.usu_mod  ,dper.fec_mod ,dper.estado ,  dper.transaccion     
   FROM 
          denuncia_personas dper 
          INNER JOIN nivel_geografico depto ON dper.nivel_geografico_id = depto.id 
          INNER JOIN nivel_geografico mun ON dper.nivel_geografico_sigla  = mun.sigla 
          LEFT  JOIN LATERAL (  
            SELECT id ,usuarios_id,actividades_id,observacion,fec_registro
            FROM seguimiento seg 
            WHERE seg.denuncia_personas_id =dper.id 
            ORDER BY id DESC
            LIMIT 1) seg ON true  
          LEFT  JOIN usuarios usu  ON seg.usuarios_id  = usu.id   
          INNER JOIN usuarios_rol u_r  ON 	usu.id = u_r.usuarios_id
          LEFT  JOIN actividades act  ON seg.actividades_id  = act.id 
          LEFT JOIN parametros p1 ON dper.modulos_sigla_amp_1 = p1.modulos_sigla 
        LEFT JOIN parametros p2 ON dper.modulos_sigla_amp_2 = p2.modulos_sigla
        LEFT JOIN parametros p3 ON 'DEN_SEG_AMP_45_DIAS' = p3.modulos_sigla
          INNER JOIN grados gr ON 	gr.sigla  = usu.grados_sigla 
     WHERE                                                      --  rol='GES_DEP_LP' 
          ( seg.usuarios_id = :usuarios_id  or u_r.roles_sigla  =  CASE   WHEN :rol   in ('TRANSP_NAL','DIRECT_NAL','GES_SEGNAL',
          'GES_DEP_CO','GES_DEP_LP','GES_DEP_OR',   'GES_DEP_SC','GES_DEP_BE','GES_DEP_TA', 'GES_DEP_PA','GES_DEP_PO')  THEN u_r.roles_sigla
                                                      ELSE '0'  END  ) 
     AND ( :rol   in ('TRANSP_NAL','DIRECT_NAL','GES_SEGNAL'    )
          or dper.nivel_geografico_id =   CASE   WHEN :depto_id   = 0 THEN dper.nivel_geografico_id
                                       ELSE :depto_id  END  )
      ORDER BY dper.cod_denuncia DESC 
     `, {        
      
      replacements: {
        usuarios_id: req.params.usuarios_id,
        depto_id: req.params.depto_id,
        rol: req.params.rol
      },
      type: sequelize.QueryTypes.SELECT,
      plain: false,
      raw: true
    })
      .then((seguimiento) => res.status(200).send(seguimiento))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  list(req, res) {
  return Seguimiento
            .findAll({})
            .then(( seguimiento ) => res.status(200).send(seguimiento )) 
            .catch((error) => { res.status(400).send(error); });
    },

  getById(req, res) {
        console.log(req.params.id);
return Seguimiento
            .findByPk(req.params.id)
            .then( seguimiento => { 
                console.log( seguimiento);
                if (! seguimiento) { 
        return res.status(404).send({
                        message: 'Seguimiento no encontrado', 
                    });
                }
                 return res.status(200).send(seguimiento);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return Seguimiento.create({

             denuncia_personas_id: req.body.denuncia_personas_id,
             control_id: req.body.control_id,
             usuarios_id: req.body.usuarios_id,
             actividades_id: req.body.actividades_id,
             observacion: req.body.observacion,
             fec_registro: req.body.fec_registro,
             estado: req.body.estado,
             transaccion: req.body.transaccion,
             usu_cre: req.body.usu_cre,
   // fec_cre: req.body.fec_cre,
      //  usu_mod: req.body.usu_mod,
      //  fec_mod: req.body.fec_mod,
      //  host_creacion: req.body.host_creacion,
      //  host_modificacion: req.body.host_modificacion,


        })
      .then((seguimiento) =>   { 
                  sequelize.beforeQuery((query, options) => {
                   // console.log('query add seguimiento : ',query);
                    logger.info('>>> POST - Creando seguimiento: '+ req.body.user_login  + ' QRY: INSERT INTO seguimiento ... PARAMS query: '+ JSON.stringify(query));

                  });
                    // Log the retrieval operation
                    logOperation(res,'Creando seguimiento: ' + req.body.user_login , ' QRY:  INSERT INTO seguimiento ... ', JSON.stringify(seguimiento), 'POST');
    
                    console.log(">>> POST - seguimiento:  "+ JSON.stringify(seguimiento))// do your own logging        
                // this.insertLog ('',req);
                 res.status(201).send(seguimiento)
                 
               })
                 .catch(error => {
                  logger.error('>>> POST - Error Creando seguimiento : '  +' QRY: INSERT INTO seguimiento ..PARAMS: '  + JSON.stringify(  error.message )+ '>>> Stack : ' +error.stack  + '>>>  Body: ' + JSON.stringify(req.body) );
                  logError(req,'>>> POST - Error Creando seguimiento', error.stack, ' QRY: INSERT INTO seguimiento...', JSON.stringify(req.body), 'POST');
               
                      console.log(' *************ERROR create 1', error);
                      res.status(400).send(error)  });
                
              },
    
    update(req, res) {
        console.log( Seguimiento);
                 return Seguimiento.findByPk(req.params.id, {})
            .then( seguimiento => { 
                if (! seguimiento) { 
       return res.status(404).send({
                        message: 'Seguimiento no encontrado', 
              });
            }
       return seguimiento
       .update({

        denuncia_personas_id: req.body.denuncia_personas_id || seguimiento.denuncia_personas_id,
        control_id: req.body.control_id || seguimiento.control_id,
        usuarios_id: req.body.usuarios_id || seguimiento.usuarios_id,
        actividades_id:  req.body.actividades_id || seguimiento.actividades_id,
        observacion: req.body.observacion || seguimiento.observacion,
        fec_registro: req.body.fec_registro || seguimiento.fec_registro,
        estado: req.body.estado || seguimiento.estado,
        transaccion: req.body.transaccion || seguimiento.transaccion,
      //  usu_cre: req.body.usu_cre || seguimiento.usu_cre,
      //  fec_cre: req.body.fec_cre || seguimiento.fec_cre,
        usu_mod: req.body.usu_mod || seguimiento.usu_mod,
        fec_mod: req.body.fec_mod || seguimiento.fec_mod,
       // host_creacion: req.body.host_creacion || seguimiento.host_creacion,
      //  host_modificacion: req.body.host_modificacion || seguimiento.host_modificacion,


 })
 .then(() =>{  
     console.log(' *************SI UPDATE OK');
                 return res.status(200).send(seguimiento)   })
.catch(error => {
         console.log(' *************ERROR UPDATE 1', error);
         res.status(400).send(error)  });
   })
 .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
                 return Seguimiento.findByPk(req.params.id)
            .then( seguimiento => { 
                if (! seguimiento) { 
       return res.status(404).send({
                        message: 'Seguimiento no encontrado', 
              });
            }
      return seguimiento
      .destroy()
      .then(() =>{
        console.log(' ************SI DELETE OK');
          res.status(204).send() }  )
       .catch(error => res.status(400).send(error));
      })
     .catch(error => res.status(400).send(error));
  }

};




