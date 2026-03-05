const express = require('express');
const app = express();
const usersRouter = require('./routes/users');

// middleware
app.use(express.json());                         // parse JSON bodies
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date()
      .toISOString()
      .replace('T', ' ')
      .substring(0, 19);
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// mount users router under /api/users
app.use('/api/users', usersRouter);

const port = 3001;
const host = 'localhost';
app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
  