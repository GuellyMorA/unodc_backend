	
'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const Actividades = sequelize.define('actividades' ,{  	
	id: {
	 	type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		field: 'id'
		},
	
	
	denuncia_personas_id: DataTypes.INTEGER, 
	control_id: DataTypes.INTEGER, 
	seguimiento_id: DataTypes.INTEGER, 
	usuarios_id: DataTypes.INTEGER, 
	sigla: DataTypes.STRING, 
	actividad: DataTypes.STRING, 
	tipo: DataTypes.STRING, 
	descripcion: DataTypes.STRING, 
	fec_registro: DataTypes.DATE, 
	informe: DataTypes.STRING, 
	estado: DataTypes.STRING, 
	transaccion: DataTypes.STRING, 
	usu_cre: DataTypes.STRING, 
	fec_cre: DataTypes.DATE, 
	usu_mod: DataTypes.STRING, 
	fec_mod: DataTypes.DATE, 
	host_creacion: DataTypes.STRING, 
	host_modificacion: DataTypes.STRING, 
	
	
}, {	
		tableName: 'actividades',	
		timestamps: false,	
});	
	
	
Actividades.associate = function(models) { 	
// Actividades.belongsTo(models.roles, {	
//   foreignKey: 'roles_sigla'	
// });	
	
};	
	
return Actividades;	
};