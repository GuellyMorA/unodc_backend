const UeggEmbInformeEmbarazo = require('../../models/uegg').uegg_emb_informe_embarazo ; 

module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggEmbInformeEmbarazo
            .findAll({})
            .then((ueggEmbInformeEmbarazo) => res.status(200).send(ueggEmbInformeEmbarazo)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); 
        return UeggEmbInformeEmbarazo
            .findByPk(req.params.id)
            .then((ueggEmbInformeEmbarazo) => { 
                console.log(ueggEmbInformeEmbarazo);
                if (!ueggEmbInformeEmbarazo) {
                    return res.status(404).send({
                        message: 'UeggEmbInformeEmbarazo no encontrado',
                    });
                }
                return res.status(200).send(ueggEmbInformeEmbarazo); 
            })
            .catch((error) => res.status(400).send(error));
    },

    add(req, res) {
        return UeggEmbInformeEmbarazo.create({
            id_pcpa_unidad_educativa: req.body.id_pcpa_unidad_educativa,
            id_emb_reporte_embarazo_tipo_1: req.body.id_emb_reporte_embarazo_tipo_1, 
            id_emb_reporte_embarazo_tipo_2: req.body.id_emb_reporte_embarazo_tipo_2, 
            id_emb_reporte_embarazo_tipo_3: req.body.id_emb_reporte_embarazo_tipo_3, 
    
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(ueggEmbInformeEmbarazo => res.status(201).send(ueggEmbInformeEmbarazo))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggEmbInformeEmbarazo);
        return UeggEmbInformeEmbarazo.findByPk(req.params.Id, {})
          .then(ueggEmbInformeEmbarazo => {
            if (!ueggEmbInformeEmbarazo) {
              return res.status(404).send({
                message: "ueggEmbInformeEmbarazo Not Found"
              });
            }
            return ueggEmbInformeEmbarazo
              .update({
                id_pcpa_unidad_educativa: req.body.id_pcpa_unidad_educativa || ueggEmbInformeEmbarazo.id_pcpa_unidad_educativa,
                id_emb_reporte_embarazo_tipo_1: req.body.id_emb_reporte_embarazo_tipo_1 || ueggEmbInformeEmbarazo.id_emb_reporte_embarazo_tipo_1, 
                id_emb_reporte_embarazo_tipo_2: req.body.id_emb_reporte_embarazo_tipo_2 || ueggEmbInformeEmbarazo.id_emb_reporte_embarazo_tipo_2, 
                id_emb_reporte_embarazo_tipo_3: req.body.id_emb_reporte_embarazo_tipo_3 || ueggEmbInformeEmbarazo.id_emb_reporte_embarazo_tipo_3, 

                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggEmbInformeEmbarazo)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggEmbInformeEmbarazo.findByPk(req.params.Id)
          .then(ueggEmbInformeEmbarazo => {
            if (!ueggEmbInformeEmbarazo) {
              return res.status(400).send({
                message: "ueggEmbInformeEmbarazo Not Found"
              });
            }
            return ueggEmbInformeEmbarazo
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }


};