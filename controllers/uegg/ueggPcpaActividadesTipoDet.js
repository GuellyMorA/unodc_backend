const UeggPcpaActividadesTipoDet = require('../../models/uegg').uegg_pcpa_actividades_tipo_det ; 

module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggPcpaActividadesTipoDet
            .findAll({})
            .then((ueggPcpaActividadesTipoDet) => res.status(200).send(ueggPcpaActividadesTipoDet)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); 
        return UeggPcpaActividadesTipoDet
            .findByPk(req.params.id)
            .then((ueggPcpaActividadesTipoDet) => { 
                console.log(ueggPcpaActividadesTipoDet);
                if (!ueggPcpaActividadesTipoDet) {
                    return res.status(404).send({
                        message: 'UeggPcpaActividadesTipoDet no encontrado',
                    });
                }
                return res.status(200).send(ueggPcpaActividadesTipoDet); 
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return UeggPcpaActividadesTipoDet.create({
            id_pcpa_actividades_tipo: req.body.id_pcpa_actividades_tipo,
            cod_actividad: req.body.cod_actividad,
            desc_actividad: req.body.desc_actividad,
            check_actividad_tipo_det: req.body.check_actividad_tipo_det,
            orden: req.body.orden, 
                      
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(ueggPcpaActividadesTipoDet => res.status(201).send(ueggPcpaActividadesTipoDet))
          .catch(error => res.status(400).send(error));
      },
    
    update(req, res) {
        console.log(UeggPcpaActividadesTipoDet);
        return UeggPcpaActividadesTipoDet.findByPk(req.params.Id, {})
          .then(ueggPcpaActividadesTipoDet => {
            if (!ueggPcpaActividadesTipoDet) {
              return res.status(404).send({
                message: "ueggPcpaActividadesTipoDet Not Found"
              });
            }
            return ueggPcpaActividadesTipoDet
              .update({
                id_pcpa_actividades_tipo: req.body.id_pcpa_actividades_tipo || ueggPcpaActividadesTipoDet.id_pcpa_actividades_tipo,
                cod_actividad: req.body.cod_actividad || ueggPcpaActividadesTipoDet.cod_actividad,
                desc_actividad: req.body.desc_actividad || ueggPcpaActividadesTipoDet.desc_actividad,
                check_actividad_tipo_det: req.body.check_actividad_tipo_det || ueggPcpaActividadesTipoDet.check_actividad_tipo_det,
                orden: req.body.orden || ueggPcpaActividadesTipoDet.orden, 
                
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggPcpaActividadesTipoDet)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggPcpaActividadesTipoDet.findByPk(req.params.Id)
          .then(ueggPcpaActividadesTipoDet => {
            if (!ueggPcpaActividadesTipoDet) {
              return res.status(400).send({
                message: "ueggPcpaActividadesTipoDet Not Found"
              });
            }
            return ueggPcpaActividadesTipoDet
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }




};