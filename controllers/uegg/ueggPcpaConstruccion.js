const UeggPcpaConstruccion = require('../../models/uegg').uegg_pcpa_construccion ; 
const sequelize = UeggPcpaConstruccion.sequelize;

module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggPcpaConstruccion
            .findAll({})
            .then((ueggPcpaConstruccion) => res.status(200).send(ueggPcpaConstruccion)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); 
        return UeggPcpaConstruccion
            .findByPk(req.params.id)
            .then((ueggPcpaConstruccion) => { 
                console.log(ueggPcpaConstruccion);
                if (!ueggPcpaConstruccion) {
                    return res.status(404).send({
                        message: 'UeggPcpaConstruccion no encontrado',
                    });
                }
                return res.status(200).send(ueggPcpaConstruccion); 
            })
            .catch((error) => res.status(400).send(error));
    },

    
    add(req, res) {
        return UeggPcpaConstruccion.create({
            id_pcpa_unidad_educativa: req.body.id_pcpa_unidad_educativa ,
            fecha_registro: new Date(req.body.fecha_registro )  , //  new Date().toISOString()     new Date( req.body.fecha_registro  ).toString() ,
            check_diagnostico_pcpa: req.body.check_diagnostico_pcpa ,
            fecha_aprobacion:   new Date(req.body.fecha_aprobacion ), //new Date( req.body.fecha_aprobacion).toString() , // new Date(   dateToString (req.body.fecha_aprobacion,'tz',''))  , //   new Date(  req.body.fecha_aprobacion.toLocaleDateString() )
            vigencia_aprobacion:  req.body.vigencia_aprobacion   ,
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,//   new Date('2013-03-10T02:00:00Z').toString()
            fec_cre: req.body.fec_cre  //  new Date().toISOString() 
          
        })
          .then(ueggPcpaConstruccion => res.status(201).send(ueggPcpaConstruccion))
          .catch(error => {
            console.log("error", error);
            res.status(400).send(error)});
      },


    update(req, res) {
        console.log(UeggPcpaConstruccion);
        return UeggPcpaConstruccion.findByPk(req.params.Id, {})
          .then(ueggPcpaConstruccion => {
            if (!ueggPcpaConstruccion) {
              return res.status(404).send({
                message: "ueggPcpaConstruccion Not Found"
              });
            }
        return ueggPcpaConstruccion
              .update({
                id_pcpa_unidad_educativa: req.body.id_pcpa_unidad_educativa ||  ueggPcpaConstruccion.id_pcpa_unidad_educativa  ,
                fecha_registro: req.body.fecha_registro  ||  ueggPcpaConstruccion.fecha_registro  ,
                check_diagnostico_pcpa: req.body.check_diagnostico_pcpa  ||  ueggPcpaConstruccion.check_diagnostico_pcpa  ,
                fecha_aprobacion: req.body.fecha_aprobacion  ||  ueggPcpaConstruccion.fecha_aprobacion  ,
                estado: 'MODIFICADO',  
                usu_mod: 'ADMIN', //req.body.usu_mod ,
                fec_mod:  new Date() //req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(ueggPcpaConstruccion)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
  deleteLogico(req, res) { // en el front se llama    deleteMiembroComision
      console.log('id: req.params.id: ',req.params.id );
    sequelize.query(`UPDATE uegg_pcpa_construccion  set estado ='INACTIVO' , usu_mod ='ADMIN' WHERE  id = ${req.params.id} `, {
          type: sequelize.QueryTypes.SELECT, plain: true, raw: true  //, fec_mod= ${new Date("YYYY-MM-DD")}  
    })
    .then((subcentros) => {


      sequelize.query('select upcon.id_pcpa_unidad_educativa as id from   uegg_pcpa_construccion upcon  where  id = :id', {
                      replacements: { id: req.params.id },
                      type: sequelize.QueryTypes.SELECT
       })
        .then((id) => {
         // query ='  UPDATE uegg_pcpa_unidad_educativa  set estado ="INACTIVO" where  id  ='+  pcpa_unidad_educativa.id ;
            const id_pcpa_unidad_educativa = id[0].id; // new Number(id[0].id);
              return  sequelize.query("UPDATE uegg_pcpa_unidad_educativa  set estado ='INACTIVO' , usu_mod ='ADMIN', fec_mod= :fec  WHERE  id  = :id", {
              replacements: { id: id_pcpa_unidad_educativa  ,  fec: new Date()},  //  
              type: sequelize.QueryTypes.SELECT
            }).then(()=>{
                console.log(' *************SI UPDATE OK');
                res.status(204).send({
                  message: "ueggPcpaConstruccion INACTIVADO: " + id_pcpa_unidad_educativa
                });
              } )
            })
            .catch(error => {
                    console.log(' *************ERROR INACTIVADO 1', error);
                    res.status(400).send(error) ; 
            })
      }).catch(error => { 
             res.status(400).send(error); 
        }  )
      

  },

    delete(req, res) {
        return UeggPcpaConstruccion.findByPk(req.params.Id)
          .then(ueggPcpaConstruccion => {
            if (!ueggPcpaConstruccion) {
              return res.status(400).send({
                message: "ueggPcpaConstruccion Not Found"
              });
            }
            return ueggPcpaConstruccion
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      },

    async getByUnidadEducativa(req, res) {
      console.log('req', req.params);
      return sequelize.query(`select upcon.id,  upue.cod_sie,upue.desc_ue, upue.desc_municipio , 
      upue.desc_municipio  , upue.desc_nivel , upue.modalidad  , upue.nombres_director ||'-'|| upue.apellidos_director as nombres_director
        from uegg_pcpa_construccion upcon 
          join uegg_pcpa_unidad_educativa upue   on upcon.id_pcpa_unidad_educativa = upue.id    
        WHERE upue.cod_ue = ${req.params.id} `, {
          type: sequelize.QueryTypes.SELECT, plain: true, raw: true 
        })
          .then((subcentros) => res.status(200).send(subcentros))
          .catch((error) => { res.status(400).send(error); });
    },
    

};