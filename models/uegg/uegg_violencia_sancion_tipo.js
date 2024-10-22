'use strict';
module.exports = (sequelize, DataTypes) => {
  const UeggViolenciaSancionTipo = sequelize.define('uegg_violencia_sancion_tipo', {
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
      tableName: 'uegg_violencia_sancion_tipo',
      timestamps: false
    });
    
    UeggViolenciaSancionTipo.associate = function(models) {      
    
    };     return UeggViolenciaSancionTipo; };