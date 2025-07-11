import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function ReadingList() {
  const [readingList, setReadingList] = useState([]);
  const navigate = useNavigate();

  const fetchReadingList = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const response = await fetch('http://localhost:3333/reading-lists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar a lista de leitura.');
      }

      const data = await response.json();
      setReadingList(data);
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao carregar a lista de leitura. Por favor, faça login novamente.');
      localStorage.removeItem('token');
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    fetchReadingList();
  }, [fetchReadingList]);

  const handleRemoveFromList = async (bookId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3333/reading-lists/${bookId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Falha ao remover o livro da lista.');
      }

      alert('Livro removido da lista de leitura.');
      fetchReadingList(); // Atualiza a lista
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <div className="header-actions">
        <h2>Minha Lista de Leitura</h2>
      </div>
      <ul className="book-list">
        {readingList.length === 0 ? (
          <p>Sua lista de leitura está vazia.</p>
        ) : (
          readingList.map(book => (
            <li key={book.id} className="book-item">
              <h3>{book.title}</h3>
              <p>Autor: {book.author}</p>
              <p>Editora: {book.publisher}</p>
              <button onClick={() => handleRemoveFromList(book.id)} className="delete-button">
                Remover da Lista
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ReadingList;