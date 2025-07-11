import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [placeOfPublication, setPlaceOfPublication] = useState('');
  const [genreId, setGenreId] = useState('');
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Obtém o ID do livro se estiver em modo de edição

  // Efeito para carregar os gêneros e os dados do livro (se houver ID)
  useEffect(() => {
    const fetchGenresAndBook = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      // Buscar a lista de gêneros
      const genresResponse = await fetch('http://localhost:3333/genres', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (genresResponse.ok) {
        const genresData = await genresResponse.json();
        setGenres(genresData);
      }

      // Se houver um ID na URL, buscar os dados do livro para edição
      if (id) {
        const bookResponse = await fetch(`http://localhost:3333/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (bookResponse.ok) {
          const bookData = await bookResponse.json();
          setTitle(bookData.title);
          setAuthor(bookData.author);
          setPublisher(bookData.publisher);
          setPublicationYear(bookData.publication_year);
          setPlaceOfPublication(bookData.place_of_publication);
          setGenreId(bookData.genre_id || '');
        } else {
          alert('Livro não encontrado para edição.');
          navigate('/books');
        }
      }
    };

    fetchGenresAndBook();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:3333/books/${id}` : 'http://localhost:3333/books';

    const bookData = {
      title,
      author,
      publisher,
      publication_year: Number(publicationYear),
      place_of_publication: placeOfPublication,
      genre_id: genreId ? Number(genreId) : null,
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error(`Falha ao ${id ? 'atualizar' : 'criar'} o livro.`);
      }

      alert(`Livro ${id ? 'atualizado' : 'criado'} com sucesso!`);
      navigate('/books');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>{id ? 'Editar Livro' : 'Adicionar Novo Livro'}</h2>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" required />
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Autor" required />
        <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} placeholder="Editora" required />
        <input type="number" value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)} placeholder="Ano de Publicação" required />
        <input type="text" value={placeOfPublication} onChange={(e) => setPlaceOfPublication(e.target.value)} placeholder="Local de Publicação" required />
        
        <select value={genreId} onChange={(e) => setGenreId(e.target.value)}>
          <option value="">Selecione o Gênero</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
        
        <button type="submit">{id ? 'Salvar Alterações' : 'Adicionar Livro'}</button>
      </form>
    </div>
  );
}

export default BookForm;