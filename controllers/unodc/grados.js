
const Grados = require('../../models').grados ; 
const sequelize = Grados.sequelize;
module.exports = {

list(req, res) {
return Grados
            .findAll({})
            .then(( grados ) => res.status(200).send(grados )) 
            .catch((error) => { res.status(400).send(error); });
    },


getById(req, res) {
        console.log(req.params.id);
return Grados
            .findByPk(req.params.id)
            .then( grados => { 
                console.log( grados);
                if (! grados) { 
        return res.status(404).send({
                        message: 'Grados no encontrado', 
                    });
                }
                 return res.status(200).send(grados);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return Grados.create({

             sigla: req.body.sigla,
             grado: req.body.grado,
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
            .then(( grados ) => res.status(201).send(grados )) 
   .catch(error => res.status(400).send(error));
      },
    
 update(req, res) {
        console.log( Grados);
                 return Grados.findByPk(req.params.Id, {})
            .then( grados => { 
                if (! grados) { 
       return res.status(404).send({
                        message: 'Grados no encontrado', 
              });
            }
return grados
   .update({

        sigla: req.body.sigla || grados.sigla,
        grado: req.body.grado || grados.grado,
        descripcion: req.body.descripcion || grados.descripcion,
        estado: req.body.estado || grados.estado,
        transaccion: req.body.transaccion || grados.transaccion,
        usu_cre: req.body.usu_cre || grados.usu_cre,
        fec_cre: req.body.fec_cre || grados.fec_cre,
        usu_mod: req.body.usu_mod || grados.usu_mod,
        fec_mod: req.body.fec_mod || grados.fec_mod,
        host_creacion: req.body.host_creacion || grados.host_creacion,
        host_modificacion: req.body.host_modificacion || grados.host_modificacion,

















 })
 .then(() =>{  
     console.log(' *************SI UPDATE OK');
                 return res.status(200).send(grados)   })
.catch(error => {
         console.log(' *************ERROR UPDATE 1', error);
         res.status(400).send(error)  });
   })
 .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
                 return Grados.findByPk(req.params.Id)
            .then( grados => { 
                if (! grados) { 
       return res.status(404).send({
                        message: 'Grados no encontrado', 
              });
            }
      return grados
      .destroy()
      .then(() =>{
        console.log(' ************SI DELETE OK');
          res.status(204).send() }  )
       .catch(error => res.status(400).send(error));
      })
     .catch(error => res.status(400).send(error));
  }

};




