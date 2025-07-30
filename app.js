var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');
const key = require('./config/key');

const swaggerUi = require('swagger-ui-express');
const swaggerDocumentInfra = require('./config/swaggerInfra.json');

var indexRouter = require('./routes/index');

// para transparencia
let transporter11111 ='';

//var usuarioRouter = require('./routes/usuario');
var unodcRouter = require('./routes/unodc');

var app = express();
app.use(cors());


// Configuración de CORS
var corsOptions = {
    origin: ['https://localhost:3001','http://localhost:5173/', 'https://172.16.172.23:5173/', 'https://api-denuncias.policia.bo/'], // Lista de dominios permitidos
    
    methods: 'GET,POST,PUT,DELETE',                               // Métodos HTTP permitidos       'https://denuncias.policia.bo', // El dominio de tu frontend
    credentials: true,                                            // Permitir envío de credenciales
    allowedHeaders: ['Content-Type', 'Authorization'],            // Cabeceras permitidas
};

//var app = express();
//app.use(cors());
app.use(cors(corsOptions));
/*
app.use(cors({
    origin: 'http://localhost:3005/uegg/', // Puedes especificar el dominio permitido
    methods: 'GET,POST,PUT,DELETE',  // Métodos permitidos
    credentials: true,               // Permitir credenciales (cookies, autorizaciones, etc.)
}));*/





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs-infra', swaggerUi.serve, swaggerUi.setup(swaggerDocumentInfra));
app.use(function(req, res, next) {
    try {
        let public_route = [
            '/api/auth',
            '/unodc',
            '/api/change/auth'
        ];
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            console.log('token ok: ' + token);
            jwt.verify(token, key.apikey, function(err, response) {
                if (err) {
                    req.user = undefined;
                } else {
                    req.user = response;
                    next();
                }
            });
        } else {
            if (
                public_route.includes(req.url) ||
                req.url.indexOf('/out/') != -1 
            
            ) {
                next();
            } else {
                res.status(403).send({ message: 'Ruta no autorizada' });
            }
        }
    } catch (e) {
        next();
    }
});

app.use('/', indexRouter);

//app.use('/users', usersRouter);
//app.use('/unodc', usuarioRouter);
app.use('/unodc', unodcRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.use(express.static('public'));



module.exports = app;