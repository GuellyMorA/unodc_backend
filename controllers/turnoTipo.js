const TurnoTipo = require('../models').turnoTipo;


module.exports = {
    list(req, res) {
        return TurnoTipo
            .findAll({})
            .then((turnoTipo) => res.status(200).send(turnoTipo))
            .catch((error) => { res.status(400).send(error); });
    },
    listBasico(req, res) {
        return TurnoTipo
            .findAll({
                where: {
                    id: ["1", "2", "4"]
                }
            })
            .then((turnoTipo) => res.status(200).send(turnoTipo))
            .catch((error) => { res.status(400).send(error); });
    },
    getById(req, res) {
        console.log(req.params.id); //.findOne({id:req.params.id})
        return TurnoTipo
            .findByPk(req.params.id)
            .then((turnoTipo) => {
                console.log(turnoTipo);
                if (!turnoTipo) {
                    return res.status(404).send({
                        message: 'turnoTipo Not Found',
                    });
                }
                return res.status(200).send(turnoTipo);
            })
            .catch((error) => res.status(400).send(error));
    },
};