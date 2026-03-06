import './UserCard.css';

const UserCard = ({ user, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Rôle: <span className={`role ${user.role}`}>{user.role}</span></p>
      <p>Créé le: {formatDate(user.createdAt)}</p>
      <button onClick={() => onDelete(user._id)} className="delete-btn">
        Supprimer
      </button>
    </div>
  );
};

export default UserCard;