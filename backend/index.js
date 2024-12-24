const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// MongoDB Models
const User = require('./models/User');
const Document = require('./models/Document');

// Initialize Express App
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/collaboration-tool', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth'); // Import the auth routes
app.use('/auth', authRoutes); // Use the auth routes with '/auth' prefix

// Socket.IO Connection
io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle collaborative events here
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the Collaboration Tool API');
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
