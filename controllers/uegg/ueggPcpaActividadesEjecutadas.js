const UeggPcpaActividadesEjecutadas = require('../../models/uegg').uegg_pcpa_actividades_ejecutadas ; 
const sequelize = UeggPcpaActividadesEjecutadas.sequelize;

module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggPcpaActividadesEjecutadas
            .findAll({})
            .then((ueggPcpaActividadesEjecutadas) => res.status(200).send(ueggPcpaActividadesEjecutadas)) 
            .catch((error) => { res.status(400).send(error); });
    },

    
    async listActividadesEjecutadas(req, res) {
      console.log('req', req.params);
   
      return sequelize.query(`
      select upae.id as id_actividades_ejecutadas,upae.id_pcpa_construccion  , upat.id as id_pcpa_actividades_tipo,  upat.desc_actividad as desc_actividades_ejecutadas, upat.check_actividad_tipo, upae.fec_actividad  , upae.estado 
            from uegg_pcpa_actividades_ejecutadas upae    
                join uegg_pcpa_actividades_tipo  upat  on upae.id_pcpa_actividades_tipo = upat.id    
                join uegg_pcpa_construccion upcon on upae.id_pcpa_construccion = upcon.id  
                      join uegg_pcpa_unidad_educativa upue   on upcon.id_pcpa_unidad_educativa = upue.id 
            WHERE upue.cod_ue = ${req.params.id} and upue.estado = 'ACTIVO' and upae.estado = 'ACTIVO' order by   upae.id_pcpa_actividades_tipo asc, id_actividades_ejecutadas ASC`,
                      
        {
          type: sequelize.QueryTypes.SELECT, plain: false, raw: true 
        })
          .then((subcentros) => res.status(200).send(subcentros))
          .catch((error) => { res.status(400).send(error); });
    },



    getById(req, res) {
        console.log(req.params.id); 
        return UeggPcpaActividadesEjecutadas
            .findByPk(req.params.id)
            .then((ueggPcpaActividadesEjecutadas) => { 
                console.log(ueggPcpaActividadesEjecutadas);
                if (!ueggPcpaActividadesEjecutadas) {
                    return res.status(404).send({
                        message: 'UeggPcpaActividadesEjecutadas no encontrado',
                    });
                }
                return res.status(200).send(ueggPcpaActividadesEjecutadas); 
            })
            .catch((error) => res.status(400).send(error));
    },


    add(req, res) {
      console.log(req.body);
        return UeggPcpaActividadesEjecutadas.create({
            id_pcpa_construccion: req.body.id_pcpa_construccion,
	        id_pcpa_actividades_tipo: req.body.id_pcpa_actividades_tipo,
            cod_actividad: req.body.cod_actividad,
            desc_actividad: req.body.desc_actividad,
            fec_actividad: req.body.fec_actividad,

            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(ueggPcpaActividadesEjecutadas => res.status(201).send(ueggPcpaActividadesEjecutadas))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggPcpaActividadesEjecutadas);
        return UeggPcpaActividadesEjecutadas.findByPk(req.params.Id, {})
          .then(ueggPcpaActividadesEjecutadas => {
            if (!ueggPcpaActividadesEjecutadas) {
              return res.status(404).send({
                message: "ueggPcpaActividadesEjecutadas Not Found"
              });
            }
            return ueggPcpaActividadesEjecutadas
              .update({
                id_pcpa_construccion: req.body.id_pcpa_construccion  || ueggPcpaActividadesEjecutadas.id_pcpa_construccion,
                id_pcpa_actividades_tipo: req.body.id_pcpa_actividades_tipo || ueggPcpaActividadesEjecutadas.id_pcpa_actividades_tipo,
                cod_actividad: req.body.cod_actividad || ueggPcpaActividadesEjecutadas.cod_actividad,
                desc_actividad: req.body.desc_actividad || ueggPcpaActividadesEjecutadas.desc_actividad,
                fec_actividad: req.body.fec_actividad || ueggPcpaActividadesEjecutadas.fec_actividad,

                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggPcpaActividadesEjecutadas)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggPcpaActividadesEjecutadas.findByPk(req.params.Id)
          .then(ueggPcpaActividadesEjecutadas => {
            if (!ueggPcpaActividadesEjecutadas) {
              return res.status(400).send({
                message: "ueggPcpaActividadesEjecutadas Not Found"
              });
            }
            return ueggPcpaActividadesEjecutadas
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      },

      deleteLogico(req, res) { // en el front se llama    
        console.log('id contruccion : req.params.id: ',req.params.id );
     
  
        return UeggPcpaActividadesEjecutadas.findByPk(req.params.id, {})
            .then(ueggPcpaActividadesEjecutadas => {
              if (!ueggPcpaActividadesEjecutadas) {
                return res.status(404).send({
                  message: "ueggPcpaActividadesEjecutadas Not Found"
                });
              }
              return ueggPcpaActividadesEjecutadas
                .update({
                 
                  estado: 'INACTIVO',  
                  usu_mod: 'ADMIN', //req.body.usu_mod ,
                  fec_mod:  new Date() //req.body.fec_mod
                })
                .then(() =>{  
                   console.log(' *************SI INACTIVADO OK');
                   res.status(204).send(ueggPcpaActividadesEjecutadas)   })
                .catch(error => {
                  console.log(' *************ERROR INACTIVADO 1', error);
                  res.status(400).send(error)  });
            })
            .catch(error => {
              console.log(' *************ERROR INACTIVADO 2',  error);
              res.status(400).send(error)  });
      },   


};