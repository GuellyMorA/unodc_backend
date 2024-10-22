const DepartamentoTipo = require('../models').departamento_tipo;

module.exports = {
	getDepartamento(req, res) {//, id: {$gt: 0}
		return DepartamentoTipo
			.findAll({ where: { pais_tipo_id: req.params.pais_tipo_id }, attributes: ['id', 'sigla', 'departamento']})
			.then((departamento) => res.status(200).send(departamento))
			.catch((error) => {res.status(400).send(error); });
	}
};