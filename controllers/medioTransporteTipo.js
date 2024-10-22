const MedioTransporteTipo = require('../models').medioTransporteTipo ;

module.exports = {
	list(req, res) {
		return MedioTransporteTipo
			.findAll({})
			.then((medioTransporteTipo) => res.status(200).send(medioTransporteTipo))
			.catch((error) => { res.status(400).send(error); });
	},

	getById(req, res) {console.log(req.params.id);//.findOne({id:req.params.id})
		return MedioTransporteTipo
			.findByPk(req.params.id)
			.then((medioTransporteTipo) => {console.log(medioTransporteTipo);
				if (!medioTransporteTipo) {
					return res.status(404).send({
						message: 'usuario Not Found',
					});
				}
				return res.status(200).send(medioTransporteTipo);
			})
			.catch((error) => res.status(400).send(error));
	},

};
