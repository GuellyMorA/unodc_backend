const UeggViolenciaAutoFinalTipo = require('../../models/uegg').uegg_violencia_auto_final_tipo ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaAutoFinalTipo
            .findAll({})
            .then((UeggViolenciaAutoFinalTipo) => res.status(200).send(UeggViolenciaAutoFinalTipo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaAutoFinalTipo
            .findByPk(req.params.id)
            .then((UeggViolenciaAutoFinalTipo) => { 
                console.log(UeggViolenciaAutoFinalTipo);
                if (!UeggViolenciaAutoFinalTipo) {
                    return res.status(404).send({
                        message: 'UeggViolenciaAutoFinalTipo no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaAutoFinalTipo);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaAutoFinalTipo.create({
           
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaAutoFinalTipo => res.status(201).send(UeggViolenciaAutoFinalTipo))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaAutoFinalTipo);
        return UeggViolenciaAutoFinalTipo.findByPk(req.params.Id, {})
          .then(UeggViolenciaAutoFinalTipo => {
            if (!UeggViolenciaAutoFinalTipo) {
              return res.status(404).send({
                message: "UeggViolenciaAutoFinalTipo Not Found"
              });
            }
            return UeggViolenciaAutoFinalTipo
              .update({
                descripcion: req.body.descripcion,
                estado: 'ACTIVO' ,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaAutoFinalTipo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaAutoFinalTipo.findByPk(req.params.Id)
          .then(UeggViolenciaAutoFinalTipo => {
            if (!UeggViolenciaAutoFinalTipo) {
              return res.status(400).send({
                message: "UeggViolenciaAutoFinalTipo Not Found"
              });
            }
            return UeggViolenciaAutoFinalTipo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};