const UeggViolenciaSancionTipo = require('../../models/uegg').uegg_violencia_sancion_tipo ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaSancionTipo
            .findAll({})
            .then((UeggViolenciaSancionTipo) => res.status(200).send(UeggViolenciaSancionTipo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaSancionTipo
            .findByPk(req.params.id)
            .then((UeggViolenciaSancionTipo) => { 
                console.log(UeggViolenciaSancionTipo);
                if (!UeggViolenciaSancionTipo) {
                    return res.status(404).send({
                        message: 'UeggViolenciaSancionTipo no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaSancionTipo);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaSancionTipo.create({
          descripcion: req.body.descripcion,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaSancionTipo => res.status(201).send(UeggViolenciaSancionTipo))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaSancionTipo);
        return UeggViolenciaSancionTipo.findByPk(req.params.Id, {})
          .then(UeggViolenciaSancionTipo => {
            if (!UeggViolenciaSancionTipo) {
              return res.status(404).send({
                message: "UeggViolenciaSancionTipo Not Found"
              });
            }
            return UeggViolenciaSancionTipo
              .update({
                descripcion: req.body.descripcion || UeggViolenciaSancionTipo.descripcion,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaSancionTipo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaSancionTipo.findByPk(req.params.Id)
          .then(UeggViolenciaSancionTipo => {
            if (!UeggViolenciaSancionTipo) {
              return res.status(400).send({
                message: "UeggViolenciaSancionTipo Not Found"
              });
            }
            return UeggViolenciaSancionTipo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};