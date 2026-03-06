import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import userService from './services/userService';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      setUsers(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      const response = await userService.create(formData);
      setUsers([...users, response.data.data]);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert('Email déjà utilisé');
      } else {
        alert('Erreur lors de la création');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await userService.remove(id);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <Navbar count={users.length} />
        <main className="main-content">
          <UserForm onSubmit={handleCreate} />
          <UserList
            users={users}
            loading={loading}
            error={error}
            onDelete={handleDelete}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
