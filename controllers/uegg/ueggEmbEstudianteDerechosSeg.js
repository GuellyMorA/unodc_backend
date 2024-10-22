const UeggEmbEstudianteDerechoSeg = require('../../models/uegg').uegg_emb_estudiante_derechos_seg ; 

module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggEmbEstudianteDerechoSeg
            .findAll({})
            .then((ueggEmbEstudianteDerechoSeg) => res.status(200).send(ueggEmbEstudianteDerechoSeg)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); 
        return UeggEmbEstudianteDerechoSeg
            .findByPk(req.params.id)
            .then((ueggEmbEstudianteDerechoSeg) => { 
                console.log(ueggEmbEstudianteDerechoSeg);
                if (!ueggEmbEstudianteDerechoSeg) {
                    return res.status(404).send({
                        message: 'UeggEmbEstudianteDerechoSeg no encontrado',
                    });
                }
                return res.status(200).send(ueggEmbEstudianteDerechoSeg); 
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return UeggEmbEstudianteDerechoSeg.create({
            id_pcpa_unidad_educativa: req.body.id_pcpa_unidad_educativa,
            id_emb_informe_embarazo: req.body.id_emb_informe_embarazo,
        
            cod_rude: req.body.cod_rude,
            nombres_apellidos: req.body.nombres_apellidos,
                
            check_emb_relacion_concensuada: req.body.check_emb_relacion_concensuada,
            check_emb_agresion_sexual: req.body.check_emb_agresion_sexual,

            check_emb_reporte_dna: req.body.check_emb_reporte_dna,
            check_emb_violacion_sexual: req.body.check_emb_violacion_sexual,
            emb_referencia_dna: req.body.emb_referencia_dna,
            check_director_victima_violencia: req.body.check_director_victima_violencia,
            check_emb_director_refiere_dna: req.body.check_emb_director_refiere_dna,
                       
            cod_caso_denuncia: req.body.cod_caso_denuncia,
            nombre_adolescente: req.body.nombre_adolescente,
            fec_denuncia: req.body.fec_denuncia,
        
            motivo_queja: req.body.motivo_queja,
            acciones_a_seguir: req.body.acciones_a_seguir,
       
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(ueggEmbEstudianteDerechoSeg => res.status(201).send(ueggEmbEstudianteDerechoSeg))
          .catch(error => res.status(400).send(error));
      },
    
    update(req, res) {
        console.log(UeggEmbEstudianteDerechoSeg);
        return UeggEmbEstudianteDerechoSeg.findByPk(req.params.Id, {})
          .then(ueggEmbEstudianteDerechoSeg => {
            if (!ueggEmbEstudianteDerechoSeg) {
              return res.status(404).send({
                message: "ueggEmbEstudianteDerechoSeg Not Found"
              });
            }
            return ueggEmbEstudianteDerechoSeg
              .update({

                id_pcpa_unidad_educativa: req.body.id_pcpa_unidad_educativa || ueggEmbEstudianteDerechoSeg.id_pcpa_unidad_educativa,
                id_emb_informe_embarazo: req.body.id_emb_informe_embarazo || ueggEmbEstudianteDerechoSeg.id_emb_informe_embarazo,
            
                cod_rude: req.body.cod_rude || ueggEmbEstudianteDerechoSeg.cod_rude,
                nombres_apellidos: req.body.nombres_apellidos || ueggEmbEstudianteDerechoSeg.nombres_apellidos,
                    
                check_emb_relacion_concensuada: req.body.check_emb_relacion_concensuada || ueggEmbEstudianteDerechoSeg.check_emb_relacion_concensuada,
                check_emb_agresion_sexual: req.body.check_emb_agresion_sexual || ueggEmbEstudianteDerechoSeg.check_emb_agresion_sexual,

                check_emb_reporte_dna: req.body.check_emb_reporte_dna || ueggEmbEstudianteDerechoSeg.check_emb_reporte_dna,
                check_emb_violacion_sexual: req.body.check_emb_violacion_sexual || ueggEmbEstudianteDerechoSeg.check_emb_violacion_sexual,
                emb_referencia_dna: req.body.emb_referencia_dna || ueggEmbEstudianteDerechoSeg.emb_referencia_dna,
                check_director_victima_violencia: req.body.check_director_victima_violencia || ueggEmbEstudianteDerechoSeg.check_director_victima_violencia,
                check_emb_director_refiere_dna: req.body.check_emb_director_refiere_dna || ueggEmbEstudianteDerechoSeg.check_emb_director_refiere_dna,

                cod_caso_denuncia: req.body.cod_caso_denuncia || ueggEmbEstudianteDerechoSeg.cod_caso_denuncia,
                nombre_adolescente: req.body.nombre_adolescente || ueggEmbEstudianteDerechoSeg.nombre_adolescente,
                fec_denuncia: req.body.fec_denuncia || ueggEmbEstudianteDerechoSeg.fec_denuncia,
            
                motivo_queja: req.body.motivo_queja || ueggEmbEstudianteDerechoSeg.motivo_queja,
                acciones_a_seguir: req.body.acciones_a_seguir || ueggEmbEstudianteDerechoSeg.acciones_a_seguir,
                             
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggEmbEstudianteDerechoSeg)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggEmbEstudianteDerechoSeg.findByPk(req.params.Id)
          .then(ueggEmbEstudianteDerechoSeg => {
            if (!ueggEmbEstudianteDerechoSeg) {
              return res.status(400).send({
                message: "ueggEmbEstudianteDerechoSeg Not Found"
              });
            }
            return ueggEmbEstudianteDerechoSeg
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    

};