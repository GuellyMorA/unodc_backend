'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const Seguimiento = sequelize.define('seguimiento' ,{  	
	id: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    autoIncrement: true,
	    field: 'id'
	    },
	
	
	denuncia_personas_id: DataTypes.INTEGER, 
	control_id: DataTypes.INTEGER, 
	usuarios_id: DataTypes.INTEGER, 
	actividades_id: DataTypes.INTEGER, 
	observacion: DataTypes.STRING, 
	fec_registro: DataTypes.DATE, 
	estado: DataTypes.STRING, 
	transaccion: DataTypes.STRING, 
	usu_cre: DataTypes.STRING, 
	fec_cre: DataTypes.DATE, 
	usu_mod: DataTypes.STRING, 
	fec_mod: DataTypes.DATE, 
	host_creacion: DataTypes.STRING, 
	host_modificacion: DataTypes.STRING, 
	
	
    }, {	
    tableName: 'seguimiento'  ,	
    timestamps: false,	
});	
	
	/*
Seguimiento.associate = function(models) { 	
    Seguimiento.belongsTo(models.control, {	
        foreignKey: 'control_id'	
    });	
	
};	
	
Seguimiento.associate = function(models) { 	
    Seguimiento.belongsTo(models.denuncia_personas, {	
        foreignKey: 'denuncia_personas_id'	
    });	
	
};

Seguimiento.associate = function(models) { 	
    Seguimiento.belongsTo(models.usuarios, {	
        foreignKey: 'usuarios_id'	
    });	
	
};
*/
return Seguimiento;	
};	
