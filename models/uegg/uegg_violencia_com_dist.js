'use strict';
module.exports = (sequelize, DataTypes) => {
  const UeggViolenciaComDist = sequelize.define('uegg_violencia_com_dist', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
  },
    id_num_caso: DataTypes.INTEGER,
    fec_comunicacion: DataTypes.DATE,
    id_violencia_caso: DataTypes.INTEGER,
    id_violencia_victima_nombre: DataTypes.INTEGER,
    id_violencia_agresor_nombre: DataTypes.INTEGER,
    id_acciones_realizadas_tipo: DataTypes.INTEGER,
    id_violencia_instancia_tipo: DataTypes.INTEGER,
    fec_comunicacion_distrital: DataTypes.DATE,
           	    
    estado: DataTypes.STRING,
    usu_cre: DataTypes.STRING,
    usu_mod: DataTypes.STRING,
    fec_cre: DataTypes.DATE,
    fec_mod: DataTypes.DATE
        
  }, {
      tableName: 'uegg_violencia_com_dist',
      timestamps: false
    });
    UeggViolenciaComDist.associate = function(models) {      
    
    };     return UeggViolenciaComDist; };