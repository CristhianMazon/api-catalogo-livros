const { Router } = require('express');
const BookController = require('../controllers/BookController');
const authMiddleware = require('../middlewares/auth');

const booksRoutes = Router();

booksRoutes.use(authMiddleware);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso.
 */
booksRoutes.get('/', BookController.index);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Busca um livro por ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *         description: Use 'abnt' para receber a citação formatada.
 *     responses:
 *       200:
 *         description: Livro encontrado.
 *       404:
 *         description: Livro não encontrado.
 */
booksRoutes.get('/:id', BookController.show);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Cria um novo livro
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publisher:
 *                 type: string
 *               publication_year:
 *                 type: integer
 *               place_of_publication:
 *                 type: string
 *               genre_id:
 *                 type: integer
 *             example:
 *               title: "A Máquina do Tempo"
 *               author: "H. G. Wells"
 *               publisher: "Companhia das Letras"
 *               publication_year: 1895
 *               place_of_publication: "Londres"
 *               genre_id: 1
 *     responses:
 *       201:
 *         description: Livro criado com sucesso.
 */
booksRoutes.post('/', BookController.store);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Atualiza os dados de um livro
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publisher:
 *                 type: string
 *               publication_year:
 *                 type: integer
 *               place_of_publication:
 *                 type: string
 *               genre_id:
 *                 type: integer
 *             example:
 *               title: "A Máquina do Tempo (Atualizado)"
 *               author: "H. G. Wells"
 *               publisher: "Nova Editora"
 *               publication_year: 1900
 *               place_of_publication: "Paris"
 *               genre_id: 2
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso.
 *       404:
 *         description: Livro não encontrado.
 */
booksRoutes.put('/:id', BookController.update);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Remove um livro pelo ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro a ser removido
 *     responses:
 *       204:
 *         description: Livro removido com sucesso.
 *       404:
 *         description: Livro não encontrado.
 */
booksRoutes.delete('/:id', BookController.delete);

module.exports = booksRoutes;
