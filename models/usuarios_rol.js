'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const UsuariosRol = sequelize.define('usuarios_rol' ,{  	
	id: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    autoIncrement: true,
	    field: 'id'
	    },
	
	
	usuarios_id: DataTypes.INTEGER, 
	roles_sigla: DataTypes.STRING, 
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
    tableName: 'usuarios_rol'  ,	
    timestamps: false,	
});	
	
	
UsuariosRol.associate = function(models) { 	
    UsuariosRol.belongsTo(models.roles, {	
        foreignKey: 'roles_sigla'	
    });	
	UsuariosRol.belongsTo(models.usuarios, {	
        foreignKey: 'usuarios_id'	
    });	
	
};


return UsuariosRol;	
};	
