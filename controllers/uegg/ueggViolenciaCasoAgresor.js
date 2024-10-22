const UeggViolenciaCasoAgresor = require('../../models/uegg').uegg_violencia_caso_agresor ; 
const sequelize = UeggViolenciaCasoAgresor.sequelize; // MODIFICADO 20241001

module.exports = {
    list(req, res) {
        return UeggViolenciaCasoAgresor
            .findAll({})
            .then((UeggViolenciaCasoAgresor) => res.status(200).send(UeggViolenciaCasoAgresor)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaCasoAgresor
            .findByPk(req.params.id)
            .then((UeggViolenciaCasoAgresor) => { 
                console.log(UeggViolenciaCasoAgresor);
                if (!UeggViolenciaCasoAgresor) {
                    return res.status(404).send({
                        message: 'UeggViolenciaCasoAgresor no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaCasoAgresor);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaCasoAgresor.create({
            num_caso: req.body.num_caso,
            fec_agresion: req.body.fec_agresion,
            num_agresores: req.body.num_agresores,           
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaCasoAgresor => res.status(201).send(UeggViolenciaCasoAgresor))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaCasoAgresor);
        return UeggViolenciaCasoAgresor.findByPk(req.params.Id, {})
          .then(UeggViolenciaCasoAgresor => {
            if (!UeggViolenciaCasoAgresor) {
              return res.status(404).send({
                message: "UeggViolenciaCasoAgresor Not Found"
              });
            }
            return UeggViolenciaCasoAgresor
              .update({
                num_caso: req.body.num_caso || UeggViolenciaCasoAgresor.num_caso,
                fec_agresion: req.body.fec_agresion  || UeggViolenciaCasoAgresor.fec_agresion,
                num_agresores: req.body.num_agresores  || UeggViolenciaCasoAgresor.num_agresores,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaCasoAgresor)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaCasoAgresor.findByPk(req.params.Id)
          .then(UeggViolenciaCasoAgresor => {
            if (!UeggViolenciaCasoAgresor) {
              return res.status(400).send({
                message: "UeggViolenciaCasoAgresor Not Found"
              });
            }
            return UeggViolenciaCasoAgresor
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      },
    
      // getByCaso(req, res) {
      //   console.log('req', req.params, `select * from public.uegg_violencia_caso_agresor where num_caso = '${req.params.numero}' `);
      //   return sequelize.query(`select * from public.uegg_violencia_caso_agresor where num_caso = '${req.params.numero}' `, {
      //       type: sequelize.QueryTypes.SELECT, plain: false, raw: true 
      //     })
      //       .then((subcentros) => res.status(200).send(subcentros))
      //       .catch((error) => { res.status(400).send(error); });
      // },
    
      getByCaso(req, res) {
        console.log('req', req.params, `select * from public.uegg_violencia_caso_agresor where num_caso = '${req.params.numero}' `);
        return sequelize.query(`select * from public.uegg_violencia_caso_agresor where num_caso = '${req.params.numero}' `, {
            type: sequelize.QueryTypes.SELECT, plain: false, raw: true 
          })
            .then((subcentros) => res.status(200).send(subcentros))
            .catch((error) => { res.status(400).send(error); });
      },

      // MODIFICADO 20241001
      getByCasoDetalle(req, res) {
        console.log('req', req.params, `select * from public.uegg_violencia_caso_agresor where num_caso = '${req.params.numero}' `);
        return sequelize.query(`
          select uvca.id as caso_id, uvv.id as victima_id, uvca.num_caso, uvca.fec_agresion, uvv.id as id_victima, uva.id as id_agresor, uvcc.desc_hecho, case when uvcc.violencia_psico then 2 when uvcc.violencia_sexual then 3 else 0 end as id_violencia_tipo
          , uvv.cod_rude, uvv.num_ci, uvv.num_comp as comp_victima, uvv.nombres_victima, uvv.apellido_pat_victima, uvv.apellido_mat_victima, date_part('year',age(uvv.fec_nac)) as edad_victima, uvv.sexo as sexo_victima
          , uva.cod_rda, uva.apellido_pat_agresor, uva.apellido_mat_agresor, uva.nombres_agresor, uva.sexo as sexo_agresor, uva.num_ci as ci_agresor, uva.num_comp as comp_agresor, date_part('year',age(uva.fec_nac)) as edad_agresor
          , uvss.id as id_seguimiento_sancion
          from uegg_violencia_caso_agresor uvca 
          inner join uegg_violencia_caso_com uvcc on uvcc.id_violencia_caso_agresor = uvca.id
          inner join uegg_violencia_victima uvv on uvcc.id_violencia_victima = uvv.id 
          inner join uegg_violencia_agresor uva on uvcc.id_violencia_agresor = uva.id
          left join uegg_violencia_seg_sanciones uvss on uvss.id_num_caso = uvca.id
          where uvca.num_caso = '${req.params.numero}'
        `, {
            type: sequelize.QueryTypes.SELECT, plain: false, raw: true 
          })
            .then((subcentros) => res.status(200).send(subcentros))
            .catch((error) => { res.status(400).send(error); });
      },

      // MODIFICADO 20241001
      getByRude(req, res) {
        console.log('req', req.params, `select uvca.id as caso_id, uvv.id as victima_id, uvca.num_caso, uvca.fec_agresion, uvv.cod_rude, uvv.num_ci, uvv.nombres_victima, uvv.apellido_pat_victima, uvv.apellido_mat_victima, uvv.fec_nac from uegg_violencia_caso_agresor uvca inner join uegg_violencia_victima uvv on uvv.uegg_violencia_caso_agresor_id = uvca.id where uvv.cod_rude = '${req.params.rude}'`);
        return sequelize.query(`
            select uvca.id as caso_id, uvv.id as victima_id, uvca.num_caso, uvca.fec_agresion, uvv.id as id_victima, uva.id as id_agresor, uvcc.desc_hecho, case when uvcc.violencia_psico then 2 when uvcc.violencia_sexual then 3 else 0 end as id_violencia_tipo
            , uvv.cod_rude, uvv.num_ci, uvv.num_comp as comp_victima, uvv.nombres_victima, uvv.apellido_pat_victima, uvv.apellido_mat_victima, date_part('year',age(uvv.fec_nac)) as edad_victima, uvv.sexo as sexo_victima
            , uva.cod_rda, uva.apellido_pat_agresor, uva.apellido_mat_agresor, uva.nombres_agresor, uva.sexo as sexo_agresor, uva.num_ci as ci_agresor, uva.num_comp as comp_agresor, date_part('year',age(uva.fec_nac)) as edad_agresor
            from uegg_violencia_caso_agresor uvca 
            inner join uegg_violencia_caso_com uvcc on uvcc.id_violencia_caso_agresor = uvca.id
            inner join uegg_violencia_victima uvv on uvcc.id_violencia_victima = uvv.id 
            inner join uegg_violencia_agresor uva on uvcc.id_violencia_agresor = uva.id
            where uvv.cod_rude = '${req.params.rude}'
          `, {
            type: sequelize.QueryTypes.SELECT, plain: false, raw: true 
          })
            .then((subcentros) => res.status(200).send(subcentros))
            .catch((error) => { res.status(400).send(error); });
      },
    
      // MODIFICADO 20241001
      getByRda(req, res) {
        console.log('req', req.params, `select uvca.id as caso_id, uvv.id as victima_id, uvca.num_caso, uvca.fec_agresion, uvv.cod_rude, uvv.num_ci, uvv.nombres_victima, uvv.apellido_pat_victima, uvv.apellido_mat_victima, uvv.fec_nac from uegg_violencia_caso_agresor uvca inner join uegg_violencia_victima uvv on uvv.uegg_violencia_caso_agresor_id = uvca.id where uvv.cod_rude = '${req.params.rda}'`);
        return sequelize.query(`
              select uvca.id as caso_id, uvv.id as victima_id, uvca.num_caso, uvca.fec_agresion, uvv.id as id_victima, uva.id as id_agresor, uvcc.desc_hecho, case when uvcc.violencia_psico then 2 when uvcc.violencia_sexual then 3 else 0 end as id_violencia_tipo
              , uvv.cod_rude, uvv.num_ci, uvv.num_comp as comp_victima, uvv.nombres_victima, uvv.apellido_pat_victima, uvv.apellido_mat_victima, date_part('year',age(uvv.fec_nac)) as edad_victima, uvv.sexo as sexo_victima
              , uva.cod_rda, uva.apellido_pat_agresor, uva.apellido_mat_agresor, uva.nombres_agresor, uva.sexo as sexo_agresor, uva.num_ci as ci_agresor, uva.num_comp as comp_agresor, date_part('year',age(uva.fec_nac)) as edad_agresor
              from uegg_violencia_caso_agresor uvca 
              inner join uegg_violencia_caso_com uvcc on uvcc.id_violencia_caso_agresor = uvca.id
              inner join uegg_violencia_victima uvv on uvcc.id_violencia_victima = uvv.id 
              inner join uegg_violencia_agresor uva on uvcc.id_violencia_agresor = uva.id
              where uva.cod_rda = ${req.params.rda}
            `, {
            type: sequelize.QueryTypes.SELECT, plain: false, raw: true 
          })
            .then((subcentros) => res.status(200).send(subcentros))
            .catch((error) => { res.status(400).send(error); });
      }



};