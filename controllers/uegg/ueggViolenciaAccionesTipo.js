const UeggViolenciaAccionesTipo = require('../../models/uegg').uegg_violencia_acciones_tipo ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaAccionesTipo
            .findAll({})
            .then((UeggViolenciaAccionesTipo) => res.status(200).send(UeggViolenciaAccionesTipo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaAccionesTipo
            .findByPk(req.params.id)
            .then((UeggViolenciaAccionesTipo) => { 
                console.log(UeggViolenciaAccionesTipo);
                if (!UeggViolenciaAccionesTipo) {
                    return res.status(404).send({
                        message: 'UeggViolenciaAccionesTipo no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaAccionesTipo);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaAccionesTipo.create({
            descripcion: req.body.descripcion,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaAccionesTipo => res.status(201).send(UeggViolenciaAccionesTipo))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaAccionesTipo);
        return UeggViolenciaAccionesTipo.findByPk(req.params.Id, {})
          .then(UeggViolenciaAccionesTipo => {
            if (!UeggViolenciaAccionesTipo) {
              return res.status(404).send({
                message: "UeggViolenciaAccionesTipo Not Found"
              });
            }
            return UeggViolenciaAccionesTipo
              .update({
                descripcion: req.body.descripcion,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaAccionesTipo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaAccionesTipo.findByPk(req.params.Id)
          .then(UeggViolenciaAccionesTipo => {
            if (!UeggViolenciaAccionesTipo) {
              return res.status(400).send({
                message: "UeggViolenciaAccionesTipo Not Found"
              });
            }
            return UeggViolenciaAccionesTipo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
};