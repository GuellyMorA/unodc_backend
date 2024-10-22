const UeggViolenciaOtrasFormTipo = require('../../models/uegg').uegg_violencia_otras_form_tipo ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaOtrasFormTipo
            .findAll({})
            .then((UeggViolenciaOtrasFormTipo) => res.status(200).send(UeggViolenciaOtrasFormTipo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaOtrasFormTipo
            .findByPk(req.params.id)
            .then((UeggViolenciaOtrasFormTipo) => { 
                console.log(UeggViolenciaOtrasFormTipo);
                if (!UeggViolenciaOtrasFormTipo) {
                    return res.status(404).send({
                        message: 'UeggViolenciaOtrasFormTipo no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaOtrasFormTipo);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaOtrasFormTipo.create({
            descripcion: req.body.descripcion,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaOtrasFormTipo => res.status(201).send(UeggViolenciaOtrasFormTipo))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaOtrasFormTipo);
        return UeggViolenciaOtrasFormTipo.findByPk(req.params.Id, {})
          .then(UeggViolenciaOtrasFormTipo => {
            if (!UeggViolenciaOtrasFormTipo) {
              return res.status(404).send({
                message: "UeggViolenciaOtrasFormTipo Not Found"
              });
            }
            return UeggViolenciaOtrasFormTipo
              .update({
                descripcion: req.body.descripcion || UeggViolenciaOtrasFormTipo.descripcion,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaOtrasFormTipo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaOtrasFormTipo.findByPk(req.params.Id)
          .then(UeggViolenciaOtrasFormTipo => {
            if (!UeggViolenciaOtrasFormTipo) {
              return res.status(400).send({
                message: "UeggViolenciaOtrasFormTipo Not Found"
              });
            }
            return UeggViolenciaOtrasFormTipo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};