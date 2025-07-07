// src/routes/index.js
const { Router } = require('express');

const usersRoutes = require('./users.routes');
const booksRoutes = require('./books.routes');
const genresRoutes = require('./genres.routes');
const readingListRoutes = require('./readingList.routes');

const routes = Router();

// Agrupa as rotas por módulo
routes.use('/users', usersRoutes);
routes.use('/books', booksRoutes);
routes.use('/genres', genresRoutes);
// CORREÇÃO: A rota foi alterada para o plural, seguindo as boas práticas.
routes.use('/reading-lists', readingListRoutes);

module.exports = routes;