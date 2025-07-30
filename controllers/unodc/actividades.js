
const Actividades = require('../../models/unodc').actividades ; 
const sequelize = Actividades.sequelize;
module.exports = {
    list(req, res) {
return Actividades
            .findAll({where: { estado: "ACTIVO" } })
            .then(( actividades ) => res.status(200).send(actividades )) 
            .catch((error) => {
                console.log( 'error',error);
                res.status(400).send(error);
              });
    },

    getById(req, res) {
        console.log(req.params.id);
return Actividades
            .findByPk(req.params.id)
            .then( actividades => { 
                console.log( actividades);
                if (! actividades) { 
        return res.status(404).send({
                        message: 'Actividades no encontrado', 
                    });
                }
                 return res.status(200).send(actividades);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return Actividades.create({

             denuncia_personas_id: req.body.denuncia_personas_id,
             control_id          : req.body.control_id          ,
             seguimiento_id      : req.body.seguimiento_id      ,
             usuarios_id         : req.body.usuarios_id         ,
             sigla               : req.body.sigla               ,
             actividad           : req.body.actividad           ,
             tipo                : req.body.tipo                ,
             descripcion         : req.body.descripcion         ,
             fec_registro        : req.body.fec_registro        ,
             informe             : req.body.informe             ,
             estado              : req.body.estado              ,
             transaccion         : req.body.transaccion         ,
             usu_cre             : req.body.usu_cre             ,
              // fec_cre: req.body.fec_cre,
      //  usu_mod: req.body.usu_mod,
      //  fec_mod: req.body.fec_mod,
      //  host_creacion: req.body.host_creacion,
      //  host_modificacion: req.body.host_modificacion,


        })
            .then(( actividades ) => res.status(201).send(actividades )) 
   .catch(error => res.status(400).send(error));
      },
    
 update(req, res) {
  console.log(': req.params.id: ', req.params.id);
                 return Actividades.findByPk(req.params.id, {})
            .then( actividades => { 
                if (! actividades) { 
       return res.status(404).send({
                        message: 'Actividades no encontrado', 
              });
            }
return actividades
   .update({

        denuncia_personas_id: req.body.denuncia_personas_id || actividades.denuncia_personas_id,
        control_id          : req.body.control_id           || actividades.control_id          ,
        seguimiento_id      : req.body.seguimiento_id       || actividades.seguimiento_id      ,
        usuarios_id         : req.body.usuarios_id          || actividades.usuarios_id         ,
        sigla               : req.body.sigla                || actividades.sigla               ,
        actividad           : req.body.actividad            || actividades.actividad           ,
        tipo                : req.body.tipo                 || actividades.tipo                ,
        descripcion         : req.body.descripcion          || actividades.descripcion         ,
        fec_registro        : req.body.fec_registro         || actividades.fec_registro        ,
        informe             : req.body.informe              || actividades.informe             ,
        estado              : req.body.estado               || actividades.estado              ,
        transaccion         : req.body.transaccion          || actividades.transaccion         ,
       // usu_cre             : req.body.usu_cre              || actividades.usu_cre             ,
        //fec_cre             : req.body.fec_cre              || actividades.fec_cre             ,
        usu_mod             : req.body.usu_mod              || actividades.usu_mod             ,
        fec_mod             : req.body.fec_mod              || actividades.fec_mod             ,
      //  host_creacion       : req.body.host_creacion        || actividades.host_creacion       ,
      //  host_modificacion   : req.body.host_modificacion    || actividades.host_modificacion   ,


 })
 .then(() =>{  
     console.log(' *************SI UPDATE OK');
                 return res.status(200).send(actividades)   })
.catch(error => {
         console.log(' *************ERROR UPDATE 1', error);
         res.status(400).send(error)  });
   })
 .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
                 return Actividades.findByPk(req.params.id)
            .then( actividades => { 
                if (! actividades) { 
       return res.status(404).send({
                        message: 'Actividades no encontrado', 
              });
            }
      return actividades
      .destroy()
      .then(() =>{
        console.log(' ************SI DELETE OK');
          res.status(204).send() }  )
       .catch(error => res.status(400).send(error));
      })
     .catch(error => res.status(400).send(error));
  }

};

