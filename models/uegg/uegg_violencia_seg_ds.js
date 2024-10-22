'use strict';
module.exports = (sequelize, DataTypes) => {
  const UeggViolenciaSegDs = sequelize.define('uegg_violencia_seg_ds', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
  },
    id_num_caso: DataTypes.INTEGER,
    id_violencia_seg_sanciones: DataTypes.INTEGER,
    id_etapa_preliminar_tipo: DataTypes.INTEGER,
    id_etapa_preparatoria_tipo: DataTypes.INTEGER,
    id_juicio_ac_formal_tipo: DataTypes.INTEGER,
    apelacion: DataTypes.BOOLEAN,
    cazacion: DataTypes.BOOLEAN,
    id_otras_formas_conclusion_tipo: DataTypes.INTEGER,
    fec_seg: DataTypes.DATE,
    
    estado: DataTypes.STRING,
    usu_cre: DataTypes.STRING,
    usu_mod: DataTypes.STRING,
    fec_cre: DataTypes.DATE,
    fec_mod: DataTypes.DATE
        
  }, {
      tableName: 'uegg_violencia_seg_ds',
      timestamps: false
    });
    UeggViolenciaSegDs.associate = function(models) {      
    
    };     return UeggViolenciaSegDs; };