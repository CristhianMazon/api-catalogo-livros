'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Genres', [
      { name: 'Ficção Científica', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Fantasia', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Romance', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mistério', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Genres', null, {});
  }
};
