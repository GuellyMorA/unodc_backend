'use strict';
module.exports = (sequelize, DataTypes) => {
  const UeggViolenciaQDenunciaTipo = sequelize.define('uegg_violencia_q_denuncia_tipo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
  },
    descripcion: DataTypes.DATE,
    
    estado: DataTypes.STRING,
    usu_cre: DataTypes.STRING,
    usu_mod: DataTypes.STRING,
    fec_cre: DataTypes.DATE,
    fec_mod: DataTypes.DATE
        
  }, {
      tableName: 'uegg_violencia_q_denuncia_tipo',
      timestamps: false
    });
    UeggViolenciaQDenunciaTipo.associate = function(models) {      
    
    };     return UeggViolenciaQDenunciaTipo; };