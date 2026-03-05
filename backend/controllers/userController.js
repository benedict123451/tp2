const User = require('../models/userModel');

// GET /api/users
exports.getAllUsers = (req, res) => {
  const role = req.query.role;
  const data = User.getAll(role);
  res.status(200).json({ success: true, count: data.length, data });
};

// GET /api/users/:id
exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = User.getById(id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
  }
  res.status(200).json({ success: true, data: user });
};

// POST /api/users
exports.createUser = (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'name and email are required' });
  }
  // 409 if email already exists
  const existing = User.getAll().find((u) => u.email === email);
  if (existing) {
    return res.status(409).json({ success: false, message: 'Email already in use' });
  }
  const newUser = User.create({ name, email, role });
  res.status(201).json({ success: true, data: newUser });
};

// PUT /api/users/:id
exports.updateUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const existing = User.getById(id);
  if (!existing) {
    return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
  }
  const { name, email, role } = req.body;
  if (email && email !== existing.email) {
    const other = User.getAll().find((u) => u.email === email);
    if (other) {
      return res.status(409).json({ success: false, message: 'Email already in use' });
    }
  }
  const updated = User.update(id, { name, email, role });
  res.status(200).json({ success: true, data: updated });
};

// DELETE /api/users/:id
exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const ok = User.remove(id);
  if (!ok) {
    return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
  }
  res.status(204).send();
};
