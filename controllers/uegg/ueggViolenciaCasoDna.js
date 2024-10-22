const UeggViolenciaCasoDna = require('../../models/uegg').uegg_violencia_caso_dna ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaCasoDna
            .findAll({})
            .then((UeggViolenciaCasoDna) => res.status(200).send(UeggViolenciaCasoDna)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaCasoDna
            .findByPk(req.params.id)
            .then((UeggViolenciaCasoDna) => { 
                console.log(UeggViolenciaCasoDna);
                if (!UeggViolenciaCasoDna) {
                    return res.status(404).send({
                        message: 'UeggViolenciaCasoDna no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaCasoDna);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaCasoDna.create({
            id_num_caso: req.body.id_num_caso,
            id_violencia_victima: req.body.id_violencia_victima,
            id_violencia_agresor_nombre: req.body.id_violencia_agresor_nombre,
            id_violencia_hecho_tipo: req.body.id_violencia_hecho_tipo,
            id_violencia_instancia: req.body.id_violencia_instancia, // MODIFICADO 20241001
            desc_hecho: req.body.desc_hecho,
            recepcion_ficha: req.body.recepcion_ficha,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaCasoDna => res.status(201).send(UeggViolenciaCasoDna))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaCasoDna);
        return UeggViolenciaCasoDna.findByPk(req.params.Id, {})
          .then(UeggViolenciaCasoDna => {
            if (!UeggViolenciaCasoDna) {
              return res.status(404).send({
                message: "UeggViolenciaCasoDna Not Found"
              });
            }
            return UeggViolenciaCasoDna
              .update({
                id_num_caso: req.body.id_num_caso || UeggViolenciaCasoDna.id_num_caso,
                id_violencia_victima: req.body.id_violencia_victima || UeggViolenciaCasoDna.id_violencia_victima,
                id_violencia_agresor_nombre: req.body.id_violencia_agresor_nombre || UeggViolenciaCasoDna.id_violencia_victima,
                id_violencia_hecho_tipo: req.body.id_violencia_hecho_tipo || UeggViolenciaCasoDna.id_violencia_victima,
                desc_hecho: req.body.desc_hecho || UeggViolenciaCasoDna.id_violencia_victima,
                recepcion_ficha: req.body.desc_hecho || UeggViolenciaCasoDna.recepcion_ficha,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaCasoDna)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaCasoDna.findByPk(req.params.Id)
          .then(UeggViolenciaCasoDna => {
            if (!UeggViolenciaCasoDna) {
              return res.status(400).send({
                message: "UeggViolenciaCasoDna Not Found"
              });
            }
            return UeggViolenciaCasoDna
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};