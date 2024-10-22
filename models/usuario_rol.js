'use strict';

module.exports = (sequelize, DataTypes) => {
  const UsuarioRol = sequelize.define('usuarios_rol', {

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

  };
  return UsuarioRol;
};