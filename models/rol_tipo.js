'use strict';

module.exports = (sequelize, DataTypes) => {
  const RolTipo = sequelize.define('rol_tipo', {
    rol: DataTypes.STRING,
    lugar_nivel_tipo_id: DataTypes.INTEGER,
    sub_sistema: DataTypes.STRING,
    diminutivo: DataTypes.STRING
  }, {
    tableName: 'rol_tipo',
    timestamps: false,
  });

  RolTipo.associate = function(models) {
  };
  return RolTipo;
};