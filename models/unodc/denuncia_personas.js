	
'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const DenunciaPersonas = sequelize.define('denuncia_personas' ,{  	
	    id: {
	      type: DataTypes.INTEGER,
	      allowNull: false,
	      primaryKey: true,
	      autoIncrement: true,
	      field: 'id'
	      },
	
	
	nivel_geografico_id: DataTypes.INTEGER, 
	nivel_geografico_sigla: DataTypes.STRING, 
	sigla: DataTypes.STRING, 
	cod_denuncia: DataTypes.STRING, 
	denuncia_anonima: DataTypes.BOOLEAN, 
	reserva_identidad: DataTypes.BOOLEAN, 
	lugar_hecho: DataTypes.STRING, 
	fec_registro_hecho: DataTypes.DATE, 
	hora_registro_hecho: DataTypes.STRING, 
	detalle_hecho: DataTypes.STRING, 

	
	modulos_sigla_amp_1: DataTypes.STRING, 
	fec_ampliacion_1: DataTypes.DATE, 
	modulos_sigla_amp_2: DataTypes.STRING, 
	fec_ampliacion_2: DataTypes.DATE, 

	estado: DataTypes.STRING, 
	transaccion: DataTypes.STRING, 
	usu_cre: DataTypes.STRING, 
	fec_cre: DataTypes.DATE, 
	usu_mod: DataTypes.STRING, 
	fec_mod: DataTypes.DATE, 
	host_creacion: DataTypes.STRING, 
	host_modificacion: DataTypes.STRING, 
	
		
	
  }, {	
    tableName: 'denuncia_personas'  ,	
    timestamps: false,	
  });	
	
	
DenunciaPersonas.associate = function(models) { 	
// DenunciaPersonas.belongsTo(models.roles, {	
    //   foreignKey: 'roles_sigla'	
    // });	
	
  };	
	
return DenunciaPersonas;	
};	
	
