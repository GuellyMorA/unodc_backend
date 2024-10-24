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
// //var cuadernoRouter = require('./routes/cuaderno');
// //var wfTramiteRouter = require('./routes/wftramite');
// var usersRouter = require('./routes/users');
// //var infraRouter = require('./routes/infraestructura');
// //var cctpRouter = require('./routes/cctp');
// var ueggRouter = require('./routes/uegg');

var app = express();
app.use(cors());

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
            '/api/change/auth'
        ];
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            console.log('token ' + token);
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
                req.url.indexOf('/out/') != -1 ||
                req.url.indexOf('/cctp/obtiene/apertura/') != -1 ||
                req.url.indexOf('/cctp/tramite/imprime/') != -1 ||
                req.url.indexOf('/inter/') != -1
            ) {
                next();
            } else {
                res.status(403).send({ message: 'Ruta no autorizado' });
            }
        }
    } catch (e) {
        next();
    }
});

app.use('/', indexRouter);

////app.use('/users', usersRouter);

////app.use('/uegg', ueggRouter);

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

module.exports = app;