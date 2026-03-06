import UserCard from './UserCard';
import './UserList.css';

const UserList = ({ users, loading, error, onDelete }) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Chargement des utilisateurs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h3>❌ Erreur de connexion</h3>
        <p>{error}</p>
        <p>Vérifiez que le serveur backend est démarré.</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="no-users">
        <h3>📝 Aucun utilisateur</h3>
        <p>Utilisez le formulaire ci-dessus pour ajouter le premier utilisateur.</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard key={user._id} user={user} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default UserList;