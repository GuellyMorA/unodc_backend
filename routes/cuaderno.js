var express = require('express');
var router = express.Router();
const usuariosController = require('../controllers/cuaderno').usuarios;

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('index', { title: 'API Cuaderno Pedagógico' });
});

router.get('/usuarios', usuariosController.list);

module.exports = router;
