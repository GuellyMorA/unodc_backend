'use strict';
module.exports = (sequelize, DataTypes) => {
  const UeggViolenciaCasoAgresor = sequelize.define('uegg_violencia_caso_agresor', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
  },
    num_caso: DataTypes.INTEGER,
    fec_agresion:DataTypes.DATE,
    num_agresores: DataTypes.INTEGER,
   	    
    estado: DataTypes.STRING,
    usu_cre: DataTypes.STRING,
    usu_mod: DataTypes.STRING,
    fec_cre: DataTypes.DATE,
    fec_mod: DataTypes.DATE
    
  }, {
      tableName: 'uegg_violencia_caso_agresor',
      timestamps: false
    });
    UeggViolenciaCasoAgresor.associate = function(models) {      
    
    };
    return UeggViolenciaCasoAgresor; 
  };