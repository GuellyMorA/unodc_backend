'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const Puestos = sequelize.define('puestos' ,{  	
	id: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    autoIncrement: true,
	    field: 'id'
	    },
	
	
	sigla: DataTypes.STRING, 
	puesto: DataTypes.STRING, 
	descripcion: DataTypes.STRING, 
	estado: DataTypes.STRING, 
	transaccion: DataTypes.STRING, 
	usu_cre: DataTypes.STRING, 
	fec_cre: DataTypes.DATE, 
	usu_mod: DataTypes.STRING, 
	fec_mod: DataTypes.DATE, 
	host_creacion: DataTypes.STRING, 
	host_modificacion: DataTypes.STRING, 
	
	
	
}, {	
    tableName: 'puestos'  ,	
    timestamps: false,	
});	
	
	
Puestos.associate = function(models) { 	
// Puestos.belongsTo(models.roles, {	
//   foreignKey: 'roles_sigla'	
// });	
	
};	
	
return Puestos;	
};	
