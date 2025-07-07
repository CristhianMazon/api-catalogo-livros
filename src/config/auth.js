module.exports = {
  secret: process.env.JWT_SECRET || 'meu-segredo-super-secreto',
  expiresIn: '7d', // Duração do token
};