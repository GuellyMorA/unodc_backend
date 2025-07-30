'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const Control = sequelize.define('control' ,{  	
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
        },
	
	
	denuncia_personas_id: DataTypes.INTEGER,
	usuario_revisor_id: DataTypes.INTEGER, 
	analisis_denuncia: DataTypes.STRING, 
	recomendacion: DataTypes.STRING, 
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
    tableName: 'control'  ,	
    timestamps: false,	
});	
	
	
Control.associate = function(models) { 	
Control.belongsTo(models.denuncia_personas, {	
    foreignKey: 'denuncua_personas_id'	
});	
/*
Control.belongsTo(models.usuarios, {	
    foreignKey: 'usuarios_id'	
});	
*/
 };	
	
return Control;	
};