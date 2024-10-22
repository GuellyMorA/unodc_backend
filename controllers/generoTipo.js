const GeneroTipo = require('../models').genero_tipo;

module.exports = {
    list(req, res) {
        return GeneroTipo
            .findAll()
            .then((generoTipo) => res.status(200).send(generoTipo))
            .catch((error) => { res.status(400).send(error); });
    },
};