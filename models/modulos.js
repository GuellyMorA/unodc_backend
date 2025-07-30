'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const Modulos = sequelize.define('modulos' ,{  	
	id: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    autoIncrement: true,
	    field: 'id'
	    },
	
	
	sigla: DataTypes.STRING, 
	modulo: DataTypes.STRING, 
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
    tableName: 'modulos'  ,	
    timestamps: false,	
    });	
	
	
Modulos.associate = function(models) { 	
// Modulos.belongsTo(models.roles, {	
//   foreignKey: 'roles_sigla'	
// });	
	
};	
	
return Modulos;	
};	
	
