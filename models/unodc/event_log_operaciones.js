'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const EventLogOperaciones = sequelize.define('event_log_operaciones' ,{  	
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
        },
	
	
	sesion_log_id: DataTypes.INTEGER, 
	fec_registro: DataTypes.DATE, 
	operacion_realizada: DataTypes.STRING, 
	observacion: DataTypes.STRING, 
	estado: DataTypes.STRING, 
	transaccion: DataTypes.STRING, 
	usu_cre: DataTypes.STRING, 
	fec_cre: DataTypes.DATE, 
	usu_mod: DataTypes.STRING, 
	fec_mod: DataTypes.DATE, 
	host_creacion: DataTypes.STRING, 
	host_modificacion: DataTypes.STRING, 
		
    }, {	
    tableName: 'event_log_operaciones'  ,	
    timestamps: false,	
});	
	
/*	
EventLogOperaciones.associate = function(models) { 	
    EventLogOperaciones.belongsTo(models.sesion_log, {	
        foreignKey: 'sesion_log_id'	
    });	
	
};	
	*/
return EventLogOperaciones;	
};