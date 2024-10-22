const GestionTipo = require('../models').gestion_tipo;


module.exports = {
    list(req, res) {
        return GestionTipo
            .findAll({
                order: [
                    ['id', 'DESC'],
                ],
            })
            .then((gestionTipo) => res.status(200).send(gestionTipo))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); //.findOne({id:req.params.id})
        return GestionTipo
            .findByPk(req.params.id)
            .then((gestionTipo) => {
                console.log(gestionTipo);
                if (!gestionTipo) {
                    return res.status(404).send({
                        message: 'gestionTipo Not Found',
                    });
                }
                return res.status(200).send(gestionTipo);
            })
            .catch((error) => res.status(400).send(error));
    },
};