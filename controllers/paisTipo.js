const PaisTipo = require('../models').pais_tipo;

module.exports = {
	getPais(req, res) {
		return PaisTipo
			.findAll({order: ['pais']})
			.then((pais) => res.status(200).send(pais))
			.catch((error) => { res.status(400).send(error); });
	}
};