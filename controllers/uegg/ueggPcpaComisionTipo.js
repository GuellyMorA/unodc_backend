const UeggPcpaComisionTipo = require('../../models/uegg').uegg_pcpa_comision_tipo ; 

module.exports = {
  list(req, res) {
      return UeggPcpaComisionTipo
          .findAll({})
          .then((ueggPcpaComisionTipo) => res.status(200).send(ueggPcpaComisionTipo)) 
          .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
      console.log(req.params.id);
      return UeggPcpaComisionTipo
          .findByPk(req.params.id)
          .then((ueggPcpaComisionTipo) => { 
              console.log(ueggPcpaComisionTipo);
              if (!ueggPcpaComisionTipo) {
                  return res.status(404).send({
                      message: 'UeggPcpaComisionTipo no encontrado',
                  });
              }
              return res.status(200).send(ueggPcpaComisionTipo);
          })
          .catch((error) => res.status(400).send(error));
  },

  
  add(req, res) {
    return UeggPcpaComisionTipo.create({
        cod_comision_tipo: req.body.cod_comision_tipo   ,
        desc_comision_tipo: req.body.desc_comision_tipo   ,    
     
        estado: 'ACTIVO' ,
        usu_cre: req.body.usu_cre ,
        fec_cre: req.body.fec_cre 
      
    })
      .then(ueggPcpaComisionTipo => res.status(201).send(ueggPcpaComisionTipo))
      .catch(error => res.status(400).send(error));
  },

update(req, res) {
    console.log(UeggPcpaComisionTipo);
    return UeggPcpaComisionTipo.findByPk(req.params.Id, {})
      .then(ueggPcpaComisionTipo => {
        if (!ueggPcpaComisionTipo) {
          return res.status(404).send({
            message: "ueggPcpaComisionTipo Not Found"
          });
        }
        return ueggPcpaComisionTipo
          .update({
            cod_comision_tipo: req.body.cod_comision_tipo ||  ueggPcpaComisionTipo.cod_comision_tipo  ,
            desc_comision_tipo: req.body.desc_comision_tipo  ||  ueggPcpaComisionTipo.desc_comision_tipo  ,
  
            estado: 'MODIFICADO',  
            usu_mod: req.body.usu_mod ,
            fec_mod: req.body.fec_mod
          })
          .then(() =>{  
             console.log(' *************SI UPDATE OK');
             res.status(200).send(ueggPcpaComisionTipo)   })
          .catch(error => {
            console.log(' *************ERROR UPDATE 1', error);
            res.status(400).send(error)  });
      })
      .catch(error => {
        console.log(' *************ERROR UPDATE 2',  error);
        res.status(400).send(error)  });
  },

delete(req, res) {
    return UeggPcpaComisionTipo.findByPk(req.params.Id)
      .then(ueggPcpaComisionTipo => {
        if (!ueggPcpaComisionTipo) {
          return res.status(400).send({
            message: "ueggPcpaComisionTipo Not Found"
          });
        }
        return ueggPcpaComisionTipo
          .destroy()
          .then(() =>{
            console.log(' ************SI DELETE OK');
             res.status(204).send() }  )
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }


};