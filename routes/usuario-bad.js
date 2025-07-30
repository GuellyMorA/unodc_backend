var express = require('express');
var router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/unodc/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.pdf')//file.originalname
    }
});
const upload = multer({
    storage: storage
});



const usuarioController    =  require('../controllers/unodc/usuarios');
router.get(   '/usuario/:id',         usuarioController.getById);                                                                        
router.get(   '/usuarioListByFk/:id', usuarioController.getByFk);  
router.get(   '/usuarioList',         usuarioController.list); 
router.post(  '/usuario',             usuarioController.add);                                                                        
router.put(   '/usuario/:id',         usuarioController.update);
router.put(   '/usuarioDel/:id',      usuarioController.deleteLogico);                                                                        
router.delete('/usuario/:id',         usuarioController.delete);                                                                        


module.exports = router;

























