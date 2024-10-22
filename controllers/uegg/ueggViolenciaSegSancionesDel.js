const UeggViolenciaSegSancionesDel = require('../../models/uegg').uegg_violencia_seg_sanciones_del ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaSegSancionesDel
            .findAll({})
            .then((UeggViolenciaSegSancionesDel) => res.status(200).send(UeggViolenciaSegSancionesDel)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaSegSancionesDel
            .findByPk(req.params.id)
            .then((UeggViolenciaSegSancionesDel) => { 
                console.log(UeggViolenciaSegSancionesDel);
                if (!UeggViolenciaSegSancionesDel) {
                    return res.status(404).send({
                        message: 'UeggViolenciaSegSancionesDel no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaSegSancionesDel);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaSegSancionesDel.create({
            id_num_caso: req.body.id_num_caso,
            id_violencia_seg_sanciones: req.body.id_violencia_seg_sanciones,
            denuncia_minpub: req.body.denuncia_minpub,
            id_quien_denuncia_tipo: req.body.id_quien_denuncia_tipo,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaSegSancionesDel => res.status(201).send(UeggViolenciaSegSancionesDel))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaSegSancionesDel);
        return UeggViolenciaSegSancionesDel.findByPk(req.params.Id, {})
          .then(UeggViolenciaSegSancionesDel => {
            if (!UeggViolenciaSegSancionesDel) {
              return res.status(404).send({
                message: "UeggViolenciaSegSancionesDel Not Found"
              });
            }
            return UeggViolenciaSegSancionesDel
              .update({
                id_num_caso: req.body.id_num_caso || UeggViolenciaSegSancionesDel.id_num_caso,
                id_violencia_seg_sanciones: req.body.id_violencia_seg_sanciones || UeggViolenciaSegSancionesDel.id_violencia_seg_sanciones,
                denuncia_minpub: req.body.denuncia_minpub || UeggViolenciaSegSancionesDel.denuncia_minpub,
                id_quien_denuncia_tipo: req.body.id_quien_denuncia_tipo || UeggViolenciaSegSancionesDel.id_quien_denuncia_tipo,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaSegSancionesDel)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaSegSancionesDel.findByPk(req.params.Id)
          .then(UeggViolenciaSegSancionesDel => {
            if (!UeggViolenciaSegSancionesDel) {
              return res.status(400).send({
                message: "UeggViolenciaSegSancionesDel Not Found"
              });
            }
            return UeggViolenciaSegSancionesDel
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};