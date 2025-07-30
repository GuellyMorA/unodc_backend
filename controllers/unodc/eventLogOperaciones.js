
const EventLogOperaciones = require('../../models/unodc').event_log_operaciones ; 
const sequelize = EventLogOperaciones.sequelize;




module.exports = {





      
    list(req, res) {
return EventLogOperaciones
            .findAll({})
            .then(( eventLogOperaciones ) => res.status(200).send(eventLogOperaciones )) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
return EventLogOperaciones
            .findByPk(req.params.id)
            .then( eventLogOperaciones => { 
                console.log( eventLogOperaciones);
                if (! eventLogOperaciones) { 
        return res.status(404).send({
                        message: 'EventLogOperaciones no encontrado', 
                    });
                }
                 return res.status(200).send(eventLogOperaciones);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return EventLogOperaciones.create({

             sesion_log_id: req.body.sesion_log_id,
             fec_registro: req.body.fec_registro,
             operacion_realizada: req.body.operacion_realizada,
             observacion: req.body.observacion,
             estado: req.body.estado,
             transaccion: req.body.transaccion,
             usu_cre: req.body.usu_cre,
             fec_cre: req.body.fec_cre,
             usu_mod: req.body.usu_mod,
             fec_mod: req.body.fec_mod,
             host_creacion: req.body.host_creacion,
             host_modificacion: req.body.host_modificacion,



        })
            .then(( eventLogOperaciones ) => res.status(201).send(eventLogOperaciones )) 
   .catch(error => res.status(400).send(error));
      },
    
 update(req, res) {
        console.log( EventLogOperaciones);
                 return EventLogOperaciones.findByPk(req.params.id, {})
            .then( eventLogOperaciones => { 
                if (! eventLogOperaciones) { 
       return res.status(404).send({
                        message: 'EventLogOperaciones no encontrado', 
              });
            }
return eventLogOperaciones
   .update({

        sesion_log_id: req.body.sesion_log_id || event_log_operaciones.sesion_log_id,
        fec_registro: req.body.fec_registro || event_log_operaciones.fec_registro,
        operacion_realizada: req.body.operacion_realizada || event_log_operaciones.operacion_realizada,
        observacion: req.body.observacion || event_log_operaciones.observacion,
        estado: req.body.estado || event_log_operaciones.estado,
        transaccion: req.body.transaccion || event_log_operaciones.transaccion,
        usu_cre: req.body.usu_cre || event_log_operaciones.usu_cre,
        fec_cre: req.body.fec_cre || event_log_operaciones.fec_cre,
        usu_mod: req.body.usu_mod || event_log_operaciones.usu_mod,
        fec_mod: req.body.fec_mod || event_log_operaciones.fec_mod,
        host_creacion: req.body.host_creacion || event_log_operaciones.host_creacion,
        host_modificacion: req.body.host_modificacion || event_log_operaciones.host_modificacion,

















 })
 .then(() =>{  
     console.log(' *************SI UPDATE OK');
                 return res.status(200).send(eventLogOperaciones)   })
.catch(error => {
         console.log(' *************ERROR UPDATE 1', error);
         res.status(400).send(error)  });
   })
 .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
                 return EventLogOperaciones.findByPk(req.params.id)
            .then( eventLogOperaciones => { 
                if (! eventLogOperaciones) { 
       return res.status(404).send({
                        message: 'EventLogOperaciones no encontrado', 
              });
            }
      return eventLogOperaciones
      .destroy()
      .then(() =>{
        console.log(' ************SI DELETE OK');
          res.status(204).send() }  )
       .catch(error => res.status(400).send(error));
      })
     .catch(error => res.status(400).send(error));
  }

};




