const UeggEmbEstudianteDerecho = require('../../models/uegg').uegg_emb_estudiante_derechos ; 

module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggEmbEstudianteDerecho
            .findAll({})
            .then((ueggEmbEstudianteDerecho) => res.status(200).send(ueggEmbEstudianteDerecho)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); 
        return UeggEmbEstudianteDerecho
            .findByPk(req.params.id)
            .then((ueggEmbEstudianteDerecho) => { 
                console.log(ueggEmbEstudianteDerecho);
                if (!ueggEmbEstudianteDerecho) {
                    return res.status(404).send({
                        message: 'UeggEmbEstudianteDerecho no encontrado',
                    });
                }
                return res.status(200).send(ueggEmbEstudianteDerecho); 
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return UeggEmbEstudianteDerecho.create({
        	  id_pcpa_unidad_educativa: req.body.id_pcpa_unidad_educativa,
            id_emb_informe_embarazo: req.body.id_emb_informe_embarazo,

            cod_rude: req.body.cod_rude,
            nombres_apellidos: req.body.nombres_apellidos,

            complemento: req.body.complemento,
            fec_nacimiento: req.body.fec_nacimiento,
            tiempo_gestacion: req.body.tiempo_gestacion,
            numero_embarazos: req.body.numero_embarazos,
            fec_estimada_parto: req.body.fec_estimada_parto,
            check_recibe_control_prenatal: req.body.check_recibe_control_prenatal, 
            check_requiere_baja_medica: req.body.check_requiere_baja_medica,
            check_requiere_permiso_para_control: req.body.check_requiere_permiso_para_control,
            check_requiere_cuidado_especial: req.body.check_requiere_cuidado_especial,
            fec_retorno_a_ue: req.body.fec_retorno_a_ue,
            check_cuenta_con_medidas_ue: req.body.check_cuenta_con_medidas_ue,
            check_tutores_al_tanto_emb: req.body.check_tutores_al_tanto_emb,
            check_recibe_baja_medica: req.body.check_recibe_baja_medica,
            check_recibe_permiso_controles_prenatales: req.body.check_recibe_permiso_controles_prenatales,
            fec_ini_baja_prenatal: req.body.fec_ini_baja_prenatal,
            fec_fin_baja_postnatal: req.body.fec_fin_baja_postnatal,

            persona_asignada_seguimiento: req.body.persona_asignada_seguimiento,
            check_cuenta_con_seguimiento: req.body.check_cuenta_con_seguimiento,
         
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(ueggEmbEstudianteDerecho => res.status(201).send(ueggEmbEstudianteDerecho))
          .catch(error => res.status(400).send(error));
      },
    
    update(req, res) {
        console.log(UeggEmbEstudianteDerecho);
        return UeggEmbEstudianteDerecho.findByPk(req.params.Id, {})
          .then(ueggEmbEstudianteDerecho => {
            if (!ueggEmbEstudianteDerecho) {
              return res.status(404).send({
                message: "ueggEmbEstudianteDerecho Not Found"
              });
            }
            return ueggEmbEstudianteDerecho
              .update({
                id_pcpa_unidad_educativa: req.body.id_pcpa_unidad_educativa || ueggEmbEstudianteDerecho.id_pcpa_unidad_educativa,
                id_emb_informe_embarazo: req.body.id_emb_informe_embarazo || ueggEmbEstudianteDerecho.id_emb_informe_embarazo,

                cod_rude: req.body.cod_rude || ueggEmbEstudianteDerecho.cod_rude,
                nombres_apellidos: req.body.nombres_apellidos || ueggEmbEstudianteDerecho.nombres_apellidos,

                complemento: req.body.complemento || ueggEmbEstudianteDerecho.complemento,
                fec_nacimiento: req.body.fec_nacimiento || ueggEmbEstudianteDerecho.fec_nacimiento,
                tiempo_gestacion: req.body.tiempo_gestacion || ueggEmbEstudianteDerecho.tiempo_gestacion,
                numero_embarazos: req.body.numero_embarazos || ueggEmbEstudianteDerecho.numero_embarazos,
                fec_estimada_parto: req.body.fec_estimada_parto || ueggEmbEstudianteDerecho.fec_estimada_parto,
                check_recibe_control_prenatal: req.body.check_recibe_control_prenatal || ueggEmbEstudianteDerecho.check_recibe_control_prenatal, 
                check_requiere_baja_medica: req.body.check_requiere_baja_medica || ueggEmbEstudianteDerecho.check_requiere_baja_medica,
                check_requiere_permiso_para_control: req.body.check_requiere_permiso_para_control || ueggEmbEstudianteDerecho.check_requiere_permiso_para_control,
                check_requiere_cuidado_especial: req.body.check_requiere_cuidado_especial || ueggEmbEstudianteDerecho.check_requiere_cuidado_especial,
                check_cuenta_con_medidas_ue: req.body.check_cuenta_con_medidas_ue || ueggEmbEstudianteDerecho.check_cuenta_con_medidas_ue,
                fec_retorno_a_ue: req.body.fec_retorno_a_ue || ueggEmbEstudianteDerecho.fec_retorno_a_ue,
                check_tutores_al_tanto_emb: req.body.check_tutores_al_tanto_emb || ueggEmbEstudianteDerecho.check_tutores_al_tanto_emb,
                check_recibe_baja_medica: req.body.check_recibe_baja_medica || ueggEmbEstudianteDerecho.check_recibe_baja_medica,
                check_recibe_permiso_controles_prenatales: req.body.check_recibe_permiso_controles_prenatales || ueggEmbEstudianteDerecho.check_recibe_permiso_controles_prenatales,
                fec_ini_baja_prenatal: req.body.fec_ini_baja_prenatal || ueggEmbEstudianteDerecho.fec_ini_baja_prenatal,
                fec_fin_baja_postnatal: req.body.fec_fin_baja_postnatal || ueggEmbEstudianteDerecho.fec_fin_baja_postnatal,

                persona_asignada_seguimiento: req.body.persona_asignada_seguimiento || ueggEmbEstudianteDerecho.persona_asignada_seguimiento,
                check_cuenta_con_seguimiento: req.body.check_cuenta_con_seguimiento || ueggEmbEstudianteDerecho.check_cuenta_con_seguimiento,
             
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggEmbEstudianteDerecho)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
    delete(req, res) {
        return UeggEmbEstudianteDerecho.findByPk(req.params.Id)
          .then(ueggEmbEstudianteDerecho => {
            if (!ueggEmbEstudianteDerecho) {
              return res.status(400).send({
                message: "ueggEmbEstudianteDerecho Not Found"
              });
            }
            return ueggEmbEstudianteDerecho
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }


};