import { useState } from 'react';
import './UserForm.css';

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Veuillez remplir tous les champs requis.');
      return;
    }
    setError('');
    onSubmit(formData);
    setFormData({ name: '', email: '', role: 'user' });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>Ajouter un utilisateur</h2>
      {error && <div className="form-error">{error}</div>}
      <div className="form-group">
        <label htmlFor="name">Nom:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">Rôle:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit" className="submit-btn">Créer</button>
    </form>
  );
};

export default UserForm;