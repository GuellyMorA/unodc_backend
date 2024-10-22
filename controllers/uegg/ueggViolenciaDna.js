const UeggViolenciaDna = require('../../models/uegg').uegg_violencia_dna ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaDna
            .findAll({})
            .then((ueggViolenciaDna) => res.status(200).send(ueggViolenciaDna)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaDna
            .findByPk(req.params.id)
            .then((ueggViolenciaDna) => { 
                console.log(ueggViolenciaDna);
                if (!ueggViolenciaDna) {
                    return res.status(404).send({
                        message: 'UeggViolenciaDna no encontrado',
                    });
                }
                return res.status(200).send(ueggViolenciaDna);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaDna.create({
            id_num_caso: req.body.id_num_caso,
            fec_agresion: req.body.fec_agresion,
            ref_den: req.body.ref_den,
            fec_ref_den: req.body.fec_ref_den,
            id_violencia_instancia_den_tipo: req.body.id_violencia_instancia_den_tipo,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(ueggViolenciaDna => res.status(201).send(ueggViolenciaDna))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaDna);
        return UeggViolenciaDna.findByPk(req.params.Id, {})
          .then(ueggViolenciaDna => {
            if (!ueggViolenciaDna) {
              return res.status(404).send({
                message: "ueggViolenciaDna Not Found"
              });
            }
            return ueggViolenciaDna
              .update({
                id_num_caso: req.body.id_num_caso || ueggViolenciaDna.id_num_caso,
                fec_agresion: req.body.fec_agresion || ueggViolenciaDna.fec_agresion,
                ref_den: req.body.ref_den || ueggViolenciaDna.ref_den,
                fec_ref_den: req.body.fec_ref_den || ueggViolenciaDna.fec_ref_den,
                id_violencia_instancia_den_tipo: req.body.id_violencia_instancia_den_tipo || ueggViolenciaDna.id_violencia_instancia_den_tipo,
                estado: 'MODIFICADO', 
                usu_mod: req.body.usu_mod,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggViolenciaDna)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaDna.findByPk(req.params.Id)
          .then(ueggViolenciaDna => {
            if (!ueggViolenciaDna) {
              return res.status(400).send({
                message: "ueggViolenciaDna Not Found"
              });
            }
            return ueggViolenciaDna
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};