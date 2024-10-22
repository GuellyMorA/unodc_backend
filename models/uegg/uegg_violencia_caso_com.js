
'use strict';
module.exports = (sequelize, DataTypes) => {
  const UeggViolenciaCasoCom = sequelize.define('uegg_violencia_caso_com', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
  },
    id_violencia_caso_agresor: DataTypes.INTEGER,
    id_violencia_victima: DataTypes.INTEGER, //modificado
    id_violencia_agresor: DataTypes.INTEGER, //modificado
    comunicacion_tutores: DataTypes.BOOLEAN,
    desc_hecho: DataTypes.STRING,
    nombre_tutores: DataTypes.STRING,
    fec_com: DataTypes.DATE,
    desc_hecho: DataTypes.STRING,
    violencia_fis: DataTypes.BOOLEAN,
	  desc_hecho_fis: DataTypes.STRING,
	  violencia_val_fis: DataTypes.STRING,
    violencia_psico: DataTypes.BOOLEAN,
	  desc_hecho_psico: DataTypes.STRING,
	  violencia_val_psico: DataTypes.STRING,
    violencia_sexual: DataTypes.BOOLEAN,
	  desc_hecho_sexual: DataTypes.STRING,
	  violencia_val_sexual: DataTypes.STRING,
               	    
    estado: DataTypes.STRING,
    usu_cre: DataTypes.STRING,
    usu_mod: DataTypes.STRING,
    fec_cre: DataTypes.DATE,
    fec_mod: DataTypes.DATE
  }, {
      tableName: 'uegg_violencia_caso_com',
      timestamps: false
    });
      UeggViolenciaCasoCom.associate = function(models) {      
    };
      return UeggViolenciaCasoCom; 
  };