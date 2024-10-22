const JurisdiccionGeografica = require('../models').jurisdiccion_geografica ;

module.exports = {
	list(req, res) {
		return JurisdiccionGeografica
			.findAll({})
			.then((jurisdiccionGeografica) => res.status(200).send(jurisdiccionGeografica))
			.catch((error) => { res.status(400).send(error); });
	},

	getById(req, res) {console.log(req.params.id);//.findOne({id:req.params.id})
		return JurisdiccionGeografica
			.findByPk(req.params.id)
			.then((jurisdiccionGeografica) => {console.log(jurisdiccionGeografica);
				if (!jurisdiccionGeografica) {
					return res.status(404).send({
						message: 'usuario Not Found',
					});
				}
				return res.status(200).send(jurisdiccionGeografica);
			})
			.catch((error) => res.status(400).send(error));
	},

};