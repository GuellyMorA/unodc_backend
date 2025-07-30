'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const GeneroSexo = sequelize.define('genero_sexo' ,{  	
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
        },
		
	sigla: DataTypes.STRING, 
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
    tableName: 'genero_sexo'  ,	
    timestamps: false,	
});	
	
	
GeneroSexo.associate = function(models) { 	
// GeneroSexo.belongsTo(models.roles, {	
//   foreignKey: 'roles_sigla'	
// });	
	
};	
	
return GeneroSexo;	
};