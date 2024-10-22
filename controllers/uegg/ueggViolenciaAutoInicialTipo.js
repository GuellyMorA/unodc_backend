const UeggViolenciaAutoInicialTipo = require('../../models/uegg').uegg_violencia_auto_inicial_tipo ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaAutoInicialTipo
            .findAll({})
            .then((UeggViolenciaAutoInicialTipo) => res.status(200).send(ueggViolenciaAutoInicialTipo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaAutoInicialTipo
            .findByPk(req.params.id)
            .then((ueggViolenciaAutoInicialTipo) => { 
                console.log(ueggViolenciaAutoInicialTipo);
                if (!ueggViolenciaAutoInicialTipo) {
                    return res.status(404).send({
                        message: 'UeggViolenciaAutoInicialTipo no encontrado',
                    });
                }
                return res.status(200).send(ueggViolenciaAutoInicialTipo);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaAutoInicialTipo.create({
            descripcion: req.body.descripcion,
            estado: 'ACTIVO' ,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(ueggViolenciaAutoInicialTipo => res.status(201).send(ueggViolenciaAutoInicialTipo))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaAutoInicialTipo);
        return UeggViolenciaAutoInicialTipo.findByPk(req.params.Id, {})
          .then(ueggViolenciaAutoInicialTipo => {
            if (!ueggViolenciaAutoInicialTipo) {
              return res.status(404).send({
                message: "ueggViolenciaAutoInicialTipo Not Found"
              });
            }
            return ueggViolenciaAutoInicialTipo
              .update({
               
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggViolenciaAutoInicialTipo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaAutoInicialTipo.findByPk(req.params.Id)
          .then(ueggViolenciaAutoInicialTipo => {
            if (!ueggViolenciaAutoInicialTipo) {
              return res.status(400).send({
                message: "ueggViolenciaAutoInicialTipo Not Found"
              });
            }
            return ueggViolenciaAutoInicialTipo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};