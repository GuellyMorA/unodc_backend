const UeggViolenciaHechoTipo = require('../../models/uegg').uegg_violencia_hecho_tipo ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaHechoTipo
            .findAll({})
            .then((UeggViolenciaHechoTipo) => res.status(200).send(UeggViolenciaHechoTipo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaHechoTipo
            .findByPk(req.params.id)
            .then((UeggViolenciaHechoTipo) => { 
                console.log(UeggViolenciaHechoTipo);
                if (!UeggViolenciaHechoTipo) {
                    return res.status(404).send({
                        message: 'UeggViolenciaHechoTipo no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaHechoTipo);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaHechoTipo.create({
            descripcion: req.body.descripcion,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaHechoTipo => res.status(201).send(UeggViolenciaHechoTipo))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaHechoTipo);
        return UeggViolenciaHechoTipo.findByPk(req.params.Id, {})
          .then(UeggViolenciaHechoTipo => {
            if (!UeggViolenciaHechoTipo) {
              return res.status(404).send({
                message: "UeggViolenciaHechoTipo Not Found"
              });
            }
            return UeggViolenciaHechoTipo
              .update({
                descripcion: req.body.descripcion || UeggViolenciaHechoTipo.descripcion,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaHechoTipo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaHechoTipo.findByPk(req.params.Id)
          .then(UeggViolenciaHechoTipo => {
            if (!UeggViolenciaHechoTipo) {
              return res.status(400).send({
                message: "UeggViolenciaHechoTipo Not Found"
              });
            }
            return UeggViolenciaHechoTipo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};