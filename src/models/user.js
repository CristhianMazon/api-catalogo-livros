'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs'); // Importa o bcrypt

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // --- CÓDIGO DE ASSOCIAÇÃO ADICIONADO ---
      // Define a relação N:N com Livros através da tabela ReadingLists
      this.belongsToMany(models.Book, {
        foreignKey: 'user_id',
        through: 'ReadingLists',
        as: 'reading_list'
      });
      // ------------------------------------
    }

    // --- MÉTODO ADICIONADO ---
    // Método para verificar se a senha enviada no login bate com a do banco
    checkPassword(password) {
      return bcrypt.compare(password, this.password_hash);
    }
    // -------------------------
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    // --- CAMPOS DE SENHA MODIFICADOS ---
    // Este campo 'password' só existe para receber o dado, mas não vai para o banco.
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
    },
    // Este campo 'password_hash' é o que realmente é salvo no banco de dados.
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // ---------------------------------
  }, {
    sequelize,
    modelName: 'User',
  });

  // --- HOOK ADICIONADO ---
  // Antes de salvar (criar ou atualizar) um usuário, este código é executado.
  User.beforeSave(async (user) => {
    // Se o campo 'password' foi modificado, gera um novo hash.
    if (user.password) {
      user.password_hash = await bcrypt.hash(user.password, 8);
    }
  });
  // -------------------------

  return User;
};
