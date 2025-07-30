
const Modulos = require('../../models/unodc').Modulos ; 

module.exports = {
    list(req, res) {
return Modulos
            .findAll({})
            .then(( Modulos ) => res.status(200).send(Modulos )) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
return Modulos
            .findByPk(req.params.id)
            .then(( Modulos) => { 
                console.log( Modulos);
                if (! Modulos) { 
        return res.status(404).send({
                        message: 'Modulos no encontrado', 
                    });
                }
                 return res.status(200).send(Modulos);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return Modulos.create({

             sigla: req.body.sigla,
             modulo: req.body.modulo,
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
            .then(( Modulos ) => res.status(201).send(Modulos )) 
   .catch(error => res.status(400).send(error));
      },
    
 update(req, res) {
        console.log( Modulos);
                 return Modulos.findByPk(req.params.Id, {})
        console.log( Modulos  => {
            if (!Modulos ) { 
       return res.status(404).send({
                        message: 'Modulos no encontrado', 
              });
            }
return Modulos
   .update({

        sigla: req.body.sigla || modulos.sigla,
        modulo: req.body.modulo || modulos.modulo,
        descripcion: req.body.descripcion || modulos.descripcion,
        estado: req.body.estado || modulos.estado,
        transaccion: req.body.transaccion || modulos.transaccion,
        usu_cre: req.body.usu_cre || modulos.usu_cre,
        fec_cre: req.body.fec_cre || modulos.fec_cre,
        usu_mod: req.body.usu_mod || modulos.usu_mod,
        fec_mod: req.body.fec_mod || modulos.fec_mod,
        host_creacion: req.body.host_creacion || modulos.host_creacion,
        host_modificacion: req.body.host_modificacion || modulos.host_modificacion,


















 })
 .then(() =>{  
     console.log(' *************SI UPDATE OK');
                 return res.status(200).send(Modulos)   })
.catch(error => {
         console.log(' *************ERROR UPDATE 1', error);
         res.status(400).send(error)  });
   })
 .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
                 return Modulos.findByPk(req.params.Id)
        console.log( Modulos  => {
            if (!Modulos ) { 
       return res.status(404).send({
                        message: 'Modulos no encontrado', 
              });
            }
               return Modulos
      .destroy()
      .then(() =>{
        console.log(' ************SI DELETE OK');
          res.status(204).send() }  )
       .catch(error => res.status(400).send(error));
      })
     .catch(error => res.status(400).send(error));
  }

};




