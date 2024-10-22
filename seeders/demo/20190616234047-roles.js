'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [{
        descripcion: 'Nacional',
        estado: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descripcion: 'Departamental',
        estado: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descripcion: 'Distrital',
        estado: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descripcion: 'Director',
        estado: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
