const UeggViolenciaEtapaPreparatoriaTipo = require('../../models/uegg').uegg_violencia_etapa_preparatoria_tipo ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaEtapaPreparatoriaTipo
            .findAll({})
            .then((UeggViolenciaEtapaPreparatoriaTipo) => res.status(200).send(UeggViolenciaEtapaPreparatoriaTipo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaEtapaPreparatoriaTipo
            .findByPk(req.params.id)
            .then((UeggViolenciaEtapaPreparatoriaTipo) => { 
                console.log(UeggViolenciaEtapaPreparatoriaTipo);
                if (!UeggViolenciaEtapaPreparatoriaTipo) {
                    return res.status(404).send({
                        message: 'UeggViolenciaEtapaPreparatoriaTipo no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaEtapaPreparatoriaTipo);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaEtapaPreparatoriaTipo.create({
            descripcion: req.body.descripcion,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaEtapaPreparatoriaTipo => res.status(201).send(UeggViolenciaEtapaPreparatoriaTipo))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaEtapaPreparatoriaTipo);
        return UeggViolenciaEtapaPreparatoriaTipo.findByPk(req.params.Id, {})
          .then(UeggViolenciaEtapaPreparatoriaTipo => {
            if (!UeggViolenciaEtapaPreparatoriaTipo) {
              return res.status(404).send({
                message: "UeggViolenciaEtapaPreparatoriaTipo Not Found"
              });
            }
            return UeggViolenciaEtapaPreparatoriaTipo
              .update({
                descripcion: req.body.descripcion || UeggViolenciaEtapaPreparatoriaTipo.descripcion,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaEtapaPreparatoriaTipo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaEtapaPreparatoriaTipo.findByPk(req.params.Id)
          .then(UeggViolenciaEtapaPreparatoriaTipo => {
            if (!UeggViolenciaEtapaPreparatoriaTipo) {
              return res.status(400).send({
                message: "UeggViolenciaEtapaPreparatoriaTipo Not Found"
              });
            }
            return UeggViolenciaEtapaPreparatoriaTipo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};