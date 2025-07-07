// src/controllers/BookController.js

const Book = require('../../models/Book');
const Genre = require('../../models/Genre');
const AbntService = require('../services/AbntService');

class BookController {
  // Lista todos os livros
  async index(req, res) {
    try {
      const books = await Book.findAll({
        include: { model: Genre, as: 'genre', attributes: ['id', 'name'] },
        order: [['title', 'ASC']],
      });
      return res.json(books);
    } catch (error) {
      return res.status(500).json({ error: 'Falha ao listar livros.', details: error.message });
    }
  }

  // Busca um livro específico
  async show(req, res) {
    try {
      const { id } = req.params;
      const { format } = req.query;

      const book = await Book.findByPk(id, {
        include: { model: Genre, as: 'genre', attributes: ['id', 'name'] },
      });

      if (!book) {
        return res.status(404).json({ error: 'Livro não encontrado.' });
      }

      // Se o query param 'format=abnt' for usado, retorna a citação
      if (format && format.toLowerCase() === 'abnt') {
        const abntCitation = AbntService.format(book);
        return res.json({ citation: abntCitation });
      }

      return res.json(book);
    } catch (error) {
      return res.status(500).json({ error: 'Falha ao buscar livro.', details: error.message });
    }
  }

  // Cria um novo livro
  async store(req, res) {
    try {
      const newBook = await Book.create(req.body);
      return res.status(201).json(newBook);
    } catch (error) {
      return res.status(500).json({ error: 'Falha ao criar livro.', details: error.message });
    }
  }

  // Atualiza um livro
  async update(req, res) {
    try {
      const { id } = req.params;
      const book = await Book.findByPk(id);

      if (!book) {
        return res.status(404).json({ error: 'Livro não encontrado.' });
      }

      const updatedBook = await book.update(req.body);

      return res.json(updatedBook);
    } catch (error) {
      return res.status(500).json({ error: 'Falha ao atualizar livro.', details: error.message });
    }
  }

  // Deleta um livro
  async delete(req, res) {
    try {
      const { id } = req.params;
      const book = await Book.findByPk(id);

      if (!book) {
        return res.status(404).json({ error: 'Livro não encontrado.' });
      }

      await book.destroy();

      return res.status(204).send(); // 204 No Content
    } catch (error) {
      return res.status(500).json({ error: 'Falha ao deletar livro.', details: error.message });
    }
  }
}

module.exports = new BookController();
