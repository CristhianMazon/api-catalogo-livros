const jwt = require('jsonwebtoken');
const { User } = require('../models');
const authConfig = require('../config/auth');

// Controller dedicado à autenticação e gerenciamento de sessão.
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

      const token = jwt.sign({ id, email: user.email }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      });

      return res.json({
        user: { id, name, email: user.email },
        token,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Falha no login.', details: error.message });
    }
  }
}

module.exports = new SessionController();