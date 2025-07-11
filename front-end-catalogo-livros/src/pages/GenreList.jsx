import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function GenreList() {
  const [genres, setGenres] = useState([]);
  const [newGenreName, setNewGenreName] = useState('');
  const navigate = useNavigate();

  const fetchGenres = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const response = await fetch('http://localhost:3333/genres', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar gêneros.');
      }

      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao carregar os gêneros. Por favor, faça login novamente.');
      localStorage.removeItem('token');
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  const handleAddGenre = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3333/genres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newGenreName }),
      });

      if (!response.ok) {
        throw new Error('Falha ao adicionar o gênero. O nome é obrigatório.');
      }

      setNewGenreName('');
      fetchGenres(); // Atualiza a lista
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (genreId) => {
    const token = localStorage.getItem('token');
    const confirmDelete = window.confirm('Tem certeza que deseja remover este gênero?');

    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3333/genres/${genreId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Falha ao remover o gênero.');
        }

        alert('Gênero removido com sucesso.');
        fetchGenres(); // Atualiza a lista após a remoção
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="header-actions">
        <h2>Gerenciar Gêneros</h2>
      </div>

      <form onSubmit={handleAddGenre} className="genre-form">
        <input
          type="text"
          value={newGenreName}
          onChange={(e) => setNewGenreName(e.target.value)}
          placeholder="Nome do Novo Gênero"
          required
        />
        <button type="submit">Adicionar Gênero</button>
      </form>

      <ul className="genre-list">
        {genres.length === 0 ? (
          <p>Nenhum gênero encontrado.</p>
        ) : (
          genres.map(genre => (
            <li key={genre.id} className="genre-item">
              <span>{genre.name}</span>
              <button onClick={() => handleDelete(genre.id)} className="delete-button">
                Remover
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default GenreList;