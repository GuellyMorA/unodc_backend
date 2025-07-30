'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const SesionLog = sequelize.define('sesion_log' ,{  	
	id: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    autoIncrement: true,
	    field: 'id'
	    },
	
	
	user_login_sigla: DataTypes.STRING, 
	pin: DataTypes.STRING, 
	pin_estado: DataTypes.STRING, 
	pin_hora_expiracion: DataTypes.STRING, 
	fec_sesion: DataTypes.DATE, 
	nombre_device: DataTypes.STRING, 
	estado: DataTypes.STRING, 
	transaccion: DataTypes.STRING, 
	usu_cre: DataTypes.STRING, 
	fec_cre: DataTypes.DATE, 
	usu_mod: DataTypes.STRING, 
	fec_mod: DataTypes.DATE, 
	host_creacion: DataTypes.STRING, 
	host_modificacion: DataTypes.STRING, 
	
	
	
    }, {	
    tableName: 'sesion_log'  ,	
    timestamps: false,	
    });	
	
/*	
SesionLog.associate = function(models) { 	
    SesionLog.belongsTo(models.usuarios, {	
        foreignKey: 'usuarios_sigla'	
});	
	
};	
*/
return SesionLog;	
};	
