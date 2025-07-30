'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios', [{
      nombre: 'Administrador',
      telefono: '6754321',
      rol_id: 1,
      username: 'admin',
      password: 'admin',
      estado: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Operador',
      telefono: '7654321',
      rol_id: 2,
      username: 'operador',
      password: 'operador',
      estado: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {});
  }
};
