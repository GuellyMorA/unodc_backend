'use strict';
//autor: gma
//date :07/03/2024


module.exports = (sequelize, DataTypes) => { 	
    const   UeggPcpaIndicadoresEjecucion = sequelize.define('uegg_pcpa_indicadores_ejecucion', {	
        id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true,
           field: 'id'
       },
       id_pcpa_construccion: DataTypes.INTEGER,	
       cantidad_acciones_inicial: DataTypes.INTEGER, 	
       cantidad_acciones_final: DataTypes.INTEGER, 	

       id_pcpa_indicadores_tipo: DataTypes.INTEGER, 
        cod_indicadores: DataTypes.STRING,
        desc_indicadores: DataTypes.STRING,
        fec_ejecucion: DataTypes.DATE,
       
       estado: DataTypes.STRING,	
       usu_cre: DataTypes.STRING,	
       usu_mod: DataTypes.STRING,	
       fec_cre: DataTypes.DATE,	
       fec_mod: DataTypes.DATE	
       
     }, {    	
     tableName: 'uegg_pcpa_indicadores_ejecucion',       	
     timestamps: false,     });     	
     UeggPcpaIndicadoresEjecucion.associate = function(models) {     	
      };   	
      return UeggPcpaIndicadoresEjecucion; };	
       
       




   