import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import BookList from './pages/BookList';
import BookForm from './pages/BookForm';
import GenreList from './pages/GenreList';
import ReadingList from './pages/ReadingList';
import Header from './components/Header';
import Alert from './components/Alert';
import { AlertProvider } from './contexts/AlertContext';
import './App.css';

function AppContent() {
  const location = useLocation();
  const showHeader = location.pathname !== '/' && location.pathname !== '/register';

  return (
    <>
      {showHeader && <Header />}
      <div className="app-wrapper"> {/* Adicione essa div */}
        <Alert />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/edit/:id" element={<BookForm />} />
          <Route path="/genres" element={<GenreList />} />
          <Route path="/reading-list" element={<ReadingList />} />
        </Routes>
      </div> {/* Feche a div aqui */}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AlertProvider>
        <AppContent />
      </AlertProvider>
    </BrowserRouter>
  );
}

export default App;