const UeggViolenciaRecJuTipo = require('../../models/uegg').uegg_violencia_rec_ju_tipo ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaRecJuTipo
            .findAll({})
            .then((UeggViolenciaRecJuTipo) => res.status(200).send(UeggViolenciaRecJuTipo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaRecJuTipo
            .findByPk(req.params.id)
            .then((UeggViolenciaRecJuTipo) => { 
                console.log(UeggViolenciaRecJuTipo);
                if (!UeggViolenciaRecJuTipo) {
                    return res.status(404).send({
                        message: 'UeggViolenciaRecJuTipo no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaRecJuTipo);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaRecJuTipo.create({
            descripcion: req.body.descripcion,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaRecJuTipo => res.status(201).send(UeggViolenciaRecJuTipo))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaRecJuTipo);
        return UeggViolenciaRecJuTipo.findByPk(req.params.Id, {})
          .then(UeggViolenciaRecJuTipo => {
            if (!UeggViolenciaRecJuTipo) {
              return res.status(404).send({
                message: "UeggViolenciaRecJuTipo Not Found"
              });
            }
            return UeggViolenciaRecJuTipo
              .update({
                descripcion: req.body.descripcion || UeggViolenciaRecJuTipo.descripcion,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaRecJuTipo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaRecJuTipo.findByPk(req.params.Id)
          .then(UeggViolenciaRecJuTipo => {
            if (!UeggViolenciaRecJuTipo) {
              return res.status(400).send({
                message: "UeggViolenciaRecJuTipo Not Found"
              });
            }
            return UeggViolenciaRecJuTipo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};