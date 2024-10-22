const UeggPcpaActividadesPromocion = require('../../models/uegg').uegg_pcpa_actividades_promocion ; 
const sequelize = UeggPcpaActividadesPromocion.sequelize;

module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggPcpaActividadesPromocion
            .findAll({})
            .then((ueggPcpaActividadesPromocion) => res.status(200).send(ueggPcpaActividadesPromocion)) 
            .catch((error) => { res.status(400).send(error); });
    },

    


    async listActividadesPromocion(req, res) {
      console.log('req', req.params);
   
      return sequelize.query(`
      select upapU.id_actividades_promocion ,upapU.id_pcpa_construccion  , upapU.id_pcpa_actividades_tipo,upapU.nivel ,upapU.cod_actividad, upapU.desc_actividades_promocion, upapU.check_actividad_tipo, upapU.orden, upapU.estado 
      from(      
            select upap.id as id_actividades_promocion,upap.id_pcpa_construccion  , upat.id as id_pcpa_actividades_tipo, 1 as nivel ,upat.cod_actividad, upat.desc_actividad as desc_actividades_promocion, upat.check_actividad_tipo, upat.orden, upap.estado 
            from uegg_pcpa_actividades_promocion upap  
            join uegg_pcpa_actividades_tipo  upat  on upap.id_pcpa_actividades_tipo = upat.id    
                where  upap.nivel =1  
            union all
            select  upap.id as id_actividades_promocion, upap.id_pcpa_construccion , upatd.id as id_pcpa_actividades_tipo ,  2 as nivel, upatd.cod_actividad, upatd.desc_actividad as desc_actividades_promocion, upatd.check_actividad_tipo_det, upatd.orden, upap.estado 
            from uegg_pcpa_actividades_promocion upap  
            join uegg_pcpa_actividades_tipo_det  upatd  on upap.id_pcpa_actividades_tipo = upatd.id    
                where  upap.nivel =2 
       )  as upapU join uegg_pcpa_construccion upcon on upapU.id_pcpa_construccion = upcon.id  
                   join uegg_pcpa_unidad_educativa upue   on upcon.id_pcpa_unidad_educativa = upue.id        
             WHERE upue.cod_ue = ${req.params.id} and upue.estado = 'ACTIVO' order by upapU.id_actividades_promocion ASC,  upapU.nivel ASC`,
        {
          type: sequelize.QueryTypes.SELECT, plain: false, raw: true 
        })
          .then((subcentros) => res.status(200).send(subcentros))
          .catch((error) => { res.status(400).send(error); });
    },



    getById(req, res) {
        console.log(req.params.id); 
        return UeggPcpaActividadesPromocion
            .findByPk(req.params.id)
            .then((ueggPcpaActividadesPromocion) => { 
                console.log(ueggPcpaActividadesPromocion);
                if (!ueggPcpaActividadesPromocion) {
                    return res.status(404).send({
                        message: 'UeggPcpaActividadesPromocion no encontrado',
                    });
                }
                return res.status(200).send(ueggPcpaActividadesPromocion); 
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return UeggPcpaActividadesPromocion.create({
            id_pcpa_construccion: req.body.id_pcpa_construccion,
            id_pcpa_actividades_tipo: req.body.id_pcpa_actividades_tipo,
             
            nivel: req.body.nivel,
            fec_aprobacion: req.body.fec_aprobacion,
            tiempo_vigencia: req.body.tiempo_vigencia,
            declaracion_jurada: req.body.declaracion_jurada,
            
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(ueggPcpaActividadesPromocion => res.status(201).send(ueggPcpaActividadesPromocion))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggPcpaActividadesPromocion);
        return UeggPcpaActividadesPromocion.findByPk(req.params.Id, {})
          .then(ueggPcpaActividadesPromocion => {
            if (!ueggPcpaActividadesPromocion) {
              return res.status(404).send({
                message: "ueggPcpaActividadesPromocion Not Found"
              });
            }
            return ueggPcpaActividadesPromocion
              .update({
                id_pcpa_construccion: req.body.id_pcpa_construccion || ueggPcpaActividadesPromocion.id_pcpa_construccion,
                id_pcpa_actividades_tipo: req.body.id_pcpa_actividades_tipo || ueggPcpaActividadesPromocion.id_pcpa_actividades_tipo,
             
                nivel: req.body.nivel || ueggPcpaActividadesPromocion.nivel,
                fec_aprobacion: req.body.fec_aprobacion || ueggPcpaActividadesPromocion.fec_aprobacion,
                tiempo_vigencia: req.body.tiempo_vigencia || ueggPcpaActividadesPromocion.tiempo_vigencia,
                declaracion_jurada: req.body.declaracion_jurada || ueggPcpaActividadesPromocion.declaracion_jurada,

                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggPcpaActividadesPromocion)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggPcpaActividadesPromocion.findByPk(req.params.Id)
          .then(ueggPcpaActividadesPromocion => {
            if (!ueggPcpaActividadesPromocion) {
              return res.status(400).send({
                message: "ueggPcpaActividadesPromocion Not Found"
              });
            }
            return ueggPcpaActividadesPromocion
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
     
  
        return UeggPcpaActividadesPromocion.findByPk(req.params.id, {})
            .then(ueggPcpaActividadesPromocion => {
              if (!ueggPcpaActividadesPromocion) {
                return res.status(404).send({
                  message: "ueggPcpaActividadesPromocion Not Found"
                });
              }
              return ueggPcpaActividadesPromocion
                .update({
                 
                  estado: 'INACTIVO',  
                  usu_mod: 'ADMIN', //req.body.usu_mod ,
                  fec_mod:  new Date() //req.body.fec_mod
                })
                .then(() =>{  
                   console.log(' *************SI INACTIVADO OK');
                   res.status(204).send(ueggPcpaActividadesPromocion)   })
                .catch(error => {
                  console.log(' *************ERROR INACTIVADO 1', error);
                  res.status(400).send(error)  });
            })
            .catch(error => {
              console.log(' *************ERROR INACTIVADO 2',  error);
              res.status(400).send(error)  });
      },   



};