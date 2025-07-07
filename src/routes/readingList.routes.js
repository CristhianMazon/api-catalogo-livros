const { Router } = require('express');
const ReadingListController = require('../controllers/ReadingListController');
const authMiddleware = require('../middlewares/auth');

const readingListRoutes = Router();

// Todas as rotas aqui precisam de autenticação
readingListRoutes.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Reading Lists
 *     description: Gerenciamento da lista de leitura do usuário
 */

/**
 * @swagger
 * /reading-lists:
 *   get:
 *     summary: Lista os livros na lista de leitura do usuário logado
 *     tags: [Reading Lists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso.
 *       401:
 *         description: Não autorizado.
 */
readingListRoutes.get('/', ReadingListController.index);

/**
 * @swagger
 * /reading-lists/{book_id}:
 *   post:
 *     summary: Adiciona um livro à lista de leitura do usuário
 *     tags: [Reading Lists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro a ser adicionado
 *     responses:
 *       201:
 *         description: Livro adicionado com sucesso.
 *       404:
 *         description: Livro não encontrado.
 */
readingListRoutes.post('/:book_id', ReadingListController.store);

/**
 * @swagger
 * /reading-lists/{book_id}:
 *   delete:
 *     summary: Remove um livro da lista de leitura do usuário
 *     tags: [Reading Lists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro a ser removido
 *     responses:
 *       204:
 *         description: Livro removido com sucesso.
 *       404:
 *         description: Livro ou item da lista não encontrado.
 */
readingListRoutes.delete('/:book_id', ReadingListController.delete);

module.exports = readingListRoutes;
