// src/controllers/UserController.js

const { User } = require('../models');

// Controller exclusivo para o CRUD de usuários.
class UserController {
  async store(req, res) {
    try {
      const { name, email, password } = req.body;

      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Este e-mail já está em uso.' });
      }

      const user = await User.create({ name, email, password });

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Falha no registro do usuário.', details: error.message });
    }
  }

  // Outros métodos do CRUD de usuário (update, show, delete) poderiam ser adicionados aqui.
}

module.exports = new UserController();