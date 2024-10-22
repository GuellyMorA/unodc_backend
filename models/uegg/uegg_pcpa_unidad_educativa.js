'use strict';
//gma  02/03/2024 PCPA  , hola guelly s y  f
//subir  aki: https://github.com/GuellyMorA/UEGG_back/tree/desarrollo

//convivencia pacifica
// 1. Registro de PCPA

 module.exports = (sequelize, DataTypes) => {  
 const   UeggPcpaUnidadEducativa = sequelize.define('uegg_pcpa_unidad_educativa', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    cod_ue: DataTypes.INTEGER,
   	desc_ue: DataTypes.STRING, 
	cod_sie: DataTypes.INTEGER,
  	cod_rda_director: DataTypes.STRING,
    cod_director : DataTypes.STRING,
    nombres_director : DataTypes.STRING,
    apellidos_director : DataTypes.STRING,

	cod_departamento: DataTypes.STRING,
    desc_departamento: DataTypes.STRING,
	cod_municipio: DataTypes.STRING,
    desc_municipio: DataTypes.STRING,
	cod_nivel: DataTypes.STRING,
    desc_nivel: DataTypes.STRING,
	modalidad: DataTypes.STRING,

    estado: DataTypes.STRING,
    usu_cre: DataTypes.STRING,
    usu_mod: DataTypes.STRING,
    fec_cre: DataTypes.DATE,
    fec_mod: DataTypes.DATE
  }, {       
      tableName: 'uegg_pcpa_unidad_educativa',       
      timestamps: false,     });   
      UeggPcpaUnidadEducativa.associate = function(models) {      
  
  };     
      return UeggPcpaUnidadEducativa; };


