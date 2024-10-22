'use strict';
//autor: gma
//date :07/03/2024


module.exports = (sequelize, DataTypes) => { 	
    const   UeggPcpaMiembroComision = sequelize.define('uegg_pcpa_miembro_comision', {	
        id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true,
           field: 'id'
       },
       id_pcpa_construccion: DataTypes.INTEGER,	
       id_pcpa_comision_tipo: DataTypes.INTEGER,	
       id_pcpa_miembro_tipo: DataTypes.INTEGER,	
       orden: DataTypes.INTEGER,	
       nombres_miembro : DataTypes.STRING,
       apellidos_miembro : DataTypes.STRING,	
       check_miembro_comision: DataTypes.BOOLEAN,	
       estado: DataTypes.STRING,	
       usu_cre: DataTypes.STRING,	
       usu_mod: DataTypes.STRING,	
       fec_cre: DataTypes.DATE,	
       fec_mod: DataTypes.DATE	
     }, {     	
     tableName: 'uegg_pcpa_miembro_comision',    	
     timestamps: false,     }); 	
     UeggPcpaMiembroComision.associate = function(models) {      	
      };   	
      return UeggPcpaMiembroComision; };	
       
       
       




   