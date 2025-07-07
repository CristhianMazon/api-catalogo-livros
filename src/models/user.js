'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Book, {
        foreignKey: 'user_id',
        through: 'ReadingLists',
        as: 'reading_list'
      });
    }

    checkPassword(password) {
      return bcrypt.compare(password, this.password_hash);
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  // --- CORREÇÃO DEFINITIVA ---
  // Vamos definir o hook fora do init, usando o método addHook.
  // Esta é uma forma mais explícita e garantida de registrar o hook.
  User.addHook('beforeSave', async (user) => {
    if (user.password) {
      user.password_hash = await bcrypt.hash(user.password, 8);
    }
  });

  return User;
};