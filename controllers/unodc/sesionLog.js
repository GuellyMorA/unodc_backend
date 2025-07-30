const logger = require('../../config/logger');
const SesionLog = require('../../models/unodc').sesion_log ; 
const sequelize = SesionLog.sequelize;
//const sendPinToEmail = require('../../utils/Mailer').sendPinToEmail;;
const sendPinToEmail = require('../../utils/Mailer');
const logError = async (req,message, stack, query, parameters, operation) => {

// para guelly
let transporter11111 ='';

  try {
    body= req ? req.body : '';
    const id= req ? req.body.id : '';
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      await EventLog.create({
        operacion_realizada: operation  + '- query:'+ query  + '- parameters: '+ parameters,
        observacion: 'user_login: '+  body.user_login + '-message: '+   message  + '-stack: '+   stack,
        fec_registro:  date+' '+time,
        sesion_log_id: 0,
        usu_cre:  body.user_login

      });
  } catch (error) {
      logger.error('Error al guardar error log', { message: error.message });
  }
};


module.exports = {
    list(req, res) {
      return SesionLog
            .findAll({})
            .then(( sesionLog ) => res.status(200).send(sesionLog )) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
       return SesionLog
            .findByPk(req.params.id)
            .then( sesionLog => { 
                console.log( sesionLog);
                if (! sesionLog) { 
        return res.status(404).send({
                        message: 'SesionLog no encontrado', 
                    });
                }
                 return res.status(200).send(sesionLog);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
     
      console.log(': req.body: ', req.body.nombre, req.body.user_login_sigla , req.body.email,req.body.pin );
      const mailOptions =  sendPinToEmail (req.body.nombre, req.body.user_login_sigla,  req.body.email,req.body.pin);
      if(mailOptions ){       
           console.log(`Correo electrónico enviado correctamente a ${req.body.email}`);
                
      }
      else{  
            console.error(`Error al enviar correo electrónico a ${mailOptions}`);
            res.status(400).send(`Error al enviar correo electrónico a  ${req.body.email}, ${mailOptions}`)
           
      }
        return SesionLog.create({

             user_login_sigla: req.body.user_login_sigla,
             pin: req.body.pin,
             pin_estado: req.body.pin_estado,
             pin_hora_expiracion: req.body.pin_hora_expiracion,
             fec_sesion: req.body.fec_sesion,
             nombre_device: req.body.nombre_device,
             estado: req.body.estado,
             transaccion: req.body.transaccion,
             usu_cre: req.body.usu_cre,
             fec_cre: req.body.fec_cre,
             usu_mod: req.body.usu_mod,
             fec_mod: req.body.fec_mod,
             host_creacion: req.body.host_creacion,
             host_modificacion: req.body.host_modificacion,


        })
         .then(( sesionLog ) => res.status(201).send(sesionLog )) 
         .catch(error => {
          logger.error('>>> POST - Error Creando usuarios : '  +' QRY: INSERT INTO usuarios ..PARAMS: '  + JSON.stringify(  error.message )+ '>>> Stack : ' +error.stack  + '>>>  Body: ' + JSON.stringify(req.body) );
          logError(req,'>>> POST - Error Creando usuarios', error.stack, ' QRY: INSERT INTO usuarios...', JSON.stringify(req.body), 'POST');
       
              console.log(' *************ERROR create 1', error);
              res.status(400).send(error)  });
      },


 update(req, res) {
  console.log(': req.params.id: ', req.params.id);
                 return SesionLog.findByPk(req.params.id, {})
            .then( sesionLog => { 
                if (! sesionLog) { 
       return res.status(404).send({
                        message: 'SesionLog no encontrado', 
              });
            }
   return sesionLog
   .update({

        user_login_sigla: req.body.user_login_sigla || sesionLog.user_login_sigla,
        pin: req.body.pin || sesionLog.pin,
        pin_estado: req.body.pin_estado || sesionLog.pin_estado,
        pin_hora_expiracion: req.body.pin_hora_expiracion || sesionLog.pin_hora_expiracion,
        fec_sesion: req.body.fec_sesion || sesionLog.fec_sesion,
        nombre_device: req.body.nombre_device || sesionLog.nombre_device,
        estado: req.body.estado || sesionLog.estado,
        transaccion: req.body.transaccion || sesionLog.transaccion,
        usu_cre: req.body.usu_cre || sesionLog.usu_cre,
        fec_cre: req.body.fec_cre || sesionLog.fec_cre,
        usu_mod: req.body.usu_mod || sesionLog.usu_mod,
        fec_mod: req.body.fec_mod || sesionLog.fec_mod,
        host_creacion: req.body.host_creacion || sesionLog.host_creacion,
        host_modificacion: req.body.host_modificacion || sesionLog.host_modificacion,


 })
 .then(() =>{  
     console.log(' *************SI UPDATE OK');
                 return res.status(200).send(sesionLog)   })
.catch(error => {
         console.log(' *************ERROR UPDATE 1', error);
         res.status(400).send(error)  });
   })
 .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
 delete(req, res) {
                 return SesionLog.findByPk(req.params.id)
            .then( sesionLog => { 
                if (! sesionLog) { 
       return res.status(404).send({
                        message: 'SesionLog no encontrado', 
              });
            }
      return sesionLog
      .destroy()
      .then(() =>{
        console.log(' ************SI DELETE OK');
          res.status(204).send() }  )
       .catch(error => res.status(400).send(error));
      })
     .catch(error => res.status(400).send(error));
  }

};




