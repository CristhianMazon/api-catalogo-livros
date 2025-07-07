// src/controllers/GenreController.js

// --- CAMINHO CORRIGIDO AQUI ---
// Importando o model a partir do diretório principal de models
const { Genre } = require('../models');

class GenreController {
  // Lista todos os gêneros
  async index(req, res) {
    try {
      const genres = await Genre.findAll({
        order: [['name', 'ASC']], // Ordena por nome
      });
      return res.json(genres);
    } catch (error) {
      return res.status(500).json({ error: 'Falha ao listar gêneros.', details: error.message });
    }
  }

  // Cria um novo gênero
  async store(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'O nome do gênero é obrigatório.' });
      }
      const newGenre = await Genre.create({ name });
      return res.status(201).json(newGenre);
    } catch (error) {
      return res.status(500).json({ error: 'Falha ao criar gênero.', details: error.message });
    }
  }
}

module.exports = new GenreController();