'use strict';

module.exports = (sequelize, DataTypes) => {
  const RolTipo = sequelize.define('roles', {
  /*  id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
  },*/
    sigla: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      field: 'sigla'
      },

    rol: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    nivel_geografico_sigla: DataTypes.INTEGER,
   
  }, {
    tableName: 'roles',
    timestamps: false,
  });
  RolTipo.associate = function(models) {
    // RolTipo.hasMany(models.rol_menus_operaciones, {
    // 	foreignKey: 'roles_sigla'

    // });
  };
  return RolTipo;
};