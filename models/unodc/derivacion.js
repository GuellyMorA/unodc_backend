'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const Derivacion = sequelize.define('derivacion' ,{  	
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
    tableName: 'derivacion'  ,	
    timestamps: false,	
});	
	
/*	
Derivacion.associate = function(models) { 	
    Derivacion.belongsTo(models.control, {	
        foreignKey: 'control_id'	
    });	
	
};	

Derivacion.associate = function(models) { 	
    Derivacion.belongsTo(models.denuncia_personas, {	
        foreignKey: 'denuncia_personas_id'	
    });	
	
};

Derivacion.associate = function(models) { 	
    Derivacion.belongsTo(models.usuarios, {	
        foreignKey: 'usuarios_id'	
    });	
	
};
*/
return Derivacion;	
};