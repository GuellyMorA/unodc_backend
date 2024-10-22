const UeggViolenciaSegDs = require('../../models/uegg').uegg_violencia_seg_ds ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaSegDs
            .findAll({})
            .then((UeggViolenciaSegDs) => res.status(200).send(UeggViolenciaSegDs)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaSegDs
            .findByPk(req.params.id)
            .then((UeggViolenciaSegDs) => { 
                console.log(UeggViolenciaSegDs);
                if (!UeggViolenciaSegDs) {
                    return res.status(404).send({
                        message: 'UeggViolenciaSegDs no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaSegDs);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaSegDs.create({
            id_num_caso: req.body.id_num_caso,
            id_violencia_seg_sanciones: req.body.id_violencia_seg_sanciones,
            id_etapa_preliminar_tipo: req.body.id_etapa_preliminar_tipo,
            id_etapa_preparatoria_tipo: req.body.id_etapa_preparatoria_tipo,
            id_juicio_ac_formal_tipo: req.body.id_juicio_ac_formal_tipo,
            apelacion: req.body.apelacion,
            cazacion: req.body.cazacion,
            id_otras_formas_conclusion_tipo: req.body.id_otras_formas_conclusion_tipo,
            fec_seg: req.body.fec_seg,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaSegDs => res.status(201).send(UeggViolenciaSegDs))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaSegDs);
        return UeggViolenciaSegDs.findByPk(req.params.Id, {})
          .then(UeggViolenciaSegDs => {
            if (!UeggViolenciaSegDs) {
              return res.status(404).send({
                message: "UeggViolenciaSegDs Not Found"
              });
            }
            return UeggViolenciaSegDs
              .update({
                id_num_caso: req.body.id_num_caso || UeggViolenciaSegDs.id_num_caso,
                id_violencia_seg_sanciones: req.body.id_violencia_seg_sanciones  || UeggViolenciaSegDs.id_violencia_seg_sanciones,
                id_etapa_preliminar_tipo: req.body.id_etapa_preliminar_tipo || UeggViolenciaSegDs.id_etapa_preliminar_tipo,
                id_etapa_preparatoria_tipo: req.body.id_etapa_preparatoria_tipo || UeggViolenciaSegDs.id_etapa_preparatoria_tipo,
                id_juicio_ac_formal_tipo: req.body.id_juicio_ac_formal_tipo || UeggViolenciaSegDs.id_juicio_ac_formal_tipo,
                apelacion: req.body.apelacion || UeggViolenciaSegDs.apelacion,
                cazacion: req.body.cazacion || UeggViolenciaSegDs.cazacion,
                id_otras_formas_conclusion_tipo: req.body.id_otras_formas_conclusion_tipo || UeggViolenciaSegDs.id_otras_formas_conclusion_tipo,
                fec_seg: req.body.fec_seg || UeggViolenciaSegDs.fec_seg,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaSegDs)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaSegDs.findByPk(req.params.Id)
          .then(UeggViolenciaSegDs => {
            if (!UeggViolenciaSegDs) {
              return res.status(400).send({
                message: "UeggViolenciaSegDs Not Found"
              });
            }
            return UeggViolenciaSegDs
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};