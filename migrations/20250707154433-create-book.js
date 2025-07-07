'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      publisher: {
        type: Sequelize.STRING
      },
      publication_year: {
        type: Sequelize.INTEGER
      },
      place_of_publication: {
        type: Sequelize.STRING
      },
      edition: {
        type: Sequelize.STRING
      },
      pages: {
        type: Sequelize.INTEGER
      },
      // --- CÓDIGO ADICIONADO ---
      // Esta é a chave estrangeira que conecta o livro a um gênero.
      genre_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Genres', key: 'id' }, // Informa que é uma referência à tabela 'Genres'
        onUpdate: 'CASCADE', // Se o id do gênero mudar, atualiza aqui também
        onDelete: 'SET NULL', // Se um gênero for deletado, o campo nos livros associados ficará nulo
        allowNull: true,
      },
      // -------------------------
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};
