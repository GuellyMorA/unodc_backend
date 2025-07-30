const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

//1. Instalación de Dependencias
//Primero, asegúrate de instalar winston y winston-daily-rotate-file para una rotación de archivos de log:
// npm install winston winston-daily-rotate-file


const transport = new DailyRotateFile({
    filename: 'logs/%DATE%-results.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'info'
});

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        transport,
        new winston.transports.Console({ level: 'debug' })
    ]
});

module.exports = logger;