'use strict';
module.exports = (sequelize, DataTypes) => {
  const LugarNivelTipo = sequelize.define('lugar_nivel_tipo', {
		nivel: DataTypes.STRING,
		orden: DataTypes.STRING,
		obs: DataTypes.STRING,
  }, {
    tableName: 'lugar_nivel_tipo',
    timestamps: false,
  });
  LugarNivelTipo.associate = function(models) {
  };
  return LugarNivelTipo;
};