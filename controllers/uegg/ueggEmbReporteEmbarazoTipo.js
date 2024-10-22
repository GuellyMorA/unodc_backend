const UeggEmbReporteEmbarazo = require('../../models/uegg').uegg_emb_reporte_embarazo_tipo ; 

module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggEmbReporteEmbarazo
            .findAll({})
            .then((ueggEmbReporteEmbarazo) => res.status(200).send(ueggEmbReporteEmbarazo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); 
        return UeggEmbReporteEmbarazo
            .findByPk(req.params.id)
            .then((ueggEmbReporteEmbarazo) => { 
                console.log(ueggEmbReporteEmbarazo);
                if (!ueggEmbReporteEmbarazo) {
                    return res.status(404).send({
                        message: 'UeggEmbReporteEmbarazo no encontrado',
                    });
                }
                return res.status(200).send(ueggEmbReporteEmbarazo); 
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
      return UeggEmbReporteEmbarazo.create({
          cod_reporte: req.body.cod_reporte,
          desc_reporte: req.body.desc_reporte,
          orden: req.body.orden, 

          estado: 'ACTIVO' ,
          usu_cre: req.body.usu_cre ,
          fec_cre: req.body.fec_cre 
        
      })
        .then(ueggEmbReporteEmbarazo => res.status(201).send(ueggEmbReporteEmbarazo))
        .catch(error => res.status(400).send(error));
    },
  
    update(req, res) {
      console.log(UeggEmbReporteEmbarazo);
      return UeggEmbReporteEmbarazo.findByPk(req.params.Id, {})
        .then(ueggEmbReporteEmbarazo => {
          if (!ueggEmbReporteEmbarazo) {
            return res.status(404).send({
              message: "ueggEmbReporteEmbarazo Not Found"
            });
          }
          return ueggEmbReporteEmbarazo
            .update({
              cod_reporte: req.body.cod_reporte || ueggEmbReporteEmbarazo.cod_reporte,
              desc_reporte: req.body.desc_reporte || ueggEmbReporteEmbarazo.desc_reporte,
              orden: req.body.orden || ueggEmbReporteEmbarazo.orden, 

              estado: 'MODIFICADO',  
              usu_mod: req.body.usu_mod ,
              fec_mod: req.body.fec_mod
            })
            .then(() =>{  
               console.log(' *************SI UPDATE OK');
               res.status(200).send(ueggEmbReporteEmbarazo)   })
            .catch(error => {
              console.log(' *************ERROR UPDATE 1', error);
              res.status(400).send(error)  });
        })
        .catch(error => {
          console.log(' *************ERROR UPDATE 2',  error);
          res.status(400).send(error)  });
    },
  
    delete(req, res) {
      return UeggEmbReporteEmbarazo.findByPk(req.params.Id)
        .then(ueggEmbReporteEmbarazo => {
          if (!ueggEmbReporteEmbarazo) {
            return res.status(400).send({
              message: "ueggEmbReporteEmbarazo Not Found"
            });
          }
          return ueggEmbReporteEmbarazo
            .destroy()
            .then(() =>{
              console.log(' ************SI DELETE OK');
               res.status(204).send() }  )
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }




};