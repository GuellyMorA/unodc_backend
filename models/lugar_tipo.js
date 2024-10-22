'use strict';
module.exports = (sequelize, DataTypes) => {
  const LugarTipo = sequelize.define('lugar_tipo', {
    lugar_tipo_id: DataTypes.INTEGER,
	gestion_tipo_id: DataTypes.INTEGER,
	pais_tipo_id: DataTypes.INTEGER,
	lugar_nivel_id: DataTypes.INTEGER,
	codigo: DataTypes.STRING,
	lugar: DataTypes.STRING,
	obs: DataTypes.STRING,
	departamento_tipo_id: DataTypes.INTEGER,
	area2001: DataTypes.STRING,
	area2012: DataTypes.STRING,
	area_distrito: DataTypes.STRING,
	poblacion: DataTypes.INTEGER,
	viviendas: DataTypes.INTEGER
  }, {
    tableName: 'lugar_tipo',
    timestamps: false,
  });
  LugarTipo.associate = function(models) {
	LugarTipo.belongsTo(models.lugar_tipo, {
		foreignKey: 'lugar_tipo_id',
		as: 'lugar_tipo1'
	});
	LugarTipo.belongsTo(models.lugar_nivel_tipo, {
    	foreignKey: 'lugar_nivel_id'
	});
	LugarTipo.belongsTo(models.departamento_tipo, {
    	foreignKey: 'departamento_tipo_id'
	});
  };
  return LugarTipo;
};