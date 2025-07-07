// src/controllers/ReadingListController.js

// --- CAMINHOS CORRIGIDOS AQUI ---
const { User, Book } = require('../models');

class ReadingListController {
  // Lista todos os livros na lista de leitura do usuário logado
  async index(req, res) {
    try {
      const user = await User.findByPk(req.userId, {
        include: { association: 'reading_list', order: [['title', 'ASC']] },
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      return res.json(user.reading_list);
    } catch (error) {
      return res.status(500).json({ error: 'Falha ao buscar lista de leitura.', details: error.message });
    }
  }

  // Adiciona um livro à lista de leitura
  async store(req, res) {
    try {
      const { book_id } = req.params;
      const user = await User.findByPk(req.userId);
      const book = await Book.findByPk(book_id);

      if (!book) {
        return res.status(404).json({ error: 'Livro não encontrado.' });
      }

      await user.addReading_list(book);

      return res.status(201).json(book);
    } catch (error) {
      return res.status(500).json({ error: 'Falha ao adicionar livro.', details: error.message });
    }
  }

  // Remove um livro da lista de leitura
  async delete(req, res) {
    try {
        const { book_id } = req.params;
        const user = await User.findByPk(req.userId);
        const book = await Book.findByPk(book_id);

        if (!book) {
            return res.status(404).json({ error: 'Livro não encontrado.' });
        }

        await user.removeReading_list(book);

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: 'Falha ao remover livro.', details: error.message });
    }
  }
}

module.exports = new ReadingListController();