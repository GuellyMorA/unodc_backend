const Menus = require('../../models/unodc').Menus ; 
module.exports = {
    list(req, res) {
return Menus
            .findAll({})
            .then(( Menus ) => res.status(200).send(Menus )) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
return Menus
            .findByPk(req.params.id)
            .then(( Menus) => { 
                console.log( Menus);
                if (! Menus) { 
        return res.status(404).send({
                        message: 'Menus no encontrado', 
                    });
                }
                 return res.status(200).send(Menus);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return Menus.create({

             modulos_sigla: req.body.modulos_sigla,
             sigla: req.body.sigla,
             menu: req.body.menu,
             descripcion: req.body.descripcion,
             nivel: req.body.nivel,
             padre_id: req.body.padre_id,
             estado: req.body.estado,
             transaccion: req.body.transaccion,
             usu_cre: req.body.usu_cre,
             fec_cre: req.body.fec_cre,
             usu_mod: req.body.usu_mod,
             fec_mod: req.body.fec_mod,
             host_creacion: req.body.host_creacion,
             host_modificacion: req.body.host_modificacion,
















        })
            .then(( Menus ) => res.status(201).send(Menus )) 
   .catch(error => res.status(400).send(error));
      },
    
 update(req, res) {
        console.log( Menus);
                 return Menus.findByPk(req.params.Id, {})
        console.log( Menus  => {
            if (!Menus ) { 
       return res.status(404).send({
                        message: 'Menus no encontrado', 
              });
            }
return Menus
   .update({

        modulos_sigla: req.body.modulos_sigla || menus.modulos_sigla,
        sigla: req.body.sigla || menus.sigla,
        menu: req.body.menu || menus.menu,
        descripcion: req.body.descripcion || menus.descripcion,
        nivel: req.body.nivel || menus.nivel,
        padre_id: req.body.padre_id || menus.padre_id,
        estado: req.body.estado || menus.estado,
        transaccion: req.body.transaccion || menus.transaccion,
        usu_cre: req.body.usu_cre || menus.usu_cre,
        fec_cre: req.body.fec_cre || menus.fec_cre,
        usu_mod: req.body.usu_mod || menus.usu_mod,
        fec_mod: req.body.fec_mod || menus.fec_mod,
        host_creacion: req.body.host_creacion || menus.host_creacion,
        host_modificacion: req.body.host_modificacion || menus.host_modificacion,















 })
 .then(() =>{  
     console.log(' *************SI UPDATE OK');
                 return res.status(200).send(Menus)   })
.catch(error => {
         console.log(' *************ERROR UPDATE 1', error);
         res.status(400).send(error)  });
   })
 .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
                 return Menus.findByPk(req.params.Id)
        console.log( Menus  => {
            if (!Menus ) { 
       return res.status(404).send({
                        message: 'Menus no encontrado', 
              });
            }
               return Menus
      .destroy()
      .then(() =>{
        console.log(' ************SI DELETE OK');
          res.status(204).send() }  )
       .catch(error => res.status(400).send(error));
      })
     .catch(error => res.status(400).send(error));
  }

};




