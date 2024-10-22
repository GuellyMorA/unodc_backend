
'use strict';
 module.exports = (sequelize, DataTypes) => { 
 const   UeggPcpaComisionTipo = sequelize.define('uegg_pcpa_comision_tipo', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
    },
    cod_comision_tipo: DataTypes.STRING,
    desc_comision_tipo: DataTypes.STRING,

    estado: DataTypes.STRING,
    usu_cre: DataTypes.STRING,
    usu_mod: DataTypes.STRING,
    fec_cre: DataTypes.DATE,
    fec_mod: DataTypes.DATE

  },
   {   
    tableName: 'uegg_pcpa_comision_tipo',      
    timestamps: false,     });  
    UeggPcpaComisionTipo.associate = function(models) {        
   };    
    return UeggPcpaComisionTipo; };
