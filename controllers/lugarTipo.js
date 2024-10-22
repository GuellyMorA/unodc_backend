const LugarTipo = require('../models').lugar_tipo ;
const sequelize = LugarTipo.sequelize;

module.exports = {
	list(req, res) {
		return LugarTipo
			.findAll({})
			.then((lugarTipo) => res.status(200).send(lugarTipo))
			.catch((error) => { res.status(400).send(error); });
	},

	getById(req, res) {
		return LugarTipo
			.findByPk(req.params.id)
			.then((lugarTipo) => {
				if (!lugarTipo) {
					return res.status(404).send({
						message: 'usuario Not Found',
					});
				}
				return res.status(200).send(lugarTipo);
			})
			.catch((error) => res.status(400).send(error));
	},

	getLugarTipo(req, res) {
		let query_lugar_tipo = "SELECT id, codigo, lugar FROM lugar_tipo WHERE lugar_tipo_id = " + req.params.id + " AND lugar_nivel_id = " + req.params.nivel + " and codigo != '00' ORDER BY id";
		return sequelize.query(query_lugar_tipo, {type: sequelize.QueryTypes.SELECT}, {raw: true})
        .then((lugarTipo) => {
        	if (req.params.id != 1 && lugarTipo.length == 0) {
        		lugarTipo.push({id: 79355, codigo: '00', lugar: 'NINGUNO'});
        	}
        	res.status(200).send(lugarTipo);
        })
        .catch((error) => res.status(400).send(error));
	},

};