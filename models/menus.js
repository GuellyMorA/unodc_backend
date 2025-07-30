'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const Menus = sequelize.define('menus' ,{  	
	id: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    autoIncrement: true,
	    field: 'id'
	    },
	
	
	modulos_sigla: DataTypes.STRING, 
	sigla: DataTypes.STRING, 
	menu: DataTypes.STRING, 
	descripcion: DataTypes.STRING, 
	nivel: DataTypes.INTEGER, 
	padre_id: DataTypes.INTEGER, 
	estado: DataTypes.STRING, 
	transaccion: DataTypes.STRING, 
	usu_cre: DataTypes.STRING, 
	fec_cre: DataTypes.DATE, 
	usu_mod: DataTypes.STRING, 
	fec_mod: DataTypes.DATE, 
	host_creacion: DataTypes.STRING, 
	host_modificacion: DataTypes.STRING, 
	
	
    }, {	
    tableName: 'menus'  ,	
    timestamps: false,	
});	
	
	
Menus.associate = function(models) { 	
    Menus.belongsTo(models.modulos, {	
        foreignKey: 'modulos_sigla'	
    });	
	
};	
	
return Menus;	
};