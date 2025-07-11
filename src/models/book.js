'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Informa que um Livro (Book) pertence a um Gênero (Genre).
      this.belongsTo(models.Genre, { foreignKey: 'genre_id', as: 'genre' });

      // Informa a relação N:N com Usuários (User) através da tabela ReadingLists.
      this.belongsToMany(models.User, {
        foreignKey: 'book_id',
        through: 'ReadingLists',
        as: 'users'
      });
      // -------------------------
    }
  }
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    publisher: DataTypes.STRING,
    publication_year: DataTypes.INTEGER,
    place_of_publication: DataTypes.STRING,
    edition: DataTypes.STRING,
    pages: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};