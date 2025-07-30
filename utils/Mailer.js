//import SesionLog from '@/services/SesionLog';

//require('dotenv').config();
const nodemailer = require('nodemailer');
const logger = require('./../config/logger');

const env = process.env.NODE_ENV || 'development';

const config = require(__dirname + '/../config/config.json')[env];
//const dotenv='';
let transporter ='';

// para guelly
let transporter11111 ='';


const sendMail= async (mailOptions)=> {
  await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          logger.error('>>> Error en la verificación de disponibilidad del servifor de correo: '+ error + ' PARAMS: '+ JSON.stringify(mailOptions));

          console.log("Error en la verificación de disponibilidad del servifor de correo. PARAMS: " + error, ' PARAMS: '+ JSON.stringify(mailOptions));
          throw new Error('Error al enviar el correo'); //res.status(500).send('Error al enviar el correo');
      }
      logger.info('>>> El servidor  envio mensajes a: '+ ' PARAMS: '+  JSON.stringify(mailOptions));
          console.log('>>> El servidor  envio mensajes a: '+ ' PARAMS: '+  JSON.stringify(mailOptions));
          return { success: true, info}; //res.status(200).send({ success: true, pin }); // Devolver el PIN aquí solo para pruebas
  });
};
//verify connection configuration
// Función para verificar el transportador
function verifyTransporter() {
  if (config.use_env_variable) {
    console.log('usar env prod');
      //const dotenv = import.meta.env;
      transporter = nodemailer.createTransport({
       host: process.env.SMTP_HOST,
       port: process.env.SMTP_PORT,
       secure: process.env.SMTP_SECURE === 'true', // true o false según tu configuración
       auth: {  // "type":"login", 
         user: process.env.SMTP_USER,
         pass: process.env.SMTP_PASS,
       },
     });
 } 
 else {
  transporter = nodemailer.createTransport({
     host: 'smtp.ethereal.email',
     port: 587,
     secure: false,
     auth: {
         user: 'wyatt.bogan@ethereal.email',
         pass: '8yD27nEAgu8N3ms4dp'
     } });

 /*

 */
 /*   transporter = nodemailer.createTransport({
     host: 'smtp.policia.bo',
     port: 25,
  //  secure: true, //false, // o true si se utiliza SSL
     auth: { // 
   //   type:"login", 
       user: 'transparencia.prueba@policia.bo',
       pass: 'N1Wc1xF4KH',
     },
   });  
   
   */
 }
  transporter.verify((error, success) => {
      if (error) {
         // Log the retrieval operation
         logger.error('>>> Error en la verificación de disponibilidad del servifor de correo: '+ error + ' PARAMS: '+ transporter);
           
          console.log("Error en la verificación de disponibilidad del servifor de correo:", error);
      } else {
          console.log("El servidor está listo para enviar mensajes: "+ success);
          logger.info('>>> El servidor está listo para enviar mensajes.'+ ' PARAMS: '+ success);

      }
  });
}
 //   implementación del método sendPinToEmail() utilizando Node.js y el servicio de correo electrónico Nodemailer:

const sendPinToEmail = async (nombre_completo, user_login,  email, pin) => {
        const htmlTemplate = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>SISTEMA DE DENUNCIAS-SOLICITUD DE PIN</title>
          </head>
          <body>
              <h3>Sr(a). ${nombre_completo}</h3>
              <p>En respuesta a su solicitud con el usuario: "<strong> ${user_login} </strong>", para acceder al <strong>SISTEMA DE DENUNCIAS</strong> - TRANSPARENCIA POLICIA BOLIVIANA, se le envia este PIN de un solo uso y que caducara en 5 minutos.</p>
            
              <p>No comparta este PIN con ninguna persona: <strong>${pin}</strong></p>
              <p>Atentamente </p>  
              <p></p>  
              <p></p>  
              <p></p>  
              <p>TRANSPARENCIA INSTITUCIONAL - POLICIA BOLIVIANA</p>  
              <p></p>  
              <p></p>  
              <img src="cid:uniqueImageCID" alt="Embedded Image" />
          </body>
          </html>`;

        const mailOptions = {
          from: process.env.SMTP_USER,
          to: email,
         subject: `SISTEMA DE DENUNCIAS-POLICIA BOLIVIANA. Envio de PIN al funcionario : ${nombre_completo}.  `,
          //text: `Su PIN de identificación es: ${pin}`,
          html: htmlTemplate,
          attachments: [
            {
                filename: 'logo-pol-nal.png', // Cambia esto al nombre de tu imagen
                path: 'assets/logos/logo-pol-nal.png', // Cambia a la ruta de tu imagen
                cid: 'uniqueImageCID' // El mismo CID que se utiliza en el HTML
            }
        ]
        };

  try {
    verifyTransporter();
    const resp =  sendMail(mailOptions);
    console.log(`Correo electrónico enviado correctamente a ${email}. Info: ${resp}`);
     // sesionLogCreate(user_login);// // Endpoint para enviar el PIN

    return true;  

  } 
  catch (error) {
    console.error(`Error al enviar correo electrónico a ${mailOptions}:`, error);
    // Podrías lanzar el error si necesitas manejarlo en otro lugar
    return mailOptions;  // throw new Error('Error al enviar el correo electrónico:' + mailOptions);
  }
};


  //export default sendPinToEmail;
  module.exports = sendPinToEmail;
