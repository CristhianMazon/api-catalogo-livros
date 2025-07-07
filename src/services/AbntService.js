// src/services/AbntService.js
// Contém a lógica de negócio para a formatação ABNT.

class AbntService {
  /**
   * Formata um objeto de livro para uma string de citação ABNT NBR 6023.
   * @param {object} book - O objeto do livro.
   * @returns {string} A citação formatada.
   */
  format(book) {
    if (!book || !book.author || !book.title || !book.place_of_publication || !book.publisher || !book.publication_year) {
      throw new Error('Dados incompletos para a formatação ABNT.');
    }

    // Formata o nome do autor (SOBRENOME, Nome)
    const authorParts = book.author.trim().split(' ');
    const lastName = authorParts.pop().toUpperCase();
    const firstName = authorParts.join(' ');
    const formattedAuthor = `${lastName}, ${firstName}.`;

    // Formata o título em negrito (usando markdown)
    const formattedTitle = `**${book.title}**.`;

    // Adiciona a edição, se existir
    const edition = book.edition ? `${book.edition}. ed. ` : '';

    // Monta a parte de publicação
    const publication = `${book.place_of_publication}: ${book.publisher}, ${book.publication_year}.`;

    // Adiciona o número de páginas, se existir
    const pages = book.pages ? ` ${book.pages} p.` : '';

    // Junta tudo em uma única string
    return `${formattedAuthor} ${formattedTitle} ${edition}${publication}${pages}`;
  }
}

module.exports = new AbntService();
