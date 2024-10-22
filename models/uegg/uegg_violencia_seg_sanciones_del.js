'use strict';
module.exports = (sequelize, DataTypes) => {
  const UeggViolenciaSegSancionesDel = sequelize.define('uegg_violencia_seg_sanciones_del', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
  },
    id_num_caso: DataTypes.INTEGER,
    id_violencia_seg_sanciones: DataTypes.INTEGER,
    denuncia_minpub: DataTypes.BOOLEAN,
    id_quien_denuncia_tipo: DataTypes.INTEGER,
    
    estado: DataTypes.STRING,
    usu_cre: DataTypes.STRING,
    usu_mod: DataTypes.STRING,
    fec_cre: DataTypes.DATE,
    fec_mod: DataTypes.DATE
        
  }, {
      tableName: 'uegg_violencia_seg_sanciones_del',
      timestamps: false
    });
    UeggViolenciaSegSancionesDel.associate = function(models) {      
    
    };     return UeggViolenciaSegSancionesDel; };