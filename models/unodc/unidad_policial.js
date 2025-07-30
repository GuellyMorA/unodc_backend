'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const UnidadPolicial = sequelize.define('unidad_policial' ,{  	
	id: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    autoIncrement: true,
	    field: 'id'
	    },
	
	
	nivel_geografico_id: DataTypes.INTEGER, 
	sigla: DataTypes.STRING, 
	unidad_policial: DataTypes.STRING, 
	descripcion: DataTypes.STRING, 
	direccion: DataTypes.STRING, 
	estado: DataTypes.STRING, 
	transaccion: DataTypes.STRING, 
	usu_cre: DataTypes.STRING, 
	fec_cre: DataTypes.DATE, 
	usu_mod: DataTypes.STRING, 
	fec_mod: DataTypes.DATE, 
	host_creacion: DataTypes.STRING, 
	host_modificacion: DataTypes.STRING, 
	
			
}, {	
    tableName: 'unidad_policial'  ,	
    timestamps: false,	
});	
	
	/*
UnidadPolicial.associate = function(models) { 	
    UnidadPolicial.belongsTo(models.nivel_geografico, {	
        foreignKey: 'nivel_geografico_id'
    });
	
};	
	*/
return UnidadPolicial;	
};	
