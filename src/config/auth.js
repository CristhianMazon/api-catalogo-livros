// src/config/auth.js
// Configurações do JWT (JsonWebToken)

module.exports = {
  // A chave secreta é lida da variável de ambiente, com um fallback para desenvolvimento.
  secret: process.env.JWT_SECRET || 'meu-segredo-super-secreto',
  expiresIn: '7d', // Duração do token
};