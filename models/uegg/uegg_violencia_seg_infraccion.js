'use strict';
module.exports = (sequelize, DataTypes) => {
  const UeggViolenciaSegInfraccion = sequelize.define('uegg_violencia_seg_infraccion', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
  },
    id_num_caso: DataTypes.INTEGER,
    caso_remitido_juez: DataTypes.BOOLEAN,
    caso_remitido_otra_instancia: DataTypes.BOOLEAN,
    dna_remision_referencia: DataTypes.BOOLEAN,
    cambio_sancion_delito: DataTypes.BOOLEAN, 
    inicio_proceso_admi: DataTypes.BOOLEAN,
    id_violencia_sancion_tipo: DataTypes.INTEGER,
    sancion_cumplida: DataTypes.BOOLEAN,
    com_tutor: DataTypes.STRING,
    medidas_protec: DataTypes.BOOLEAN,
    denuncia_minpub: DataTypes.BOOLEAN,
    id_quien_denuncia_tipo: DataTypes.INTEGER,
        
    estado: DataTypes.STRING,
    usu_cre: DataTypes.STRING,
    usu_mod: DataTypes.STRING,
    fec_cre: DataTypes.DATE,
    fec_mod: DataTypes.DATE
        
  }, {
      tableName: 'uegg_violencia_seg_infraccion',
      timestamps: false
    });
    UeggViolenciaSegInfraccion.associate = function(models) {      
    
    };     return UeggViolenciaSegInfraccion };