'use strict';
//autor: gma
//date :07/03/2024



// 2. Modificación a socialización e implementación 	
	
//  module.exports = (sequelize, DataTypes) => {  const   Persona = sequelize.define('pcpa_unidad_eductiva (	
//  module.exports = (sequelize, DataTypes) => {  const   Persona = sequelize.define('pcpa_module.exports = (sequelize, DataTypes) => {  const  ruccion (	
//  module.exports = (sequelize, DataTypes) => {  const   Persona = sequelize.define('pcpa_actividades_tipo (	
	
 module.exports = (sequelize, DataTypes) => {	
 const   UeggPcpaActividadesEjecutadas = sequelize.define('uegg_pcpa_actividades_ejecutadas', {	
	 id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
	id_pcpa_actividades_tipo: DataTypes.INTEGER,
    id_pcpa_construccion: DataTypes.INTEGER,
	cod_actividad: DataTypes.STRING, // ej. 1 
    desc_actividad: DataTypes.STRING,// ej. Actividad 	
    fec_actividad: DataTypes.DATE,	
    estado: DataTypes.STRING,	
    usu_cre: DataTypes.STRING,	
    usu_mod: DataTypes.STRING,	
    fec_cre: DataTypes.DATE,	
    fec_mod: DataTypes.DATE	
	
  }, {     	
  tableName: 'uegg_pcpa_actividades_ejecutadas',       	
  timestamps: false,     });   	
  UeggPcpaActividadesEjecutadas.associate = function(models) {      	
  };    	
  return UeggPcpaActividadesEjecutadas; };	
	
	




   