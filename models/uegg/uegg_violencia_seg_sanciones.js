'use strict';
module.exports = (sequelize, DataTypes) => {
  const UeggViolenciaSegSanciones = sequelize.define('uegg_violencia_seg_sanciones', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
  },
    id_num_caso: DataTypes.INTEGER,
    id_violencia_victima_nombre: DataTypes.INTEGER,
    ini_victi: DataTypes.STRING,
    id_violencia_agresor_nombre: DataTypes.INTEGER,
    ini_agre: DataTypes.STRING,
    remision_dir_deptal: DataTypes.BOOLEAN,
    fec_agresion: DataTypes.DATE,
    id_violencia_sanciones_tipo: DataTypes.INTEGER,
    cumplir_sancion: DataTypes.BOOLEAN,
    comu_tutor: DataTypes.BOOLEAN,
    comu_victima: DataTypes.BOOLEAN,


    estado: DataTypes.STRING,
    usu_cre: DataTypes.STRING,
    usu_mod: DataTypes.STRING,
    fec_cre: DataTypes.DATE,
    fec_mod: DataTypes.DATE
        
  }, {
      tableName: 'uegg_violencia_seg_sanciones',
      timestamps: false
    });
    UeggViolenciaSegSanciones.associate = function(models) {      
    
    };     return UeggViolenciaSegSanciones; };