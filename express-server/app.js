const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    path: '/', // Ensure cookie is available for entire domain
    domain: process.env.COOKIE_DOMAIN // Add this if needed for cross-domain
  });

  res.json({ 
    message: 'Cookie has been set!',
    success: true 
  });
});

// Add a route to check if cookie exists
app.get('/api/check-cookie', (req, res) => {
  const hasCookie = req.cookies.testCookie ? true : false;
  res.json({ 
    hasCookie,
    cookieValue: req.cookies.testCookie 
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({ message: 'Not Found' });
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 