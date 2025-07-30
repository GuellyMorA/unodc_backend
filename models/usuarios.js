'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const Usuarios = sequelize.define('usuarios' ,{  	
	id: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    autoIncrement: true,
	    field: 'id'
	    },
		nivel_geografico_id: DataTypes.INTEGER,
		nivel_geografico_sigla: DataTypes.STRING, 
	grados_sigla: DataTypes.STRING, 
	puestos_sigla: DataTypes.STRING, 
	genero_sexo_sigla: DataTypes.STRING, 
	user_login: DataTypes.STRING, 
	password_hash: DataTypes.STRING, 
	nombres: DataTypes.STRING, 
	apellido_pat: DataTypes.STRING, 
	apellido_mat: DataTypes.STRING, 
	email: DataTypes.STRING, 
	telefono: DataTypes.STRING, 
	direccion: DataTypes.STRING, 
	reset_key: DataTypes.STRING, 
	reset_date: DataTypes.DATE, 
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
    tableName: 'usuarios'  ,	
    timestamps: false,	
});	
	
	
Usuarios.associate = function(models) { 	
    Usuarios.belongsTo(models.grados, {	
        foreignKey: 'grados_sigla'	
    });	
	
};	
	
return Usuarios;	
};	
