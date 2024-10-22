const UeggViolenciaEtapaPreliminarTipo = require('../../models/uegg').uegg_violencia_etapa_preliminar_tipo ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaEtapaPreliminarTipo
            .findAll({})
            .then((UeggViolenciaEtapaPreliminarTipo) => res.status(200).send(UeggViolenciaEtapaPreliminarTipo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaEtapaPreliminarTipo
            .findByPk(req.params.id)
            .then((UeggViolenciaEtapaPreliminarTipo) => { 
                console.log(UeggViolenciaEtapaPreliminarTipo);
                if (!UeggViolenciaEtapaPreliminarTipo) {
                    return res.status(404).send({
                        message: 'UeggViolenciaEtapaPreliminarTipo no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaEtapaPreliminarTipo);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaEtapaPreliminarTipo.create({
            descripcion: req.body.descripcion,
       	    estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaEtapaPreliminarTipo => res.status(201).send(UeggViolenciaEtapaPreliminarTipo))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaEtapaPreliminarTipo);
        return UeggViolenciaEtapaPreliminarTipo.findByPk(req.params.Id, {})
          .then(UeggViolenciaEtapaPreliminarTipo => {
            if (!UeggViolenciaEtapaPreliminarTipo) {
              return res.status(404).send({
                message: "UeggViolenciaEtapaPreliminarTipo Not Found"
              });
            }
            return UeggViolenciaEtapaPreliminarTipo
              .update({
                descripcion: req.body.descripcion || uegg_violencia_etapa_preliminar_tipo.descripcion,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaEtapaPreliminarTipo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaEtapaPreliminarTipo.findByPk(req.params.Id)
          .then(UeggViolenciaEtapaPreliminarTipo => {
            if (!UeggViolenciaEtapaPreliminarTipo) {
              return res.status(400).send({
                message: "UeggViolenciaEtapaPreliminarTipo Not Found"
              });
            }
            return UeggViolenciaEtapaPreliminarTipo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};