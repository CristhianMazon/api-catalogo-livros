import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token de autenticação
    navigate('/'); // Redireciona para a tela de login
  };

  return (
    <header className="main-header">
      <nav>
        <div className="nav-links">
          <Link to="/books">Catálogo</Link>
          <Link to="/reading-list">Minha Lista</Link>
          <Link to="/genres">Gêneros</Link>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Sair
        </button>
      </nav>
    </header>
  );
}

export default Header;