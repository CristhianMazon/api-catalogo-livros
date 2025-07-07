// src/routes/readingList.routes.js

const { Router } = require('express');
const ReadingListController = require('../controllers/ReadingListController');
const authMiddleware = require('../middlewares/auth');

const readingListRoutes = Router();

// Todas as rotas aqui precisam de autenticação
readingListRoutes.use(authMiddleware);

// Rota para listar os livros do usuário
readingListRoutes.get('/', ReadingListController.index);

// Rota para adicionar um livro à lista
readingListRoutes.post('/:book_id', ReadingListController.store);

// Rota para remover um livro da lista
readingListRoutes.delete('/:book_id', ReadingListController.delete);


module.exports = readingListRoutes;