'use strict';
//autor: gma
//date :07/03/2024



module.exports = (sequelize, DataTypes) => {	
    const   UeggEmbInformeEmbarazo = sequelize.define('uegg_emb_informe_embarazo', {	
        id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true,
           field: 'id'
       },
       id_pcpa_unidad_educativa: DataTypes.INTEGER,
       id_emb_reporte_embarazo_tipo_1: DataTypes.INTEGER, 	
       id_emb_reporte_embarazo_tipo_2: DataTypes.INTEGER, 	
       id_emb_reporte_embarazo_tipo_3: DataTypes.INTEGER, 	
       
       estado: DataTypes.STRING,	
       usu_cre: DataTypes.STRING,	
       usu_mod: DataTypes.STRING,	
       fec_cre: DataTypes.DATE,	
       fec_mod: DataTypes.DATE	
       
     }, {        	
     tableName: 'uegg_emb_informe_embarazo',      	
     timestamps: false,     });    	
     UeggEmbInformeEmbarazo.associate = function(models) {       	
       };   	
       return UeggEmbInformeEmbarazo; };
       



   