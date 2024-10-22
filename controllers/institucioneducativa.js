
const Institucioneducativa = require('../models').institucioneducativa;

module.exports = {
    list(req, res) {
        return Institucioneducativa
            .findAll({})
            .then((institucioneducativa) => res.status(200).send(institucioneducativa))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Institucioneducativa
            .findByPk(req.params.id)
            .then((institucioneducativa) => {
                console.log(institucioneducativa);
                if (!institucioneducativa) {
                    return res.status(404).send({
                        message: 'Institucioneducativa Not Found',
                    });
                }
                return res.status(200).send(institucioneducativa);
            })
            .catch((error) => res.status(400).send(error));
    },
    getByJg(req, res) {
        console.log(req.params.id); //.findOne({id:req.params.id})
        return Institucioneducativa.findAll({
                limit: 100,
                attributes: ['id', 'institucioneducativa'],
                where: {
                    le_juridicciongeografica_id: req.params.jurisdiccion
                }
            })
            .then(institucioneducativa => res.status(200).send(institucioneducativa))
            .catch(error => res.status(400).send(error));
    },
};