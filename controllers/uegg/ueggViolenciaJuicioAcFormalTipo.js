const UeggViolenciaJuicioAcFormalTipo = require('../../models/uegg').uegg_violencia_juicio_ac_formal_tipo ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaJuicioAcFormalTipo
            .findAll({})
            .then((UeggViolenciaJuicioAcFormalTipo) => res.status(200).send(UeggViolenciaJuicioAcFormalTipo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaJuicioAcFormalTipo
            .findByPk(req.params.id)
            .then((UeggViolenciaJuicioAcFormalTipo) => { 
                console.log(UeggViolenciaJuicioAcFormalTipo);
                if (!UeggViolenciaJuicioAcFormalTipo) {
                    return res.status(404).send({
                        message: 'UeggViolenciaJuicioAcFormalTipo no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaJuicioAcFormalTipo);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaJuicioAcFormalTipo.create({
            descripcion: req.body.descripcion,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaJuicioAcFormalTipo => res.status(201).send(UeggViolenciaJuicioAcFormalTipo))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaJuicioAcFormalTipo);
        return UeggViolenciaJuicioAcFormalTipo.findByPk(req.params.Id, {})
          .then(UeggViolenciaJuicioAcFormalTipo => {
            if (!UeggViolenciaJuicioAcFormalTipo) {
              return res.status(404).send({
                message: "UeggViolenciaJuicioAcFormalTipo Not Found"
              });
            }
            return UeggViolenciaJuicioAcFormalTipo
              .update({
                descripcion: req.body.descripcion || UeggViolenciaJuicioAcFormalTipo.descripcion,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaJuicioAcFormalTipo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaJuicioAcFormalTipo.findByPk(req.params.Id)
          .then(UeggViolenciaJuicioAcFormalTipo => {
            if (!UeggViolenciaJuicioAcFormalTipo) {
              return res.status(400).send({
                message: "UeggViolenciaJuicioAcFormalTipo Not Found"
              });
            }
            return UeggViolenciaJuicioAcFormalTipo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};