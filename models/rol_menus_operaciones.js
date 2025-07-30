'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const RolMenusOperaciones = sequelize.define('rol_menus_operaciones' ,{  	
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		field: 'id'
	},
	
	
	roles_sigla: DataTypes.STRING, 
	menus_sigla: DataTypes.STRING, 
	operaciones_sigla: DataTypes.STRING, 
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
	timestamps: false,	
});	
	
	
RolMenusOperaciones.associate = function(models) { 	
	RolMenusOperaciones.belongsTo(models.menus, {	
		foreignKey: 'menus_sigla'	
	});	
	
};	

RolMenusOperaciones.associate = function(models) { 	
	RolMenusOperaciones.belongsTo(models.operaciones, {	
		foreignKey: 'operaciones_sigla'	
	});	
	
};	

RolMenusOperaciones.associate = function(models) { 	
	RolMenusOperaciones.belongsTo(models.roles, {	
		foreignKey: 'roles_sigla'	
	});	
	
};	

return RolMenusOperaciones;	
};	
	
