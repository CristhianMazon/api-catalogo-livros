const { Router } = require('express');
const GenreController = require('../controllers/GenreController');
const authMiddleware = require('../middlewares/auth');

const genresRoutes = Router();

// Protege todas as rotas de gêneros
genresRoutes.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Genres
 *     description: Gerenciamento dos gêneros de livros
 */

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Lista todos os gêneros
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de gêneros retornada com sucesso.
 */
genresRoutes.get('/', GenreController.index);

/**
 * @swagger
 * /genres:
 *   post:
 *     summary: Cria um novo gênero
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: "Aventura"
 *     responses:
 *       201:
 *         description: Gênero criado com sucesso.
 */
genresRoutes.post('/', GenreController.store);

/**
 * @swagger
 * /genres/{id}:
 *   delete:
 *     summary: Apaga um gênero pelo ID
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do gênero a ser removido
 *     responses:
 *       204:
 *         description: Gênero removido com sucesso.
 *       404:
 *         description: Gênero não encontrado.
 */
genresRoutes.delete('/:id', GenreController.delete);

module.exports = genresRoutes;
