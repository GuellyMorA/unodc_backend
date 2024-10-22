'use strict';
//autor: gma
//date :07/03/2024



	
//3.Seguimiento y actuación para cumplimiento de derechos	
	
	
	
module.exports = (sequelize, DataTypes) => { 	
    const   UeggEmbEstudianteDerechosSeg = sequelize.define('uegg_emb_estudiante_derechos_seg', {	
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
       nombres_apellidos: DataTypes.STRING,	
       check_emb_relacion_concensuada: DataTypes.BOOLEAN,	
       check_emb_agresion_sexual: DataTypes.BOOLEAN,	

       check_emb_reporte_dna: DataTypes.BOOLEAN,
       check_emb_violacion_sexual: DataTypes.BOOLEAN,
       emb_referencia_dna: DataTypes.DATE,
       check_director_victima_violencia: DataTypes.BOOLEAN,
       check_emb_director_refiere_dna: DataTypes.BOOLEAN,
       cod_caso_denuncia : DataTypes.STRING,
       nombre_adolescente : DataTypes.STRING,
       fec_denuncia: DataTypes.DATE,	
       
       motivo_queja : DataTypes.STRING,
       acciones_a_seguir : DataTypes.STRING,
           
       estado: DataTypes.STRING,	
       usu_cre: DataTypes.STRING,	
       usu_mod: DataTypes.STRING,	
       fec_cre: DataTypes.DATE,	
       fec_mod: DataTypes.DATE	
       
     }, {      	
     tableName: 'uegg_emb_estudiante_derechos_seg',     	
     timestamps: false,     });     	
     UeggEmbEstudianteDerechosSeg.associate = function(models) {      	
      };  	
      return UeggEmbEstudianteDerechosSeg; };	
       
     // fin gma	
       
       
       
       
       



   