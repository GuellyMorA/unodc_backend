const md5 = require("md5");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");//gma const bcrypt = require("bcrypt");
const Key = require("../../config/key");
//const Persona = require("../models").persona;


const Usuarios = require("../../models").usuarios;
const UsuarioRol = require("../../models").usuarios_rol;
const Roles = require("../../models").roles;
const RolMenusOperaciones = require("../../models").rol_menus_operaciones;
const GradosAb = require("../../models").grados;
const Sequelize = require('sequelize');
//const { query } = require("express");

const EventLog = require('../../models/unodc').event_log_operaciones; // Importar modelo de errores
const logger = require('../../config/logger');
const roles = require("./roles");
//const EventLogController = require('../controllers/unodc').event_log_operaciones; // Importar  errores


Usuarios.addHook('beforeCreate', (user) => {
  logger.info('beforeCreate: Creando nuevo usuario:', {
      
      nivel_geografico_id: user.nivel_geografico_id,
      nivel_geografico_sigla: user.nivel_geografico_sigla,
         grados_sigla: user.grados_sigla,      
         user_login: user.user_login,
         password_hash: user.password_hash,
         nombres: user.nombres,
         apellido_pat: user.apellido_pat,
         apellido_mat: user.apellido_mat,
         email: user.email,
         telefono: user.telefono,    
         ci_y_complemento: user.ci_y_complemento,
         ci_expedido: user.ci_expedido
  });
});

Usuarios.addHook('beforeUpdate', (user) => {
  logger.info('beforeUpdate: Actualizando usuario:', {
      id: user.id,      
      nivel_geografico_id: user.nivel_geografico_id,
      nivel_geografico_sigla: user.nivel_geografico_sigla,
         grados_sigla: user.grados_sigla,      
         user_login: user.user_login,
         password_hash: user.password_hash,
         nombres: user.nombres,
         apellido_pat: user.apellido_pat,
         apellido_mat: user.apellido_mat,
         email: user.email,
         telefono: user.telefono,    
         ci_y_complemento: user.ci_y_complemento,
         ci_expedido: user.ci_expedido
  });
});

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




const sequelize = Usuarios.sequelize;
//sequelize.Op = Sequelize.Op;

module.exports = {


  getById(req, res) {
    return Usuarios.findByPk(req.params.id)
      .then(usuario => {
        if (!usuario) {
          return res.status(404).send({
            message: "usuario Not Found"
          });
        }
        return res.status(200).send(usuario);
      })
      .catch(error => res.status(400).send(error));
  },

  getByFk(req, res) {
    return Usuarios
                .findAll({})
                .then(( usuario ) => res.status(200).send(usuario )) 
                .catch((error) => { res.status(400).send(error); });
        },

  list(req, res) {
  
    return sequelize.query(`
    SELECT
    ROW_NUMBER() OVER (ORDER BY u.apellido_pat ASC,u.apellido_mat  ASC) AS fila,  u.id as id,u.ci_y_complemento, u.ci_expedido,u.grados_sigla as grados_ab, g.sigla_ab as grado_ab, g.grado as grado,u.apellido_pat ,u.apellido_mat ,u.nombres  ,u.estado ,u.transaccion
    ,u.email ,u.telefono,u.nivel_geografico_id  as depto_id ,depto.descripcion  as departamento , u.nivel_geografico_sigla  as mun_id , mun.descripcion  as municipio 
    ,u.user_login  ,u.password_hash, u_r.id AS u_rol_id ,  u_r.roles_sigla, r.rol, u.usu_cre ,u.fec_cre ,u.usu_mod ,u.fec_mod 
    FROM 
        usuarios u INNER JOIN grados g  ON 	u.grados_sigla = g.sigla 
                   INNER JOIN usuarios_rol u_r  ON 	u.id = u_r.usuarios_id
                   INNER JOIN nivel_geografico depto ON u.nivel_geografico_id = depto.id 
                   left JOIN nivel_geografico mun ON u.nivel_geografico_sigla  = mun.sigla 
                   INNER JOIN roles r  ON 	u_r.roles_sigla = r.sigla 
	   `,
      {
        type: sequelize.QueryTypes.SELECT, 
        plain: false, 
      //  logging: console.log,
        raw: true
      }          
      )
      .then((usuarios) =>   { 
        /*sequelize.beforeQuery((query, options) => {
          console.log('query.sql : ',query);
        
        });*/
     //    console.log("<<<<<<<< usuarios:  "+ JSON.stringify(usuarios))// do your own logging    
           // Log the retrieval operation
         logOperation(res,'Obteniendo usuarios', ' SELECT * FROM usuarios ... ', JSON.stringify(usuarios), 'GET');
         logger.info('>>> GET - Obteniendo usuarios: ' + 'SELECT * FROM usuarios ... PARAMS: '+ JSON.stringify(usuarios));
        res.status(200).send(usuarios)
        
      })
      .catch((error) => { 
        logger.error('Error Obteniendo usuarios: ' + req.body.user_login  +'  message: ' + { message: error.message });
        logError(req,'Error Obteniendo usuarios', error.stack, '  INSERT INTO Users', JSON.stringify(req.body), 'POST');
        res.status(400).send(error); });
  },
  listActivos(req, res) {
    return sequelize.query(`
   

           SELECT 
            ROW_NUMBER() OVER (ORDER BY  gr.orden  aSC) AS fila,
              usu.id, grados_sigla, puestos_sigla, genero_sexo_sigla, user_login, password_hash, nombres, apellido_pat, apellido_mat, gr.sigla_ab ,gr.sigla_ab || ' '
              ||  usu.nombres || ' '|| usu.apellido_pat || ' ' || usu.apellido_mat || ' - ' || rol.rol_ab AS nombre_completo ,
              email, telefono, direccion, reset_key, reset_date, fecha_nacimiento, ci_y_complemento, ci_expedido, foto_img_path,
              usu.estado, usu.transaccion, usu.usu_cre, usu.fec_cre, usu.usu_mod, usu.fec_mod, usu.host_creacion, usu.host_modificacion, 
             rol.nivel_geografico_id, rol.nivel_geografico_sigla -- antes era usu.
          FROM usuarios usu  
          INNER JOIN usuarios_rol u_r  ON 	usu.id = u_r.usuarios_id
           INNER JOIN roles rol  ON 	u_r.roles_sigla  = rol.sigla 
               INNER JOIN grados gr ON 	gr.sigla  = usu.grados_sigla 
          WHERE   usu.estado ='ACTIVO'


      `, {          
            type: sequelize.QueryTypes.SELECT,
            plain: false,
            raw: true
      })
          .then((usuario) => res.status(200).send(usuario))

          .catch((error) => { res.status(400).send(error); });
  },

  add(req, res) {
            return Usuarios.create({
                nivel_geografico_id: req.body.depto_id,
                nivel_geografico_sigla: req.body.mun_id,
       
                 grados_sigla: req.body.grados_sigla,
                // puestos_sigla: req.body.puestos_sigla,
                 //genero_sexo_sigla: req.body.genero_sexo_sigla,
                 user_login: req.body.user_login,
                 password_hash: md5(req.body.password_hash),
                 nombres: req.body.nombres,
                 apellido_pat: req.body.apellido_pat,
                 apellido_mat: req.body.apellido_mat,
                 email: req.body.email,
                 telefono: req.body.telefono,
                // direccion: req.body.direccion,
                 reset_key: req.body.reset_key,
                 reset_date: req.body.reset_date,
                // fecha_nacimiento: req.body.fecha_nacimiento,
                 ci_y_complemento: req.body.ci_y_complemento,
                 ci_expedido: req.body.ci_expedido,
               //  foto_img_path: req.body.foto_img_path,
                 estado: req.body.estado,
                 transaccion: 'ACTIVAR', //req.body.transaccion,
                 usu_cre: req.body.username,
                 //fec_cre: req.body.fec_cre,
                // usu_mod: req.body.usu_mod,
                // fec_mod: req.body.fec_mod,
                // host_creacion: req.body.host_creacion,
                // host_modificacion: req.body.host_modificacion,
        
            })
            .then((usuarios) =>   { 
              sequelize.beforeQuery((query, options) => {
                console.log('query add usuarios : ',query);
              
              });
                // Log the retrieval operation
                logger.info('>>> POST - Creando usuarios: '+ req.body.user_login  + ' QRY: INSERT INTO usuarios ... PARAMS: '+ JSON.stringify(usuarios));
                logOperation(res,'Creando usuarios: ' + req.body.user_login , ' QRY:  INSERT INTO usuarios ... ', JSON.stringify(usuarios), 'POST');

                console.log(">>> POST - usuarios:  "+ JSON.stringify(usuarios))// do your own logging        
            // this.insertLog ('',req);
             res.status(201).send(usuarios)
             
           })
             .catch(error => {
              logger.error('>>> POST - Error Creando usuarios : error'  +' QRY: INSERT INTO usuarios ..PARAMS: '  + JSON.stringify(  error.message )+ '>>> Stack : ' +error.stack  + '>>>  Body: ' + JSON.stringify(req.body) );
              logError(req,'>>> POST - Error Creando usuarios', error.stack, ' QRY: INSERT INTO usuarios...', JSON.stringify(req.body), 'POST');
           
                  console.log(' *************ERROR create 1', error);
                  res.status(400).send(error)  });
            
  },

  update(req, res) {
            //console.log( Usuarios);
                 return Usuarios.findByPk(req.params.id, {})
                .then( usuarios => { 
                    if (! usuarios) { 
                      logger.info('Error 404 Modificando usuario  id: ' + req.params.id  +'   message: Usuario no encontrado. ' + JSON.stringify(req.body));

                   return res.status(404).send({
                    
                            message: 'Usuario no encontrado', 
                  });
                }
    return usuarios
       .update({
            nivel_geografico_id: req.body.depto_id || usuarios.nivel_geografico_id,
            nivel_geografico_sigla: req.body.mun_id || usuarios.nivel_geografico_sigla,

            grados_sigla: req.body.grados_sigla || usuarios.grados_sigla,
            puestos_sigla: req.body.puestos_sigla || usuarios.puestos_sigla,
            genero_sexo_sigla: req.body.genero_sexo_sigla || usuarios.genero_sexo_sigla,
            user_login: req.body.user_login || usuarios.user_login,
            password_hash: md5(req.body.password_hash) || usuarios.password_hash,
            nombres: req.body.nombres || usuarios.nombres,
            apellido_pat: req.body.apellido_pat || usuarios.apellido_pat,
            apellido_mat: req.body.apellido_mat || usuarios.apellido_mat,
            email: req.body.email || usuarios.email,
            telefono: req.body.telefono || usuarios.telefono,
            direccion: req.body.direccion || usuarios.direccion,
            reset_key: req.body.reset_key || usuarios.reset_key,
            reset_date: req.body.reset_date || usuarios.reset_date,
            fecha_nacimiento: req.body.fecha_nacimiento || usuarios.fecha_nacimiento,
            ci_y_complemento: req.body.ci_y_complemento || usuarios.ci_y_complemento,
            ci_expedido: req.body.ci_expedido || usuarios.ci_expedido,
            foto_img_path: req.body.foto_img_path || usuarios.foto_img_path,
            estado: req.body.estado || usuarios.estado,
            transaccion: req.body.transaccion || usuarios.transaccion,
           // usu_cre: req.body.usu_cre || usuarios.usu_cre,
           // fec_cre: req.body.fec_cre || usuarios.fec_cre,
            usu_mod: req.body.usu_mod || usuarios.usu_mod,
            fec_mod: req.body.fec_mod || usuarios.fec_mod,
            //host_creacion: req.body.host_creacion || usuarios.host_creacion,
            //host_modificacion: req.body.host_modificacion || usuarios.host_modificacion,
    
    
    
    
     })
     .then(() =>{    
      sequelize.beforeQuery((query, options) => {
        console.log('query upd usuarios : ',query);
      
      });
         // Log the retrieval operation
       logger.info('>>> PUT - Modificando usuarios: ' + req.body.user_login  +' QRY: UPDATE usuarios SET ... PARAMS: '+ JSON.stringify(usuarios));
       logOperation(res,'Modificando usuarios: '+ req.body.user_login , ' QRY:  UPDATE usuarios SET... ', JSON.stringify(usuarios), 'PUT');
  
       console.log("*************SI UPDATE OK usuarios:  "+ JSON.stringify(usuarios))// do your own logging        
       
       return res.status(200).send(usuarios)   })

    .catch(error => {
      logger.error('>>> PUT - Error Modificando usuarios: ' + req.params.id  +' QRY: UPDATE usuarios SET...PARAMS : ' + JSON.stringify(  error.message )+ '>>> Stack : ' +error  + '>>>  Body: ' + JSON.stringify(req.body) );
      logError(req,'>>> PUT - Error Modificando usuarios', error.stack, 'QRY:  UPDATE usuarios SET...', JSON.stringify(req.body), 'PUT');
   
             console.log(' *************ERROR UPDATE 1', error);
             res.status(400).send(error.message)  });
       })
     .catch(error => {
         logger.error('>>> PUT - Error Modificando usuarios: ' + req.params.id  +' QRY: UPDATE usuarios SET...PARAMS : ' + JSON.stringify(  error.message )+ '>>> Stack : ' +error   );

                console.log(' *************ERROR UPDATE 2',  error);
                res.status(400).send(error.message)  });
  },
    

  delete(req, res) {
    return Usuarios.findByPk(req.params.id)
      .then(usuario => {
        if (!usuario) {
          return res.status(400).send({
            message: "usuario Not Found"
          });
        }
        return usuario
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  deleteLogico(req, res) { // en el front se llama    
    console.log('id contruccion : req.params.id: ', req.params.id);

    return Usuarios.findByPk(req.params.id, {})
      .then(usuario => {
        if (!usuario) {
          return res.status(404).send({
            message: "usuario Not Found"
          });
        }
        return usuario
          .update({

            estado: 'INACTIVO',
            usu_mod: 'ADMIN', //req.body.usu_mod ,
            fec_mod: new Date() //req.body.fec_mod
          })
          .then(() => {
            console.log(' *************SI INACTIVADO OK');
            res.status(204).send(usuario)
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

  auth(req, res) {
    console.log('auth id bad: ' + req.body);
    let cambio_clave = req.body.user_login == req.body.password_hash ? true : false;


    Usuarios.findOne({ where: { user_login: req.body.user_login, estado: "ACTIVO" } })
      .then(async usuario => {
       // console.log('usuario.password_hash: ', usuario.password_hash);
        if (md5(req.body.password_hash) === usuario.password_hash) {
          var token = jwt.sign({ usuario_id: usuario.id }, Key.apikey);
          // Primero, obtenemos todos los roles de un usuario       
          UsuarioRol.findAll({
            where: { usuarios_id: usuario.id },
            attributes: ["roles_sigla"],
            include: [
              {
                model: Roles,
                required: true,
                attributes: ["id", "rol","nivel_geografico_id"]
              }
            ]
          }).then(async usuarioRol => {
            // Convertimos el resultado a un array de IDs
            const rolSigla = usuarioRol.map(roles => roles.roles_sigla);
            console.log('rolSigla :', rolSigla);
            const roles =  usuarioRol.map(roles => roles.role);
            const rol_desc =  roles.map(role => role.rol); 
            // const sigla_ab =  roles.map(role => role.rol); 
            const nivel_geografico_id =  roles.map(role => role.nivel_geografico_id);
            // Ahora utilizamos el array con el operador IN
            const menuOperaciones = await RolMenusOperaciones.findAll({
              attributes: ["roles_sigla", "menus_sigla", "operaciones_sigla", "descripcion", "estado"],
              where: {
                roles_sigla: {
                  [Sequelize.Op.in]: rolSigla
                }, //rolSigla, // Aquí usamos el array de IDs
                [Sequelize.Op.and]: [{ estado: 'ACTIVO' }],
              },
            });

           // console.log('menuOperaciones filtrados:', JSON.stringify(menuOperaciones, null, 2));
            //console.log('usuarioRol: ', JSON.stringify(usuarioRol));
            logger.info('>>> POST - LOGIN Ingreso usuario: '+ usuario.user_login  + ' PARAMS: '+ JSON.stringify({
              usuario_id: usuario.id,
              username: usuario.user_login,
              nombre: usuario ? usuario.nombres + " " + usuario.apellido_pat + " " + usuario.apellido_mat : "",
              email: usuario.email,
              grados_sigla: usuario.grados_sigla,
              roles: rolSigla[0],
              rol_desc: rol_desc[0],
              depto_id: nivel_geografico_id[0],
              menu_operaciones: menuOperaciones,
              cambio_clave: cambio_clave || usuario.reset_key,
              token
            }));
            logOperation(res,'>>> POST - LOGIN Ingreso usuario: ' + usuario.user_login , ' PARAMS:  ', JSON.stringify(usuario.dataValues), 'POST');


            res.status(200).json({
              usuario_id: usuario.id,
              username: usuario.user_login,
              nombre: usuario ? usuario.nombres + " " + usuario.apellido_pat + " " + usuario.apellido_mat : "",
              email: usuario.email,
              grados_sigla: usuario.grados_sigla,
              roles: rolSigla[0],
              rol_desc: rol_desc[0],
              depto_id: nivel_geografico_id[0],
              menu_operaciones: menuOperaciones,
              cambio_clave: cambio_clave || usuario.reset_key,
              token
            });

          });


        } else {
             logger.error('>>> POST -Error LOGIN Ingreso usuario: '+ usuario.user_login  + ' Usuario o contraseña invalida: '+ res);
            logOperation(res,'>>> POST -Error LOGIN Ingreso usuario: ' + usuario.user_login , ' PARAMS: Usuarios o contraseña invalida ', usuario.user_login  , 'POST');

          res.status(400).send({ message: "Usuario o contraseña invalida" });
        }
      })
      .catch(error => {
        logger.error('>>>1 POST -Error LOGIN Ingreso usuario: '+ res + ' Usuario o contraseña invalida: '+ error);
        logOperation(res,'>>>1 POST -Error LOGIN Ingreso usuario: ' + res, ' PARAMS: Usuarios o contraseña invalida ', error , 'POST');

        res.status(400).send({ message: "Usuarios no autorizado 1. " + error });
      });
  },

  changeAuth(req, res) {
    console.log(req.body);
    return Usuarios.findByPk(req.body.id)
      .then(usuario => {
        if (!usuario) {
          return res.status(404).send({
            estado: 404,
            message: "usuario no existe"
          });
        }
        return usuario
          .update({
            password_hash: md5(req.body.npassword)
          })
          .then(() =>
            res
              .status(200)
              .send({ estado: 200, message: "Cambio de constraseña exitoso." })
          )
          .catch(error =>
            res.status(400).send({
              estado: 500,
              message: "No se pudo cambiar la constraseña."
            })
          );
      })
      .catch(error => res.status(400).send(error));
  },

  generateClave(req, res) {
    var queryGet = "SELECT id FROM usuario ORDER BY id";
    return sequelize
      .query(
        queryGet,
        {
          type: sequelize.QueryTypes.SELECT
        },
        {
          raw: true
        }
      )
      .then(async result => {
        for (const item of result) {
          let hash = bcrypt.hashSync("123456", 10);
          await sequelize.query(
            "UPDATE usuario SET clave='" + hash + "' WHERE id=" + item.id
          );
        }
        res.status(200).send("result");
      })
      .catch(error => res.status(400).send(error));
  },






};
