const UeggViolenciaSegInfraccion = require('../../models/uegg').uegg_violencia_seg_infraccion ; 

module.exports = {
    list(req, res) {
        return UeggViolenciaSegInfraccion
            .findAll({})
            .then((UeggViolenciaSegInfraccionTipo) => res.status(200).send(UeggViolenciaSegInfraccionTipo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaSegInfraccion
            .findByPk(req.params.id)
            .then((UeggViolenciaSegInfraccionTipo) => { 
                console.log(UeggViolenciaSegInfraccionTipo);
                if (!UeggViolenciaSegInfraccionTipo) {
                    return res.status(404).send({
                        message: 'UeggViolenciaSegInfraccion no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaSegInfraccionTipo);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaSegInfraccion.create({
            id_num_caso: req.body.id_num_caso,
            caso_remitido_juez: req.body.caso_remitido_juez,
            caso_remitido_otra_instancia: req.body.caso_remitido_otra_instancia,
            dna_remision_referencia: req.body.dna_remision_referencia,
            cambio_sancion_delito: req.body.cambio_sancion_delito,
            inicio_proceso_admi: req.body.inicio_proceso_admi,
            id_violencia_sancion_tipo: req.body.id_violencia_sancion_tipo,
            sancion_cumplida: req.body.sancion_cumplida,
            com_tutor: req.body.com_tutor,
            medidas_protec: req.body.medidas_protec,
            denuncia_minpub: req.body.denuncia_minpub,
            id_quien_denuncia_tipo: req.body.id_quien_denuncia_tipo,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaSegInfraccionTipo => res.status(201).send(UeggViolenciaSegInfraccionTipo))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaSegInfraccion);
        return UeggViolenciaSegInfraccion.findByPk(req.params.Id, {})
          .then(UeggViolenciaSegInfraccionTipo => {
            if (!UeggViolenciaSegInfraccionTipo) {
              return res.status(404).send({
                message: "UeggViolenciaSegInfraccionTipo Not Found"
              });
            }
            return UeggViolenciaSegInfraccionTipo
              .update({
                id_num_caso: req.body.id_num_caso || UeggViolenciaSegInfraccion.id_num_caso,
                caso_remitido_juez: req.body.caso_remitido_juez || UeggViolenciaSegInfraccion.caso_remitido_juez,
                caso_remitido_otra_instancia: req.body.caso_remitido_otra_instancia || UeggViolenciaSegInfraccion.caso_remitido_otra_instancia,
                dna_remision_referencia: req.body.dna_remision_referencia || UeggViolenciaSegInfraccion.dna_remision_referencia,
                cambio_sancion_delito: req.body.cambio_sancion_delito || UeggViolenciaSegInfraccion.cambio_sancion_delito,
                inicio_proceso_admi: req.body.inicio_proceso_admi || UeggViolenciaSegInfraccion.inicio_proceso_admi,
                id_violencia_sancion_tipo: req.body.id_violencia_sancion_tipo || UeggViolenciaSegInfraccion.id_violencia_sancion_tipo,
                sancion_cumplida: req.body.sancion_cumplida || UeggViolenciaSegInfraccion.sancion_cumplida,
                com_tutor: req.body.com_tutor || UeggViolenciaSegInfraccion.com_tutor,
                medidas_protec: req.body.medidas_protec || UeggViolenciaSegInfraccion.medidas_protec,
                denuncia_minpub: req.body.denuncia_minpub || UeggViolenciaSegInfraccion.denuncia_minpub,
                id_quien_denuncia_tipo: req.body.id_quien_denuncia_tipo || UeggViolenciaSegInfraccion.id_quien_denuncia_tipo,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaSegInfraccionTipo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaSegInfraccion.findByPk(req.params.Id)
          .then(UeggViolenciaSegInfraccionTipo => {
            if (!UeggViolenciaSegInfraccionTipo) {
              return res.status(400).send({
                message: "UeggViolenciaSegInfraccionTipo Not Found"
              });
            }
            return UeggViolenciaSegInfraccionTipo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};