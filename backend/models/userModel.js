const users = require('../data/users');

// return all users, optionally filtered by role
function getAll(role) {
  if (role) {
    return users.filter((u) => u.role === role);
  }
  return users;
}

// find one user by numeric id
function getById(id) {
  return users.find((u) => u.id === id);
}

// create a new user object and push it into the array
function create(data) {
  const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const now = new Date().toISOString().split('T')[0];
  const user = {
    id: nextId,
    name: data.name,
    email: data.email,
    role: data.role || 'user',
    createdAt: now,
  };
  users.push(user);
  return user;
}

// update an existing user (partial update)
function update(id, data) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  const existing = users[index];
  const updated = { ...existing, ...data };
  // protect immutable fields
  updated.id = existing.id;
  updated.createdAt = existing.createdAt;
  users[index] = updated;
  return updated;
}

// remove a user by id, return true if removed
function remove(id) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
