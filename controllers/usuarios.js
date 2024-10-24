const md5 = require("md5");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");//gma const bcrypt = require("bcrypt");
const Key = require("../config/key");
const Persona = require("../models").persona;
const Usuario = require("../models").usuarios;
const UsuarioRol = require("../models").usuarios_rol;
const Roles = require("../models").roles;
const RolMenuOperaciones = require("../models").rol_menus_operaciones;
const Sequelize = require('sequelize');

const sequelize = Usuario.sequelize;
//sequelize.Op = Sequelize.Op;

module.exports = {
  list(req, res) {
    return Usuario.findAll({
      attributes: { exclude: ["password_hash"] },
      order: [["fec_cre", "DESC"]]
    })
      .then(usuarios => res.status(200).send(usuarios))
      .catch(error => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Usuario.findByPk(req.params.id)
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

  add(req, res) {
    return Usuario.create({
      nombre: req.body.nombre,
      telefono: req.body.telefono,
      rol_id: req.body.rol_id,
      user_login: req.body.user_login,
      password_hash: req.body.password_hash,
      estado: req.body.estado
    })
      .then(usuario => res.status(201).send(usuario))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    console.log(Usuario);
    return Usuario.findByPk(req.params.id, {})
      .then(usuario => {
        if (!usuario) {
          return res.status(404).send({
            message: "usuario Not Found"
          });
        }
        return usuario
          .update({
            nombre: req.body.nombre || usuario.nombre,
            telefono: req.body.telefono || usuario.telefono,
            rol_id: req.body.rol_id || usuario.rol_id,
            user_login: req.body.user_login || usuario.user_login,
            // password_hash: req.body.password_hash || usuario.password_hash,
            estado: !!req.body.estado
          })
          .then(() => res.status(200).send(usuario))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Usuario.findByPk(req.params.id)
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

  auth(req, res) {console.log(req.body);
    let cambio_clave = req.body.user_login == req.body.password_hash ? true : false;
             

    Usuario.findOne({ where: { user_login: req.body.user_login, estado: "ACTIVO" } })
      .then(async usuario => {
        console.log('usuario.password_hash: ',  usuario.password_hash );
        if (md5(req.body.password_hash) === usuario.password_hash) {
          var token = jwt.sign({ usuario_id: usuario.id }, Key.apikey);
              // Primero, obtenemos todos los roles de un usuario       
          UsuarioRol.findAll({
            where: { usuarios_id: usuario.id },
            attributes: [ "roles_sigla"],
            include: [
              {
                model: Roles,
                required: true,
                attributes: ["id", "rol"]
              }
            ]
          }).then(async usuarioRol => {                              
              // Convertimos el resultado a un array de IDs
              const rolSigla = usuarioRol.map(roles => roles.roles_sigla);
              console.log('rolSigla :', rolSigla);

              // Ahora utilizamos el array con el operador IN
              const menuOperaciones = await RolMenuOperaciones.findAll({
                    where: {
                      roles_sigla:  {
                        [Sequelize.Op.in]: rolSigla
                          } //rolSigla, // Aquí usamos el array de IDs
                    },
              });

            console.log('menuOperaciones filtrados:', JSON.stringify(menuOperaciones, null, 2));
            console.log('usuarioRol: ', JSON.stringify(usuarioRol ));
            //usuarioRol.forEach(roles_sigla => {  console.log(`  - ${roles_sigla.roles_sigla}`);          });
          /* let query =`SELECT id, roles_sigla, menus_sigla, operaciones_sigla, descripcion FROM rol_menus_operaciones  WHERE estado= 'ACTIVO' AND roles_sigla = `+ usuarioRol.id ;
              let rolesMenu = await sequelize.query(query, {
                   type: sequelize.QueryTypes.SELECT,
                   plain: true,
                   raw: true
             });*/
 
             res.status(200).json({
               usuario_id: usuario.id,
               username: usuario.user_login,
               nombre: usuario ? usuario.nombres + " " + usuario.apellido_pat + " " + usuario.apellido_mat : "",           
               roles: rolSigla,
               menu_Operaciones: menuOperaciones,
               cambio_clave: cambio_clave || usuario.reset_key,
               token
             });
 
          });


        } else {
          res.status(400).send({ message: "Usuario o contraseña invalida" });
        }
    })
    .catch(err => {
        res.status(400).send({ message: "Usuario no autorizado 1. " + err});
      });
  },

  changeAuth(req, res) {
    console.log(req.body);
    return Usuario.findByPk(req.body.id)
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
  }
};
