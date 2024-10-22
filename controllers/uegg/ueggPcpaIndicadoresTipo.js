const UeggPcpaIndicadoresTipo = require('../../models/uegg').uegg_pcpa_indicadores_tipo ; 

module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggPcpaIndicadoresTipo
            .findAll({})
            .then((ueggPcpaIndicadoresTipo) => res.status(200).send(ueggPcpaIndicadoresTipo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); 
        return UeggPcpaIndicadoresTipo
            .findByPk(req.params.id)
            .then((ueggPcpaIndicadoresTipo) => { 
                console.log(ueggPcpaIndicadoresTipo);
                if (!ueggPcpaIndicadoresTipo) {
                    return res.status(404).send({
                        message: 'UeggPcpaIndicadoresTipo no encontrado',
                    });
                }
                return res.status(200).send(ueggPcpaIndicadoresTipo); 
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return UeggPcpaIndicadoresTipo.create({
            cod_comision_tipo: req.body.cod_comision_tipo   ,
            desc_comision_tipo: req.body.desc_comision_tipo   ,    
            orden: req.body.desc_comision_tipo  ,
            
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(ueggPcpaIndicadoresTipo => res.status(201).send(ueggPcpaIndicadoresTipo))
          .catch(error => res.status(400).send(error));
      },
    
    update(req, res) {
        console.log(UeggPcpaIndicadoresTipo);
        return UeggPcpaIndicadoresTipo.findByPk(req.params.Id, {})
          .then(ueggPcpaIndicadoresTipo => {
            if (!ueggPcpaIndicadoresTipo) {
              return res.status(404).send({
                message: "ueggPcpaIndicadoresTipo Not Found"
              });
            }
            return ueggPcpaIndicadoresTipo
              .update({
                cod_comision_tipo: req.body.cod_comision_tipo ||  ueggPcpaIndicadoresTipo.cod_comision_tipo  ,
                desc_comision_tipo: req.body.desc_comision_tipo  ||  ueggPcpaIndicadoresTipo.desc_comision_tipo  ,
                orden: req.body.desc_comision_tipo  ||  orden.desc_comision_tipo  ,
      
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggPcpaIndicadoresTipo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
    delete(req, res) {
        return UeggPcpaIndicadoresTipo.findByPk(req.params.Id)
          .then(ueggPcpaIndicadoresTipo => {
            if (!ueggPcpaIndicadoresTipo) {
              return res.status(400).send({
                message: "ueggPcpaIndicadoresTipo Not Found"
              });
            }
            return ueggPcpaIndicadoresTipo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    
};