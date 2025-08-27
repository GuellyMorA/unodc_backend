var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const FILE_DIRECTORY = path.join(__dirname.split("routes")[0], 'uploads/evidencia_denuncias'); //  uploads\\evidencia_denuncias


// Middleware

      // Configuración de multer
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/evidencia_denuncias/');   // uploads/evidencia_denuncias
        },
        filename: function (req, file, cb) {
          cb(null, `${file.originalname}`); //${Date.now()}-SD- cb(null, file.originalname);
        },
      });

      const fileFilter = (req, file, cb) => {
        const validTypes = /mp4|m4v|mp3|mpeg|wav|pdf|png|msword|bmp|jpeg|jpg|docx|vnd.openxmlformats-officedocument.wordprocessingml.document/;
        const isValid = validTypes.test(path.extname(file.originalname).toLowerCase()) && validTypes.test(file.mimetype);

        if (isValid) {
          cb(null, true);
        } else {
          console.log('Tipo de archivo no válido.: ', validTypes);
          cb(new Error('Tipo de archivo no válido. Solo se permiten imagenes, videos, audios y PDFs.: ' + validTypes));
        }
      };

      // Límite de tamaño de archivo establecido en 10 MB
      const upload = multer({ 
        storage: storage, 
        fileFilter: fileFilter, 
<<<<<<< HEAD
        limits: { fileSize: 50 * 1024 * 1024 } // 50 MB en bytes
=======
        limits: { fileSize: 30 * 1024 * 1024 } // 10 MB en bytes
>>>>>>> 19442801746cf60cf6f059c636218ec254f50d8e
      });


const nivelGeograficoController    =  require('../controllers/unodc/nivelGeografico');
router.get(   '/nivelGeografico/:id',         nivelGeograficoController.getById);                                                                        
//router.get(   '/nivelGeograficoListByFk/:id', nivelGeograficoController.getByFk);  
router.get(   '/nivelGeograficoList',         nivelGeograficoController.list); 
router.post(  '/nivelGeografico',             nivelGeograficoController.add);                                                                        
router.put(   '/nivelGeografico/:id',         nivelGeograficoController.update);
//router.put(   '/nivelGeograficoDel/:id',      nivelGeograficoController.deleteLogico);                                                                        
router.delete('/nivelGeografico/:id',         nivelGeograficoController.delete);                                                                        


const gradoController    =  require('../controllers/unodc/grados');
router.get(   '/grado/:id',         gradoController.getById);                                                                        
router.get(   '/gradoList',         gradoController.list); 
router.post(  '/grado',             gradoController.add);                                                                        
router.put(   '/grado/:id',         gradoController.update);
router.delete('/grado/:id',         gradoController.delete);                                                                        

const rolController    =  require('../controllers/unodc/roles');
//router.get(   '/rol/:id',         rolController.getById);                                                                        
router.get(   '/rolList',         rolController.list); 

const  actividadController    =  require('../controllers/unodc/actividades');
router.get(   '/actividadList',         actividadController.list); 

const denunciaPersonasController    =  require('../controllers/unodc/denunciaPersonas');
//router.get(   '/denunciaPersonas/:id',         denunciaPersonasController.getById);                                                                        
router.get(   '/denunciaPersonasGetByCod/:cod_denuncia',        denunciaPersonasController.getByCod);  
router.get(   '/denunciaPersonasList',         denunciaPersonasController.list); 
router.post(  '/denunciaPersonas',             denunciaPersonasController.add);  
router.put(   '/denunciaPersonas/:id',         denunciaPersonasController.update);
//router.put(   '/denunciaPersonasDel/:id',      denunciaPersonasController.deleteLogico);                                                                        
router.get(   '/denunciaPersonasGetByNivelGeo/:depto_id/:rol',        denunciaPersonasController.getByNivelGeo);  

router.get(   '/getByCodEstado/:cod_denuncia/:estado',        denunciaPersonasController.getByCodEstado);  
router.get(   '/listRepDenByDepto/:depto_id',        denunciaPersonasController.listRepDenByDepto);  
router.get(   '/listRepDenByDeptoByInfFinal/:depto_id',        denunciaPersonasController.listRepDenByDeptoByInfFinal);  
router.get(   '/listRepDenByDeptoByEstado/:depto_id/:estado/:fec_registro_hecho_desde/:fec_registro_hecho_hasta',        denunciaPersonasController.listRepDenByDeptoByEstado);  
router.get(   '/listRepDenByTipo/:depto_id/:usuarios_id',        denunciaPersonasController.listRepDenByTipo);  
router.get(   '/listRepDenByTipoPlazo/:depto_id/:usuarios_id',   denunciaPersonasController.listRepDenByTipoPlazo);  



// controller para denunciado y denunciante
const personaController    =  require('../controllers/unodc/personas');
//router.get(   '/persona/:id',         personaController.getById);                                                                        
router.get(   '/personaListByCod/:cod_denuncia', personaController.listByCod);  
router.get(   '/personaList',         personaController.list); 
router.post(  '/persona',             personaController.add);                                                                        
router.put(   '/persona/:id',         personaController.update);
//router.put(   '/personaDel/:id',      personaController.deleteLogico);                                                                        
//router.delete('/persona/:id',         personaController.delete);                                                                        

const  documentosPathController    =  require('../controllers/unodc/documentosPath');
//router.get(   '/ documentosPath/:id',          documentosPathController.getById);                                                                        
router.get(   '/documentosPathListByCod/:cod_denuncia', documentosPathController.listByCod);  
router.get(   '/documentosPathList',          documentosPathController.list); 
router.post(  '/documentosPath',              documentosPathController.add);  

const  seguimientoController    =  require('../controllers/unodc/seguimiento');
//router.get(   '/ seguimiento/:id',          seguimientoController.getById);                                                                        
router.get(   '/seguimientoListByCod/:usuarios_id/:depto_id/:rol', seguimientoController.listByCodByNivelGeo);  
router.get(   '/seguimientoListByCodByNivelGeoByUsuId/:usuarios_id/:depto_id/:cod_denuncia', seguimientoController.listByCodByNivelGeoByUsuId);  
router.get(   '/seguimientoList',          seguimientoController.list); 
router.post(  '/seguimiento',              seguimientoController.add);  
router.get(   '/seguimientolistRepByNivelGeoByUsuId/:usuarios_id/:depto_id', seguimientoController.listRepByNivelGeoByUsuId);  

const  sesionLogController    =  require('../controllers/unodc/sesionLog');
router.get(   '/sesionLogList',          sesionLogController.list); 
router.post(  '/sesionLog',              sesionLogController.add);  
router.put(   '/sesionLog/:id',        sesionLogController.update);

const  rolMenusOperacionesController    =  require('../controllers/unodc/rolMenusOperaciones');
router.get(   '/rolMenusOperacionesList',          rolMenusOperacionesController.list); 
router.get(   '/modulosOperacionesList',        rolMenusOperacionesController.listModulosOperaciones); 

router.post(  '/rolMenusOperaciones',              rolMenusOperacionesController.add);  
router.put(   '/rolMenusOperaciones/:id',        rolMenusOperacionesController.update);

  
  // Ruta para descargar archivos
  router.get('/uploads/evidencia_denuncias/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = 	path.join(FILE_DIRECTORY, filename);
    //"C:\SistemasDesarrollados\Unodc\unodc_backend\uploads\evidencia_denuncias\017-bugs-app-fantastic-meme.jpg-SD-1749955234417.jpg
    
    
      if (!req.url ) {
        return res.status(400).json({ message: "No files uploaded Bk." });
      }
    // Verificar si el archivo existe  

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error('Error. Archivo no encontrado en backend:', filePath);
          return res.status(404).send('Error.. Archivo no encontrado:' + FILE_DIRECTORY +', '+ filename );
      }
    // Configurar encabezados para la descarga
        res.download(filePath, (err) => {
            if (err) {
                console.error('Error al descargar el archivo:', err);
                res.status(500).send('Error al descargar el archivo');
            }
            console.log('Archivos descargado correctamente:', filePath);
   
        });
});
});

    // Ruta para cargar múltiples archivos
    router.post("/documentosPathUpload", upload.array("files", 50), (req, res) => {// rbc upload.array("files", 5)
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded Bk." });
      }
            console.log('Ejecutando lógica inicial antes de la carga de archivos.');

            const files = req.files.map((file) => ({
              originalName: file.originalname,
              savedAs: file.filename,
              path: file.path,
            }));
      res.status(200).json({
        message: 'Lógica inicial ejecutada. Archivos subidos satisfactoriamente.',
        files: req.files,
      });
    });

    // Ruta para cargar un solo archivo
    router.post("/documentosPathXXXX", upload.single("file"), (req, res) => {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      res.status(200).json({
        message: "File uploaded successfully",
        file: {
          originalName: req.file.originalname,
          savedAs: req.file.filename,
          path: req.file.path,
        },
      });
    });



module.exports = router;
