'use strict';
module.exports = (sequelize, DataTypes) => {
  const UeggViolenciaDna = sequelize.define('uegg_violencia_dna', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
  },
    id_num_caso: DataTypes.INTEGER,
    fec_agresion: DataTypes.DATE,
    ref_den: DataTypes.STRING,
    fec_ref_den: DataTypes.DATE,
    id_violencia_instancia_den_tipo: DataTypes.INTEGER,
  
    estado: DataTypes.STRING,
    usu_cre: DataTypes.STRING,
    usu_mod: DataTypes.STRING,
    fec_cre: DataTypes.DATE,
    fec_mod: DataTypes.DATE
  }, {
      tableName: 'uegg_violencia_dna',
      timestamps: false
    });
    UeggViolenciaDna.associate = function(models) {      
    };
      return UeggViolenciaDna; 
  };