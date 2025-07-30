
const UsuariosRol = require('../../models').usuarios_rol ; 
const sequelize = UsuariosRol.sequelize;
module.exports = {
    list(req, res) {
return UsuariosRol
            .findAll({})
            .then(( usuariosRol ) => res.status(200).send(usuariosRol )) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
return UsuariosRol
            .findByPk(req.params.id)
            .then( usuariosRol => { 
                console.log( usuariosRol);
                if (! usuariosRol) { 
        return res.status(404).send({
                        message: 'UsuariosRol no encontrado', 
                    });
                }
                 return res.status(200).send(usuariosRol);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UsuariosRol.create({

             usuarios_id: req.body.usuarios_id,
             roles_sigla: req.body.roles_sigla,
             descripcion: req.body.descripcion,
             estado: req.body.estado,
             transaccion: req.body.transaccion,
             usu_cre: req.body.usu_cre,
             fec_cre: req.body.fec_cre,
             usu_mod: req.body.usu_mod,
             fec_mod: req.body.fec_mod,
             host_creacion: req.body.host_creacion,
             host_modificacion: req.body.host_modificacion,



        })
            .then(( usuariosRol ) => res.status(201).send(usuariosRol )) 
   .catch(error => res.status(400).send(error));
      },
    
 update(req, res) {
                console.log(': req.params.id: ', req.params.id);
                 return UsuariosRol.findByPk(req.params.id, {})
            .then( usuariosRol => { 
                if (! usuariosRol) { 
       return res.status(404).send({
                        message: 'UsuariosRol no encontrado', 
              });
            }
return usuariosRol
   .update({

        usuarios_id: req.body.usuarios_id || usuariosRol.usuarios_id,
        roles_sigla: req.body.roles_sigla || usuariosRol.roles_sigla,
        descripcion: req.body.descripcion || usuariosRol.descripcion,
        estado: req.body.estado || usuariosRol.estado,
        transaccion: req.body.transaccion || usuariosRol.transaccion,
        usu_cre: req.body.usu_cre || usuariosRol.usu_cre,
        fec_cre: req.body.fec_cre || usuariosRol.fec_cre,
        usu_mod: req.body.usu_mod || usuariosRol.usu_mod,
        fec_mod: req.body.fec_mod || usuariosRol.fec_mod,
        host_creacion: req.body.host_creacion || usuariosRol.host_creacion,
        host_modificacion: req.body.host_modificacion || usuariosRol.host_modificacion,



 })
 .then(() =>{  
     console.log(' *************SI UPDATE OK usuariosRol');
                 return res.status(200).send(usuariosRol)   })
.catch(error => {
         console.log(' *************ERROR UPDATE 1', error);
         res.status(400).send(error)  });
   })
 .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
                 return UsuariosRol.findByPk(req.params.id)
            .then( usuariosRol => { 
                if (! usuariosRol) { 
       return res.status(404).send({
                        message: 'UsuariosRol no encontrado', 
              });
            }
      return usuariosRol
      .destroy()
      .then(() =>{
        console.log(' ************SI DELETE OK');
          res.status(204).send() }  )
       .catch(error => res.status(400).send(error));
      })
     .catch(error => res.status(400).send(error));
  }

};




