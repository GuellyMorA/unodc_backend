'use strict';
//autor: gma
//date :07/03/2024



//embarazo adolescente
//2. Seguimiento y actuación para cumplimiento de derechos 	
	
	
 module.exports = (sequelize, DataTypes) => { 	
 const   UeggEmbEstudianteDerechos = sequelize.define('uegg_emb_estudiante_derechos', {	
	 id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
        id_pcpa_unidad_educativa: DataTypes.INTEGER,
        id_emb_informe_embarazo: DataTypes.INTEGER,	
        
        cod_rude : DataTypes.STRING,	
        nombres_apellidos: DataTypes.STRING,	
        
        complemento: DataTypes.STRING,		
        fec_nacimiento: DataTypes.DATE,	
        tiempo_gestacion: DataTypes.INTEGER,
        numero_embarazos: DataTypes.INTEGER,
        fec_estimada_parto: DataTypes.DATE,	
        check_recibe_control_prenatal: DataTypes.BOOLEAN,	
        check_requiere_baja_medica: DataTypes.BOOLEAN,	
        check_requiere_permiso_para_control: DataTypes.BOOLEAN,	
        check_requiere_cuidado_especial: DataTypes.BOOLEAN,	
        check_cuenta_con_medidas_ue: DataTypes.BOOLEAN,	
        // fec_baja_prenatal: DataTypes.DATE,	
        //   fec_baja_postnatal detalle,	
        fec_retorno_a_ue: DataTypes.DATE,	
        
        check_tutores_al_tanto_emb: DataTypes.BOOLEAN,	
        check_recibe_baja_medica: DataTypes.BOOLEAN,	
        check_recibe_permiso_controles_prenatales: DataTypes.BOOLEAN,	
        fec_ini_baja_prenatal: DataTypes.DATE,	
        fec_fin_baja_postnatal: DataTypes.DATE,	
        
        persona_asignada_seguimiento : DataTypes.STRING,
        check_cuenta_con_seguimiento: DataTypes.BOOLEAN,	
        
        estado: DataTypes.STRING,	
        usu_cre: DataTypes.STRING,	
        usu_mod: DataTypes.STRING,	
        fec_cre: DataTypes.DATE,	
        fec_mod: DataTypes.DATE	
        
  }, {         	
  tableName: 'uegg_emb_estudiante_derechos',      	
  timestamps: false,     });   	
  UeggEmbEstudianteDerechos.associate = function(models) {    	
  };   	
  return UeggEmbEstudianteDerechos; };	
	



   