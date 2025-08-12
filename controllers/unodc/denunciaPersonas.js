
const DenunciaPersonas = require('../../models/unodc').denuncia_personas;
const sequelize = DenunciaPersonas.sequelize;

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
            usu_cre:  body.user_login
          });
      } catch (error) {
          logger.error('Error al guardar error log', { message: error.message });
      }
    };
    

module.exports = {
      listRepDenByDeptoByEstado(req, res) {
            console.log(' req.params.estado',  req.params.estado, 'req.params.depto_id ',req.params.depto_id, 'fec_registro_hecho_desde ',req.params.fec_registro_hecho_desde ,'fec_registro_hecho_hasta ',req.params.fec_registro_hecho_hasta);
            /// denunci  y denunciante
        
            let transaccion = req.params.estado =='ACEPTADO' ? 'DEN_ACEPTAR'  :  (req.params.estado =='RECHAZADO' ? 'DEN_RECHAZAR' : (req.params.estado =='AMPLIACION' ? 'TODOS' : 'TODOS' ) );
            let ampliacion ='';
            if(transaccion  =='DEN_ACEPTAR' || transaccion  =='DEN_RECHAZAR'   ){

                  req.params.estado= 'CONCLUSION' ;
            };
            if( req.params.estado== 'AMPLIACION'    ){

                  req.params.estado= 'TODOS' ;
                  ampliacion  ='DEN_SOL_AMPLIACION';
            };

            return sequelize.query(`        
            SELECT 
            dper.id AS denuncia_personas_id ,dper.cod_denuncia, 
            dper.nivel_geografico_id  as depto_id , dnte.id as id_dnte,  -- dndo.id as id_dndo,    
           dnte.nombres || ' '|| dnte.apellido_pat || ' ' || dnte.apellido_mat AS dnte_nombre_completo ,   
            MAX(    dndo.nombres || ' '|| dndo.apellido_pat || ' ' || dndo.apellido_mat) AS dndo_nombre_completo ,    
          dper.detalle_hecho ,  depto.descripcion  as departamento ,   
          gr.sigla_ab || ' '|| usu.nombres || ' '|| usu.apellido_pat || ' ' || usu.apellido_mat AS asignado_nombre_completo ,  
          CASE   WHEN dper.transaccion   = 'DEN_ACEPTAR' THEN 'ACEPTADO' 
                  WHEN dper.transaccion   = 'DEN_RECHAZAR' THEN 'RECHAZADO' 
                  WHEN :ampliacion  = 'DEN_SOL_AMPLIACION' AND dper.transaccion <>'CREAR' THEN 'SOL_AMPLIACION' 
                  ELSE  dper.estado   END AS  estado,
            CASE   WHEN dper.transaccion   = 'DEN_ACEPTAR' THEN 'ACEPTADO' 
         WHEN dper.transaccion   = 'DEN_RECHAZAR' THEN 'RECHAZADO' 
         ELSE  'PENDIENTE'  END AS resultado,            
          TO_CHAR(dper.fec_registro_hecho, 'DD/MM/YYYY')  AS fec_registro_hecho   
           FROM 
                  denuncia_personas dper 
                    INNER  JOIN personas dnte  ON dper.id  = dnte.denuncia_personas_id 
                    INNER  JOIN personas dndo  ON dper.id  = dndo.denuncia_personas_id 
                  INNER JOIN nivel_geografico depto ON dper.nivel_geografico_id = depto.id 
                  INNER JOIN nivel_geografico mun ON dper.nivel_geografico_sigla  = mun.sigla 
                  LEFT  JOIN seguimiento seg ON dper.id  = seg.denuncia_personas_id 
                  LEFT  JOIN usuarios usu  ON seg.usuarios_id  = usu.id
                  INNER JOIN grados gr ON 	gr.sigla  = usu.grados_sigla      
            WHERE   
            dnte.tipo_personas  ='DENUNCIANTE'  AND dndo.tipo_personas ='DENUNCIADO'
            AND dper.estado  =  CASE   WHEN :estado    = 'TODOS' THEN dper.estado  ELSE :estado  END 
            AND dper.transaccion  =  CASE   WHEN :transaccion   = 'TODOS' THEN dper.transaccion  ELSE :transaccion  END 
            AND (dper.Modulos_sigla_amp_1  =  CASE   WHEN :ampliacion   = 'DEN_SOL_AMPLIACION'  THEN 'DEN_SEG_AMP_5_DIAS'  ELSE dper.Modulos_sigla_amp_1   END 
                  OR    dper.Modulos_sigla_amp_2  =  CASE   WHEN :ampliacion   = 'DEN_SOL_AMPLIACION'  THEN 'DEN_SEG_AMP_10_DIAS'  ELSE dper.Modulos_sigla_amp_2  END 
                  OR dper.Modulos_sigla_amp_1 IS NULL OR dper.Modulos_sigla_amp_2 IS NULL
                  )
            AND CASE WHEN :ampliacion  = 'DEN_SOL_AMPLIACION' AND dper.transaccion ='CREAR' THEN FALSE ELSE TRUE  END           
            AND dper.nivel_geografico_id = CASE WHEN :depto_id = 0 THEN dper.nivel_geografico_id  ELSE :depto_id END   
            AND  dper.fec_registro_hecho::DATE >=   CASE WHEN  :fec_registro_hecho_desde  = '1999-01-01' THEN  dper.fec_registro_hecho::DATE ELSE  :fec_registro_hecho_desde::DATE END          
            AND  dper.fec_registro_hecho::DATE <=   CASE WHEN  :fec_registro_hecho_hasta  = '1999-01-01' THEN  dper.fec_registro_hecho::DATE ELSE  :fec_registro_hecho_hasta::DATE END          
            GROUP BY       
                  dper.id ,dper.cod_denuncia, 
                    dper.nivel_geografico_id  , dnte.id , 
                   dnte.nombres || ' '|| dnte.apellido_pat || ' ' || dnte.apellido_mat  ,   
                    --  dndo.id,   dndo.nombres || ' '|| dndo.apellido_pat || ' ' || dndo.apellido_mat  ,    
                  dper.detalle_hecho ,  depto.descripcion  ,   
                  gr.sigla_ab || ' '||   usu.nombres || ' '|| usu.apellido_pat || ' ' || usu.apellido_mat ,  
                   dper.estado ,    dper.fec_registro_hecho       
             ORDER BY dper.fec_cre DESC, dper.id DESC --cod_denuncia            
                   
             `, {
              replacements: {
                  estado: req.params.estado,
                depto_id: req.params.depto_id,
                transaccion: transaccion,
                ampliacion:ampliacion,
                fec_registro_hecho_desde:req.params.fec_registro_hecho_desde,
                fec_registro_hecho_hasta:req.params.fec_registro_hecho_hasta
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

      listRepDenByDeptoByInfFinal(req, res) {
            console.log(' req.params.usuarios_id, req.params.depto_id ', req.params.usuarios_id, req.params.depto_id);
            /// denunci  y denunciante
            return sequelize.query(`
            SELECT 
                  count(dper.nivel_geografico_id) AS cantidad , dper.nivel_geografico_id,depto.descripcion 
            FROM                
                  denuncia_personas dper 
                  INNER JOIN nivel_geografico depto ON dper.nivel_geografico_id = depto.id 
   
            WHERE   dper.nivel_geografico_id =  CASE   WHEN :depto_id   = 0 THEN dper.nivel_geografico_id
                                                ELSE :depto_id  END
                  AND  dper.estado ='CONCLUSION'   --  AND seg.usuarios_id  = 9   
            GROUP by  dper.nivel_geografico_id, depto.descripcion 
            ORDER by  depto.descripcion ASC                
                   
             `, {
              replacements: {
            
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

      listRepDenByDepto(req, res) {
            console.log(' req.params.usuarios_id, req.params.depto_id ', req.params.usuarios_id, req.params.depto_id);
            /// denunci  y denunciante
            return sequelize.query(`
            SELECT
            count(dper.nivel_geografico_id) AS cantidad , dper.nivel_geografico_id,depto.descripcion 
            FROM                
                denuncia_personas dper 
            INNER JOIN nivel_geografico depto ON dper.nivel_geografico_id = depto.id 
            WHERE   dper.nivel_geografico_id =  CASE   WHEN :depto_id   = 0 THEN dper.nivel_geografico_id
                                                ELSE :depto_id  END
            GROUP by  dper.nivel_geografico_id, depto.descripcion 
            ORDER by  depto.descripcion ASC                
                   
             `, {
              replacements: {
            
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
      
      listRepDenByTipo(req, res) {
            console.log(' req.params.usuarios_id, req.params.depto_id ', req.params.usuarios_id, req.params.depto_id);
         
      return sequelize.query(`            
            WITH ultimos_seguimientos AS (
            SELECT 
                  denuncia_personas_id,    MAX(fec_cre::DATE) AS max_fec_cre
            FROM seguimiento
            GROUP BY denuncia_personas_id
            ), 
            con_derivacion AS (
            SELECT 
                  DISTINCT ON (dper.cod_denuncia) seg.transaccion,dper.cod_denuncia,dper.id, seg.id as idSeg,
                  CASE 
                        WHEN seg.transaccion = 'DEN_DERIVAR' THEN 'ASIGNADO'
                        --WHEN seg.transaccion IN ('DEN_RECHAZAR', 'DEN_ARCHIVAR', 'DEN_ACEPTAR') THEN 'CONCLUSION'
                        WHEN seg.transaccion = 'DEN_RECHAZAR' THEN 'RECHAZADO_CON_INF'
                        WHEN seg.transaccion = 'DEN_ARCHIVAR' THEN 'DEN_ARCHIVAR'
                        WHEN seg.transaccion = 'DEN_ACEPTAR' THEN 'ACEPTADO_CON_INF'
                        ELSE seg.estado
                  END AS estado , seg.fec_cre::DATE as fec_cre, seg.transaccion AS sigla
            FROM 
                  denuncia_personas dper
                  INNER JOIN nivel_geografico depto ON dper.nivel_geografico_id = depto.id 
                  INNER JOIN nivel_geografico mun ON dper.nivel_geografico_sigla = mun.sigla 
                  LEFT JOIN seguimiento seg ON dper.id = seg.denuncia_personas_id 
                  LEFT JOIN usuarios usu ON seg.usuarios_id = usu.id 
                  LEFT JOIN actividades act ON seg.actividades_id = act.id 
                  INNER JOIN ultimos_seguimientos us ON us.denuncia_personas_id = dper.id  AND seg.fec_cre::DATE = us.max_fec_cre
            WHERE 
                  seg.usuarios_id = CASE WHEN :depto_id = 0 THEN seg.usuarios_id ELSE :usuarios_id END
                  AND dper.nivel_geografico_id = CASE WHEN :depto_id = 0 THEN dper.nivel_geografico_id ELSE :depto_id END
            ),  --  select * from con_derivacion
            sin_asignacion AS (
            SELECT 
                  'CREAR' as transaccion, 'SIN_ASIGNACION' AS estado, dper.fec_cre::DATE as fec_cre, dper.transaccion AS sigla
            FROM 
                  denuncia_personas dper
                  INNER JOIN nivel_geografico depto ON dper.nivel_geografico_id = depto.id 
                  INNER JOIN nivel_geografico mun ON dper.nivel_geografico_sigla = mun.sigla 
                  --  LEFT JOIN seguimiento seg ON dper.id = seg.denuncia_personas_id 
                  --  LEFT JOIN usuarios usu ON seg.usuarios_id = usu.id 
            --   LEFT JOIN actividades act ON seg.actividades_id = act.id 
            WHERE dper.estado = 'SOLICITADO' and NOT EXISTS (
                                                                  SELECT 1 FROM seguimiento seg 
                                                                  WHERE seg.denuncia_personas_id = dper.id  )
                  --  AND seg.usuarios_id = CASE WHEN :depto_id = 0 THEN seg.usuarios_id ELSE :usuarios_id END
                  AND dper.nivel_geografico_id = CASE WHEN :depto_id = 0 THEN dper.nivel_geografico_id ELSE :depto_id END
            )
                  SELECT COUNT(estado) AS total, estado, estado AS codigo, 'con_derivacion' AS descrip
                  FROM con_derivacion
                  GROUP BY estado
            UNION ALL
                  SELECT COUNT(estado) AS total, estado, 'SIN_ASIGNACION' AS codigo, 'denuncias_sin_asignacion' AS descrip
                  FROM sin_asignacion
                  GROUP BY estado
            UNION ALL 
                  SELECT COUNT(estado) AS total, estado,  'CREADAS_ULT_5_DIAS' AS codigo, 'denuncias_sin_asignacion_ult_5_dias' AS descrip
                  FROM sin_asignacion	as denuncias_creadas_ult_5_dias
                  Where fec_cre::DATE >=  CURRENT_DATE::DATE - INTERVAL '5 days'
            Group by estado, fec_cre
            UNION ALL
                  SELECT	 COUNT(estado) AS total, estado, dia_semana AS codigo, 'denuncias_por_dias_ult_5_dias' AS descrip
                  FROM ( 
                        SELECT (estado) AS total, 'POR_DIAS' as estado,  TO_CHAR(fec_cre, 'TMDay') AS dia_semana
                        FROM con_derivacion	
                        where fec_cre >=  CURRENT_DATE::DATE - INTERVAL '5 days'
                  UNION ALL
                        SELECT (estado) AS total, 'POR_DIAS' as estado, TO_CHAR(fec_cre, 'TMDay') AS dia_semana
                        FROM sin_asignacion	
                        where fec_cre >=  CURRENT_DATE::DATE - INTERVAL '5 days'
                  )	AS denuncias_ult_5_dias	
            group by estado, dia_semana   
            UNION ALL
                  SELECT	 COUNT(estado) AS total,  'POR_MES' as estado, mes AS codigo, 'denuncias_por_mes' AS descrip
                  FROM ( 
                        SELECT (estado) AS total, 'POR_MES' as estado,  TO_CHAR(DATE_TRUNC('month', fec_cre), 'TMMonth') AS mes
                        FROM con_derivacion	
                        where fec_cre >=  (CURRENT_DATE - INTERVAL '1 year')
                  UNION ALL
                        SELECT (estado) AS total, 'POR_MES' as estado,  TO_CHAR(DATE_TRUNC('month', fec_cre), 'TMMonth') AS mes
                        FROM sin_asignacion	
                        where fec_cre >= (CURRENT_DATE - INTERVAL '1 year')
                  )	as denuncias_por_mes
            group by mes --TO_CHAR(DATE_TRUNC('month', fec_cre), 'YYYY-MM') 
                  UNION ALL
                  SELECT COUNT(estado) AS total, estado, 'ASIGNADO_INICIAL' AS codigo, 'con_derivacion_inicial' AS descrip
                  FROM con_derivacion
                  WHERE estado = 'ASIGNADO' --AND fec_cre >=  CURRENT_DATE::DATE - INTERVAL '5 days'
                  GROUP BY estado
                  UNION ALL
                  SELECT COUNT(*) AS total, 'SEGUIMIENTO' as estado, 'SEGUIMIENTO' AS codigo, 'con_seguimiento' AS descrip
                  FROM con_derivacion
                  GROUP BY descrip    
            ORDER BY descrip,estado,codigo ;
                                               
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
      
      listRepDenByTipoPlazo(req, res) {
            console.log(' req.params.usuarios_id, req.params.depto_id ', req.params.usuarios_id, req.params.depto_id);
         
            return sequelize.query(`     
           
 WITH ultimos_seguimientos AS (
    SELECT 
        denuncia_personas_id,
        MAX(fec_cre::DATE) AS max_fec_cre
    FROM seguimiento
    GROUP BY denuncia_personas_id
),
con_derivacion AS (
   SELECT 
      dper.cod_denuncia, seg.transaccion,dper.id,seg.id  segId,
      (dper.fec_cre::DATE - CURRENT_DATE::DATE )::integer + COALESCE( p3.param_numerico_ini::integer, 0)  + COALESCE( p1.param_numerico_ini::integer, 0)  + COALESCE( p2.param_numerico_ini::integer, 0)   AS dias_retraso,
        seg.estado , seg.fec_cre::DATE as fec_cre  
    FROM 
        denuncia_personas dper
        INNER JOIN nivel_geografico depto ON dper.nivel_geografico_id = depto.id 
        INNER JOIN nivel_geografico mun ON dper.nivel_geografico_sigla = mun.sigla 
        LEFT JOIN seguimiento seg ON dper.id = seg.denuncia_personas_id 
        LEFT JOIN usuarios usu ON seg.usuarios_id = usu.id 
        LEFT JOIN actividades act ON seg.actividades_id = act.id 
        LEFT JOIN parametros p1 ON dper.modulos_sigla_amp_1 = p1.modulos_sigla 
        LEFT JOIN parametros p2 ON dper.modulos_sigla_amp_2 = p2.modulos_sigla
        LEFT JOIN parametros p3 ON 'DEN_SEG_AMP_45_DIAS' = p3.modulos_sigla
        INNER JOIN ultimos_seguimientos us ON us.denuncia_personas_id = dper.id  AND seg.fec_cre::DATE = us.max_fec_cre
    WHERE 
        seg.usuarios_id = CASE WHEN :depto_id = 0 THEN seg.usuarios_id ELSE :usuarios_id END
        AND dper.nivel_geografico_id = CASE WHEN :depto_id = 0 THEN dper.nivel_geografico_id ELSE :depto_id END     
), -- select * from con_derivacion
 con_derivacion_all AS (
   SELECT 
        seg.transaccion,dper.cod_denuncia,dper.Id,
           seg.estado , dper.fec_cre::DATE as fec_cre, seg.transaccion AS sigla
    FROM 
        denuncia_personas dper
        INNER JOIN nivel_geografico depto ON dper.nivel_geografico_id = depto.id 
        INNER JOIN nivel_geografico mun ON dper.nivel_geografico_sigla = mun.sigla 
        LEFT JOIN seguimiento seg ON dper.id = seg.denuncia_personas_id 
        LEFT JOIN usuarios usu ON seg.usuarios_id = usu.id 
        LEFT JOIN actividades act ON seg.actividades_id = act.id 
    WHERE 
        seg.usuarios_id = CASE WHEN :depto_id = 0 THEN seg.usuarios_id ELSE :usuarios_id END
        AND dper.nivel_geografico_id = CASE WHEN :depto_id = 0 THEN dper.nivel_geografico_id ELSE :depto_id END          
) 
	SELECT COUNT(*) AS total, MAX(estado) as estado, 'CON_RETRASO' AS codigo, 'con_retraso_en_plazos' AS descrip	
	FROM con_derivacion
	where dias_retraso < 0  AND estado <> 'CONCLUSION'
	--GROUP BY estado
UNION ALL
   	SELECT COUNT(estado) AS total, estado,  'SIN_RETRASO' AS codigo, 'sin_retraso_en_plazos' AS descrip	
	FROM con_derivacion
	where dias_retraso >= 0  AND estado <> 'CONCLUSION'
	GROUP BY estado   
UNION ALL
	SELECT COUNT(estado) AS total,  estado,   'ACEPTADO_CON_INF' AS codigo, 'denuncias_con_inf_final_aceptadas' AS descrip
		FROM con_derivacion_all	
		where fec_cre >=  (CURRENT_DATE - INTERVAL '1 year') AND estado = 'CONCLUSION'
   	GROUP BY estado ,codigo 
UNION ALL
	SELECT COUNT(estado) AS total,  estado,  'RECHAZADO_CON_INF' AS codigo, 'denuncias_con_inf_final_rechazadas' AS descrip
		FROM con_derivacion_all	
		where fec_cre >=  (CURRENT_DATE - INTERVAL '1 year') AND transaccion = 'DEN_RECHAZAR'
   	GROUP BY estado ,codigo 
UNION ALL
	SELECT COUNT(estado) AS total, 'RECHAZADO_POR_MES' as estado,  TO_CHAR(DATE_TRUNC('month', fec_cre), 'TMMonth') AS codigo, 'denuncias_por_mes_con_inf_final_rechazadas' AS descrip
		FROM con_derivacion_all	
		where fec_cre >=  (CURRENT_DATE - INTERVAL '1 year') AND transaccion = 'DEN_RECHAZAR'
   	GROUP BY estado ,codigo ;                               
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

      getByCodEstado(req, res) {   //denunciaPersonasGetByCod  
            console.log(' req.params.cod_denuncia: ',req.params.cod_denuncia , 'req.params.estado: ',req.params.estado );
            let qry='';
        if(req.params.estado=='SOLICITADO'){
                  //solo primera ampliacion ,PLAZO MAXIMO 5 dias   Y 5 dias de ampliacion  , desde admicion: SOLICITADO(CREADO) hasta ASIGNADO
              qry=`SELECT 
                  dp.id,dp.cod_denuncia ,dp.estado , modulos_sigla_amp_1,modulos_sigla_amp_2,--fec_ampliacion_1,fec_ampliacion_2,  
                  CASE 
                  WHEN modulos_sigla_amp_1 IS NULL     and modulos_sigla_amp_2 IS  NULL  and CURRENT_DATE::DATE     <=  fec_registro_hecho::DATE + INTERVAL '3 days' THEN 'green'
                  WHEN modulos_sigla_amp_1 IS not NULL and modulos_sigla_amp_2 IS  NULL  and CURRENT_DATE::DATE    <=  fec_registro_hecho::DATE  + p1.param_caracter_ini ::INTERVAL + INTERVAL '3 days'THEN 'green'
                  WHEN modulos_sigla_amp_2 IS  NULL  and modulos_sigla_amp_1 IS NULL  and  CURRENT_DATE::DATE   = fec_registro_hecho::DATE  + INTERVAL '4 days'  THEN 'yellow'
                  WHEN modulos_sigla_amp_2 IS  NULL  and modulos_sigla_amp_1 IS not NULL  and  CURRENT_DATE::DATE   = fec_registro_hecho::DATE  + p1.param_caracter_ini ::INTERVAL + INTERVAL '4 days' THEN 'yellow'
                  WHEN modulos_sigla_amp_2 IS  NULL  and modulos_sigla_amp_1 IS NULL  and CURRENT_DATE::DATE      >= fec_registro_hecho::DATE + INTERVAL '5 days'  THEN 'red'
                  WHEN modulos_sigla_amp_2 IS  NULL  and modulos_sigla_amp_1 IS not NULL  and  fec_registro_hecho::DATE   + p1.param_caracter_ini ::INTERVAL    >= CURRENT_DATE::DATE  - INTERVAL '5 days'THEN 'red'
                  ELSE 'red'
                   END AS color_semaforo, --fec_registro_hecho::DATE , fec_registro_hecho::DATE + INTERVAL '2 days'    ,  
                    p1.param_caracter_ini AS p1 ,
                    p2.param_caracter_ini  AS p2 --p1.param_caracter_ini ,p2.param_caracter_ini 
                  FROM 
                  denuncia_personas dp 
                  left JOIN parametros p1 ON dp.modulos_sigla_amp_1 = p1.modulos_sigla 
                  left JOIN parametros p2 ON dp.modulos_sigla_amp_2 = p2.modulos_sigla
            `

        }
       if(req.params.estado=='ASIGNADO'){
            //solo segunda ampliacion ,PLAZO MAXIMO 10 Y CON 5 dias de ampliacion  ,   desde: ASIGNADO hasta CONCLUSION INF FINAL

            qry= `
            SELECT 
                  dp.id, modulos_sigla_amp_1,modulos_sigla_amp_2,--asignado
                  CASE 
                        WHEN  modulos_sigla_amp_2 IS  NULL  and CURRENT_DATE::DATE    <=  fec_registro_hecho::DATE  + INTERVAL '5 days'   THEN 'green'
                        WHEN  modulos_sigla_amp_2 IS not NULL  and  CURRENT_DATE::DATE    <=fec_registro_hecho::DATE   + p2.param_caracter_ini ::INTERVAL + INTERVAL '5 days' THEN 'green'
                        WHEN modulos_sigla_amp_2 IS NULL  and  CURRENT_DATE::DATE  >= fec_registro_hecho::DATE  + INTERVAL '6 days'  
                        AND modulos_sigla_amp_2 IS NULL  and CURRENT_DATE::DATE    < fec_registro_hecho::DATE  + INTERVAL '9 days'   THEN 'yellow'
                        WHEN modulos_sigla_amp_2 IS not NULL  and CURRENT_DATE::DATE   >= fec_registro_hecho::DATE  + p2.param_caracter_ini ::INTERVAL + INTERVAL '6 days'  
                        AND modulos_sigla_amp_2 IS not NULL  and CURRENT_DATE::DATE   <  fec_registro_hecho::DATE   + p2.param_caracter_ini ::INTERVAL + INTERVAL '9 days' THEN 'yellow'
                        WHEN modulos_sigla_amp_2 IS NULL  and CURRENT_DATE::DATE    >= fec_registro_hecho::DATE  + INTERVAL '9 days' THEN 'red'
                        WHEN modulos_sigla_amp_2 IS not NULL  and  CURRENT_DATE::DATE     >=fec_registro_hecho::DATE  + p2.param_caracter_ini ::INTERVAL + INTERVAL '9 days' THEN 'red'
                  ELSE 'red'
                  END AS color_semaforo, 
                        p1.param_caracter_ini AS p1 ,
                        p2.param_caracter_ini  AS p2 --p1.param_caracter_ini ,p2.param_caracter_ini 
            FROM 
                  denuncia_personas dp 
                  left JOIN parametros p1 ON dp.modulos_sigla_amp_1 = p1.modulos_sigla 
                  left JOIN parametros p2 ON dp.modulos_sigla_amp_2 = p2.modulos_sigla   
                  `

            }
            if(req.params.estado=='ACEPTADO' || req.params.estado=='CONCLUSION' ){ // con inf final
                  // PLAZO 20 dias , NO HAY de ampliacion  ,   DESDE: CONCLUSION INF FINAL hasta  XXXX
                 const inter1= `INTERVAL '0 day'`;
                 const inter2= `INTERVAL '0 day'`;
                  qry= `      
                  SELECT 
                  dp.id, modulos_sigla_amp_1,modulos_sigla_amp_2,--aceptado 
                  CASE 
                  WHEN CURRENT_DATE::DATE <= fec_registro_hecho::DATE  + INTERVAL '10 days'   + ` + inter1 + `::INTERVAL  + `+ inter2 + `::INTERVAL  THEN 'green'  
                  WHEN  CURRENT_DATE::DATE >=  fec_registro_hecho::DATE   + INTERVAL '11 days'  + ` +  inter1 + `::INTERVAL  + ` + inter2 + `::INTERVAL  
                        AND  CURRENT_DATE::DATE < fec_registro_hecho::DATE   + INTERVAL '17 days'  + ` +  inter1 + `::INTERVAL  + ` + inter2 + `::INTERVAL   THEN 'yellow'
                  WHEN   fec_registro_hecho::DATE   >= CURRENT_DATE::DATE  - INTERVAL '17 days'  THEN 'red'
                  ELSE 'red' 
                  END AS color_semaforo, fec_registro_hecho::DATE ,
                  p1.param_caracter_ini AS p1 ,
                  p2.param_caracter_ini  AS p2 --p1.param_caracter_ini ,p2.param_caracter_ini 
                  FROM  
                  denuncia_personas dp 
                  left JOIN parametros p1 ON dp.modulos_sigla_amp_1 = p1.modulos_sigla 
                  left JOIN parametros p2 ON dp.modulos_sigla_amp_2 = p2.modulos_sigla 
                  `
            }

 /// denuncia  y denunciante
            return sequelize.query(
                  qry=qry + `
                        WHERE  dp.cod_denuncia =  :cod_denuncia::text   AND dp.estado = :estado::text    LIMIT 1              
                            `
             , {
                  replacements: {
                        cod_denuncia: req.params.cod_denuncia,
                        estado: req.params.estado
                     //   inter1: `INTERVAL '5 day'`,
                       // inter2: `INTERVAL' '10 day'`
                  },
                  type: sequelize.QueryTypes.SELECT,
                  plain: false,
                  raw: true
            })
                  .then((subcentros) => res.status(200).send(subcentros))
                  .catch((error) => {
                        console.log(' *************ERROR create 1', error);
                        res.status(400).send(error);
                  });
      },
      
      getByNivelGeo(req, res) {  //  denunciaPersonasGetByNivelGeo
            console.log('denunciaPersonasGetByNivelGeo: req.params.depto_id: ',req.params.depto_id ,  'req.params.rol:',req.params.rol );
 /// denuncia  y denunciante por dpto
            return sequelize.query(`
            SELECT DISTINCT ON (dper.cod_denuncia)   --   ROW_NUMBER() OVER (ORDER BY dper.cod_denuncia ASC) 
            0 AS fila, dper.id ,dper.cod_denuncia, dper.sigla  , dper.lugar_hecho ,dper.nivel_geografico_id  as depto_id ,depto.descripcion  as departamento , dper.nivel_geografico_sigla  as mun_id , mun.descripcion  as municipio ,
            TO_CHAR(dper.fec_registro_hecho, 'DD/MM/YYYY')  AS fec_registro_hecho  , dper.hora_registro_hecho ,dper.detalle_hecho , dnte.email ,dnte.telefono,dnte.direccion as ubic_donde,
            dnte.id as dnte_id, dnte.apellido_pat ,dnte.apellido_mat ,dnte.nombres, dnte.genero_sexo_sigla ,
            case  when dnte.genero_sexo_sigla ='M' then 'MASCULINO' else (CASE when dnte.genero_sexo_sigla ='F' then 'FEMENINO' ELSE  'OTRO' end) end AS genero_sexo,   dnte.orden,dnte.tipo_personas,            
            case  when dper.reserva_identidad IS FALSE  AND denuncia_anonima IS FALSE  then 'Denuncia' else 
                     (case  when dper.reserva_identidad  then 'Reserva identidad'  ELSE 'Anonima'  end ) end as tipo_denuncia,
                     dper.reserva_identidad, dper.reserva_identidad as reserva_identidad_si,   case  when dper.reserva_identidad IS FALSE THEN TRUE  ELSE FALSE  END  as reserva_identidad_no, dper.denuncia_anonima ,
                     seg.id AS seg_id , seg.observacion,   TO_CHAR(seg.fec_registro, 'DD/MM/YYYY') AS fec_registro, seg.usuarios_id, usu.id AS  gestor_id ,usu.apellido_pat AS apellido_pat_gestor  ,usu.apellido_mat AS apellido_mat_gestor  ,usu.nombres AS nombres_gestor , usu.grados_sigla || '. '||   usu.nombres || ' '|| usu.apellido_pat || ' ' || usu.apellido_mat AS gestor_seguimiento_dos,
                     gr.sigla_ab || '. '||   usu.nombres || ' '|| usu.apellido_pat || ' ' || usu.apellido_mat AS gestor_seguimiento ,
                     
                     '' AS color_semaforo,
             (dper.fec_cre::DATE - CURRENT_DATE::DATE )::integer +45::integer   AS    dias_retraso,
            dper.usu_cre,TO_CHAR(dper.fec_cre, 'DD/MM/YYYY')  AS fec_cre  , dper.usu_mod  ,dper.fec_mod ,dper.estado ,  dper.transaccion
               FROM 
                   denuncia_personas dper 
                   INNER JOIN personas dnte  ON 	dper.id  = dnte.denuncia_personas_id           
                   INNER JOIN nivel_geografico depto ON dper.nivel_geografico_id = depto.id 
                   INNER JOIN nivel_geografico mun ON dper.nivel_geografico_sigla  = mun.sigla 
                   LEFT  JOIN LATERAL (   --    LEFT  JOIN seguimiento seg ON dper.id  = seg.denuncia_personas_id 
                        SELECT id ,usuarios_id,actividades_id,observacion,fec_registro
                        FROM seguimiento seg 
                        WHERE seg.denuncia_personas_id =dper.id 
                        ORDER BY id DESC
                        LIMIT 1) seg ON true    
                   LEFT  JOIN usuarios usu  ON seg.usuarios_id  = usu.id 
                   INNER JOIN grados gr on gr.sigla = usu.grados_sigla
            WHERE
                   :rol   in ('TRANSP_NAL','DIRECT_NAL','GES_SEGNAL','GES_DEP_CO','GES_DEP_LP','GES_DEP_OR',   'GES_DEP_SC','GES_DEP_BE','GES_DEP_TA', 'GES_DEP_PA','GES_DEP_PO' ,'GES_DEP_CH'   )
                  AND 
                  dper.nivel_geografico_id =  CASE    WHEN :depto_id   = 0 THEN dper.nivel_geografico_id
                                                            ELSE :depto_id  END
                   AND dnte.tipo_personas = 'DENUNCIANTE'  
              ORDER BY dper.cod_denuncia DESC  --  limit 17
                
             `, {
                  replacements: {
                        depto_id: req.params.depto_id,
                        rol: req.params.rol
                  },
                  type: sequelize.QueryTypes.SELECT,
                  plain: false,
                  raw: true
            })
                  .then((subcentros) => res.status(200).send(subcentros))
                  .catch((error) => {
                        res.status(400).send(error);
                  });
      },

      getByCod(req, res) {   //denunciaPersonasGetByCod  
            console.log(': req.params.cod_denuncia: ',req.params.cod_denuncia );
 /// denuncia  y denunciante
            return sequelize.query(`
            SELECT 
            ROW_NUMBER() OVER (ORDER BY dper.cod_denuncia aSC) AS fila, dper.id ,dper.cod_denuncia, dper.sigla  , dper.lugar_hecho ,dper.nivel_geografico_id  as depto_id ,depto.descripcion  as departamento , dper.nivel_geografico_sigla  as mun_id , mun.descripcion  as municipio ,
            TO_CHAR(dper.fec_registro_hecho, 'DD/MM/YYYY')  AS fec_registro_hecho  , dper.hora_registro_hecho ,dper.detalle_hecho , dnte.email ,dnte.telefono,dnte.direccion as ubic_donde,
            dnte.id as dnte_id, dnte.apellido_pat ,dnte.apellido_mat ,dnte.nombres, dnte.genero_sexo_sigla ,
            case  when dnte.genero_sexo_sigla ='M' then 'MASCULINO' else (CASE when dnte.genero_sexo_sigla ='F' then 'FEMENINO' ELSE  'OTRO' end) end AS genero_sexo,   dnte.orden,dnte.tipo_personas,
            dper.reserva_identidad, dper.reserva_identidad as reserva_identidad_si,   case  when dper.reserva_identidad IS FALSE THEN TRUE  ELSE FALSE  END  as reserva_identidad_no, dper.denuncia_anonima ,    case  when dper.denuncia_anonima IS FALSE THEN TRUE  ELSE FALSE  END  as denuncia_anonima_no  ,
            dnte.nombres || ' '|| dnte.apellido_pat || ' ' || dnte.apellido_mat AS den_nombre_completo ,       
            seg.id AS seg_id , seg.observacion,   TO_CHAR(seg.fec_registro, 'DD/MM/YYYY') AS fec_registro, seg.usuarios_id, usu.id AS  gestor_id ,usu.apellido_pat AS apellido_pat_gestor  ,usu.apellido_mat AS apellido_mat_gestor  ,usu.nombres AS nombres_gestor , 
            usu.grados_sigla || '. '||   usu.nombres || ' '|| usu.apellido_pat || ' ' || usu.apellido_mat AS gestor_seguimiento_dos ,
            gr.sigla_ab || ' '||   usu.nombres || ' '|| usu.apellido_pat || ' ' || usu.apellido_mat AS gestor_seguimiento ,      
            dper.usu_cre,dper.fec_cre  , dper.usu_mod  ,dper.fec_mod ,dper.estado ,  dper.transaccion            
            FROM 
                   denuncia_personas dper 
                   INNER JOIN personas dnte  ON 	dper.id  = dnte.denuncia_personas_id           
                   INNER JOIN nivel_geografico depto ON dper.nivel_geografico_id = depto.id 
                   INNER JOIN nivel_geografico mun ON dper.nivel_geografico_sigla  = mun.sigla 
           
                   LEFT  JOIN seguimiento seg ON dper.id  = seg.denuncia_personas_id 
                   LEFT  JOIN usuarios usu  ON seg.usuarios_id  = usu.id
                   INNER JOIN grados gr on gr.sigla = usu.grados_sigla 
                   WHERE  dper.cod_denuncia =   :cod_denuncia :: text   AND dnte.tipo_personas = 'DENUNCIANTE'    LIMIT 1
                  
             `, {
                  replacements: {
                        cod_denuncia: req.params.cod_denuncia
                  },
                  type: sequelize.QueryTypes.SELECT,
                  plain: false,
                  raw: true
            })
                  .then((subcentros) => res.status(200).send(subcentros))
                  .catch((error) => {
                        res.status(400).send(error);
                  });
      },



      list(req, res) {
            return DenunciaPersonas
                  .findAll({
                        attributes: [
                                                          
                              [sequelize.fn("max", sequelize.col("id")), "latestId"],
                            ],
                           
                            raw: true



                  })
                  .then((denunciaPersonas) => res.status(200).send(denunciaPersonas))
                  .catch((error) => { res.status(400).send(error); });
      },

      getById(req, res) {
            console.log(' req.params.id: ',req.params.id );

            return DenunciaPersonas
                  .findByPk(req.params.id)
                  .then(denunciaPersonas => {
                        console.log(denunciaPersonas);
                        if (!denunciaPersonas) {
                              return res.status(404).send({
                                    message: 'DenunciaPersonas no encontrado',
                              });
                        }
                        return res.status(200).send(denunciaPersonas);
                  })
                  .catch((error) => res.status(400).send(error));
      },



      add(req, res) {
            return DenunciaPersonas.create({

                  nivel_geografico_id: req.body.depto_id,
                  nivel_geografico_sigla: req.body.mun_id,
                  sigla: req.body.sigla,
                  cod_denuncia: req.body.cod_denuncia,
                  denuncia_anonima: req.body.denuncia_anonima,
                  reserva_identidad: req.body.reserva_identidad,
                  lugar_hecho: req.body.lugar_hecho,
                  fec_registro_hecho: req.body.fec_registro_hecho,
                  hora_registro_hecho: req.body.hora_registro_hecho,
                  detalle_hecho: req.body.detalle_hecho,

                  estado: req.body.estado,
                  transaccion: req.body.transaccion,
                  usu_cre: req.body.usu_cre,
             //     fec_cre: req.body.fec_cre,
               //   usu_mod: req.body.usu_mod,
              //    fec_mod: req.body.fec_mod,
              //    host_creacion: req.body.host_creacion,
                //  host_modificacion: req.body.host_modificacion,

            })
            .then((denunciaPersonas) =>   { 
                  sequelize.beforeQuery((query, options) => {
                   // console.log('query add denunciaPersonas : ',query);
                    logger.info('>>> POST - Creando denunciaPersonas: '+ req.body.user_login  + ' QRY: INSERT INTO denunciaPersonas ... PARAMS query: '+ JSON.stringify(query));

                  });
                    // Log the retrieval operation
                    logOperation(res,'Creando denunciaPersonas: ' + req.body.user_login , ' QRY:  INSERT INTO denunciaPersonas ... ', JSON.stringify(denunciaPersonas), 'POST');
    
                    console.log(">>> POST - denunciaPersonas:  "+ JSON.stringify(denunciaPersonas))// do your own logging        
                // this.insertLog ('',req);
                 res.status(201).send(denunciaPersonas)
                 
               })
                 .catch(error => {
                  logger.error('>>> POST - Error Creando denunciaPersonas : '  +' QRY: INSERT INTO denunciaPersonas ..PARAMS: '  + JSON.stringify(  error.message )+ '>>> Stack : ' +error.stack  + '>>>  Body: ' + JSON.stringify(req.body) );
                  logError(req,'>>> POST - Error Creando denunciaPersonas', error.stack, ' QRY: INSERT INTO denunciaPersonas...', JSON.stringify(req.body), 'POST');
               
                      console.log(' *************ERROR create 1', error);
                      res.status(400).send(error)  });
                
              },
        

      update(req, res) {
            console.log(' req.params.id: ',req.params.id );
            return DenunciaPersonas.findByPk(req.params.id, {})
                  .then(denunciaPersonas => {
                        if (!denunciaPersonas) {
                              return res.status(404).send({
                                    message: 'DenunciaPersonas no encontrado',
                              });
                        }
                        return denunciaPersonas
                              .update({

                                    nivel_geografico_id: req.body.depto_id || denunciaPersonas.nivel_geografico_id,
                                    nivel_geografico_sigla: req.body.mun_id || denunciaPersonas.nivel_geografico_sigla,
                                    sigla: req.body.sigla || denunciaPersonas.sigla,
                                    cod_denuncia: req.body.cod_denuncia || denunciaPersonas.cod_denuncia,
                                    denuncia_anonima: req.body.denuncia_anonima || denunciaPersonas.denuncia_anonima,
                                    reserva_identidad: req.body.reserva_identidad || denunciaPersonas.reserva_identidad,
                                    lugar_hecho: req.body.lugar_hecho || denunciaPersonas.lugar_hecho,
                                    fec_registro_hecho: req.body.fec_registro_hecho || denunciaPersonas.fec_registro_hecho,
                                    hora_registro_hecho: req.body.hora_registro_hecho || denunciaPersonas.hora_registro_hecho,
                                    detalle_hecho: req.body.detalle_hecho || denunciaPersonas.detalle_hecho,

                                    modulos_sigla_amp_1: req.body.modulos_sigla_amp_1 || denunciaPersonas.modulos_sigla_amp_1,
                                    fec_ampliacion_1: req.body.fec_ampliacion_1 || denunciaPersonas.fec_ampliacion_1,
                                    modulos_sigla_amp_2: req.body.modulos_sigla_amp_2 ,//|| denunciaPersonas.modulos_sigla_amp_2
                                    fec_ampliacion_2: req.body.fec_ampliacion_2 ,//|| denunciaPersonas.fec_ampliacion_2

                                    estado: req.body.estado || denunciaPersonas.estado,
                                    transaccion: req.body.transaccion || denunciaPersonas.transaccion,
                                 //   usu_cre: req.body.usu_cre || denunciaPersonas.usu_cre,
                                  //  fec_cre: req.body.fec_cre || denunciaPersonas.fec_cre,
                                    usu_mod: req.body.usu_mod || denunciaPersonas.usu_mod,
                                    fec_mod: req.body.fec_mod || denunciaPersonas.fec_mod,
                                   // host_creacion: req.body.host_creacion || denunciaPersonas.host_creacion,
                                   // host_modificacion: req.body.host_modificacion || denunciaPersonas.host_modificacion,


                              })
                              .then(() => {
                                    console.log(' *************SI UPDATE OK');
                                    return res.status(200).send(denunciaPersonas)
                              })
                              .catch(error => {
                                    console.log(' *************ERROR UPDATE 1', error);
                                    res.status(400).send(error)
                              });
                  })
                  .catch(error => {
                        console.log(' *************ERROR UPDATE 2', error);
                        res.status(400).send(error)
                  });
      },

      delete(req, res) {
            return DenunciaPersonas.findByPk(req.params.id)
                  .then(denunciaPersonas => {
                        if (!denunciaPersonas) {
                              return res.status(404).send({
                                    message: 'DenunciaPersonas no encontrado',
                              });
                        }
                        return denunciaPersonas
                              .destroy()
                              .then(() => {
                                    console.log(' ************SI DELETE OK');
                                    res.status(204).send()
                              })
                              .catch(error => res.status(400).send(error));
                  })
                  .catch(error => res.status(400).send(error));
      },

      deleteLogico(req, res) {
            console.log(' req.params.id: ',req.params.id );
            return DenunciaPersonas.findByPk(req.params.id, {})
                  .then(denunciaPersonas => {
                        if (!denunciaPersonas) {
                              return res.status(404).send({
                                    message: 'DenunciaPersonas no encontrado',
                              });
                        }
                        return denunciaPersonas
                              .update({

                                    estado: 'INACTIVO',  
                  usu_mod: 'ADMIN', //req.body.usu_mod ,
                  fec_mod:  new Date() //req.body.fec_mod


                              })
                              .then(() => {
                                    console.log(' *************SI INACTIVADO OK');
                                    return res.status(200).send(denunciaPersonas)
                              })
                              .catch(error => {
                                    console.log(' *************ERROR INACTIVADO 1', error);
                                    res.status(400).send(error)
                              });
                  })
                  .catch(error => {
                        console.log(' *************ERROR INACTIVADO 2', error);
                        res.status(400).send(error)
                  });
      },

};




