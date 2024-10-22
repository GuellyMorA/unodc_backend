'use strict';
//autor: gma
//date :07/03/2024




module.exports = (sequelize, DataTypes) => {  	
    const   UeggEmbEstudianteEmbarazo = sequelize.define('uegg_emb_estudiante_embarazo', {	
        id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true,
           field: 'id'
       },
       id_pcpa_unidad_educativa: DataTypes.INTEGER,
       id_emb_informe_embarazo: DataTypes.INTEGER,	
       
       cod_rude: DataTypes.STRING,
       cedula_identidad: DataTypes.STRING,
       complemento: DataTypes.STRING,
       fec_nacimiento: DataTypes.DATE,	
       
       nombres_estudiante : DataTypes.STRING,
       apellido_pat_estudiante : DataTypes.STRING,	
       apellido_mat_estudiante : DataTypes.STRING,	
       nivel : DataTypes.STRING,	
       grado : DataTypes.STRING,	
       edad: DataTypes.INTEGER,
       check_estudiante_discapacidad: DataTypes.BOOLEAN,	
       check_estudiante_casada: DataTypes.BOOLEAN,	
       check_estudiante_conviviente: DataTypes.BOOLEAN,	
        
       estado: DataTypes.STRING,	
       usu_cre: DataTypes.STRING,	
       usu_mod: DataTypes.STRING,	
       fec_cre: DataTypes.DATE,	
       fec_mod: DataTypes.DATE	
     }, {    	
     tableName: 'uegg_emb_estudiante_embarazo',      	
     timestamps: false,     });   	
     UeggEmbEstudianteEmbarazo.associate = function(models) {       	
     };  	
     return UeggEmbEstudianteEmbarazo; };	
       


   