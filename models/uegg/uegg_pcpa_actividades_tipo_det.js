'use strict';
//autor: gma
//date :07/03/2024



module.exports = (sequelize, DataTypes) => {  	
    const   UeggPcpaActividadesTipoDet = sequelize.define('uegg_pcpa_actividades_tipo_det', {	
        id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true,
           field: 'id'
       },
       id_pcpa_actividades_tipo: DataTypes.INTEGER,	
       cod_actividad: DataTypes.STRING,
       desc_actividad: DataTypes.STRING,	
       check_actividad_tipo_det: DataTypes.BOOLEAN,	
       orden: DataTypes.INTEGER, 	
       estado: DataTypes.STRING,	
       usu_cre: DataTypes.STRING,	
       usu_mod: DataTypes.STRING,	
       fec_cre: DataTypes.DATE,	
       fec_mod: DataTypes.DATE	
       
     }, {       	
     tableName: 'uegg_pcpa_actividades_tipo_det',     	
     timestamps: false,     });   	
     UeggPcpaActividadesTipoDet.associate = function(models) {     	
     };   	
     return UeggPcpaActividadesTipoDet; };	
       



   