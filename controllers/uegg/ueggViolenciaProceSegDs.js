const UeggViolenciaProceSegDs = require('../../models/uegg').uegg_violencia_proce_seg_ds ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaProceSegDs
            .findAll({})
            .then((UeggViolenciaProceSegDs) => res.status(200).send(UeggViolenciaProceSegDs)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaProceSegDs
            .findByPk(req.params.id)
            .then((UeggViolenciaProceSegDs) => { 
                console.log(UeggViolenciaProceSegDs);
                if (!UeggViolenciaProceSegDs) {
                    return res.status(404).send({
                        message: 'UeggViolenciaProceSegDs no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaProceSegDs);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaProceSegDs.create({
            id_num_caso: req.body.id_num_caso,
            id_violencia_seg_sanciones: req.body.id_violencia_seg_sanciones,
            id_auto_inicial: req.body.id_auto_inicial,
            id_auto_inicial_tipo: req.body.id_auto_inicial_tipo,
            id_auto_final_tipo: req.body.id_auto_final_tipo,
            id_rec_rev: req.body.id_rec_rev,
            id_rec_jur: req.body.id_rec_jur,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaProceSegDs => res.status(201).send(UeggViolenciaProceSegDs))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaProceSegDs);
        return UeggViolenciaProceSegDs.findByPk(req.params.Id, {})
          .then(UeggViolenciaProceSegDs => {
            if (!UeggViolenciaProceSegDs) {
              return res.status(404).send({
                message: "UeggViolenciaProceSegDs Not Found"
              });
            }
            return UeggViolenciaProceSegDs
              .update({
                id_num_caso: req.body.id_num_caso || UeggViolenciaProceSegDs.id_num_caso,
                id_violencia_seg_sanciones: req.body.id_violencia_seg_sanciones || UeggViolenciaProceSegDs.id_violencia_seg_sanciones,
                id_auto_inicial: req.body.id_auto_inicial || UeggViolenciaProceSegDs.id_auto_inicial,
                id_auto_inicial_tipo: req.body.id_auto_inicial_tipo || UeggViolenciaProceSegDs.id_auto_inicial_tipo,
                id_auto_final_tipo: req.body.id_auto_final_tipo || UeggViolenciaProceSegDs.id_auto_final_tipo,
                id_rec_rev: req.body.id_rec_rev || UeggViolenciaProceSegDs.id_rec_rev,
                id_rec_jur: req.body.id_rec_jur || UeggViolenciaProceSegDs.id_rec_jur,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaProceSegDs)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaProceSegDs.findByPk(req.params.Id)
          .then(UeggViolenciaProceSegDs => {
            if (!UeggViolenciaProceSegDs) {
              return res.status(400).send({
                message: "UeggViolenciaProceSegDs Not Found"
              });
            }
            return UeggViolenciaProceSegDs
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};