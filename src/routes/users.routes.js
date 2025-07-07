// src/routes/users.routes.js

const { Router } = require('express');
const { UserController, SessionController } = require('../controllers/UserController');
const authMiddleware = require('../middlewares/auth');

const usersRoutes = Router();

// Rota para criar um novo usuário (cadastro)
usersRoutes.post('/', UserController.store);

// Rota para criar uma nova sessão (login)
usersRoutes.post('/sessions', SessionController.store);

// Exemplo de rota protegida
usersRoutes.get('/me', authMiddleware, (req, res) => {
    // Graças ao middleware, temos o req.userId disponível
    res.json({ message: `Olá, usuário com ID: ${req.userId}` });
});


module.exports = usersRoutes;
