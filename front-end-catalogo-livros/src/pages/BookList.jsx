import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const response = await fetch('http://localhost:3333/books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar livros.');
      }

      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao carregar os livros. Por favor, faça login novamente.');
      localStorage.removeItem('token');
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleDelete = async (bookId) => {
    const token = localStorage.getItem('token');
    const confirmDelete = window.confirm('Tem certeza que deseja remover este livro?');
    
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3333/books/${bookId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Falha ao remover o livro.');
        }

        alert('Livro removido com sucesso.');
        fetchBooks(); // Atualiza a lista após a remoção
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleAddToList = async (bookId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3333/reading-lists/${bookId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Falha ao adicionar o livro à lista.');
      }

      alert('Livro adicionado à sua lista de leitura.');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <div className="header-actions">
        <h2>Catálogo de Livros</h2>
        <Link to="/books/new" className="add-button">
          Adicionar Novo Livro
        </Link>
      </div>
      <ul className="book-list">
        {books.length === 0 ? (
          <p>Nenhum livro encontrado.</p>
        ) : (
          books.map(book => (
            <li key={book.id} className="book-item">
              <h3>{book.title}</h3>
              <p>Autor: {book.author}</p>
              <p>Editora: {book.publisher}</p>
              <p>Gênero: {book.genre?.name || 'Não especificado'}</p>
              <div className="book-actions">
                <Link to={`/books/edit/${book.id}`} className="edit-button">
                  Editar
                </Link>
                <button onClick={() => handleDelete(book.id)} className="delete-button">
                  Remover
                </button>
                <button onClick={() => handleAddToList(book.id)} className="add-to-list-button"> {/* Adicione essa linha */}
                  Adicionar à Lista
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default BookList;