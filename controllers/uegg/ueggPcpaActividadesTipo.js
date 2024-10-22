const UeggPcpaActividadesTipo = require('../../models/uegg').uegg_pcpa_actividades_tipo ; 

module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggPcpaActividadesTipo
            .findAll({})
            .then((ueggPcpaActividadesTipo) => res.status(200).send(ueggPcpaActividadesTipo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); 
        return UeggPcpaActividadesTipo
            .findByPk(req.params.id)
            .then((ueggPcpaActividadesTipo) => { 
                console.log(ueggPcpaActividadesTipo);
                if (!ueggPcpaActividadesTipo) {
                    return res.status(404).send({
                        message: 'UeggPcpaActividadesTipo no encontrado',
                    });
                }
                return res.status(200).send(ueggPcpaActividadesTipo); 
            })
            .catch((error) => res.status(400).send(error));
    },




    add(req, res) {
        return UeggPcpaActividadesTipo.create({
            cod_actividad: req.body.cod_actividad ,
            desc_actividad: req.body.desc_actividad ,
            check_actividad_tipo: req.body.check_actividad_tipo ,
            orden: req.body.orden || ueggPcpaActividadesTipo.orden,
          
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(ueggPcpaActividadesTipo => res.status(201).send(ueggPcpaActividadesTipo))
          .catch(error => res.status(400).send(error));
      },
    
    update(req, res) {
        console.log(UeggPcpaActividadesTipo);
        return UeggPcpaActividadesTipo.findByPk(req.params.Id, {})
          .then(ueggPcpaActividadesTipo => {
            if (!ueggPcpaActividadesTipo) {
              return res.status(404).send({
                message: "ueggPcpaActividadesTipo Not Found"
              });
            }
            return ueggPcpaActividadesTipo
              .update({
       
                cod_actividad: req.body.cod_actividad || ueggPcpaActividadesTipo.cod_actividad,
                desc_actividad: req.body.desc_actividad || ueggPcpaActividadesTipo.desc_actividad,
                check_actividad_tipo: req.body.check_actividad_tipo || ueggPcpaActividadesTipo.check_actividad_tipo,
                orden: req.body.orden || ueggPcpaActividadesTipo.orden,
              
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggPcpaActividadesTipo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
    delete(req, res) {
        return UeggPcpaActividadesTipo.findByPk(req.params.Id)
          .then(ueggPcpaActividadesTipo => {
            if (!ueggPcpaActividadesTipo) {
              return res.status(400).send({
                message: "ueggPcpaActividadesTipo Not Found"
              });
            }
            return ueggPcpaActividadesTipo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    






};