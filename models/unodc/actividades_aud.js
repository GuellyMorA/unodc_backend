'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const actividades_aud = sequelize.define('actividades_aud' ,{  	
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
	
	
	
	actividades_id: DataTypes.INTEGER, 
	denuncia_personas_id: DataTypes.INTEGER, 
	control_id: DataTypes.INTEGER, 
	seguimiento_id: DataTypes.INTEGER, 
	usuarios_id: DataTypes.INTEGER, 
	observacion: DataTypes.STRING, 
	fec_registro: DataTypes.DATE, 
	informe: DataTypes.STRING, 
	estado: DataTypes.STRING, 
	transaccion: DataTypes.STRING, 
	usu_cre: DataTypes.STRING, 
	fec_cre: DataTypes.DATE, 
	usu_mod: DataTypes.STRING, 
	fec_mod: DataTypes.DATE, 
	
	
 }, {	
		tableName: 'actividades_aud'  ,	
		timestamps: false,	
});	
	
	
actividades_aud.associate = function(models) { 	
// actividades_aud.belongsTo(models.roles, {	
//   foreignKey: 'roles_sigla'	
// });	
	
};	
	
return actividades_aud;	
};	
	
