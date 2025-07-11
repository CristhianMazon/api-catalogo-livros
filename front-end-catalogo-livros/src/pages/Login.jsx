import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAlert } from '../contexts/AlertContext'; // Adicione essa linha

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { showAlert } = useAlert(); // Adicione essa linha

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3333/users/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas.');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      showAlert('Login bem-sucedido!', 'success'); // Use o novo sistema de alerta
      navigate('/books');
    } catch (error) {
      showAlert(error.message, 'error'); // Use o novo sistema de alerta
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <p className="register-link">
        Não tem uma conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </div>
  );
}

export default Login;