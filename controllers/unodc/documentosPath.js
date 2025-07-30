
const DocumentosPath = require('../../models/unodc').documentos_path;
const sequelize = DocumentosPath.sequelize;
/*
var express = require('express');
var router = express.Router();

const path = require('path');
const multer = require('multer');
// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/evidencia_denuncias/');   // uploads/evidencia_denuncias
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const validTypes = /mp4|m4v|mp3|wav|pdf|png|docx|doc|bmp|jpeg|jpg/;
    const isValid = validTypes.test(path.extname(file.originalname).toLowerCase()) && validTypes.test(file.mimetype);

  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no válido. Solo se permiten videos, audios y PDFs.'));
  }
};

// Límite de tamaño de archivo establecido en 10 MB
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB en bytes
});
*/
const EventLog = require('../../models/unodc').event_log_operaciones; // Importar modelo de errores
const logger = require('../../config/logger');

const logOperation = async (req, message, query, parameters, operation) => {
  try {
    body = req ? req.req.body : '';
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    await EventLog.create({
      operacion_realizada: operation + '- query:' + query + '- parameters: ' + parameters,
      observacion: 'user_login: ' + body.user_login + '-message: ' + message,
      fec_registro: date + ' ' + time,
      sesion_log_id: 0,
      usu_cre:  body.user_login
    });


  } catch (error) {
    logger.error('Error al guardar log', { message: error.message });
  }
};

const logError = async (req, message, stack, query, parameters, operation) => {
  try {
    body = req ? req.body : '';
    const id = req ? req.body.id : '';
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    await EventLog.create({
      operacion_realizada: operation + '- query:' + query + '- parameters: ' + parameters,
      observacion: 'user_login: ' + body.user_login + '-message: ' + message + '-stack: ' + stack,
      fec_registro: date + ' ' + time,
      sesion_log_id: 0,
      usu_cre: body.user_login

    });
  } catch (error) {
    logger.error('Error al guardar error log', { message: error.message });
  }
};
/*
// Endpoint para subir archivos
router.post('/api/upload', upload.fields([{ name: 'files[0]', maxCount: 10 }, { name: 'files[1]', maxCount: 10 }, { name: 'files[2]', maxCount: 10 }]), (req, res) => {
  res.json({
    message: 'Archivos subidos satisfactoriamente',
    files: req.files,
  });
});

// Middleware para manejar la carga de archivos
const uploadFiles = (req, res) => { // , next
  upload.array('files')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al subir archivos', error: err });
    }
    const uploadedFiles = req.files;

    // Procesar los archivos subidos
    uploadedFiles.forEach(file => {
      // Mover el archivo a una ubicación permanente, cambiar el nombre, etc.
      console.log(`File uploaded: ${file.originalname}`);
    });
  
    res.json({ message: 'Files uploaded successfully '  });
    // Si la carga de archivos fue exitosa
   // next();
  //   res.status(200).json({
   //    message: 'Lógica inicial ejecutada. Archivos subidos satisfactoriamente.',
   //    files: req.files,
 //    });


  });

  
};

*/
module.exports = {


  //  
  listByCod(req, res) {
    console.log(': req.params.cod_denuncia: ', req.params.cod_denuncia);
    /// denunci  y denunciante
    return sequelize.query(`
    SELECT 
    ROW_NUMBER() OVER (ORDER BY seg.fec_cre ASC , seg.id ASC) AS fila, 
   dper.id ,dper.cod_denuncia  ,
   doc.orden ,doc.origen ,doc.documento_path, doc.descripcion ,doc.fec_registro, 
   doc.seguimiento_id , seg.observacion ,
   doc.usu_cre,doc.fec_cre  , doc.usu_mod  ,doc.fec_mod ,doc.estado ,  doc.transaccion
    FROM 
     documentos_path doc 
      INNER JOIN denuncia_personas dper ON doc.denuncia_personas_id =dper.id  
       LEFT  JOIN seguimiento seg ON doc.denuncia_personas_id = seg.denuncia_personas_id 
                  AND doc.seguimiento_id  = seg.id                      
   WHERE  dper.cod_denuncia =    :cod_denuncia :: text 
      
     `, {
      replacements: {
        cod_denuncia: req.params.cod_denuncia
      },
      type: sequelize.QueryTypes.SELECT,
      plain: false,
      raw: true
    })
      .then((subcentros) => res.status(200).send(subcentros))
      .catch((error) => {
        res.status(400).send(error);
      });
  },



  list(req, res) {
    return DocumentosPath
      .findAll({})
      .then((documentosPath) => res.status(200).send(documentosPath))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    console.log(req.params.id);
    return DocumentosPath
      .findByPk(req.params.id)
      .then(documentosPath => {
        console.log(documentosPath);
        if (!documentosPath) {
          return res.status(404).send({
            message: 'DocumentosPath no encontrado',
          });
        }
        return res.status(200).send(documentosPath);
      })
      .catch((error) => res.status(400).send(error));
  },


  //    Middleware uploadFiles: Este middleware utiliza Multer para manejar la carga de archivos. Si hay un error, se envía un mensaje de error; de lo contrario, se llama a next() para continuar la ejecución.
  //    Lógica de la Ruta: En la ruta /api/upload, primero se llama al método add(req, res) y, tras su ejecución exitosa (o sea, resuelto el Promise), se invoca el middleware uploadFiles.

  add(req, res) {
   // uploadFiles(req, res);   //  , next
    return DocumentosPath.create({

      denuncia_personas_id: req.body.denuncia_personas_id,
      usuarios_id: req.body.usuarios_id,
      seguimiento_id: req.body.seguimiento_id,
      denunciante_id: req.body.denunciante_id,
      orden: req.body.orden,
      origen: req.body.origen,
      documento_path: req.body.documento_path,
      descripcion: req.body.descripcion,
      justificacion_legal: req.body.justificacion_legal,
      fec_registro: req.body.fec_registro,
      estado: req.body.estado,
      transaccion: req.body.transaccion,
      usu_cre: req.body.usu_cre,
      // fec_cre: req.body.fec_cre,
      //  usu_mod: req.body.usu_mod,
      //  fec_mod: req.body.fec_mod,
      //  host_creacion: req.body.host_creacion,
      //  host_modificacion: req.body.host_modificacion,

    })
      .then((documentosPath) => {
        sequelize.beforeQuery((query, options) => {
        //  console.log('query add documentosPath : ', query);
           
        });
        // Log the retrieval operation
        logger.info('>>> POST - Creando documentosPath: ' + req.body.user_login + ' QRY: INSERT INTO documentosPath ... PARAMS: ' + JSON.stringify(documentosPath));
        logOperation(res, 'Creando documentosPath: ' + req.body.user_login, ' QRY:  INSERT INTO documentosPath ... ', JSON.stringify(documentosPath), 'POST');

        console.log(">>> POST - documentosPath:  " + JSON.stringify(documentosPath))// do your own logging        
        // this.insertLog ('',req);

        // Después de ejecutar la lógica inicial, llamamos a uploadFiles
     //   uploadFiles(req, res);   //  , next

        res.status(201).json({
          message: 'informacion de Archivos insertada satisfactoriamente.',
          user_login: req.body.user_login,
        })

      })
      .catch(error => {
        logger.error('>>> POST - Error Creando documentosPath : ' + ' QRY: INSERT INTO documentosPath ..PARAMS: ' + JSON.stringify(error.message) + '>>> Stack : ' + error.stack + '>>>  Body: ' + JSON.stringify(req.body));
        logError(req, '>>> POST - Error Creando documentosPath', error.stack, ' QRY: INSERT INTO documentosPath...', JSON.stringify(req.body), 'POST');

        console.log(' *************ERROR create 1', error);
        res.status(400).send(error)
      });

  },





  update(req, res) {
    console.log(': req.params.id: ', req.params.id);
    return DocumentosPath.findByPk(req.params.id, {})
      .then(documentosPath => {
        if (!documentosPath) {
          return res.status(404).send({
            message: 'DocumentosPath no encontrado',
          });
        }
        return documentosPath
          .update({

            denuncia_personas_id: req.body.id || documentosPath.denuncia_personas_id,
            usuarios_id: req.body.usuarios_id || documentosPath.usuarios_id,
            actividades_id: req.body.actividades_id || documentosPath.actividades_id,
            denunciante_id: req.body.denunciante_id || documentosPath.denunciante_id,
            orden: req.body.orden || documentosPath.orden,
            origen: req.body.origen || documentosPath.origen,
            documento_path: req.body.documento_path || documentosPath.documento_path,
            descripcion: req.body.descripcion || documentosPath.descripcion,
            justificacion_legal: req.body.justificacion_legal || documentosPath.justificacion_legal,
            fec_registro: req.body.fec_registro || documentosPath.fec_registro,
            estado: req.body.estado || documentosPath.estado,
            transaccion: req.body.transaccion || documentosPath.transaccion,
            // usu_cre: req.body.usu_cre || documentosPath.usu_cre,
            // fec_cre: req.body.fec_cre || documentosPath.fec_cre,
            usu_mod: req.body.usu_mod || documentosPath.usu_mod,
            fec_mod: req.body.fec_mod || documentosPath.fec_mod,
            //  host_creacion: req.body.host_creacion || documentosPath.host_creacion,
            // host_modificacion: req.body.host_modificacion || documentosPath.host_modificacion,


          })
          .then(() => {
            console.log(' *************SI UPDATE OK');
            return res.status(200).send(documentosPath)
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 1', error);
            res.status(400).send(error)
          });
      })
      .catch(error => {
        console.log(' *************ERROR UPDATE 2', error);
        res.status(400).send(error)
      });
  },

  delete(req, res) {
    return DocumentosPath.findByPk(req.params.id)
      .then(documentosPath => {
        if (!documentosPath) {
          return res.status(404).send({
            message: 'DocumentosPath no encontrado',
          });
        }
        return documentosPath
          .destroy()
          .then(() => {
            console.log(' ************SI DELETE OK');
            res.status(204).send()
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }

};




