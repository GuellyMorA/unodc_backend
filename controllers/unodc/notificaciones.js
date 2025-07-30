
const Notificaciones = require('../../models/unodc').notificaciones ; 
const sequelize = Notificaciones.sequelize;
module.exports = {
    list(req, res) {
     return Notificaciones
            .findAll({})
            .then(( notificaciones ) => res.status(200).send(notificaciones )) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
return Notificaciones
            .findByPk(req.params.id)
            .then( notificaciones => { 
                console.log( notificaciones);
                if (! notificaciones) { 
        return res.status(404).send({
                        message: 'Notificaciones no encontrado', 
                    });
                }
                 return res.status(200).send(notificaciones);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return Notificaciones.create({

             user_login_sigla: req.body.user_login_sigla,
             sigla: req.body.sigla,
             notificacion: req.body.notificacion,
             descripcion: req.body.descripcion,
             fec_inicio: req.body.fec_inicio,
             fec_fin: req.body.fec_fin,
             estado: req.body.estado,
             transaccion: req.body.transaccion,
             usu_cre: req.body.usu_cre,
             fec_cre: req.body.fec_cre,
             usu_mod: req.body.usu_mod,
             fec_mod: req.body.fec_mod,
             host_creacion: req.body.host_creacion,
             host_modificacion: req.body.host_modificacion,
            
        })
            .then(( notificaciones ) => res.status(201).send(notificaciones )) 
   .catch(error => res.status(400).send(error));
      },
    
 update(req, res) {
  console.log(': req.params.id: ', req.params.id);
                 return Notificaciones.findByPk(req.params.id, {})
            .then( notificaciones => { 
                if (! notificaciones) { 
       return res.status(404).send({
                        message: 'Notificaciones no encontrado', 
              });
            }
return notificaciones
   .update({

        user_login_sigla: req.body.user_login_sigla || notificaciones.user_login_sigla,
        sigla: req.body.sigla || notificaciones.sigla,
        notificacion: req.body.notificacion || notificaciones.notificacion,
        descripcion: req.body.descripcion || notificaciones.descripcion,
        fec_inicio: req.body.fec_inicio || notificaciones.fec_inicio,
        fec_fin: req.body.fec_fin || notificaciones.fec_fin,
        estado: req.body.estado || notificaciones.estado,
        transaccion: req.body.transaccion || notificaciones.transaccion,
        usu_cre: req.body.usu_cre || notificaciones.usu_cre,
        fec_cre: req.body.fec_cre || notificaciones.fec_cre,
        usu_mod: req.body.usu_mod || notificaciones.usu_mod,
        fec_mod: req.body.fec_mod || notificaciones.fec_mod,
        host_creacion: req.body.host_creacion || notificaciones.host_creacion,
        host_modificacion: req.body.host_modificacion || notificaciones.host_modificacion,
  


 })
 .then(() =>{  
     console.log(' *************SI UPDATE OK');
                 return res.status(200).send(notificaciones)   })
.catch(error => {
         console.log(' *************ERROR UPDATE 1', error);
         res.status(400).send(error)  });
   })
 .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
                 return Notificaciones.findByPk(req.params.id)
            .then( notificaciones => { 
                if (! notificaciones) { 
       return res.status(404).send({
                        message: 'Notificaciones no encontrado', 
              });
            }
      return notificaciones
      .destroy()
      .then(() =>{
        console.log(' ************SI DELETE OK');
          res.status(204).send() }  )
       .catch(error => res.status(400).send(error));
      })
     .catch(error => res.status(400).send(error));
  }

};




