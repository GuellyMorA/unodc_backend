'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const Roles = sequelize.define('roles' ,{  	
	/*id: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    autoIncrement: true,
	    field: 'id'
	    },
	*/
	
	sigla: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
		autoIncrement: false,
		field: 'sigla'
		},
	rol: DataTypes.STRING, 
	descripcion: DataTypes.STRING, 
	nivel_geografico_sigla: DataTypes.STRING, 
	nivel_geografico_id: DataTypes.INTEGER, 
	modulo_sigla: DataTypes.STRING, 
	estado: DataTypes.STRING, 
	transaccion: DataTypes.STRING, 
	usu_cre: DataTypes.STRING, 
	fec_cre: DataTypes.DATE, 
	usu_mod: DataTypes.STRING, 
	fec_mod: DataTypes.DATE, 
	host_creacion: DataTypes.STRING, 
	
	}, {	
    tableName: 'roles'  ,	
    timestamps: false,	
});	
	
	
Roles.associate = function(models) { 	
// Roles.belongsTo(models.roles, {	
//   foreignKey: 'roles_sigla'	
// });	
	
 };	
	
return Roles;	
};	
