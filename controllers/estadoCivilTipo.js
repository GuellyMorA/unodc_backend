const EstadoCivilTipo = require('../models').estado_civil_tipo;

module.exports = {
    list(req, res) {
        return EstadoCivilTipo
            .findAll()
            .then((estadoCivilTipo) => res.status(200).send(estadoCivilTipo))
            .catch((error) => { res.status(400).send(error); });
    },
};