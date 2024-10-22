const MesTipo = require('../models').mesTipo;

module.exports = {
    list(req, res) {
        return MesTipo
            .findAll({})
            .then((mesTipo) => res.status(200).send(mesTipo))
            .catch((error) => { res.status(400).send(error); });
    },
    /*     listBasico(req, res) {
            return MesTipo
                .findAll({
                    where: {
                        id: ["1", "2", "4"]
                    }
                })
                .then((mesTipo) => res.status(200).send(mesTipo))
                .catch((error) => { res.status(400).send(error); });
        }, */
    getById(req, res) {
        console.log(req.params.id); //.findOne({id:req.params.id})
        return MesTipo
            .findByPk(req.params.id)
            .then((mesTipo) => {
                console.log(mesTipo);
                if (!mesTipo) {
                    return res.status(404).send({
                        message: 'mesTipo Not Found',
                    });
                }
                return res.status(200).send(mesTipo);
            })
            .catch((error) => res.status(400).send(error));
    },
};