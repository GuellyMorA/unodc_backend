'use strict';
module.exports = (sequelize, DataTypes) => {
  const UeggViolenciaCasoDna = sequelize.define('uegg_violencia_caso_dna', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
  },
    id_num_caso: DataTypes.INTEGER,
    id_violencia_victima: DataTypes.INTEGER,
    id_violencia_agresor_nombre: DataTypes.INTEGER,
    id_violencia_hecho_tipo: DataTypes.INTEGER,
    id_violencia_instancia: DataTypes.INTEGER, // MODIFICADO 20241001
    desc_hecho: DataTypes.STRING,
    recepcion_ficha: DataTypes.BOOLEAN,
  
    estado: DataTypes.STRING,
    usu_cre: DataTypes.STRING,
    usu_mod: DataTypes.STRING,
    fec_cre: DataTypes.DATE,
    fec_mod: DataTypes.DATE
  }, {
      tableName: 'uegg_violencia_caso_dna',
      timestamps: false
    });
    UeggViolenciaCasoDna.associate = function(models) {      
    
    };     return UeggViolenciaCasoDna; };