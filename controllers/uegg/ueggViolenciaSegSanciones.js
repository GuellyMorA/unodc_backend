const UeggViolenciaSegSanciones = require('../../models/uegg').uegg_violencia_seg_sanciones ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaSegSanciones
            .findAll({})
            .then((UeggViolenciaSegSanciones) => res.status(200).send(UeggViolenciaSegSanciones)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaSegSanciones
            .findByPk(req.params.id)
            .then((ueggViolenciaSegSanciones) => { 
                console.log(ueggViolenciaSegSanciones);
                if (!ueggViolenciaSegSanciones) {
                    return res.status(404).send({
                        message: 'UeggViolenciaSegSanciones no encontrado',
                    });
                }
                return res.status(200).send(ueggViolenciaSegSanciones);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaSegSanciones.create({
            id_num_caso: req.body.id_num_caso,
            id_violencia_victima_nombre: req.body.id_violencia_victima_nombre,
            ini_victi: req.body.ini_victi,
            id_violencia_agresor_nombre: req.body.id_violencia_agresor_nombre,
            ini_agre: req.body.ini_agre,
            remision_dir_deptal: req.body.remision_dir_deptal,
            fec_agresion: req.body.fec_agresion,
            id_violencia_sanciones_tipo: req.body.id_violencia_sanciones_tipo,
            cumplir_sancion: req.body.cumplir_sancion,
            comu_tutor: req.body.comu_tutor,
            comu_victima: req.body.comu_victima,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(ueggViolenciaSegSanciones => res.status(201).send(ueggViolenciaSegSanciones))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaSegSanciones);
        return UeggViolenciaSegSanciones.findByPk(req.params.Id, {})
          .then(ueggViolenciaSegSanciones => {
            if (!ueggViolenciaSegSanciones) {
              return res.status(404).send({
                message: "ueggViolenciaSegSanciones Not Found"
              });
            }
            return ueggViolenciaSegSanciones
              .update({
                id_num_caso: req.body.id_num_caso || ueggViolenciaSegSanciones.id_num_caso,
                id_violencia_victima_nombre: req.body.id_violencia_victima_nombre || ueggViolenciaSegSanciones.id_violencia_victima_nombre,
                ini_victi: req.body.ini_victi || ueggViolenciaSegSanciones.ini_victi,
                id_violencia_agresor_nombre: req.body.id_violencia_agresor_nombre || ueggViolenciaSegSanciones.id_violencia_agresor_nombre,
                ini_agre: req.body.ini_agre || ueggViolenciaSegSanciones.ini_agre,
                remision_dir_deptal: req.body.remision_dir_deptal || ueggViolenciaSegSanciones.remision_dir_deptal,
                fec_agresion: req.body.fec_agresion || ueggViolenciaSegSanciones.fec_agresion,
                id_violencia_sanciones_tipo: req.body.id_violencia_sanciones_tipo || ueggViolenciaSegSanciones.id_violencia_sanciones_tipo,
                cumplir_sancion: req.body.cumplir_sancion || ueggViolenciaSegSanciones.cumplir_sancion,
                comu_tutor: req.body.comu_tutor || ueggViolenciaSegSanciones.comu_tutor,
                comu_victima: req.body.comu_victima || ueggViolenciaSegSanciones.comu_victima,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggViolenciaSegSanciones)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaSegSanciones.findByPk(req.params.Id)
          .then(ueggViolenciaSegSanciones => {
            if (!ueggViolenciaSegSanciones) {
              return res.status(400).send({
                message: "ueggViolenciaSegSanciones Not Found"
              });
            }
            return ueggViolenciaSegSanciones
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};