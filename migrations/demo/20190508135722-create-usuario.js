'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(100)
      },
      telefono: {
        type: Sequelize.STRING(20)
      },
      rol_id: {
        type: Sequelize.INTEGER,
        references: {
         model: 'roles',
         key: 'id',
         // This declares when to check the foreign key constraint. PostgreSQL only.
         deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
       }
      },
      username: {
        type: Sequelize.STRING(50)
      },
      password: {
        type: Sequelize.STRING(50)
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuarios');
  }
};