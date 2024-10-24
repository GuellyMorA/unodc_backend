'use strict';

module.exports = (sequelize, DataTypes) => {
  const UsuarioRol = sequelize.define('usuarios_rol', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
  },
    usuarios_id: DataTypes.INTEGER,
    estado: DataTypes.STRING,
    roles_sigla: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    tableName: 'usuarios_rol',
    timestamps: false,
  });

  UsuarioRol.associate = function(models) {
    UsuarioRol.belongsTo(models.usuarios, {
    	foreignKey: 'usuarios_id'
    });
    UsuarioRol.belongsTo(models.roles, {
    	foreignKey: 'roles_sigla'
    });


  };
  return UsuarioRol;
};