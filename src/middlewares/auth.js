// src/middlewares/auth.js
// Middleware para verificar a autenticação via token JWT.

const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../config/auth');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  // O token vem no formato "Bearer <token>", então separamos o token.
  const [, token] = authHeader.split(' ');

  try {
    // Verifica se o token é válido usando a chave secreta
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Adiciona o ID do usuário ao objeto de requisição para uso futuro
    req.userId = decoded.id;

    return next(); // Se o token for válido, permite que a requisição continue
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};
