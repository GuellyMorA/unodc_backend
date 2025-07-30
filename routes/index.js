var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API Sistema de Información Educativa' });
});


//const usuariosController = require('../controllers').usuarios;
const usuariosController    =  require('../controllers/unodc/usuarios');

//Rutas para usuario
router.post('/api/auth', usuariosController.auth);
router.post('/api/change/auth', usuariosController.changeAuth);


//router.get(   '/usuario/:id',         usuarioController.getById);                                                                        
//router.get(   '/usuarioListByFk/:id', usuarioController.getByFk);  
router.get(   '/api/auth/usuarioList', usuariosController.list);  
router.post(  '/api/auth/usuario',     usuariosController.add);                                                                        
router.put(   '/api/auth/usuario/:id', usuariosController.update);
//router.put(   '/usuarioDel/:id',       usuariosController.deleteLogico);                                                                        
//router.delete('/usuario/:id',         usuariosController.delete);   
router.get(   '/api/auth/usuarioListActivos', usuariosController.listActivos);  

const usuariosRolController    =  require('../controllers/unodc/usuariosRol');
//router.get(   '/usuariosRol/:id',         rolController.getById);                                                                        
//router.get(   '/usuariosRolList',         usuariosRolController.list); 
router.put(   '/api/auth/usuariosRol/:id',         usuariosRolController.update);
router.post(  '/api/auth/usuariosRol',     usuariosRolController.add);                                                                        

//const  rolesController = require('../controllers').roles;
const rolesController    =  require('../controllers/unodc/roles');

//router.get(   '/ rol/:id',          rolController.getById);                                                                        
//router.get(   '/ rolListByFk/:id',  rolController.getByFk);  
router.get(   '/api/auth/rolList',  rolesController.list);  
router.post(  '/api/auth/rol',      rolesController.add);                                                                        
router.put(   '/api/auth/rol/:id',  rolesController.update);
//router.put(   '/ rolDel/:id',        RolesController.deleteLogico);                                                                        
//router.delete('/ rol/:id',          RolesController.delete);   
router.get(   '/api/auth/rolListActivos',  rolesController.listActivos);  


// //Rutas para MesTipo
// router.get('/api/mesTipo', MesTipoController.list);
// router.get('/api/mesTipo/:id', MesTipoController.getById);

module.exports = router;
