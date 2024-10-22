const md5 = require("md5");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");//gma const bcrypt = require("bcrypt");
const Key = require("../config/key");
const Persona = require("../models").persona;
const Usuario = require("../models").usuarios;
const UsuarioRol = require("../models").usuario_rol;
const RolTipo = require("../models").rol_tipo;
const LugarTipo = require("../models").lugar_tipo;
const sequelize = Usuario.sequelize;

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
          let usuario_rol_lugar = await UsuarioRol.findAll({
            where: { usuario_id: usuario.id, estado: "ACTIVO" },
            attributes: ["id", "sub_sistema"],
            include: [
              {
                model: RolTipo,
                required: true,
                attributes: ["id", "rol"]
              },
              {
                model: LugarTipo,
                required: true,
                attributes: ["id", "lugar"]
              }
            ]
          });
          let persona = await Persona.findOne({
            where: { id: usuario.persona_id }
          });
          let queryAuth = "";
          if (req.body.sistema == "INFRA") {
            let gestion_actual = 2019; //new Date().getFullYear();
            queryAuth =
              "select ie.id, ie.le_juridicciongeografica_id from institucioneducativa ie inner join maestro_inscripcion mi on mi.institucioneducativa_id = ie.id where gestion_tipo_id=" +
              gestion_actual +
              " and mi.persona_id=" +
              usuario.persona_id +
              " limit 1";
          } else {
            queryAuth ='select ie.id, ie.le_juridicciongeografica_id from institucioneducativa ie inner join maestro_inscripcion mi on mi.institucioneducativa_id = ie.id where mi.persona_id='+usuario.persona_id+' limit 1';
          }console.log(queryAuth);
          let sie_jg = await sequelize.query(queryAuth, {
            type: sequelize.QueryTypes.SELECT,
            plain: true,
            raw: true
          });console.log(sie_jg);
          res.status(200).json({
            usuario_id: usuario.id,
            nombre: persona
              ? persona.nombre + " " + persona.paterno + " " + persona.materno
              : "",
            codigo_sie: sie_jg ? sie_jg.id : "",
            codigo_jg: sie_jg ? sie_jg.le_juridicciongeografica_id : "",
            rol_lugar: usuario_rol_lugar,
            cambio_clave: cambio_clave,
            token
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
