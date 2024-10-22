'use strict';
//autor: gma
//date :07/03/2024



	
//embarazo adolescente
// 1. Registro de estudiante embarazada	
	
//  module.exports = (sequelize, DataTypes) => {  const   Persona = sequelize.define('pcpa_unidad_eductiva (	
//  module.exports = (sequelize, DataTypes) => {  const   Persona = sequelize.define('pcpa_module.exports = (sequelize, DataTypes) => {  const  ruccion (	
//  module.exports = (sequelize, DataTypes) => {  const   Persona = sequelize.define('pcpa_indicadores_tipo (	
	
 module.exports = (sequelize, DataTypes) => { 	
 const   UeggEmbReporteEmbarazoTipo = sequelize.define('uegg_emb_reporte_embarazo_tipo', {	
	 id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
	cod_reporte: DataTypes.STRING,
    desc_reporte: DataTypes.STRING,	
    orden: DataTypes.INTEGER, 	
    estado: DataTypes.STRING,	
    usu_cre: DataTypes.STRING,	
    usu_mod: DataTypes.STRING,	
    fec_cre: DataTypes.DATE,	
    fec_mod: DataTypes.DATE	
  }, {       	
  tableName: 'uegg_emb_reporte_embarazo_tipo',      	
  timestamps: false,     });     	
  UeggEmbReporteEmbarazoTipo.associate = function(models) {   	
    };   	
	return UeggEmbReporteEmbarazoTipo; };
	



   