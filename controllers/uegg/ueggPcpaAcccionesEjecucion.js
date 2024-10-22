const UeggPcpaAccionesEjecucion = require('../../models/uegg').uegg_pcpa_accciones_ejecucion ; 

module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggPcpaAccionesEjecucion
            .findAll({})
            .then((ueggPcpaAccionesEjecucion) => res.status(200).send(ueggPcpaAccionesEjecucion)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); 
        return UeggPcpaAccionesEjecucion
            .findByPk(req.params.id)
            .then((ueggPcpaAccionesEjecucion) => { 
                console.log(ueggPcpaAccionesEjecucion);
                if (!ueggPcpaAccionesEjecucionn) {
                    return res.status(404).send({
                        message: 'UeggPcpaAccionesEjecucion no encontrado',
                    });
                }
                return res.status(200).send(ueggPcpaAccionesEjecucion); 
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return UeggPcpaAccionesEjecucion.create({
            id_pcpa_construccion: req.body.id_pcpa_construccion,
            cantidad_acciones_inicial: req.body.cantidad_acciones_inicial, 
            cantidad_acciones_final: req.body.cantidad_acciones_final, 
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(ueggPcpaAccionesEjecucion => res.status(201).send(ueggPcpaAccionesEjecucion))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggPcpaAccionesEjecucion);
        return UeggPcpaAccionesEjecucion.findByPk(req.params.Id, {})
          .then(ueggPcpaAccionesEjecucion => {
            if (!ueggPcpaAccionesEjecucion) {
              return res.status(404).send({
                message: "ueggPcpaAccionesEjecucion Not Found"
              });
            }
            return ueggPcpaAccionesEjecucion
              .update({
                id_pcpa_construccion: req.body.id_pcpa_construccion  || ueggPcpaAccionesEjecucion.id_pcpa_construccion,
                cantidad_acciones_inicial: req.body.cantidad_acciones_inicial || ueggPcpaAccionesEjecucion.cantidad_acciones_inicial,
                cantidad_acciones_final: req.body.cantidad_acciones_final || ueggPcpaAccionesEjecucion.cantidad_acciones_final,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggPcpaAccionesEjecucion)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggPcpaAccionesEjecucion.findByPk(req.params.Id)
          .then(ueggPcpaAccionesEjecucion => {
            if (!ueggPcpaAccionesEjecucion) {
              return res.status(400).send({
                message: "ueggPcpaAccionesEjecucion Not Found"
              });
            }
            return ueggPcpaAccionesEjecucion
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
     
  
        return UeggPcpaAccionesEjecucion.findByPk(req.params.id, {})
            .then(ueggPcpaAccionesEjecucion => {
              if (!ueggPcpaAccionesEjecucion) {
                return res.status(404).send({
                  message: "ueggPcpaAccionesEjecucion Not Found"
                });
              }
              return ueggPcpaAccionesEjecucion
                .update({
                 
                  estado: 'INACTIVO',  
                  usu_mod: 'ADMIN', //req.body.usu_mod ,
                  fec_mod:  new Date() //req.body.fec_mod
                })
                .then(() =>{  
                   console.log(' *************SI INACTIVADO OK');
                   res.status(204).send(ueggPcpaAccionesEjecucion)   })
                .catch(error => {
                  console.log(' *************ERROR INACTIVADO 1', error);
                  res.status(400).send(error)  });
            })
            .catch(error => {
              console.log(' *************ERROR INACTIVADO 2',  error);
              res.status(400).send(error)  });
      },   



};