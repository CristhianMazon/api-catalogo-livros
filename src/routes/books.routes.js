// src/routes/books.routes.js

const { Router } = require('express');
const BookController = require('../controllers/BookController');
const authMiddleware = require('../middlewares/auth');

const booksRoutes = Router();

// Todas as rotas de livros abaixo precisam de autenticação
booksRoutes.use(authMiddleware);

booksRoutes.get('/', BookController.index);
booksRoutes.get('/:id', BookController.show);
booksRoutes.post('/', BookController.store);
booksRoutes.put('/:id', BookController.update);
booksRoutes.delete('/:id', BookController.delete);

module.exports = booksRoutes;
