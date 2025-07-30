'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const Grados = sequelize.define('grados' ,{  	
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		field: 'id'
	},
	
	
	sigla: DataTypes.STRING, 
	grado: DataTypes.STRING, 
	descripcion: DataTypes.STRING, 
	estado: DataTypes.STRING, 
	transaccion: DataTypes.STRING, 
	usu_cre: DataTypes.STRING, 
	fec_cre: DataTypes.DATE, 
	usu_mod: DataTypes.STRING, 
	fec_mod: DataTypes.DATE, 
	host_creacion: DataTypes.STRING,
	sigla_ab: DataTypes.STRING,
		
}, {	
	tableName: 'grados'  ,	
	timestamps: false,	
});	
	
	
Grados.associate = function(models) { 	
// Grados.belongsTo(models.roles, {	
//   foreignKey: 'roles_sigla'	
// });	
	
};	
	
return Grados;	
};