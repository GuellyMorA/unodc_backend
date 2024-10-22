const UeggViolenciaQDenunciaTipo = require('../../models/uegg').uegg_violencia_q_denuncia_tipo ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaQDenunciaTipo
            .findAll({})
            .then((UeggViolenciaQDenunciaTipo) => res.status(200).send(UeggViolenciaQDenunciaTipo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaQDenunciaTipo
            .findByPk(req.params.id)
            .then((UeggViolenciaQDenunciaTipo) => { 
                console.log(UeggViolenciaQDenunciaTipo);
                if (!UeggViolenciaQDenunciaTipo) {
                    return res.status(404).send({
                        message: 'UeggViolenciaQDenunciaTipo no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaQDenunciaTipo);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaQDenunciaTipo.create({
            descripcion: req.body.descripcion,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaQDenunciaTipo => res.status(201).send(UeggViolenciaQDenunciaTipo))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaQDenunciaTipo);
        return UeggViolenciaQDenunciaTipo.findByPk(req.params.Id, {})
          .then(UeggViolenciaQDenunciaTipo => {
            if (!UeggViolenciaQDenunciaTipo) {
              return res.status(404).send({
                message: "UeggViolenciaQDenunciaTipo Not Found"
              });
            }
            return UeggViolenciaQDenunciaTipo
              .update({
                descripcion: req.body.descripcion || UeggViolenciaQDenunciaTipo.descripcion,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaQDenunciaTipo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaQDenunciaTipo.findByPk(req.params.Id)
          .then(UeggViolenciaQDenunciaTipo => {
            if (!UeggViolenciaQDenunciaTipo) {
              return res.status(400).send({
                message: "UeggViolenciaQDenunciaTipo Not Found"
              });
            }
            return UeggViolenciaQDenunciaTipo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};