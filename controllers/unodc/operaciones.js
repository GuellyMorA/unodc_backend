
const Operaciones = require('../../models/unodc').Operaciones ; 

module.exports = {
    list(req, res) {
return Operaciones
            .findAll({})
            .then(( Operaciones ) => res.status(200).send(Operaciones )) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
return Operaciones
            .findByPk(req.params.id)
            .then(( Operaciones) => { 
                console.log( Operaciones);
                if (! Operaciones) { 
        return res.status(404).send({
                        message: 'Operaciones no encontrado', 
                    });
                }
                 return res.status(200).send(Operaciones);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return Operaciones.create({

             sigla: req.body.sigla,
             operacion: req.body.operacion,
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
            .then(( Operaciones ) => res.status(201).send(Operaciones )) 
   .catch(error => res.status(400).send(error));
      },
    
 update(req, res) {
        console.log( Operaciones);
                 return Operaciones.findByPk(req.params.Id, {})
        console.log( Operaciones  => {
            if (!Operaciones ) { 
       return res.status(404).send({
                        message: 'Operaciones no encontrado', 
              });
            }
return Operaciones
   .update({

        sigla: req.body.sigla || operaciones.sigla,
        operacion: req.body.operacion || operaciones.operacion,
        descripcion: req.body.descripcion || operaciones.descripcion,
        estado: req.body.estado || operaciones.estado,
        transaccion: req.body.transaccion || operaciones.transaccion,
        usu_cre: req.body.usu_cre || operaciones.usu_cre,
        fec_cre: req.body.fec_cre || operaciones.fec_cre,
        usu_mod: req.body.usu_mod || operaciones.usu_mod,
        fec_mod: req.body.fec_mod || operaciones.fec_mod,
        host_creacion: req.body.host_creacion || operaciones.host_creacion,
        host_modificacion: req.body.host_modificacion || operaciones.host_modificacion,


















 })
 .then(() =>{  
     console.log(' *************SI UPDATE OK');
                 return res.status(200).send(Operaciones)   })
.catch(error => {
         console.log(' *************ERROR UPDATE 1', error);
         res.status(400).send(error)  });
   })
 .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
                 return Operaciones.findByPk(req.params.Id)
        console.log( Operaciones  => {
            if (!Operaciones ) { 
       return res.status(404).send({
                        message: 'Operaciones no encontrado', 
              });
            }
               return Operaciones
      .destroy()
      .then(() =>{
        console.log(' ************SI DELETE OK');
          res.status(204).send() }  )
       .catch(error => res.status(400).send(error));
      })
     .catch(error => res.status(400).send(error));
  }

};




