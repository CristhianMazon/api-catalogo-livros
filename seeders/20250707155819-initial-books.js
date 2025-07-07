'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Books', [
      {
        title: 'Duna',
        author: 'Frank Herbert',
        publisher: 'Aleph',
        publication_year: 2017,
        place_of_publication: 'São Paulo',
        genre_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'O Senhor dos Anéis: A Sociedade do Anel',
        author: 'J.R.R. Tolkien',
        publisher: 'HarperCollins',
        publication_year: 2019,
        place_of_publication: 'Rio de Janeiro',
        genre_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {});
  }
};