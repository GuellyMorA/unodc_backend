
const NivelGeografico = require('../../models/unodc').nivel_geografico ; 
const Sequelize = require('sequelize');
const sequelize = NivelGeografico.sequelize;


module.exports = {

    list(req, res) {
      return sequelize.query(`
      SELECT jsonb_agg(
        jsonb_build_object(
            'depto_id', depto.id,
            'depto_sigla', depto.sigla ,
            'depto', depto.descripcion ,
            'municipios', (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'mun_id', mun.sigla,
                        'mun', mun.descripcion
                    )
                )
                FROM nivel_geografico AS mun
                WHERE mun.sigla_padre  = depto.sigla --AND P.sigla_padre IS NOT NULL --AND P.nivel_geografico  <> 'NAL'
                )
        )
    ) AS departamentos
    FROM nivel_geografico AS depto
    WHERE depto.sigla_padre IS NOT NULL 
         AND nivel_geografico ='DPTO'
    
       `,
        {
          type: sequelize.QueryTypes.SELECT, plain: false, 
          raw: true
        })
        .then((subcentros) => res.status(200).send(subcentros))
        .catch((error) => { 
          res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return NivelGeografico
            .findByPk(req.params.id)
            .then( nivelGeografico => { 
                console.log( nivelGeografico);
                if (! nivelGeografico) { 
        return res.status(404).send({
                        message: 'NivelGeografico no encontrado', 
                    });
                }
                 return res.status(200).send(nivelGeografico);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return NivelGeografico.create({

             sigla: req.body.sigla,
             sigla_padre: req.body.sigla_padre,
             nivel_geografico: req.body.nivel_geografico,
             descripcion: req.body.descripcion,
             estado: req.body.estado,
             transaccion: req.body.transaccion,
             usu_cre: req.body.usu_cre,
             fec_cre: req.body.fec_cre,
             usu_mod: req.body.usu_mod,
             fec_mod: req.body.fec_mod,
             host_creacion: req.body.host_creacion,
             host_modificacion: req.body.host_modificacion,
          


        })
            .then(( nivelGeografico ) => res.status(201).send(nivelGeografico )) 
   .catch(error => res.status(400).send(error));
      },
    
 update(req, res) {
        console.log( NivelGeografico);
                 return NivelGeografico.findByPk(req.params.Id, {})
            .then( nivelGeografico => { 
                if (! nivelGeografico) { 
       return res.status(404).send({
                        message: 'NivelGeografico no encontrado', 
              });
            }
return nivelGeografico
   .update({

        sigla: req.body.sigla || nivel_geografico.sigla,
        sigla_padre: req.body.sigla_padre || nivel_geografico.sigla_padre,
        nivel_geografico: req.body.nivel_geografico || nivel_geografico.nivel_geografico,
        descripcion: req.body.descripcion || nivel_geografico.descripcion,
        estado: req.body.estado || nivel_geografico.estado,
        transaccion: req.body.transaccion || nivel_geografico.transaccion,
        usu_cre: req.body.usu_cre || nivel_geografico.usu_cre,
        fec_cre: req.body.fec_cre || nivel_geografico.fec_cre,
        usu_mod: req.body.usu_mod || nivel_geografico.usu_mod,
        fec_mod: req.body.fec_mod || nivel_geografico.fec_mod,
        host_creacion: req.body.host_creacion || nivel_geografico.host_creacion,
        host_modificacion: req.body.host_modificacion || nivel_geografico.host_modificacion,
       

 })
 .then(() =>{  
     console.log(' *************SI UPDATE OK');
                 return res.status(200).send(nivelGeografico)   })
.catch(error => {
         console.log(' *************ERROR UPDATE 1', error);
         res.status(400).send(error)  });
   })
 .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
                 return NivelGeografico.findByPk(req.params.Id)
            .then( nivelGeografico => { 
                if (! nivelGeografico) { 
       return res.status(404).send({
                        message: 'NivelGeografico no encontrado', 
              });
            }
      return nivelGeografico
      .destroy()
      .then(() =>{
        console.log(' ************SI DELETE OK');
          res.status(204).send() }  )
       .catch(error => res.status(400).send(error));
      })
     .catch(error => res.status(400).send(error));
  }

};




