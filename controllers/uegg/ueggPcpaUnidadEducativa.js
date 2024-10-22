const ueggPcpaUnidadEducativa = require('../../models/uegg').uegg_pcpa_unidad_educativa ; 

module.exports = {
    list(req, res) {
        return ueggPcpaUnidadEducativa
            .findAll({})
            .then((ueggPcpaUnidadEducativa) => res.status(200).send(ueggPcpaUnidadEducativa)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return ueggPcpaUnidadEducativa
            .findByPk(req.params.id)
            .then((ueggPcpaUnidadEducativa) => { 
                console.log(ueggPcpaUnidadEducativa);
                if (!ueggPcpaUnidadEducativa) {
                    return res.status(404).send({
                        message: 'ueggPcpaUnidadEducativa no encontrado',
                    });
                }
                return res.status(200).send(ueggPcpaUnidadEducativa);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return ueggPcpaUnidadEducativa.create({
          cod_ue: req.body.cod_ue,
          desc_ue: req.body.desc_ue, 
          cod_sie: req.body.cod_sie,
          cod_rda_director: req.body.cod_rda_director,
          cod_director: req.body.cod_director,
          nombres_director: req.body.nombres_director,
          apellidos_director: req.body.apellidos_director,
     
          cod_departamento: req.body.cod_departamento,
          desc_departamento: req.body.desc_departamento,
          cod_municipio: req.body.cod_municipio,
          desc_municipio: req.body.desc_municipio,
          cod_nivel: req.body.cod_nivel,
          desc_nivel: req.body.desc_nivel,
          modalidad: req.body.modalidad,
     
          estado: 'ACTIVO' ,
          usu_cre: req.body.usu_cre ,
          fec_cre: req.body.fec_cre 
          
        })
          .then(ueggPcpaUnidadEducativa => res.status(201).send(ueggPcpaUnidadEducativa))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(ueggPcpaUnidadEducativa);
        return ueggPcpaUnidadEducativa.findByPk(req.params.Id, {})
          .then(ueggPcpaUnidadEducativa => {
            if (!ueggPcpaUnidadEducativa) {
              return res.status(404).send({
                message: "ueggPcpaUnidadEducativa Not Found"
              });
            }
            return ueggPcpaUnidadEducativa
              .update({
                cod_ue: req.body.cod_ue || ueggPcpaUnidadEducativa.cod_ue,
                desc_ue: req.body.desc_ue || ueggPcpaUnidadEducativa.desc_ue, 
                cod_sie: req.body.cod_sie || ueggPcpaUnidadEducativa.cod_sie,
                cod_rda_director: req.body.cod_rda_director || ueggPcpaUnidadEducativa.cod_rda_director,
                cod_director: req.body.cod_director || ueggPcpaUnidadEducativa.cod_director,
                nombres_director: req.body.nombres_director || ueggPcpaUnidadEducativa.nombres_director,
                apellidos_director: req.body.apellidos_director || ueggPcpaUnidadEducativa.apellidos_director,
          
                cod_departamento: req.body.cod_departamento || ueggPcpaUnidadEducativa.cod_departamento,
                desc_departamento: req.body.desc_departamento || ueggPcpaUnidadEducativa.desc_departamento,
                cod_municipio: req.body.cod_municipio || ueggPcpaUnidadEducativa.cod_municipio,
                desc_municipio: req.body.desc_municipio || ueggPcpaUnidadEducativa.desc_municipio,
                cod_nivel: req.body.cod_nivel || ueggPcpaUnidadEducativa.cod_nivel,
                desc_nivel: req.body.desc_nivel || ueggPcpaUnidadEducativa.desc_nivel,
                modalidad: req.body.modalidad || ueggPcpaUnidadEducativa.modalidad,
                latitud: req.body.latitud || ueggPcpaUnidadEducativa.latitud,
                longitud: req.body.longitud || ueggPcpaUnidadEducativa.longitud,
                
                estado: 'MODIFICADO',  
                usu_mod: 'ADMIN', //req.body.usu_mod ,
                fec_mod:  new Date() //req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggPcpaUnidadEducativa)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return ueggPcpaUnidadEducativa.findByPk(req.params.Id)
          .then(ueggPcpaUnidadEducativa => {
            if (!ueggPcpaUnidadEducativa) {
              return res.status(400).send({
                message: "ueggPcpaUnidadEducativa Not Found"
              });
            }
            return ueggPcpaUnidadEducativa
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
    



};