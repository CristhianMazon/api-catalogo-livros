// src/config/auth.js
// Configurações do JWT (JsonWebToken)

module.exports = {
  // Chave secreta para assinar os tokens. Em produção, use uma variável de ambiente!
  secret: process.env.JWT_SECRET || 'meu-segredo-super-secreto',
  expiresIn: '7d', // Duração do token
};
