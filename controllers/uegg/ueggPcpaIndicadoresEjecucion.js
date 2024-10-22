const UeggPcpaIndicadoresEjecucion = require('../../models/uegg').uegg_pcpa_indicadores_ejecucion ; 

module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggPcpaIndicadoresEjecucion
            .findAll({})
            .then((ueggPcpaIndicadoresEjecucion) => res.status(200).send(ueggPcpaIndicadoresEjecucion)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); 
        return UeggPcpaIndicadoresEjecucion
            .findByPk(req.params.id)
            .then((ueggPcpaIndicadoresEjecucion) => { 
                console.log(ueggPcpaIndicadoresEjecucion);
                if (!ueggPcpaIndicadoresEjecucion) {
                    return res.status(404).send({
                        message: 'UeggPcpaIndicadoresEjecucion no encontrado',
                    });
                }
                return res.status(200).send(ueggPcpaIndicadoresEjecucion); 
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return UeggPcpaIndicadoresEjecucion.create({
              id_pcpa_indicadores_tipo: req.body.id_pcpa_indicadores_tipo,
              id_pcpa_construccion: req.body.id_pcpa_construccion,
            cod_indicadores: req.body.cod_indicadores,  
              desc_indicadores: req.body.desc_indicadores, 
              fec_ejecucion: req.body.fec_ejecucion,
           
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(ueggPcpaIndicadoresEjecucion => res.status(201).send(ueggPcpaIndicadoresEjecucion))
          .catch(error => res.status(400).send(error));
      },
    
    update(req, res) {
        console.log(UeggPcpaIndicadoresEjecucion);
        return UeggPcpaIndicadoresEjecucion.findByPk(req.params.Id, {})
          .then(ueggPcpaIndicadoresEjecucion => {
            if (!ueggPcpaIndicadoresEjecucion) {
              return res.status(404).send({
                message: "ueggPcpaIndicadoresEjecucion Not Found"
              });
            }
            return ueggPcpaIndicadoresEjecucion
              .update({
                id_pcpa_indicadores_tipo: req.body.id_pcpa_indicadores_tipo || ueggPcpaIndicadoresEjecucion.id_pcpa_indicadores_tipo,
                id_pcpa_construccion: req.body.id_pcpa_construccion  || ueggPcpaIndicadoresEjecucion.id_pcpa_construccion,
                cod_indicadores: req.body.cod_indicadores || ueggPcpaIndicadoresEjecucion.cod_indicadores,  
                desc_indicadores: req.body.desc_indicadores || ueggPcpaIndicadoresEjecucion.desc_indicadores, 
                fec_ejecucion: req.body.fec_ejecucion || ueggPcpaIndicadoresEjecucion.fec_ejecucion,
                
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggPcpaIndicadoresEjecucion)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggPcpaIndicadoresEjecucion.findByPk(req.params.Id)
          .then(ueggPcpaIndicadoresEjecucion => {
            if (!ueggPcpaIndicadoresEjecucion) {
              return res.status(400).send({
                message: "ueggPcpaIndicadoresEjecucion Not Found"
              });
            }
            return ueggPcpaIndicadoresEjecucion
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }




};