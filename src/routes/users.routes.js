const { Router } = require('express');
const UserController = require('../controllers/UserController');
const SessionController = require('../controllers/SessionController');

const usersRoutes = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               name: "Ada Lovelace"
 *               email: "ada@example.com"
 *               password: "password123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: E-mail já está em uso
 */
usersRoutes.post('/', UserController.store);

/**
 * @swagger
 * /users/sessions:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "ada@example.com"
 *               password: "password123"
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 */
usersRoutes.post('/sessions', SessionController.store);

module.exports = usersRoutes;
