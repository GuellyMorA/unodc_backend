'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const Parametros = sequelize.define('parametros' ,{  	
	id: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    autoIncrement: true,
	    field: 'id'
	    },
	
	
	modulos_sigla: DataTypes.STRING, 
	sigla: DataTypes.STRING, 
	descripcion: DataTypes.STRING, 
	orden: DataTypes.INTEGER, 
	param_numerico_ini: DataTypes.STRING, 
	param_numerico_fin: DataTypes.STRING, 
	param_caracter_ini: DataTypes.STRING, 
	param_fecha_ini: DataTypes.STRING, 
	param_fecha_fin: DataTypes.STRING, 
	fec_ini: DataTypes.DATE, 
	fec_fin: DataTypes.DATE, 
	estado: DataTypes.STRING, 
	transaccion: DataTypes.STRING, 
	usu_cre: DataTypes.STRING, 
	fec_cre: DataTypes.DATE, 
	usu_mod: DataTypes.STRING, 
	fec_mod: DataTypes.DATE, 
	host_creacion: DataTypes.STRING, 
	host_modificacion: DataTypes.STRING, 
	
	
	
}, {	
    tableName: 'parametros'  ,	
    timestamps: false,	
});	
	
	
Parametros.associate = function(models) { 	
// Parametros.belongsTo(models.roles, {	
//   foreignKey: 'roles_sigla'	
// });	
	
};	
	
return Parametros;	
};	
