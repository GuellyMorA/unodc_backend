const UeggViolenciaCasoCom = require('../../models/uegg').uegg_violencia_caso_com ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaCasoCom
            .findAll({})
            .then((UeggViolenciaCasoCom) => res.status(200).send(UeggViolenciaCasoCom)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaCasoCom
            .findByPk(req.params.id)
            .then((UeggViolenciaCasoCom) => { 
                console.log(UeggViolenciaCasoCom);
                if (!UeggViolenciaCasoCom) {
                    return res.status(404).send({
                        message: 'UeggViolenciaCasoCom no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaCasoCom);
            })
            .catch((error) => res.status(400).send(error));
    },
/*
    add(req, res) {
        return UeggViolenciaCasoCom.create({
            id_violencia_caso_agresor: req.body.id_violencia_caso_agresor,
            comunicacion_tutores: req.body.comunicacion_tutores,
            nombre_tutores: req.body.nombre_tutores,
            fec_com: req.body.fec_com,
            desc_hecho: req.body.desc_hecho,
            violencia_fis: req.body.violencia_fis,
            desc_hecho_fis: req.body.desc_hecho_fis,
            violencia_val_fis: req.body.violencia_val_fis,
            violencia_psico: req.body.violencia_psico,
            desc_hecho_psico: req.body.desc_hecho_psico,
            violencia_val_psico: req.body.violencia_val_psico,
            violencia_sexual: req.body.violencia_sexual,
            desc_hecho_sexual: req.body.desc_hecho_sexual,
            violencia_val_sexual: req.body.violencia_val_sexual,
                  
            desc_hecho: req.body.desc_hecho,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaCasoCom => res.status(201).send(UeggViolenciaCasoCom))
          .catch(error => res.status(400).send(error));
      },

*/

add(req, res) {
  return UeggViolenciaCasoCom.create({
      id_violencia_caso_agresor: req.body.id_violencia_caso_agresor,

      id_violencia_victima: req.body.id_violencia_victima, // modificado
      id_violencia_agresor: req.body.id_violencia_agresor, // modificado

      comunicacion_tutores: req.body.comunicacion_tutores,
      desc_hecho: req.body.desc_hecho,

      nombre_tutores: req.body.nombre_tutores,
      fec_com: req.body.fec_com,
      violencia_fis: req.body.violencia_fis,
      violencia_val_fis: req.body.violencia_val_fis,
      desc_hecho_fis: req.body.desc_hecho_fis,
      violencia_psico: req.body.violencia_psico,
      violencia_val_psico: req.body.violencia_val_psico,
      desc_hecho_psico: req.body.desc_hecho_psico,
      violencia_sexual: req.body.violencia_sexual,
      violencia_val_sexual: req.body.violencia_val_sexual,
      desc_hecho_sexual: req.body.desc_hecho_sexual,

      estado: 'ACTIVO' ,
      usu_cre: req.body.usu_cre ,
      fec_cre: req.body.fec_cre 
  })
    .then(UeggViolenciaCasoCom => res.status(201).send(UeggViolenciaCasoCom))
    .catch(error => res.status(400).send(error));
},



      update(req, res) {
        console.log(UeggViolenciaCasoCom);
        return UeggViolenciaCasoCom.findByPk(req.params.Id, {})
          .then(UeggViolenciaCasoCom => {
            if (!UeggViolenciaCasoCom) {
              return res.status(404).send({
                message: "UeggViolenciaCasoCom Not Found"
              });
            }
            return UeggViolenciaCasoCom
              .update({
                id_violencia_caso_agresor: req.body.id_violencia_caso_agresor || UeggViolenciaCasoCom.id_violencia_caso_agresor,
                comunicacion_tutores: req.body.comunicacion_tutores || UeggViolenciaCasoCom.comunicacion_tutores,
                nombre_tutores: req.body.nombre_tutores || UeggViolenciaCasoCom.nombre_tutores,
                fec_com: req.body.fec_com || UeggViolenciaCasoCom.fec_com,
                desc_hecho: req.body.desc_hecho || UeggViolenciaCasoCom.desc_hecho,
                violencia_fis: req.body.violencia_fis || UeggViolenciaCasoCom.violencia_fis,
                desc_hecho_fis: req.body.desc_hecho_fis || UeggViolenciaCasoCom.desc_hecho_fis,
                violencia_val_fis: req.body.violencia_val_fis || UeggViolenciaCasoCom.violencia_val_fis,
                violencia_psico: req.body.violencia_psico || UeggViolenciaCasoCom.violencia_psico,
                desc_hecho_psico: req.body.desc_hecho_psico || UeggViolenciaCasoCom.desc_hecho_psico,
                violencia_val_psico: req.body.violencia_val_psico || UeggViolenciaCasoCom.violencia_val_psico,
                violencia_sexual: req.body.violencia_sexual || UeggViolenciaCasoCom.violencia_sexual,
                desc_hecho_sexual: req.body.desc_hecho_sexual || UeggViolenciaCasoCom.desc_hecho_sexual,
                violencia_val_sexual: req.body.violencia_val_sexual || UeggViolenciaCasoCom.violencia_val_sexual,

                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaCasoCom)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaCasoCom.findByPk(req.params.Id)
          .then(UeggViolenciaCasoCom => {
            if (!UeggViolenciaCasoCom) {
              return res.status(400).send({
                message: "UeggViolenciaCasoCom Not Found"
              });
            }
            return UeggViolenciaCasoCom
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};