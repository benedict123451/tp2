const connectDB = require('../config/db');
const User = require('../models/userModel');

const seedUsers = [
  {
    name: "Alice Martin",
    email: "alice@example.com",
    role: "admin",
    createdAt: new Date("2024-01-15"),
  },
  {
    name: "Bob Durand",
    email: "bob@example.com",
    role: "user",
    createdAt: new Date("2024-02-20"),
  },
  {
    name: "Charlie Dupont",
    email: "charlie@example.com",
    role: "user",
    createdAt: new Date("2024-03-05"),
  },
];

const seedDB = async () => {
  try {
    await connectDB();
    const count = await User.countDocuments();
    if (count === 0) {
      await User.insertMany(seedUsers);
      console.log('Données initiales insérées');
    } else {
      console.log('La collection contient déjà des données');
    }
    process.exit(0);
  } catch (err) {
    console.error('Erreur lors du seed:', err);
    process.exit(1);
  }
};

seedDB();