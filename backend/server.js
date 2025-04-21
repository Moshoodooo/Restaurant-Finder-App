// server.js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'test@example.com' && password === 'password') {
    return res.json({ token: 'mock_token_123' });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
