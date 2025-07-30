	
'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const Personas = sequelize.define('personas' ,{  	
	    id: {
	      type: DataTypes.INTEGER,
	      allowNull: false,
	      primaryKey: true,
	      autoIncrement: true,
	      field: 'id'
	      },
	
	
	denuncia_personas_id: DataTypes.INTEGER, 
	genero_sexo_sigla: DataTypes.STRING, 
	grados_sigla: DataTypes.STRING, 
	orden: DataTypes.INTEGER, 
	puesto_cargo_funcion: DataTypes.STRING, 
	unidad_policial_desc: DataTypes.STRING, 
	sigla: DataTypes.STRING, 
	cod_activo: DataTypes.STRING, 
	tipo_personas: DataTypes.STRING, 
	password_hash: DataTypes.STRING, 
	nombres: DataTypes.STRING, 
	apellido_pat: DataTypes.STRING, 
	apellido_mat: DataTypes.STRING, 
	email: DataTypes.STRING, 
	telefono: DataTypes.STRING, 
	direccion: DataTypes.STRING, 
	fecha_nacimiento: DataTypes.DATE, 
	ci_y_complemento: DataTypes.STRING, 
	ci_expedido: DataTypes.STRING, 
	foto_img_path: DataTypes.STRING, 
	estado: DataTypes.STRING, 
	transaccion: DataTypes.STRING, 
	usu_cre: DataTypes.STRING, 
	fec_cre: DataTypes.DATE, 
	usu_mod: DataTypes.STRING, 
	fec_mod: DataTypes.DATE, 
	host_creacion: DataTypes.STRING, 
	host_modificacion: DataTypes.STRING, 
	
	
	
	
	
  }, {	
    tableName: 'personas'  ,	
    timestamps: false,	
  });	
	
	
Personas.associate = function(models) { 	
// Personas.belongsTo(models.roles, {	
    //   foreignKey: 'roles_sigla'	
    // });	
	
  };	
	
return Personas;	
};	
	
