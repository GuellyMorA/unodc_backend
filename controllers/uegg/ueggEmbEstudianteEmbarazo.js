const UeggEmbEstudianteEmbarazo = require('../../models/uegg').uegg_emb_estudiante_embarazo ; 
const sequelize = UeggEmbEstudianteEmbarazo.sequelize;

module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggEmbEstudianteEmbarazo
            .findAll({})
            .then((ueggEmbEstudianteEmbarazo) => res.status(200).send(ueggEmbEstudianteEmbarazo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); 
        return UeggEmbEstudianteEmbarazo
            .findByPk(req.params.id)
            .then((ueggEmbEstudianteEmbarazo) => { 
                console.log(ueggEmbEstudianteEmbarazo);
                if (!ueggEmbEstudianteEmbarazo) {
                    return res.status(404).send({
                        message: 'UeggEmbEstudianteEmbarazo no encontrado',
                    });
                }
                return res.status(200).send(ueggEmbEstudianteEmbarazo); 
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return UeggEmbEstudianteEmbarazo.create({
            id_pcpa_unidad_educativa: req.body.id_pcpa_unidad_educativa,
            id_emb_informe_embarazo: req.body.id_emb_informe_embarazo,
        
            cod_rude: req.body.cod_rude,
            cedula_identidad: req.body.cedula_identidad,
            complemento: req.body.complemento,
            fec_nacimiento: req.body.fec_nacimiento,
        
            nombres_estudiante: req.body.nombres_estudiante,
            apellido_pat_estudiante: req.body.apellido_pat_estudiante,
            apellido_mat_estudiante: req.body.apellido_mat_estudiante,
            nivel: req.body.nivel,
            grado: req.body.grado,
            edad: req.body.edad,
            check_estudiante_discapacidad: req.body.check_estudiante_discapacidad,
            check_estudiante_casada: req.body.check_estudiante_casada,
            check_estudiante_conviviente: req.body.check_estudiante_conviviente,
     
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(ueggEmbEstudianteEmbarazo => res.status(201).send(ueggEmbEstudianteEmbarazo))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggEmbEstudianteEmbarazo);
        return UeggEmbEstudianteEmbarazo.findByPk(req.params.Id, {})
          .then(ueggEmbEstudianteEmbarazo => {
            if (!ueggEmbEstudianteEmbarazo) {
              return res.status(404).send({
                message: "ueggEmbEstudianteEmbarazo Not Found"
              });
            }
            return ueggEmbEstudianteEmbarazo
              .update({

                id_pcpa_unidad_educativa: req.body.id_pcpa_unidad_educativa || ueggEmbEstudianteEmbarazo.id_pcpa_unidad_educativa,
                id_emb_informe_embarazo: req.body.id_emb_informe_embarazo || ueggEmbEstudianteEmbarazo.id_emb_informe_embarazo,
            
                cod_rude: req.body.cod_rude || ueggEmbEstudianteEmbarazo.cod_rude,
                cedula_identidad: req.body.cedula_identidad || ueggEmbEstudianteEmbarazo.cedula_identidad,
                complemento: req.body.complemento || ueggEmbEstudianteEmbarazo.complemento,
                fec_nacimiento: req.body.fec_nacimiento || ueggEmbEstudianteEmbarazo.fec_nacimiento,
            
                nombres_estudiante: req.body.nombres_estudiante || ueggEmbEstudianteEmbarazo.nombres_estudiante,
                apellido_pat_estudiante: req.body.apellido_pat_estudiante || ueggEmbEstudianteEmbarazo.apellido_pat_estudiante,
                apellido_mat_estudiante: req.body.apellido_mat_estudiante || ueggEmbEstudianteEmbarazo.apellido_mat_estudiante,
                nivel: req.body.nivel || ueggEmbEstudianteEmbarazo.nivel,
                grado: req.body.grado || ueggEmbEstudianteEmbarazo.grado,
                edad: req.body.edad || ueggEmbEstudianteEmbarazo.edad,
                check_estudiante_discapacidad: req.body.check_estudiante_discapacidad || ueggEmbEstudianteEmbarazo.check_estudiante_discapacidad,
                check_estudiante_casada: req.body.check_estudiante_casada || ueggEmbEstudianteEmbarazo.check_estudiante_casada,
                check_estudiante_conviviente: req.body.check_estudiante_conviviente || ueggEmbEstudianteEmbarazo.check_estudiante_conviviente,
                        
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggEmbEstudianteEmbarazo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggEmbEstudianteEmbarazo.findByPk(req.params.Id)
          .then(ueggEmbEstudianteEmbarazo => {
            if (!ueggEmbEstudianteEmbarazo) {
              return res.status(400).send({
                message: "ueggEmbEstudianteEmbarazo Not Found"
              });
            }
            return ueggEmbEstudianteEmbarazo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      },
    
      getByRude(req, res) {
        console.log('req', req.params);
        return sequelize.query(`select * from public.uegg_emb_estudiante_embarazo where cod_rude = '${req.params.rude}' `, {
            type: sequelize.QueryTypes.SELECT, plain: true, raw: true 
          })
            .then((subcentros) => res.status(200).send(subcentros))
            .catch((error) => { res.status(400).send(error); });
      }
  

};