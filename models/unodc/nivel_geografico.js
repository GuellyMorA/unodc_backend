'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const NivelGeografico = sequelize.define('nivel_geografico' ,{  	
	id: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    autoIncrement: true,
	    field: 'id'
        },
	
	
	sigla: DataTypes.STRING, 
	sigla_padre: DataTypes.STRING, 
	nivel_geografico: DataTypes.STRING, 
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
    tableName: 'nivel_geografico'  ,	
    timestamps: false,	
    });	
	
	
NivelGeografico.associate = function(models) { 	
// NivelGeografico.belongsTo(models.roles, {	
//   foreignKey: 'roles_sigla'	
// });	
	
};	
	
return NivelGeografico;	
};