const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.get('/api/set-cookie', (req, res) => {
  // Set a test cookie
  res.cookie('testCookie', 'Hello from Express Server!', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });

  res.json({ message: 'Cookie has been set!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 