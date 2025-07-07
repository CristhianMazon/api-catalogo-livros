// src/routes/index.js
// Arquivo principal que agrupa todas as rotas da aplicação.

const { Router } = require('express');
const usersRoutes = require('./users.routes');
const booksRoutes = require('./books.routes');
const genresRoutes = require('./genres.routes');

const routes = Router();

// Rota de boas-vindas
routes.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API do Catálogo de Livros!' });
});

// Agrupa as rotas por módulo
routes.use('/users', usersRoutes);
routes.use('/books', booksRoutes);
routes.use('/genres', genresRoutes);

module.exports = routes;
