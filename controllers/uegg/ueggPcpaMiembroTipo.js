const UeggPcpaMiembroTipo = require('../../models/uegg').uegg_pcpa_miembro_tipo ; 

module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggPcpaMiembroTipo
            .findAll({})
            .then((ueggPcpaMiembroTipo) => res.status(200).send(ueggPcpaMiembroTipo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); 
        return UeggPcpaMiembroTipo
            .findByPk(req.params.id)
            .then((ueggPcpaMiembroTipo) => { 
                console.log(ueggPcpaMiembroTipo);
                if (!ueggPcpaMiembroTipo) {
                    return res.status(404).send({
                        message: 'UeggPcpaMiembroTipo no encontrado',
                    });
                }
                return res.status(200).send(ueggPcpaMiembroTipo); 
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return UeggPcpaMiembroTipo.create({
            cod_comision_tipo: req.body.cod_comision_tipo   ,
            desc_comision_tipo: req.body.desc_comision_tipo   ,    
                    
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(ueggPcpaMiembroTipo => res.status(201).send(ueggPcpaMiembroTipo))
          .catch(error => res.status(400).send(error));
      },
    
    update(req, res) {
        console.log(UeggPcpaMiembroTipo);
        return UeggPcpaMiembroTipo.findByPk(req.params.Id, {})
          .then(ueggPcpaMiembroTipo => {
            if (!ueggPcpaMiembroTipo) {
              return res.status(404).send({
                message: "ueggPcpaMiembroTipo Not Found"
              });
            }
            return ueggPcpaMiembroTipo
              .update({
                cod_comision_tipo: req.body.cod_comision_tipo ||  ueggPcpaMiembroTipo.cod_comision_tipo  ,
                desc_comision_tipo: req.body.desc_comision_tipo  ||  ueggPcpaMiembroTipo.desc_comision_tipo  ,
                
      
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggPcpaMiembroTipo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
    delete(req, res) {
        return UeggPcpaMiembroTipo.findByPk(req.params.Id)
          .then(ueggPcpaMiembroTipo => {
            if (!ueggPcpaMiembroTipo) {
              return res.status(400).send({
                message: "ueggPcpaMiembroTipo Not Found"
              });
            }
            return ueggPcpaMiembroTipo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    
};