'use strict';
//autor: gma
//date :07/03/2024


	
module.exports = (sequelize, DataTypes) => {  	
    const   UeggPcpaActividadesTipo = sequelize.define('uegg_pcpa_actividades_tipo', {	
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
       cod_actividad: DataTypes.STRING,
       desc_actividad: DataTypes.STRING,	
       check_actividad_tipo: DataTypes.BOOLEAN,
       orden: DataTypes.INTEGER, 	
       estado: DataTypes.STRING,	
       usu_cre: DataTypes.STRING,	
       usu_mod: DataTypes.STRING,	
       fec_cre: DataTypes.DATE,	
       fec_mod: DataTypes.DATE	
       
     }, {      	
     tableName: 'uegg_pcpa_actividades_tipo',    	
     timestamps: false,     });  	
     UeggPcpaActividadesTipo.associate = function(models) {      	
      };    	
      return UeggPcpaActividadesTipo; };	
       
       




   