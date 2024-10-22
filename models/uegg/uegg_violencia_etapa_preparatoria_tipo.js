'use strict';
module.exports = (sequelize, DataTypes) => {
  const UeggViolenciaEtapaPreparatoriaTipo = sequelize.define('uegg_violencia_etapa_preparatoria_tipo', {
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
      tableName: 'uegg_violencia_etapa_preparatoria_tipo',
      timestamps: false
    });
    UeggViolenciaEtapaPreparatoriaTipo.associate = function(models) {      
    
    };     return UeggViolenciaEtapaPreparatoriaTipo; };