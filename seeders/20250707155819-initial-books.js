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
        genre_id: 1, // Ficção Científica
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'O Senhor dos Anéis: A Sociedade do Anel',
        author: 'J.R.R. Tolkien',
        publisher: 'HarperCollins',
        publication_year: 2019,
        place_of_publication: 'Rio de Janeiro',
        genre_id: 2, // Fantasia
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Eu, Robô',
        author: 'Isaac Asimov',
        publisher: 'Aleph',
        publication_year: 2013,
        place_of_publication: 'São Paulo',
        genre_id: 1, // Ficção Científica
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'A Batalha do Apocalipse',
        author: 'Eduardo Spohr',
        publisher: 'Verus',
        publication_year: 2007,
        place_of_publication: 'Rio de Janeiro',
        genre_id: 2, // Fantasia
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Orgulho e Preconceito',
        author: 'Jane Austen',
        publisher: 'Martin Claret',
        publication_year: 2017,
        place_of_publication: 'São Paulo',
        genre_id: 3, // Romance
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Sherlock Holmes: Um Estudo em Vermelho',
        author: 'Arthur Conan Doyle',
        publisher: 'Zahar',
        publication_year: 2017,
        place_of_publication: 'Rio de Janeiro',
        genre_id: 4, // Mistério
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {});
  }
};