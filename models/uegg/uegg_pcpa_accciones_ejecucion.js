'use strict';
//autor: gma
//date :07/03/2024



module.exports = (sequelize, DataTypes) => {  	
    const   UeggPcpaAccionesEjecucion = sequelize.define('uegg_pcpa_accciones_ejecucion', {	
        id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true,
           field: 'id'
       },
       id_pcpa_indicadores_tipo: DataTypes.INTEGER,
       id_pcpa_construccion: DataTypes.INTEGER,	
       cod_indicadores: DataTypes.STRING, // ej. 1 
       desc_indicadores: DataTypes.STRING,// ej. Indicador 	
       fec_ejecucion: DataTypes.DATE,	
       estado: DataTypes.STRING,	
       usu_cre: DataTypes.STRING,	
       usu_mod: DataTypes.STRING,	
       fec_cre: DataTypes.DATE,	
       fec_mod: DataTypes.DATE	
       
     }, {        	
     tableName: 'uegg_pcpa_accciones_ejecucion',     	
     timestamps: false,   	
     });    	
     UeggPcpaAccionesEjecucion.associate = function(models) {      	
        };    	
        return UeggPcpaAccionesEjecucion; };
       
       
       



   