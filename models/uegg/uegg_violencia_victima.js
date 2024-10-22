'use strict';
//gma  02/03/2024 PCPA 
//subir  aki: https://github.com/GuellyMorA/UEGG_back/tree/desarrollo

//violencia jerárquica
// 1. Registro víctima
module.exports = (sequelize, DataTypes) => {
  const UeggViolenciaVictima = sequelize.define('uegg_violencia_victima', {
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
    cod_rda_director: DataTypes.INTEGER,
    cod_director: DataTypes.INTEGER,
    cod_rude: DataTypes.STRING,
    num_ci: DataTypes.INTEGER,
    num_comp: DataTypes.STRING,
    nombres_victima: DataTypes.STRING,
    apellido_pat_victima: DataTypes.STRING,
    apellido_mat_victima: DataTypes.STRING,
	  fec_nac: DataTypes.DATE,
    sexo: DataTypes.STRING,
    nivel: DataTypes.STRING,
    grado: DataTypes.STRING, 
    dir_actual: DataTypes.STRING,
	  celular_contacto: DataTypes.STRING,
    
    estado: DataTypes.STRING,
    usu_cre: DataTypes.STRING,
    usu_mod: DataTypes.STRING,
    fec_cre: DataTypes.DATE,
    fec_mod: DataTypes.DATE
  }, {
      tableName: 'uegg_violencia_victima',
      timestamps: false
    });  
    UeggViolenciaVictima.associate = function(models) {      
    
    };     return UeggViolenciaVictima; };