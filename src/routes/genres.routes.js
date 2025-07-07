// src/routes/genres.routes.js

const { Router } = require('express');
const GenreController = require('../controllers/GenreController');
const authMiddleware = require('../middlewares/auth');

const genresRoutes = Router();

// Protege todas as rotas de gêneros
genresRoutes.use(authMiddleware);

genresRoutes.get('/', GenreController.index);
genresRoutes.post('/', GenreController.store);

module.exports = genresRoutes;
