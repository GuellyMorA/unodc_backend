const UeggViolenciaComDptal = require('../../models/uegg').uegg_violencia_com_dptal ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaComDptal
            .findAll({})
            .then((UeggViolenciaComDptal) => res.status(200).send(UeggViolenciaComDptal)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaComDptal
            .findByPk(req.params.id)
            .then((UeggViolenciaComDptal) => { 
                console.log(UeggViolenciaComDptal);
                if (!UeggViolenciaComDptal) {
                    return res.status(404).send({
                        message: 'UeggViolenciaComDptal no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaComDptal);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaComDptal.create({
            id_num_caso: req.body.id_num_caso,
            fec_comunicacion: req.body.fec_comunicacion,
            id_violencia_caso: req.body.id_violencia_caso,
            id_violencia_victima_nombre: req.body.id_violencia_victima_nombre,
            id_violencia_agresor_nombre: req.body.id_violencia_agresor_nombre,
            id_acciones_realizadas_tipo: req.body.id_acciones_realizadas_tipo,
            id_violencia_instancia_tipo: req.body.id_violencia_instancia_tipo,
            fec_comunicacion_deptal: req.body.fec_comunicacion_deptal,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaComDptal => res.status(201).send(UeggViolenciaComDptal))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaComDptal);
        return UeggViolenciaComDptal.findByPk(req.params.Id, {})
          .then(UeggViolenciaComDptal => {
            if (!UeggViolenciaComDptal) {
              return res.status(404).send({
                message: "UeggViolenciaComDptal Not Found"
              });
            }
            return UeggViolenciaComDptal
              .update({
                id_num_caso: req.body.id_num_caso || UeggViolenciaComDptal.id_num_caso,
                fec_comunicacion: req.body.fec_comunicacion || UeggViolenciaComDptal.fec_comunicacion,
                id_violencia_caso: req.body.id_violencia_caso || UeggViolenciaComDptal.id_violencia_caso,
                id_violencia_victima_nombre: req.body.id_violencia_victima_nombre || UeggViolenciaComDptal.id_violencia_victima_nombre,
                id_violencia_agresor_nombre: req.body.id_violencia_agresor_nombre || UeggViolenciaComDptal.id_violencia_agresor_nombre,
                id_acciones_realizadas_tipo: req.body.id_acciones_realizadas_tipo || UeggViolenciaComDptal.id_acciones_realizadas_tipo,
                id_violencia_instancia_tipo: req.body.id_violencia_instancia_tipo || UeggViolenciaComDptal.id_violencia_instancia_tipo,
                fec_comunicacion_deptal: req.body.fec_comunicacion_deptal || UeggViolenciaComDptal.fec_comunicacion_deptal,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaComDptal)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaComDptal.findByPk(req.params.Id)
          .then(UeggViolenciaComDptal => {
            if (!UeggViolenciaComDptal) {
              return res.status(400).send({
                message: "UeggViolenciaComDptal Not Found"
              });
            }
            return UeggViolenciaComDptal
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};