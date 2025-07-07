// src/controllers/UserController.js

const jwt = require('jsonwebtoken');
// --- CAMINHO CORRIGIDO AQUI ---
const { User } = require('../models');
const authConfig = require('../config/auth');

// Controller para o cadastro de usuários
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
}

// Controller para o login (criação de sessão)
class SessionController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado.' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Senha incorreta.' });
      }

      const { id, name } = user;

      // --- PEQUENA CORREÇÃO NO PAYLOAD DO TOKEN ---
      // A variável 'email' não estava definida, usamos 'user.email'
      const token = jwt.sign({ id, email: user.email }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      });

      return res.json({
        user: { id, name, email },
        token,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Falha no login.', details: error.message });
    }
  }
}

module.exports = { UserController: new UserController(), SessionController: new SessionController() };