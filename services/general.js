const GestionTipo = require('../models').gestion_tipo;
const InstitucioneducativaTipo = require('../models').institucioneducativa_tipo;

module.exports = {
	getGestionTipo() {
	  let gestion_id = new Date().getFullYear();
	  return GestionTipo
	    .findByPk(gestion_id)
	    .then((gestion) => {
	      if (!gestion) {
	        return 0;
	      }
	      return gestion.id;
	    })
	    .catch((error) => {return 0});
	  // let gestionTipo = {id: 2019};//await GestionTipo.findOne({ where: { 'id': (new Date().getFullYear()) } });
	  // return gestionTipo.id
	},

	getInstitucioneducativaTipo() {
	  return InstitucioneducativaTipo
	    .findOne({ where: {'obs': 'CCTP'}, attributes: ['id'] })
	    .then((institucioneducativaTipo) => {
	      if (!institucioneducativaTipo) {
	        return 0;
	      }
	      return institucioneducativaTipo.id;
	    })
	    .catch((error) => {return 0});
	},
}