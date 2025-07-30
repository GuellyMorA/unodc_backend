
const Personas = require('../../models/unodc').personas;
const sequelize = Personas.sequelize;

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



 listByCod(req, res) {
      console.log(': req.params.cod_denuncia: ',req.params.cod_denuncia );
//denunciado
      return sequelize.query(`
      SELECT 
      ROW_NUMBER() OVER (ORDER BY dper.cod_denuncia aSC) AS fila, dper.id ,dper.cod_denuncia,  dper.lugar_hecho  ,dper.nivel_geografico_id  as depto_id ,depto.descripcion  as departamento , dper.nivel_geografico_sigla  as mun_id , mun.descripcion  as municipio ,
         dndo.grados_sigla , g.grado as grado ,  
         TO_CHAR(dper.fec_registro_hecho, 'DD/MM/YYYY')  AS fec_registro_hecho   , dper.hora_registro_hecho ,dper.detalle_hecho , 
         dndo.id as id_dndo, dndo.apellido_pat ,dndo.apellido_mat ,dndo.nombres, dndo.genero_sexo_sigla , 
         case  when dndo.genero_sexo_sigla ='M' then 'MASCULINO' else (CASE when dndo.genero_sexo_sigla ='F' then 'FEMENINO' ELSE  'OTRO' end) end AS genero_sexo, 
          dndo.email ,dndo.telefono,dndo.direccion as ubic_donde,
         dndo.puesto_cargo_funcion  ,dndo.unidad_policial_desc,   dndo.orden, dndo.tipo_personas,
         dndo.nombres || ' '|| dndo.apellido_pat || ' ' || dndo.apellido_mat AS dnado_nombre_completo ,       
         dper.usu_cre,dper.fec_cre  , dper.usu_mod  ,dper.fec_mod ,dper.estado ,  dper.transaccion
       FROM 
             denuncia_personas dper 
              INNER JOIN personas dndo  ON 	dper.id  = dndo.denuncia_personas_id   
              INNER JOIN grados g  ON 	dndo.grados_sigla = g.sigla 
              INNER JOIN nivel_geografico depto ON dper.nivel_geografico_id = depto.id 
              INNER JOIN nivel_geografico mun ON dper.nivel_geografico_sigla  = mun.sigla 
              INNER JOIN genero_sexo sex  ON 	dndo.genero_sexo_sigla  = sex.sigla 
      WHERE  dper.cod_denuncia =   :cod_denuncia :: text   AND dndo.tipo_personas = 'DENUNCIADO'    

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
            return Personas
                  .findAll({})
                  .then((personas) => res.status(200).send(personas))
                  .catch((error) => { res.status(400).send(error); });
      },

      getById(req, res) {
            console.log(req.params.id);
            return Personas
                  .findByPk(req.params.id)
                  .then(personas => {
                        console.log(personas);
                        if (!personas) {
                              return res.status(404).send({
                                    message: 'Personas no encontrado',
                              });
                        }
                        return res.status(200).send(personas);
                  })
                  .catch((error) => res.status(400).send(error));
      },



      add(req, res) {
            return Personas.create({

                  denuncia_personas_id: req.body.id,
                  genero_sexo_sigla: req.body.genero_sexo_sigla,
                  grados_sigla: req.body.grados_sigla,
                  orden: req.body.orden,
                  puesto_cargo_funcion: req.body.puesto_cargo_funcion ,
                  unidad_policial_desc: req.body.unidad_policial_desc,
                  sigla: req.body.sigla,
                  cod_activo: req.body.cod_activo,
                  tipo_personas: req.body.tipo_personas,
                  password_hash: req.body.password_hash,
                  nombres: req.body.nombres,
                  apellido_pat: req.body.apellido_pat,
                  apellido_mat: req.body.apellido_mat,
                  email: req.body.email,
                  telefono: req.body.telefono,
                  direccion: req.body.direccion,
                  fecha_nacimiento: req.body.fecha_nacimiento,
                  ci_y_complemento: req.body.ci_y_complemento,
                  ci_expedido: req.body.ci_expedido,
                  foto_img_path: req.body.foto_img_path,
                  estado: req.body.estado,
                  transaccion: req.body.transaccion,
                  usu_cre: req.body.usu_cre,
                //  fec_cre: req.body.fec_cre,
               //   usu_mod: req.body.usu_mod,
               //   fec_mod: req.body.fec_mod,
                //  host_creacion: req.body.host_creacion,
                //  host_modificacion: req.body.host_modificacion,


            })
            .then((personas) =>   { 
                  sequelize.beforeQuery((query, options) => {
                   // console.log('query add personas : ',query);
                   logger.info('>>> POST - Creando personas: '+ req.body.user_login  + ' QRY: INSERT INTO personas ... PARAMS query: '+ JSON.stringify(query));

                  });
                    // Log the retrieval operation
                   // logger.info('>>> POST - Creando personas: '+ req.body.user_login  + ' QRY: INSERT INTO personas ... PARAMS: '+ JSON.stringify(personas));
                    logOperation(res,'Creando personas: ' + req.body.user_login , ' QRY:  INSERT INTO personas ... ', JSON.stringify(personas), 'POST');
    
                    console.log(">>> POST - personas:  "+ JSON.stringify(personas))// do your own logging        
                // this.insertLog ('',req);
                 res.status(201).send(personas)
                 
               })
                 .catch(error => {
                  logger.error('>>> POST - Error Creando personas : '  +' QRY: INSERT INTO personas ..PARAMS: '  + JSON.stringify(  error.message )+ '>>> Stack : ' +error.stack  + '>>>  Body: ' + JSON.stringify(req.body) );
                  logError(req,'>>> POST - Error Creando personas', error.stack, ' QRY: INSERT INTO personas...', JSON.stringify(req.body), 'POST');
               
                      console.log(' *************ERROR create 1', error);
                      res.status(400).send('Erro al crear: ' +req.body.tipo_personas +'.  '  + error)  });
                
              },

      update(req, res) {
            console.log(Personas);
            return Personas.findByPk(req.params.id, {})
                  .then(personas => {
                        if (!personas) {
                              return res.status(404).send({
                                    message: 'Personas no encontrado',
                              });
                        }
                        return personas
                              .update({

                                    denuncia_personas_id: req.body.denuncia_personas_id || personas.denuncia_personas_id,
                                    genero_sexo_sigla: req.body.genero_sexo_sigla || personas.genero_sexo_sigla,
                                    grados_sigla: req.body.grados_sigla || personas.grados_sigla,
                                    orden: req.body.orden || personas.orden,
                                    puesto_cargo_funcion: req.body.puesto_cargo_funcion || personas.puesto_cargo_funcion,
                                    unidad_policial_desc: req.body.unidad_policial_desc || personas.unidad_policial_desc,
                                    sigla: req.body.sigla || personas.sigla,
                                    cod_activo: req.body.cod_activo || personas.cod_activo,
                                    tipo_personas: req.body.tipo_personas || personas.tipo_personas,
                                    password_hash: req.body.password_hash || personas.password_hash,
                                    nombres: req.body.nombres || personas.nombres,
                                    apellido_pat: req.body.apellido_pat || personas.apellido_pat,
                                    apellido_mat: req.body.apellido_mat || personas.apellido_mat,
                                    email: req.body.email || personas.email,
                                    telefono: req.body.telefono || personas.telefono,
                                    direccion: req.body.direccion || personas.direccion,
                                    fecha_nacimiento: req.body.fecha_nacimiento || personas.fecha_nacimiento,
                                    ci_y_complemento: req.body.ci_y_complemento || personas.ci_y_complemento,
                                    ci_expedido: req.body.ci_expedido || personas.ci_expedido,
                                    foto_img_path: req.body.foto_img_path || personas.foto_img_path,
                                    estado: req.body.estado || personas.estado,
                                    transaccion: req.body.transaccion || personas.transaccion,
                                 //   usu_cre: req.body.usu_cre || personas.usu_cre,
                                 //   fec_cre: req.body.fec_cre || personas.fec_cre,
                                    usu_mod: req.body.usu_mod || personas.usu_mod,
                                    fec_mod: req.body.fec_mod || personas.fec_mod,
                                 //   host_creacion: req.body.host_creacion || personas.host_creacion,
                                 //   host_modificacion: req.body.host_modificacion || personas.host_modificacion,

                              })
                              .then(() => {
                                    console.log(' *************SI UPDATE OK');
                                    return res.status(200).send(personas)
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
            return Personas.findByPk(req.params.id)
                  .then(personas => {
                        if (!personas) {
                              return res.status(404).send({
                                    message: 'Personas no encontrado',
                              });
                        }
                        return personas
                              .destroy()
                              .then(() => {
                                    console.log(' ************SI DELETE OK');
                                    res.status(204).send()
                              })
                              .catch(error => res.status(400).send(error));
                  })
                  .catch(error => res.status(400).send(error));
      }

};




