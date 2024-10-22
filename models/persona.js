'use strict';

module.exports = (sequelize, DataTypes) => {
  const Persona = sequelize.define('persona', {
    idioma_materno_id: DataTypes.INTEGER,
	genero_tipo_id:DataTypes.INTEGER,
	sangre_tipo_id: DataTypes.INTEGER,
	estadocivil_tipo_id: DataTypes.INTEGER,
	carnet: DataTypes.STRING,
	rda: DataTypes.INTEGER,
	libreta_militar: DataTypes.STRING,
	pasaporte: DataTypes.STRING,
	paterno: DataTypes.STRING,
	materno: DataTypes.STRING,
	nombre: DataTypes.STRING,
	fecha_nacimiento: DataTypes.DATEONLY,
	segip_id: DataTypes.INTEGER,
	complemento: DataTypes.STRING,
	activo: DataTypes.BOOLEAN,
	correo: DataTypes.STRING,
	foto: DataTypes.STRING,
	celular: DataTypes.STRING,
	direccion: DataTypes.STRING,
	esvigente: DataTypes.BOOLEAN,
	esvigente_apoderado: DataTypes.INTEGER,
	count_edit: DataTypes.INTEGER,
	obs_segip: DataTypes.STRING,
	es_extranjero: DataTypes.BOOLEAN,
	expedido_id: DataTypes.INTEGER
  }, {
    tableName: 'persona',
    timestamps: false,
  });


  return Persona;
};