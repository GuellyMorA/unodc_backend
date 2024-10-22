const UeggViolenciaComDist = require('../../models/uegg').uegg_violencia_com_dist ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaComDist
            .findAll({})
            .then((UeggViolenciaComDist) => res.status(200).send(UeggViolenciaComDist)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaComDist
            .findByPk(req.params.id)
            .then((UeggViolenciaComDist) => { 
                console.log(UeggViolenciaComDist);
                if (!UeggViolenciaComDist) {
                    return res.status(404).send({
                        message: 'UeggViolenciaComDist no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaComDist);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaComDist.create({
            id_num_caso: req.body.id_num_caso,
            fec_comunicacion: req.body.fec_comunicacion,
            id_violencia_caso: req.body.id_violencia_caso,
            id_violencia_victima_nombre: id_violencia_victima_nombre,
            id_violencia_agresor_nombre: req.body.id_violencia_agresor_nombre,
            id_acciones_realizadas_tipo: req.body.id_acciones_realizadas_tipo,
            id_violencia_instancia_tipo: req.body.id_violencia_instancia_tipo,
            fec_comunicacion_distrital: fec_comunicacion_distrital,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaComDist => res.status(201).send(UeggViolenciaComDist))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaComDist);
        return UeggViolenciaComDist.findByPk(req.params.Id, {})
          .then(UeggViolenciaComDist => {
            if (!UeggViolenciaComDist) {
              return res.status(404).send({
                message: "UeggViolenciaComDist Not Found"
              });
            }
            return UeggViolenciaComDist
              .update({
                id_num_caso: req.body.id_num_caso || UeggViolenciaComDist.id_num_caso,
                fec_comunicacion: req.body.fec_comunicacion || UeggViolenciaComDist.fec_comunicacion,
                id_violencia_caso: req.body.id_violencia_caso || UeggViolenciaComDist.id_violencia_caso,
                id_violencia_victima_nombre: req.body.id_violencia_victima_nombre || UeggViolenciaComDist.id_violencia_victima_nombre,
                id_violencia_agresor_nombre: req.body.id_violencia_agresor_nombre || UeggViolenciaComDist.id_violencia_agresor_nombre,
                id_acciones_realizadas_tipo: req.body.id_acciones_realizadas_tipo || UeggViolenciaComDist.id_acciones_realizadas_tipo,
                id_violencia_instancia_tipo: req.body.id_violencia_instancia_tipo || UeggViolenciaComDist.id_violencia_instancia_tipo,
                fec_comunicacion_distrital: fec_comunicacion_distrital || UeggViolenciaComDist.fec_comunicacion_distrital,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaComDist)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaComDist.findByPk(req.params.Id)
          .then(UeggViolenciaComDist => {
            if (!UeggViolenciaComDist) {
              return res.status(400).send({
                message: "UeggViolenciaComDist Not Found"
              });
            }
            return UeggViolenciaComDist
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};