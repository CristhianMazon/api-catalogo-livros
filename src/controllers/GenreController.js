const { Genre } = require('../models');

class GenreController {
  // Lista todos os gêneros
  async index(req, res) {
    try {
      const genres = await Genre.findAll({
        order: [['name', 'ASC']],
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
  // Apaga um gênero
  async delete(req, res) {
    try {
      const { id } = req.params;
      const genre = await Genre.findByPk(id);

      if (!genre) {
        return res.status(404).json({ error: 'Gênero não encontrado.' });
      }

      await genre.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Falha ao apagar gênero.', details: error.message });
    }
  }
}

module.exports = new GenreController();