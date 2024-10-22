'use strict';
//autor: gma
//date :07/03/2024


module.exports = (sequelize, DataTypes) => { 	
    const   UeggPcpaActividadesPromocion = sequelize.define('uegg_pcpa_actividades_promocion', {	
        id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true,
           field: 'id'
       },
       id_pcpa_construccion: DataTypes.INTEGER,
       id_pcpa_actividades_tipo: DataTypes.INTEGER,
            
       nivel: DataTypes.INTEGER, // 1: maestro  , 2: detalle	
       fec_aprobacion: DataTypes.DATE,	
       tiempo_vigencia : DataTypes.INTEGER,	
       declaracion_jurada: DataTypes.BOOLEAN,	
       estado: DataTypes.STRING,	
       usu_cre: DataTypes.STRING,	
       usu_mod: DataTypes.STRING,	
       fec_cre: DataTypes.DATE,	
       fec_mod: DataTypes.DATE	
       
     }, {        	
     tableName: 'uegg_pcpa_actividades_promocion',   	
     timestamps: false,     });   	
     UeggPcpaActividadesPromocion.associate = function(models) {       	
       };   	
       return UeggPcpaActividadesPromocion; };
       




   