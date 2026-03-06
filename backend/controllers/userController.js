const User = require('../models/userModel');
const mongoose = require('mongoose');

// GET /api/users
exports.getAllUsers = async (req, res) => {
  try {
    const role = req.query.role;
    const filter = role ? { role } : {};
    const data = await User.find(filter);
    res.status(200).json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// GET /api/users/:id
exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'ID invalide' });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// POST /api/users
exports.createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'name and email are required' });
    }
    const newUser = await User.create({ name, email, role });
    res.status(201).json({ success: true, data: newUser });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Email already in use' });
    }
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// PUT /api/users/:id
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'ID invalide' });
    }
    const { name, email, role } = req.body;
    const updated = await User.findByIdAndUpdate(id, { name, email, role }, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Email already in use' });
    }
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'ID invalide' });
    }
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};
