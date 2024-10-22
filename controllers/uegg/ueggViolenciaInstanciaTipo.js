const UeggViolenciaInstanciaTipo = require('../../models/uegg').uegg_violencia_instancia_tipo ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaInstanciaTipo
            .findAll({})
            .then((UeggViolenciaInstanciaTipo) => res.status(200).send(UeggViolenciaInstanciaTipo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaInstanciaTipo
            .findByPk(req.params.id)
            .then((UeggViolenciaInstanciaTipo) => { 
                console.log(UeggViolenciaInstanciaTipo);
                if (!UeggViolenciaInstanciaTipo) {
                    return res.status(404).send({
                        message: 'UeggViolenciaInstanciaTipo no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaInstanciaTipo);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaInstanciaTipo.create({
            descripcion: req.body.descripcion,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaInstanciaTipo => res.status(201).send(UeggViolenciaInstanciaTipo))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaInstanciaTipo);
        return UeggViolenciaInstanciaTipo.findByPk(req.params.Id, {})
          .then(UeggViolenciaInstanciaTipo => {
            if (!UeggViolenciaInstanciaTipo) {
              return res.status(404).send({
                message: "UeggViolenciaInstanciaTipo Not Found"
              });
            }
            return UeggViolenciaInstanciaTipo
              .update({
                descripcion: req.body.descripcion || UeggViolenciaInstanciaTipo.descripcion,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaInstanciaTipo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaInstanciaTipo.findByPk(req.params.Id)
          .then(UeggViolenciaInstanciaTipo => {
            if (!UeggViolenciaInstanciaTipo) {
              return res.status(400).send({
                message: "UeggViolenciaInstanciaTipo Not Found"
              });
            }
            return UeggViolenciaInstanciaTipo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};