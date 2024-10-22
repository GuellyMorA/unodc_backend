const UeggViolenciaVictima = require('../../models/uegg').uegg_violencia_victima ; 
const sequelize = UeggViolenciaVictima.sequelize;

module.exports = {
    list(req, res) {
        return UeggViolenciaVictima
            .findAll({})
            .then((UeggViolenciaVictima) => res.status(200).send(UeggViolenciaVictima)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaVictima
            .findByPk(req.params.id)
            .then((UeggViolenciaVictima) => { 
                console.log(UeggViolenciaVictima);
                if (!UeggViolenciaVictima) {
                    return res.status(404).send({
                        message: 'UeggViolenciaVictima no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaVictima);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaVictima.create({
            cod_ue: req.body.cod_ue,
            desc_ue: req.body.desc_ue, 
            cod_sie: req.body.cod_sie,
            cod_rda_director: req.body.cod_rda_director,
            cod_director: req.body.cod_director,
            cod_rude: req.body.cod_rude,
            num_ci: req.body.num_ci,
            num_comp: req.body.num_comp,
            nombres_victima: req.body.nombres_victima,
            apellido_pat_victima: req.body.apellido_pat_victima,
            apellido_mat_victima: req.body.apellido_mat_victima,
            fec_nac: req.body.fec_nac,
            sexo: req.body.sexo,
            nivel: req.body.nivel,
            grado: req.body.grado, 
            dir_actual: req.body.grado,
            celular_contacto: req.body.celular_contacto,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaVictima => res.status(201).send(UeggViolenciaVictima))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaVictima);
        return UeggViolenciaVictima.findByPk(req.params.Id, {})
          .then(UeggViolenciaVictima => {
            if (!UeggViolenciaVictima) {
              return res.status(404).send({
                message: "UeggViolenciaVictima Not Found"
              });
            }
            return UeggViolenciaVictima
              .update({
                cod_ue: req.body.cod_ue || UeggViolenciaVictima.cod_ue,
                desc_ue: req.body.desc_ue || UeggViolenciaVictima.desc_ue, 
                cod_sie: req.body.cod_sie || UeggViolenciaVictima.cod_sie,
                cod_rda_director: req.body.cod_rda_director || UeggViolenciaVictima.cod_rda_director,
                cod_director: req.body.cod_director || UeggViolenciaVictima.cod_director,
                cod_rude: req.body.cod_rude || UeggViolenciaVictima.cod_rude,
                num_ci: req.body.num_ci || UeggViolenciaVictima.num_ci,
                num_comp: req.body.num_comp || UeggViolenciaVictima.num_comp,
                nombres_victima: req.body.nombres_victima || UeggViolenciaVictima.nombres_victima,
                apellido_pat_victima: req.body.apellido_pat_victima || UeggViolenciaVictima.apellido_pat_victima,
                apellido_mat_victima: req.body.apellido_mat_victima || UeggViolenciaVictima.apellido_mat_victima,
                fec_nac: req.body.fec_nac || UeggViolenciaVictima.fec_nac,
                sexo: req.body.sexo || UeggViolenciaVictima.sexo,
                nivel: req.body.nivel || UeggViolenciaVictima.nivel,
                grado: req.body.grado || UeggViolenciaVictima.grado, 
                dir_actual: req.body.dir_actual || UeggViolenciaVictima.dir_actual,
                celular_contacto: req.body.celular_contacto || UeggViolenciaVictima.celular_contacto,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaVictima)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaVictima.findByPk(req.params.Id)
          .then(UeggViolenciaVictima => {
            if (!UeggViolenciaVictima) {
              return res.status(400).send({
                message: "UeggViolenciaVictima Not Found"
              });
            }
            return UeggViolenciaVictima
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      },
    
      getByRude(req, res) {
        console.log('req', req.params, `select * from public.uegg_violencia_victima where cod_rude = '${req.params.rude}' `);
        return sequelize.query(`select * from public.uegg_violencia_victima where cod_rude = '${req.params.rude}' `, {
            type: sequelize.QueryTypes.SELECT, plain: false, raw: true 
          })
            .then((subcentros) => res.status(200).send(subcentros))
            .catch((error) => { res.status(400).send(error); });
      },
    
      getByRda(req, res) {
        console.log('req', req.params, `select * from public.uegg_violencia_victima where cod_rda_director = '${req.params.rda}' `);
        return sequelize.query(`select * from public.uegg_violencia_victima where cod_rda_director = '${req.params.rda}' `, {
            type: sequelize.QueryTypes.SELECT, plain: false, raw: true 
          })
            .then((subcentros) => res.status(200).send(subcentros))
            .catch((error) => { res.status(400).send(error); });
      }
};