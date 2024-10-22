'use strict';
module.exports = (sequelize, DataTypes) => {
  const UeggViolenciaProceSegDs = sequelize.define('uegg_violencia_proce_seg_ds', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
  },
    id_num_caso: DataTypes.INTEGER,
    id_violencia_seg_sanciones: DataTypes.INTEGER,
    id_auto_inicial: DataTypes.INTEGER,
    id_auto_inicial_tipo: DataTypes.INTEGER,
    id_auto_final_tipo: DataTypes.INTEGER,
    id_rec_rev: DataTypes.INTEGER,
    id_rec_jur: DataTypes.INTEGER,
    
    estado: DataTypes.STRING,
    usu_cre: DataTypes.STRING,
    usu_mod: DataTypes.STRING,
    fec_cre: DataTypes.DATE,
    fec_mod: DataTypes.DATE
        
  }, {
      tableName: 'uegg_violencia_proce_seg_ds',
      timestamps: false
    });
    UeggViolenciaProceSegDs.associate = function(models) {      
    
    };     return UeggViolenciaProceSegDs; };