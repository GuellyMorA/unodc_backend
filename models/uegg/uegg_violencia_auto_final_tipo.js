'use strict';
module.exports = (sequelize, DataTypes) => {
  const UeggViolenciaAutoFinalTipo = sequelize.define('uegg_violencia_auto_final_tipo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    descripcion: DataTypes.STRING,
    
    estado: DataTypes.STRING,
    usu_cre: DataTypes.STRING,
    usu_mod: DataTypes.STRING,
    fec_cre: DataTypes.DATE,
    fec_mod: DataTypes.DATE
  }, {
      tableName: 'uegg_violencia_auto_final_tipo',
      timestamps: false
    });
    UeggViolenciaAutoFinalTipo.associate = function(models) {      
    
    };     return UeggViolenciaAutoFinalTipo; };