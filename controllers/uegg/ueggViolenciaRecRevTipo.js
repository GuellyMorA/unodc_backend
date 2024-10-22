const UeggViolenciaRecRevTipo = require('../../models/uegg').uegg_violencia_rec_rev_tipo ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaRecRevTipo
            .findAll({})
            .then((UeggViolenciaRecRevTipo) => res.status(200).send(UeggViolenciaRecRevTipo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaRecRevTipo
            .findByPk(req.params.id)
            .then((UeggViolenciaRecRevTipo) => { 
                console.log(UeggViolenciaRecRevTipo);
                if (!UeggViolenciaRecRevTipo) {
                    return res.status(404).send({
                        message: 'UeggViolenciaRecRevTipo no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaRecRevTipo);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaRecRevTipo.create({
          descripcion: req.body.descripcion || UeggViolenciaRecRevTipo.descripcion,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaRecRevTipo => res.status(201).send(UeggViolenciaRecRevTipo))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaRecRevTipo);
        return UeggViolenciaRecRevTipo.findByPk(req.params.Id, {})
          .then(UeggViolenciaRecRevTipo => {
            if (!UeggViolenciaRecRevTipo) {
              return res.status(404).send({
                message: "UeggViolenciaRecRevTipo Not Found"
              });
            }
            return UeggViolenciaRecRevTipo
              .update({
               
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaRecRevTipo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaRecRevTipo.findByPk(req.params.Id)
          .then(UeggViolenciaRecRevTipo => {
            if (!UeggViolenciaRecRevTipo) {
              return res.status(400).send({
                message: "UeggViolenciaRecRevTipo Not Found"
              });
            }
            return UeggViolenciaRecRevTipo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};