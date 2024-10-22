'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
<<<<<<< HEAD:migrations/demo/20190508135712-create-rol.js
    return queryInterface.createTable('roles', {
=======
    return queryInterface.createTable('infra_predio_tipo', {
>>>>>>> devinfrabe:migrations/infraestructura/20190712150332-create-infra-predio-tipo.js
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
<<<<<<< HEAD:migrations/demo/20190508135712-create-rol.js
      descripcion: {
        type: Sequelize.STRING(50)
      },
      estado: {
        type: Sequelize.BOOLEAN
=======
      nivel: {
        type: Sequelize.STRING
      },
      es_vigente: {
        type: Sequelize.STRING
>>>>>>> devinfrabe:migrations/infraestructura/20190712150332-create-infra-predio-tipo.js
      },
      fecha_registro: {
        type: Sequelize.DATE
      },
      fecha_modificacion: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
<<<<<<< HEAD:migrations/demo/20190508135712-create-rol.js
    return queryInterface.dropTable('roles');
=======
    return queryInterface.dropTable('infra_predio_tipo');
>>>>>>> devinfrabe:migrations/infraestructura/20190712150332-create-infra-predio-tipo.js
  }
};