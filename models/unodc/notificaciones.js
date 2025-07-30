'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const Notificaciones = sequelize.define('notificaciones' ,{  	
	id: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    autoIncrement: true,
	    field: 'id'
	    },
	
	
	user_login_sigla: DataTypes.STRING, 
	sigla: DataTypes.STRING, 
	notificacion: DataTypes.STRING, 
	descripcion: DataTypes.STRING, 
	fec_inicio: DataTypes.DATE, 
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
    tableName: 'notificaciones'  ,	
    timestamps: false,	
    });	
	
	/*
Notificaciones.associate = function(models) { 	
    Notificaciones.belongsTo(models.usuarios, {	
        foreignKey: 'usuarios_sigla'	
    });	
	
};	
	*/
return Notificaciones;	
};