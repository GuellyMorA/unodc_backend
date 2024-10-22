'use strict';
module.exports = (sequelize, DataTypes) => {
  const UeggViolenciaInstanciaTipo = sequelize.define('uegg_violencia_instancia_tipo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
  },
    descripcion:DataTypes.STRING,
       	      
    estado: DataTypes.STRING,
    usu_cre: DataTypes.STRING,
    usu_mod: DataTypes.STRING,
    fec_cre: DataTypes.DATE,
    fec_mod: DataTypes.DATE
  }, {
      tableName: 'uegg_violencia_instancia_tipo',
      timestamps: false
    });
    UeggViolenciaInstanciaTipo.associate = function(models) {      
    
    };     return UeggViolenciaInstanciaTipo; };