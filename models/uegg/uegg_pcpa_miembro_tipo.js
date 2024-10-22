'use strict';
//autor: gma
//date :07/03/2024


	
module.exports = (sequelize, DataTypes) => {  	
    const   UeggPcpaMiembroTipo = sequelize.define('uegg_pcpa_miembro_tipo', {	
        id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true,
           field: 'id'
       },
       cod_miembro_tipo: DataTypes.STRING,	
       desc_miembro_tipo: DataTypes.STRING,	
       
       estado: DataTypes.STRING,	
       usu_cre: DataTypes.STRING,	
       usu_mod: DataTypes.STRING,	
       fec_cre: DataTypes.DATE,	
       fec_mod: DataTypes.DATE	
       
     }, {        	
     tableName: 'uegg_pcpa_miembro_tipo',       	
     timestamps: false,     });    	
     UeggPcpaMiembroTipo.associate = function(models) {     	
       };   	
       return UeggPcpaMiembroTipo; };
       



   