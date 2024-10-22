'use strict';
module.exports = (sequelize, DataTypes) => {
  const DepartamentoTipo = sequelize.define('departamento_tipo', {
    sigla: DataTypes.STRING,
    departamento: DataTypes.STRING,
    obs: DataTypes.STRING,
    codigo: DataTypes.STRING,
    pais_tipo_id: DataTypes.INTEGER
  }, {
    tableName: 'departamento_tipo',
    timestamps: false,
  });
  DepartamentoTipo.associate = function(models) {
  };
  return DepartamentoTipo;
};
